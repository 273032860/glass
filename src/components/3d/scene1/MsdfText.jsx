import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three/webgpu';
import { MSDFTextGeometry } from 'three-msdf-text-utils';
import { MSDFTextNodeMaterial } from 'three-msdf-text-utils/webgpu';
import { useMemo } from 'react';
import { Billboard, useTexture } from '@react-three/drei';
import { useControls } from 'leva';

import { attribute, clamp, float, mix, smoothstep, step, texture, uniform } from 'three/tsl';

export default function MSDFText({
  text = '摄像头',
  fontUrl = '/font/AlibabaPuHuiTi-3-65-Medium-msdf.json',
  atlasUrl = '/font/AlibabaPuHuiTi-3-65-Medium-msdf-atlas.png',
  scale = 0.02,
  rotation = [0, Math.PI, Math.PI],
  useBillboard = false,
  ...props
}) {
  const font = useLoader(THREE.FileLoader, fontUrl, (loader) => {
    loader.setResponseType('json');
  });

  const atlas = useLoader(THREE.TextureLoader, atlasUrl);

  const perlinTexture = useTexture('/textures/perlin.webp');
  perlinTexture.wrapS = perlinTexture.wrapT = THREE.RepeatWrapping;

  const uProgress = useMemo(() => uniform(0), []);
  const uNoiseRemapMin = useMemo(() => uniform(0.48), []);
  const uNoiseRemapMax = useMemo(() => uniform(0.9), []);
  const uCenterScale = useMemo(() => uniform(0.05), []);
  const uGlyphScale = useMemo(() => uniform(0.75), []);
  const uDesatComplete = useMemo(() => uniform(0.45), []);

  const { progress, noiseRemapMin, noiseRemapMax, centerScale, glyphScale, desatComplete } =
    useControls({
      progress: { value: 0, min: 0, max: 1 },
      noiseRemapMin: { value: 0.48, min: 0, max: 1, step: 0.01 },
      noiseRemapMax: { value: 0.9, min: 0, max: 2, step: 0.01 },
      centerScale: { value: 0.05, min: 0, max: 1, step: 0.01 },
      glyphScale: { value: 2, min: 0, max: 2, step: 0.01 },
      desatComplete: { value: 0.45, min: 0, max: 1, step: 0.01 },
    });

  useFrame(() => {
    uProgress.value = progress;
    uNoiseRemapMin.value = noiseRemapMin;
    uNoiseRemapMax.value = noiseRemapMax;
    uCenterScale.value = centerScale;
    uGlyphScale.value = glyphScale;
    uDesatComplete.value = desatComplete;
  });

  // ---------- geometry ----------
  const geometry = useMemo(() => {
    return new MSDFTextGeometry({
      text,
      font,
      align: 'center',
    });
  }, [text, font]);

  // ---------- center offset ----------
  const offset = useMemo(() => {
    if (!geometry?.layout) return [0, 0, 0];

    return [-(geometry.layout.width * scale) / 2, -(geometry.layout.height * scale) / 2, 0];
  }, [geometry, scale]);

  // ---------- material ----------
  const material = useMemo(() => {
    const textMaterial = new MSDFTextNodeMaterial({
      map: atlas,
      transparent: true,
    });

    textMaterial.alphaTest = 0.01;

    const glyphUv = attribute('glyphUv', 'vec2');
    const center = attribute('center', 'vec2');

    const uBaseColor = uniform(new THREE.Color('#ECCFA3'));
    const uDissolvedColor = uniform(new THREE.Color('#5E5E5E'));

    const customUv = center.mul(uCenterScale).add(glyphUv.mul(uGlyphScale));

    const perlinTextureNode = texture(perlinTexture, customUv).x;

    const perlinRemap = clamp(
      perlinTextureNode.sub(uNoiseRemapMin).div(uNoiseRemapMax.sub(uNoiseRemapMin)),
      0,
      1
    );

    const dissolve = step(uProgress, perlinRemap);

    const desaturationProgress = smoothstep(float(0), uDesatComplete, uProgress);

    const colorMix = mix(uBaseColor, uDissolvedColor, desaturationProgress);

    textMaterial.colorNode = colorMix;

    const msdfOpacity = textMaterial.opacityNode;

    textMaterial.opacityNode = msdfOpacity.mul(dissolve);

    return textMaterial;
  }, [
    atlas,
    perlinTexture,
    uProgress,
    uNoiseRemapMin,
    uNoiseRemapMax,
    uCenterScale,
    uGlyphScale,
    uDesatComplete,
  ]);

  if (!geometry?.layout) return null;

  const content = (
    <group position={offset}>
      <mesh geometry={geometry} material={material} rotation={rotation} scale={scale} {...props} />
    </group>
  );

  return useBillboard ? <Billboard follow>{content}</Billboard> : content;
}
