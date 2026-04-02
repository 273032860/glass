import { useLenis } from 'lenis/react';
import { useState } from 'react';
import { mapProgress } from '../../../utils/progress';

const Ray = () => {
  const [fadeValue, setfadeValue] = useState();
  useLenis((Lenis) => {
    const pr = mapProgress(Lenis.progress, 0, 0.5);
    setfadeValue(1 - pr);
  });
  const rays = [
    { transform: 'rotate(-45deg)', opacity: 0.5 },
    { transform: 'rotate(-35deg)', opacity: 0.3 },
    { transform: 'rotate(-25deg)', opacity: 0.6 },
    { transform: 'rotate(-15deg)', opacity: 0.4 },
    { transform: 'rotate(-5deg)', opacity: 0.8 },
    { transform: 'rotate(5deg)', opacity: 0.7 },
    { transform: 'rotate(15deg)', opacity: 0.5 },
    { transform: 'rotate(25deg)', opacity: 0.6 },
    { transform: 'rotate(35deg)', opacity: 0.3 },
    { transform: 'rotate(45deg)', opacity: 0.5 },
    { transform: 'rotate(-2deg)', opacity: 0.9, height: '130vh' },
    { transform: 'rotate(2deg)', opacity: 0.9, height: '130vh' },
  ];
  return (
    <div
      className="absolute inset-0 overflow-hidden flex justify-center pointer-events-none z-0"
      style={{
        maskImage: `radial-gradient(ellipse at 50% 80%, black 10%, transparent ${80 * fadeValue}%)`,
        WebkitMaskImage: `radial-gradient(ellipse at 50% 80%, black 10%, transparent ${80 * fadeValue}%)`,
        opacity: fadeValue,
      }}
    >
      {rays.map((ray, i) => (
        <div
          key={i}
          className="absolute bottom-[-10%] w-[2px] origin-bottom blur-[2px] bg-gradient-to-t from-[#00FF9D]/80 via-[#00FF9D]/10 to-transparent"
          style={{
            transform: ray.transform,
            opacity: ray.opacity,
            height: ray.height || '120vh',
          }}
        />
      ))}
    </div>
  );
};
export default Ray;
