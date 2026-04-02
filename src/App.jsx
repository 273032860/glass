import Lenis from './components/Lenis';
import FixedUi from './components/ui/FixedUi';
import Timeline from './components/ui/Timeline';
import ThreeCavnas from './components/3d/ThreeCavnas';
import Loading from './components/ui/Loading';
import { useState } from 'react';

function App({ lenisConfig = true }) {
  const [isStart, setStart] = useState(false);
  return (
    <>
      {lenisConfig && (
        <Lenis
          root
          syncScrollTrigger={true}
          options={
            typeof lenisConfig === 'object'
              ? lenisConfig
              : {
                  duration: 1.4,
                }
          }
        />
      )}
      <Loading setStart={setStart} />
      <div className="relative">
        <FixedUi isStart={isStart} />
        <ThreeCavnas isStart={isStart} />
        <Timeline />
      </div>
    </>
  );
}

export default App;
