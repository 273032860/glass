import { useRef, useEffect, useState, useMemo } from 'react';

export default function AnimatedSvgPath({
  className,
  progress,
  animationRange = [9.1, 10, 13, 14],
}) {
  const pathRef = useRef(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      setLength(pathLength);
    }
  }, []);

  const dashOffset = useMemo(() => {
    if (!length) return 0;

    const [startGrow, endGrow, startShrink, endShrink] = animationRange;

    // 1. 完全隐藏（开始前 / 结束后）
    if (progress < startGrow || progress > endShrink) {
      return length;
    }

    // 2. 生长阶段
    if (progress >= startGrow && progress <= endGrow) {
      const t = (progress - startGrow) / (endGrow - startGrow);
      return length * (1 - t);
    }

    // 3. 保持完整显示
    if (progress > endGrow && progress < startShrink) {
      return 0;
    }

    // 4. 收缩阶段
    if (progress >= startShrink && progress <= endShrink) {
      const t = (progress - startShrink) / (endShrink - startShrink);
      return length * t;
    }

    return length;
  }, [progress, length, animationRange]);

  const pathStyle = {
    strokeDasharray: length,
    strokeDashoffset: dashOffset,
  };

  return (
    <div className={className}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 189 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M0.25 0.433014L67.8 39.433H188.25"
          stroke="white"
          style={pathStyle}
        />
      </svg>
    </div>
  );
}
