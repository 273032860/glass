import { useMemo } from 'react';
import { Html } from '@react-three/drei';
import { useControls } from 'leva';

// 线性插值函数
const lerp = (a, b, t) => a + (b - a) * t;

// Debug 模式下的组件
function HtmlControlsDebug({
  children,
  initialX = 0,
  initialY = 0,
  offsetScale: initialOffsetScale = 100,
  sizeScale: initialSizeScale = 1,
  ...props
}) {
  const { x, y, offsetScale, sizeScale } = useControls({
    x: { value: initialX, min: -10, max: 10, step: 0.01 },
    y: { value: initialY, min: -10, max: 10, step: 0.01 },
    offsetScale: { value: initialOffsetScale, min: 1, max: 500, step: 1 },
    sizeScale: { value: initialSizeScale, min: 0.1, max: 10, step: 0.1 },
  });

  const style = {
    ...props.style,
    transform: `translate(${x * offsetScale}px, ${y * offsetScale}px) scale(${sizeScale})`,
  };

  return (
    <Html {...props} style={style}>
      {children}
    </Html>
  );
}

// 主组件
export default function HtmlControls({
  fovPoint,
  progress,
  children,
  debug = false,
  offsetScale = 100,
  sizeScale = 1,
  ...props
}) {
  const sortedPoints = useMemo(
    () =>
      Object.keys(fovPoint)
        .map(Number)
        .sort((a, b) => a - b),
    [fovPoint]
  );

  const startProgress = sortedPoints[0];
  const endProgress = sortedPoints[sortedPoints.length - 1];

  const isVisible = progress >= startProgress && progress <= endProgress;

  if (!isVisible) {
    return null;
  }

  let p1 = startProgress;
  let p2 = endProgress;
  for (let i = 0; i < sortedPoints.length - 1; i++) {
    if (progress >= sortedPoints[i] && progress <= sortedPoints[i + 1]) {
      p1 = sortedPoints[i];
      p2 = sortedPoints[i + 1];
      break;
    }
  }

  const [x1, y1] = fovPoint[p1];
  const [x2, y2] = fovPoint[p2];

  const localProgress = p2 - p1 > 0 ? (progress - p1) / (p2 - p1) : 0;

  const currentX = lerp(x1, x2, localProgress);
  const currentY = lerp(y1, y2, localProgress);

  if (debug) {
    return (
      <HtmlControlsDebug
        initialX={currentX}
        initialY={currentY}
        offsetScale={offsetScale}
        sizeScale={sizeScale}
        {...props}
      >
        {children}
      </HtmlControlsDebug>
    );
  }

  const style = {
    ...props.style,
    transform: `translate(${currentX * offsetScale}px, ${currentY * offsetScale}px) scale(${sizeScale})`,
  };

  return (
    <Html {...props} style={style}>
      {children}
    </Html>
  );
}
