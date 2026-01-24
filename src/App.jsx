import { useState } from 'react'
import { useRef } from 'react'
import { useEffect, useLayoutEffect } from 'react'
import ReactLenis from 'lenis/react'
import ThreeCavnas from './components/3d/ThreeCavnas'
import gsap from 'gsap'
import FixedUi from './components/ui/FixedUi'
import Timeline from './components/ui/Timeline'
import { LenisScrollTriggerSync } from './components/scroll-trigger'


function App() {
   const lenisRef = useRef()
  const caption = useRef()
  const [isLoading, setIsLoading] = useState(false)

  // 🚀 与gsap集成，gsap 与 lenis 同步 
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    return () => gsap.ticker.remove(update)
  }, [])

  // 🚀 页面加载时，将滚动位置设置为0
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <ReactLenis 
        ref={lenisRef}
        root 
        options={{
        lerp:   0.125,          // 控制平滑度，越小越平滑（0.02-0.2）
        // easing:(t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) , // 自定义缓动函数
        autoRaf: false,
        anchors: true,
        autoToggle: true,
        duration: 2,             // 滚动持续时间（秒）
        // gestureOrientation="vertical" // 手势方向
        // smoothWheel={true}            // 平滑滚轮
        // wheelMultiplier={0.9}           // 滚轮灵敏度
        // infinite:true             // 无限滚动
        // orientation="vertical"        // 滚动方向
      }}
      >
         <LenisScrollTriggerSync/>
      </ReactLenis>
     
      {/* {isLoading && <LoadingScreen setIsLoading={setIsLoading}/>} */}
      <ThreeCavnas/>
      <FixedUi/>
      <Timeline caption={caption}/>
      {/* <NewApp/> */}
    </>
  )
}

export default App
