import { Box } from "@react-three/drei"
import { useRef } from 'react'
import { mapProgress } from '../../utils/progress'
import { useLenis } from "lenis/react"

const ModelsBox = () => { 
  const boxRef = useRef(null)
  useLenis((lenis) => {
    const progress = (lenis.progress || 0)
    
    const mappedProgress = mapProgress(progress, 0.5, 0.8)
    
    
    if(boxRef.current){
      boxRef.current.position.y = mappedProgress * 10
    }
  })
  return (
    <>
     <Box ref={boxRef}/>
    </>
  )
}
export default ModelsBox