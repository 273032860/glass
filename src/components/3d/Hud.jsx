import * as THREE from "three"
import * as React from "react"
import { useFrame, useThree, createPortal } from "@react-three/fiber"

function RenderHud({
  defaultScene,
  defaultCamera,
  renderPriority,
  cameraRef
}) {
  const { gl, scene, camera } = useThree()

  let oldClear

  // 暴露 hud camera
  React.useEffect(() => {
    if (cameraRef) {
      cameraRef.current = camera
    }
  }, [camera, cameraRef])

  useFrame(() => {
    oldClear = gl.autoClear

    if (renderPriority === 1) {
      gl.autoClear = true
      gl.render(defaultScene, defaultCamera)
    }

    gl.autoClear = false
    gl.setClearColor(0x000000, 0)
    gl.clearDepth()
    gl.render(scene, camera)

    gl.autoClear = oldClear
  }, renderPriority)

  return <group onPointerOver={() => null} />
}

export function Hud({
  children,
  renderPriority = 1,
  sceneRef,
  cameraRef
}) {
  const { scene: defaultScene, camera: defaultCamera } = useThree()

  const [hudScene] = React.useState(() => new THREE.Scene())

  // 暴露 hud scene
  React.useEffect(() => {
    if (sceneRef) {
      sceneRef.current = hudScene
    }
  }, [hudScene, sceneRef])

  return (
    <>
      {createPortal(
        <>
          {children}

          <RenderHud
            defaultScene={defaultScene}
            defaultCamera={defaultCamera}
            renderPriority={renderPriority}
            cameraRef={cameraRef}
          />
        </>,
        hudScene,
        { events: { priority: renderPriority + 1 } }
      )}
    </>
  )
}