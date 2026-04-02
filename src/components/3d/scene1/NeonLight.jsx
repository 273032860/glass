import { useGLTF } from '@react-three/drei';
import { DoubleSide } from 'three/webgpu';

export function Neo(props) {
  const { nodes, materials } = useGLTF('/NeonLight.glb');
  return (
    <>
      <group {...props} dispose={null} position={[-4.5, -0.2, 0]} rotation={[0, -3, 0]} scale={4}>
        <mesh geometry={nodes.Light.geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={'#2AF786'}
            transparent
            emissive={'#75FF26'}
            emissiveIntensity={1}
            opacity={0.18}
            metalness={0}
            roughness={1}
            side={DoubleSide}
          />
        </mesh>
        <mesh geometry={nodes.Glass.geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={'#2961FF'}
            transparent
            opacity={0.2}
            metalness={1}
            roughness={0.4}
            side={DoubleSide}
          />
        </mesh>
      </group>

      <group {...props} dispose={null} position={[4.5, -0.2, 0]} rotation={[0, 3, 0]} scale={4}>
        <mesh geometry={nodes.Light.geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={'#2AF786'}
            transparent
            emissive={'#75FF26'}
            emissiveIntensity={1}
            opacity={0.18}
            metalness={0}
            roughness={1}
            side={DoubleSide}
          />
        </mesh>
        <mesh geometry={nodes.Glass.geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={'#2961FF'}
            transparent
            opacity={0.2}
            metalness={1}
            roughness={0.4}
            side={DoubleSide}
          />
        </mesh>
      </group>
      <group {...props} dispose={null} position={[2.2, 2, 0]} rotation={[0, 0, 0]} scale={2}>
        <mesh geometry={nodes.Light.geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={'#2AF786'}
            transparent
            emissive={'#75FF26'}
            emissiveIntensity={1}
            opacity={0.1}
            metalness={0}
            roughness={1}
            side={DoubleSide}
          />
        </mesh>
        <mesh geometry={nodes.Glass.geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={'#38BC79'}
            emissive={'#1C201D'}
            emissiveIntensity={1}
            transparent
            opacity={0.4}
            metalness={1}
            roughness={0.26}
            side={DoubleSide}
          />
        </mesh>
      </group>
      <group {...props} dispose={null} position={[-2.2, 2, 0]} rotation={[0, 0, 0]} scale={2}>
        <mesh geometry={nodes.Light.geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={'#2AF786'}
            transparent
            emissive={'#75FF26'}
            emissiveIntensity={1}
            opacity={0.1}
            metalness={0}
            roughness={1}
            side={DoubleSide}
          />
        </mesh>
        <mesh geometry={nodes.Glass.geometry} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={'#38BC79'}
            emissive={'#1C201D'}
            emissiveIntensity={1}
            transparent
            opacity={0.4}
            metalness={1}
            roughness={0.26}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
}

useGLTF.preload('/NeonLight.glb');
