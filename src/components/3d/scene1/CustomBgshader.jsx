import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { mix, normalWorld, texture, uniform, vec3 } from 'three/tsl';
import { useEnvironment, useVideoTexture } from '@react-three/drei';
import { RepeatWrapping, SRGBColorSpace } from 'three/webgpu';
import { useMemo } from 'react';
import { useLenis } from 'lenis/react';

export default function CustomBg({ customBg, isVisible, background = false }) {
  const scene = useThree((v) => v.scene);
  const videoTexture = useVideoTexture('/textures/green.mp4');
  videoTexture.wrapS = videoTexture.wrapT = RepeatWrapping;
  videoTexture.repeat.x = 20;
  videoTexture.colorSpace = SRGBColorSpace;

  useFrame(() => {
    videoTexture.needsUpdate = true;
  });

  const hdr = useEnvironment({ files: '/brown_photostudio_06_2k.hdr' });
  const p = useMemo(() => uniform(0.3), []);
  useEffect(() => {
    const lightSpeedEffect = customBg(normalWorld); //shader
    const hdrtexture = texture(hdr).rgb;
    // const lightSpeedEffect = texture(videoTexture)  //shader
    scene.backgroundNode = background ? lightSpeedEffect : null;
    scene.environmentNode = mix(lightSpeedEffect, hdrtexture.mul(3), p);
    // scene.environmentNode = lightSpeedEffect
  }, [customBg, background, scene]);

  // useEffect(() => {
  //   p.value = isVisible ? 0.3 : 1;
  // }, [isVisible]);

  useLenis((lenis) => {
    const currentProgress = lenis.progress;
    if (currentProgress > 0.76 && currentProgress <= 1) {
      p.value = 1;
    } else {
      p.value = 0.3;
    }
  });

  return null;
}
