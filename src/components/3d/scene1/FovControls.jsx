import { useThree, useFrame } from '@react-three/fiber';
import { useLenis } from 'lenis/react';
import { useControls } from 'leva';
import { useRef } from 'react';
import { isMobile } from 'react-device-detect';

const getFovForProgress = (progress, points) => {
  const progressPoints = Object.keys(points)
    .map(parseFloat)
    .sort((a, b) => a - b);

  if (progress <= progressPoints[0]) {
    return points[progressPoints[0]];
  }

  if (progress >= progressPoints[progressPoints.length - 1]) {
    return points[progressPoints[progressPoints.length - 1]];
  }

  let p1, p2;
  for (let i = 0; i < progressPoints.length - 1; i++) {
    if (progress >= progressPoints[i] && progress <= progressPoints[i + 1]) {
      p1 = progressPoints[i];
      p2 = progressPoints[i + 1];
      break;
    }
  }

  if (p1 === undefined || p2 === undefined) {
    // Fallback for scenarios where progress is between the last two points but loop fails.
    const lastPoint = progressPoints[progressPoints.length - 1];
    const secondLastPoint = progressPoints[progressPoints.length - 2];
    if (progress > secondLastPoint && progress < lastPoint) {
      p1 = secondLastPoint;
      p2 = lastPoint;
    } else {
      return points[progressPoints[0]];
    }
  }

  const fov1 = points[p1];
  const fov2 = points[p2];

  if (p1 === p2) {
    return fov1;
  }

  const t = (progress - p1) / (p2 - p1);
  return fov1 + t * (fov2 - fov1);
};

const FovControls = ({ debug = false, fovPoint = {}, fovPointMobile = {} }) => {
  const camera = useThree((state) => state.camera);

  const points = isMobile ? fovPointMobile : fovPoint;
  const targetFov = useRef(points[0]);

  useLenis((lenis) => {
    const progress = (lenis.progress || 0) * 100;
    targetFov.current = getFovForProgress(progress, points);
  });

  useFrame(() => {
    if (!debug) {
      camera.fov = targetFov.current;
      // console.log(camera.fov.toFixed(2))
      camera.updateProjectionMatrix();
    }
  });

  return debug ? <FovControlsDebug /> : null;
};
export default FovControls;

function FovControlsDebug() {
  const { fov } = useControls({
    fov: { value: 5, min: 0, max: 100, step: 0.1 },
  });
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    camera.fov = fov;
    camera.updateProjectionMatrix();
  });
  return null;
}
