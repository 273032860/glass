import { useState } from 'react'
import { useRef } from 'react'
import { useLayoutEffect } from 'react'
import ThreeCavnas from './components/3d/ThreeCavnas'
import FixedUi from './components/ui/FixedUi'
import Timeline from './components/ui/Timeline'
import Lenis from '@/components/Lenis'


function App({
  lenisConfig = true,
}) {
  
  const caption = useRef()
  const [isLoading, setIsLoading] = useState(false)

  

  // 🚀 页面加载时，将滚动位置设置为0
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* 最佳方案：将配置合并到 Lenis 组件 */}
      {lenisConfig && (
        <Lenis 
          root
          syncScrollTrigger={true}
          options={typeof lenisConfig === 'object' ? lenisConfig : {
            duration: 1.4,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
          }} 
        />
      )}
     
      {/* {isLoading && <LoadingScreen setIsLoading={setIsLoading}/>} */}
      <ThreeCavnas/>
      <FixedUi/>
      <Timeline caption={caption}/>
      {/* <NewApp/> */}
    </>
  )
}

export default App
