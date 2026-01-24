import { Canvas, extend } from "@react-three/fiber"
import * as THREE from 'three/webgpu'
import { Html, OrbitControls, PerspectiveCamera, Stats} from "@react-three/drei"
import { Leva } from "leva"
import RiveBar from "../rive/FlashLight"



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
        <Stats/>
         
        
        <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
          <boxGeometry   />
          <meshStandardMaterial color="#444" metalness={0.5} roughness={0.5} />
          <Html occlude="blending"  center transform rotation={[Math.PI / 2, 0, 0]} >
            <div className="w-[200px] h-[200px]">
              <RiveBar/>
            </div>
          </Html>
        </mesh>
        <mesh position={[0,0,2]}>
          <planeGeometry args={[12,12]}/>
          <meshBasicMaterial opacity={0.5} transparent />
        </mesh>
        <OrbitControls   makeDefault />
        </Canvas>
      </div>
  )
}
export default ThreeCavnas
 