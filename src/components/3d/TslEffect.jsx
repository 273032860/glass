import { useFrame, useThree } from '@react-three/fiber';
import { PostProcessing } from 'three/webgpu';
import {
  pass,
  output,
  emissive,
  mrt,
  uniform,
  nodeObject,
  Fn,
  directionToColor,
  normalView,
  vec2,
  metalness,
  roughness,
  screenUV,
  uniformTexture,
  mix,
  sub,
  texture,
  float,
  vec4,
  select,
} from 'three/tsl';
import { useEffect, useMemo, useRef } from 'react';
import { Color, Texture, Vector2 } from 'three/webgpu';
import { canvasCloseBottomYEffect3 } from '../../shaderNode/Effects/canvasClose';
import { mapProgress } from '../../utils/progress';
import { useLenis } from 'lenis/react';
import { useControls } from 'leva';
import { useTexture } from '@react-three/drei';
import FluidSim from './FluidSim';
import MouseTrail from './MouseTrail';

function composeEffects(baseNode, effectList = []) {
  let node = baseNode;

  for (const effect of effectList) {
    node = effect(node);
  }

  return node;
}

const TslEffect = ({ setIsVisible }) => {
  const bgTexture = useTexture('/textures/sjfvce3c_2K_Albedo.jpg');
  const { wipeOffset, bgColor } = useControls({
    range2: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.01,
    },
    wipeOffset: {
      value: -0.05,
      min: -0.05,
      max: 0.06,
      step: 0.01,
    },
    bgColor: {
      value: '#4b785c',
    },
  });
  const ripple = useControls('ripple', {
    density: {
      value: 25.0,
      min: 0,
      max: 50,
    },
    falloff: {
      value: -4.0,
      min: -10,
      max: 0,
    },
    color: {
      value: '#ffffff',
    },
  });
  const postProcessingRef = useRef();

  const { gl, scene, camera, size, pointer, viewport } = useThree();
  const fluidSim = new FluidSim(size.width * viewport.dpr, size.height * viewport.dpr);
  const mouseTrail = new MouseTrail(size.width * viewport.dpr, size.height * viewport.dpr);
  const { outputPass, outputNode } = useMemo(() => {
    const scenePass = pass(scene, camera);
    scenePass.setMRT(
      mrt({
        output,
        emissive,
        normal: directionToColor(normalView),
        metalrough: vec2(metalness, roughness),
      })
    );
    const outputPass = scenePass.getTextureNode();

    const outputNode = scenePass;

    return {
      outputPass,
      outputNode,
    };
  }, [scene, camera]);

  const { exportEffectNode, effectUniforms } = useMemo(() => {
    const rangeU = uniform(0.1);
    const noiseScaleU = uniform(5.11);
    const noiseAmpU = uniform(0.05);
    const noiseSpeedU = uniform(0.07);
    const waveFreqU = uniform(26.5);
    const waveAmpU = uniform(-0.01);
    const edgeWidthU = uniform(0.01);
    const foamWidthU = uniform(0.01);
    const bgColorU = uniform(new Color('#3c7267'));
    const foamColorU = uniform(new Color('#7affc7'));
    const mousePosU = uniform(new Vector2(0, 0));
    const range2U = uniform(1);
    const wipeOffsetU = uniform(0.04);
    const bgTextureU = uniformTexture(bgTexture);
    const rippleCenterU = uniform(new Vector2(0.5, 0.5));
    const rippleDensityU = uniform(50);
    const rippleFalloffU = uniform(-10.0);
    const rippleColorU = uniform(new Color('#554f4f'));
    const aspectU = uniform(1.0);
    const fluidTextureU = uniformTexture(new Texture());
    const isFluidU = uniform(true);

    const exportEffectNode = nodeObject(
      Fn(() => {
        const out = composeEffects(outputNode, [
          canvasCloseBottomYEffect3({
            uv1: screenUV,
            range: rangeU,
            noiseScale: noiseScaleU,
            noiseAmp: noiseAmpU,
            noiseSpeed: noiseSpeedU,
            waveFreq: waveFreqU,
            waveAmp: waveAmpU,
            edgeWidth: edgeWidthU,
            foamWidth: foamWidthU,
            bgColor: bgColorU,
            foamColor: foamColorU,
            mousePos: mousePosU,
            range2: range2U,
            wipeOffset: wipeOffsetU,
            bgTexture: bgTextureU,
            aspect: aspectU,
          }),
        ]);

        const fluidMask = sub(float(1.0), texture(fluidTextureU, screenUV).r);
        const fluidR = texture(fluidTextureU, screenUV).r;

        // gradient 方向
        const dx = sub(texture(fluidTextureU, screenUV.add(vec2(0.002, 0.0))).r, fluidR);

        const dy = sub(texture(fluidTextureU, screenUV.add(vec2(0.0, 0.002))).r, fluidR);

        const dir = vec2(dx, dy);

        // 强度（可以加 pow 提升对比）
        const strength = fluidR.mul(fluidR).mul(10.48);

        // RGB offset
        const rUV = screenUV.add(dir.mul(0));
        const gUV = screenUV.add(dir.mul(strength));
        const bUV = screenUV.sub(dir.mul(0));

        // 采样
        const r = texture(outputPass, rUV).r;
        const g = texture(outputPass, gUV).g;
        const b = texture(outputPass, bUV).b;

        const rgbShift = vec4(r, g, b, 1.0);
        // ✅ 用 fluid 控制 effect 显示
        const final = mix(
          out, // 原始画面
          rgbShift, // 你的 canvasClose 效果
          select(isFluidU, fluidMask, 0) // fluidMask 开启 fluid 效果,0则不开启
          // 0 // fluidMask 开启 fluid 效果,0则不开启
        );

        return final;
      })()
    );
    return {
      exportEffectNode,
      effectUniforms: {
        range: rangeU,
        noiseScale: noiseScaleU,
        noiseAmp: noiseAmpU,
        noiseSpeed: noiseSpeedU,
        waveFreq: waveFreqU,
        waveAmp: waveAmpU,
        edgeWidth: edgeWidthU,
        foamWidth: foamWidthU,
        bgColor: bgColorU,
        foamColor: foamColorU,
        mousePos: mousePosU,
        range2: range2U,
        wipeOffset: wipeOffsetU,
        rippleCenter: rippleCenterU,
        rippleDensity: rippleDensityU,
        rippleFalloff: rippleFalloffU,
        rippleColor: rippleColorU,
        aspect: aspectU,
        fluidTextureU: fluidTextureU,
        isFluidU: isFluidU,
      },
    };
  }, [outputNode, camera]);

  useEffect(() => {
    if (!gl || !scene || !camera) return;

    postProcessingRef.current = new PostProcessing(gl);
    postProcessingRef.current.outputNode = exportEffectNode;
    if (postProcessingRef.current.setSize) {
      postProcessingRef.current.setSize(size.width, size.height);
      postProcessingRef.current.needsUpdate = true;
    }

    // 返回清理函数
    return () => {
      if (postProcessingRef.current) {
        postProcessingRef.current.dispose();
      }
    };
  }, [gl, scene, camera, outputPass]);

  const scrollProgress = useRef(0);

  useLenis((lenis) => {
    scrollProgress.current = lenis.progress || 0;

    //超过某个则隐藏scene1
    if (lenis.progress > 0.74 || lenis.progress < 0.75) {
      setIsVisible(true);
    }
    if (lenis.progress > 0.76 && lenis.progress <= 1) {
      setIsVisible(false);
    }
  });
  useFrame(() => {
    // 1️⃣ 更新鼠标轨迹
    mouseTrail.update(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
    // 2️⃣ 更新 fluid（核心！！！）
    fluidSim.update(gl, mouseTrail.texture);
    // 3️⃣ 把结果喂给 shader
    effectUniforms.fluidTextureU.value = fluidSim.texture;
  });

  useFrame(({ viewport }) => {
    if (effectUniforms.range) {
      effectUniforms.range.value = mapProgress(scrollProgress.current, 0.4, 0.6) * 1.2;
    }
    if (effectUniforms.mousePos) {
      const target = new Vector2(pointer.x * 0.5 + 0.5, -pointer.y * 0.5 + 0.5);
      effectUniforms.mousePos.value.lerp(target, 0.05);
    }
    if (effectUniforms.rippleCenter) {
      const target = new Vector2(pointer.x * 0.5 + 0.5, -pointer.y * 0.5 + 0.5);
      effectUniforms.rippleCenter.value.lerp(target, 0.1);
    }
    if (effectUniforms.range2) {
      effectUniforms.range2.value = mapProgress(scrollProgress.current, 0.99, 0.94) * 1.1;
      // effectUniforms.range2.value = range2;
    }
    if (effectUniforms.wipeOffset) {
      effectUniforms.wipeOffset.value = wipeOffset;
    }
    if (effectUniforms.bgColor) {
      effectUniforms.bgColor.value = new Color(bgColor);
    }
    if (effectUniforms.aspect) {
      effectUniforms.aspect.value = viewport.width / viewport.height;
    }
    if (effectUniforms.isFluidU) {
      effectUniforms.isFluidU.value = scrollProgress.current >= 0.5 && scrollProgress.current < 0.7;
    }
  });

  useFrame(() => {
    // 只在需要时渲染后处理效果，不覆盖默认渲染
    if (postProcessingRef.current) {
      postProcessingRef.current?.render();
    }
  }, 1);

  return null;
};

export default TslEffect;
