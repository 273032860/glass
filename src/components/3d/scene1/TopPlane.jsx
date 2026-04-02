import { useVideoTexture } from '@react-three/drei';
import { DoubleSide, RepeatWrapping, SRGBColorSpace } from 'three/webgpu';
import { color, texture } from 'three/tsl';
import { useEffect } from 'react';

const TopPlane = () => {
  const videoTexture = useVideoTexture('/textures/green.mp4');
  videoTexture.wrapS = videoTexture.wrapT = RepeatWrapping;

  videoTexture.colorSpace = SRGBColorSpace;

  useEffect(() => {
    if (videoTexture.image) {
      videoTexture.image.playbackRate = 0.9; // 设置为 0.5 倍速播放
    }
  }, [videoTexture.image]);

  useEffect(() => {
    if (videoTexture) {
      videoTexture.repeat.x = 8.2;

      videoTexture.needsUpdate = true;
    }
  }, [videoTexture]);

  return (
    <>
      <mesh
        scale={[100, 50, 1]}
        position={[0, -1.5218082359288, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1, 1, 4, 4]} />
        <meshStandardNodeMaterial
          colorNode={texture(videoTexture).mul(2).mul(color('#98fbe0'))}
          side={DoubleSide}
          toneMapped={false}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh scale={[100, 50, 1]} position={[0, 4.6218082359288, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardNodeMaterial
          colorNode={texture(videoTexture).mul(2).mul(color('#98fbe0'))}
          side={DoubleSide}
          toneMapped={false}
          transparent
        />
      </mesh>
    </>
  );
};
export default TopPlane;
