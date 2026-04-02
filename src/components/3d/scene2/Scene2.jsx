import { CameraControls, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Hdr from '../Hdr';
import { Model3 } from './Model3';
import { button, useControls } from 'leva';
import { useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Vector3 } from 'three';
import Rig from '../Rig';

const cameraPositions = {
  default: [0, 0, 0, 0, 0, 0],
  default2: [
    -5.565787451908349, 2.93886775352189, -7.2792534237405135, 1.486972862090991,
    2.3718735464014626, -1.5189861006326395,
  ],
};

const Scene2 = ({ isVisible }) => {
  return (
    <>
      <Model3 isVisible={!isVisible} />
      {!isVisible && <Rig />}
    </>
  );
};
export default Scene2;
