import { useState } from 'react'
import { useRef } from 'react'
import { useLayoutEffect } from 'react'
import ThreeCavnas from './components/3d/ThreeCavnas'
import FixedUi from './components/ui/FixedUi'
import Timeline from './components/ui/Timeline'
import { LenisScrollTriggerSync } from './components/scroll-trigger'
import Lenis from '@/components/Lenis'


function App({
  lenis = true,
}) {
  
  const caption = useRef()
  const [isLoading, setIsLoading] = useState(false)

  

  // 🚀 页面加载时，将滚动位置设置为0
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {lenis && <Lenis 
      root 
      options={typeof lenis === 'object' ? lenis : {
        duration: 1.4,
      }} />}
     
      {/* {isLoading && <LoadingScreen setIsLoading={setIsLoading}/>} */}
      <ThreeCavnas/>
      <FixedUi/>
      <Timeline caption={caption}/>
      {/* <NewApp/> */}
    </>
  )
}

export default App
