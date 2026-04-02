import { Html } from '@react-three/drei';
import { useEffect, useState } from 'react';

export function FixedHtml({
  children,
  style,
  className,
  as = 'div',

  // 可选项
  follow3D = false, // 是否跟随 3D
  portalTarget, // 自定义 portal（默认 body）
  zIndex = 1000,
}) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (portalTarget) {
      setTarget(portalTarget);
    } else {
      setTarget(document.body);
    }
  }, [portalTarget]);

  if (!target) return null;

  return (
    <Html portal={target} transform={follow3D}>
      {createElementWrapper(
        as,
        {
          className,
          style: {
            position: 'fixed',
            zIndex,
            ...style,
          },
        },
        children
      )}
    </Html>
  );
}

// 简单 wrapper（避免 React.createElement 写一堆）
function createElementWrapper(tag, props, children) {
  const Component = tag;
  return <Component {...props}>{children}</Component>;
}
