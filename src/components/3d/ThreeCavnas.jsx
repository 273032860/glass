import { Canvas, extend } from '@react-three/fiber';
import * as THREE from 'three/webgpu';
import { Leva } from 'leva';
import ColorSpace_Mapping_exposure from './ColorSpace.jsx';
import Scene1 from './scene1/Scene1.jsx';
import TslEffect from './TslEffect.jsx';
import { useRef } from 'react';
import { useState } from 'react';
import { Suspense } from 'react';
import { Splat, useProgress } from '@react-three/drei';
import { Model3 } from './scene2/Model3.jsx';
import Scene2 from './scene2/Scene2.jsx';

const ThreeCavnas = ({ isStart }) => {
  const hudScene = useRef();
  const hudCamera = useRef();

  const [isVisible, setIsVisible] = useState(true);

  return (
    <div id="canvas">
      <Leva position="bottom-right" hidden />
      <Canvas
        shadows
        style={{ opacity: isStart ? 1 : 0.001, transition: 'opacity 2s ease-in' }}
        // eventSource={document.getElementById('fixedUi')}
        // eventPrefix="client"
        gl={(props) => {
          extend(THREE);
          const renderer = new THREE.WebGPURenderer({
            ...props,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            // forceWebGL: true, // 强制使用 WebGL
          });
          return renderer.init().then(() => renderer);
        }}
      >
        <Suspense>
          <Scene1 isVisible={isVisible} />
          <Scene2 isVisible={isVisible} />
          <ColorSpace_Mapping_exposure />
          <TslEffect setIsVisible={setIsVisible} />
        </Suspense>
      </Canvas>
    </div>
  );
};
export default ThreeCavnas;
