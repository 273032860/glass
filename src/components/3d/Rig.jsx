import { useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three/webgpu';

export default function Rig() {
  const { camera, pointer } = useThree();
  useFrame(() => (camera.position.x = MathUtils.lerp(camera.position.x, pointer.x * 0.1, 0.05)));
  useFrame(() => (camera.position.y = MathUtils.lerp(camera.position.y, pointer.y * 0.1, 0.05)));
  return null;
}
