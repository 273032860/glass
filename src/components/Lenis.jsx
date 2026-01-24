import gsap from 'gsap'
import { useRef } from 'react'
import { useEffect } from 'react'
import { LenisScrollTriggerSync } from './scroll-trigger'
import ReactLenis from 'lenis/react'

const Lenis = ({
  root,
  options,
  syncScrollTrigger = false,
}) => {
  const lenisRef = useRef()

  // 🚀 与gsap集成，gsap 与 lenis 同步 
  useEffect(() => {
      function update(time) {
        lenisRef.current?.lenis?.raf(time * 1000)
      }
    gsap.ticker.add(update)
      return () => gsap.ticker.remove(update)
  }, [])
    
  return (
    <ReactLenis
      ref={lenisRef}
      root={root}
      options={{
        ...options,
        lerp: options?.lerp ?? 0.125,
        autoRaf: false,
        anchors: true,
        autoToggle: true,
      }}
    >
      {syncScrollTrigger && root && <LenisScrollTriggerSync />}
    </ReactLenis>
  )
}

export default Lenis