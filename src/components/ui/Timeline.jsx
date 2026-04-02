import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Function from './Timeline/Function';

gsap.registerPlugin(ScrollTrigger);

const Timeline = () => {
  return (
    <div className="relative z-20 pointer-events-none h-[1000vh]">
      <div className="page-2 absolute  top-[100%] left-0 size-full ">
        <Function />
        <div className="h-screen relative">
          <div className="absolute left-1/2 top-3/4 -translate-x-1/2">
            <h1 className="text-[#84eb62] text-bold  text-7xl   ">联系方式</h1>
            <div className="flex-center gap-4 ">
              <img src="/wechat-logo.svg" alt="weixin" className="w-28 h-auto" />
              <h1 className="text-[#84eb62] text-bold text-7xl    ">273032860</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Timeline;
