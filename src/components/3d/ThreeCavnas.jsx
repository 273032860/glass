import { Canvas, extend } from "@react-three/fiber"
import * as THREE from 'three/webgpu'
import { OrbitControls, PerspectiveCamera} from "@react-three/drei"
import { Leva } from "leva"


const ThreeCavnas = () => {
  return (
     <div id="canvas">
      <Leva position="bottom-right" />
        <Canvas
          shadows 
          eventSource={document.getElementById("root")} 
          // eventPrefix="client" 
          gl={(props) => {
          extend(THREE)
          const renderer = new THREE.WebGPURenderer({ 
            ...props, 
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            // forceWebGL:true // 强制使用 WebGL
          })
          return renderer.init().then(() => renderer)
        }}
        >
        <axesHelper args={[15]} />
        <color attach="background" args={['#343434']} />
        <PerspectiveCamera  far={100} near={0.1}  position={[0,0,10]} makeDefault/>
       
         
        
        <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
          <boxGeometry   />
          <meshStandardMaterial color="#444" metalness={0.5} roughness={0.5} />
        </mesh>
        <OrbitControls   makeDefault />
        </Canvas>
      </div>
  )
}
export default ThreeCavnas
 