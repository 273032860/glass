import { useLoader } from '@react-three/fiber';
import { DoubleSide, ShapeGeometry } from 'three/webgpu';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { useMemo } from 'react';

export default function Text2D({
  message = 'Three.js\nSimple text.',
  color = 'white',
  fonturl = 'fon.json',
  ...props
}) {
  const font = useLoader(FontLoader, fonturl);

  const geometry = useMemo(() => {
    const shapes = font.generateShapes(message, 100);
    const geometry = new ShapeGeometry(shapes);
    geometry.computeBoundingBox();
    const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);
    return geometry;
  }, [message, font]);

  return (
    <>
      <mesh geometry={geometry} {...props}>
        <meshBasicMaterial color={color} side={DoubleSide} />
      </mesh>
    </>
  );
}
