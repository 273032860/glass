import { PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useEffect } from "react";
import { syncCameraWithBlender, syncFrameWithBlender, syncWithBlender } from "threejs-blendertools";

const ThreeBlenderTools = () => {
  const shotsManagerRef = useRef(null)
  const myMainCameraRef = useRef()
  const camera = useThree(state => state.camera)
  const cleanup = syncCameraWithBlender(camera);

 

  // useFrame((state, delta) => {
  //    if (shotsManagerRef.current) {
  //      shotsManagerRef.current.update(delta); // 使用可选链操作符以防 shotsManagerRef.current 为 null
  //    }
  // });

  return (
    <>
      <PerspectiveCamera
          ref={myMainCameraRef}
          name="main"
          makeDefault={true}
          far={1000}
          near={0.1}
          fov={22.895}
          position={[0, 3, 19.42]}
        />
    </>
  )
}
export default ThreeBlenderTools