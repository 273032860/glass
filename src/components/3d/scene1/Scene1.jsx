import { lightSpeed } from '../Bgshader';
import CustomBg from './CustomBgshader';
import { DirectionalLight } from '../DirectionalLight';
import { Model2 } from './Mdels2';
import Rig from '../Rig';
import FovControls from './FovControls';

const Scene1 = ({ isVisible }) => {
  return (
    <>
      <fog attach="fog" args={['#1b1b1b', 0, 36]} />
      <Glasses isVisible={isVisible} />
      {/* <Rig /> */}
    </>
  );
};
export default Scene1;

function Glasses({ isVisible }) {
  return (
    <>
      <Model2 isVisible={isVisible} />

      {/* <ambientLight intensity={10.5} /> */}
      <DirectionalLight
        levaname="日光"
        // debug
        settings={{
          castShadow: true,
          color: '#ffffff',
          intensity: 3.3,
          position: [0.8, 3.6000000000000014, 0],
          target: [0, 0, 0],
          isHelper: false,
          shadowMapSize: 512,
          shadowRadius: 1,
          shadowBias: 0,
          shadowNormalBias: 0.02,
          shadowNear: 0.5,
          shadowFar: 200,
          visible: true,
        }}
      />
      <DirectionalLight
        levaname="日光2"
        settings={{
          castShadow: true,
          color: '#ffffff',
          intensity: 4.1,
          position: [4.200000000000001, -2.500000000000001, 0],
          target: [0, 0, 0],
          isHelper: false,
          shadowMapSize: 512,
          shadowRadius: 1,
          shadowBias: 0,
          shadowNormalBias: 0.02,
          shadowNear: 0.5,
          shadowFar: 200,
          visible: true,
        }}
      />
      <DirectionalLight
        levaname="日光3"
        settings={{
          castShadow: true,
          color: '#ffffff',
          intensity: 2.600000000000001,
          position: [-3.8000000000000025, -2.6000000000000014, 0],
          target: [0, 0, 0],
          isHelper: false,
          shadowMapSize: 512,
          shadowRadius: 1,
          shadowBias: 0,
          shadowNormalBias: 0.02,
          shadowNear: 0.5,
          shadowFar: 200,
          visible: true,
        }}
      />
      <FovControls fovPoint={{ 0: 20, 75: 20, 75.1: 43 }} fovPointMobile={{ 0: 38 }} />
      <CustomBg customBg={lightSpeed} isVisible={isVisible} />
    </>
  );
}
