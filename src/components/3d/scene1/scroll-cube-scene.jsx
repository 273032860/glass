'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import Lenis from 'lenis';
import ThreeCavnas from '../ThreeCavnas';

function RotatingCube() {
  return (
    <>
      <Html
        // position={[labelEnd.x, labelEnd.y - 0.3, labelEnd.z]}
        center
        style={{
          color: 'white',
          fontSize: '24px',
          fontFamily: 'system-ui, sans-serif',
          fontWeight: 300,
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
        }}
      >
        Hello
      </Html>
    </>
  );
}

export default function ScrollCubeScene() {
  return (
    <div className="h-[1000vh] relative bg-[#1a1a1a]">
      <div className="fixed inset-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <color attach="background" args={['#1a1a1a']} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <RotatingCube />
        </Canvas>
        <ThreeCavnas />
      </div>
    </div>
  );
}
