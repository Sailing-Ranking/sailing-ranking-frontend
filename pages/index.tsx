// @ts-nocheck
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'

const Home: NextPage = () => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)

  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    contextRef.current = context;
  }, [])

  const elementWidthScale = () => {
    const canvas = canvasRef.current
    return canvas.offsetWidth === 0 ? 0 : (canvas.width / canvas.offsetWidth);
  }

  const elementHeightScale = () => {
    const canvas = canvasRef.current
    return canvas.offsetWidth === 0 ? 0 : (canvas.height / canvas.offsetHeight);
  }

  const startDrawing = ({ nativeEvent }) => {
    let scaleX = elementWidthScale();
    let scaleY = elementHeightScale();
    
    const { offsetX, offsetY } = nativeEvent

    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX * scaleX, offsetY * scaleY)

    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()

    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return

    let scaleX = elementWidthScale();
    let scaleY = elementHeightScale();

    const { offsetX, offsetY } = nativeEvent

    contextRef.current.lineTo(offsetX * scaleX, offsetY * scaleY)
    contextRef.current.stroke()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    const img =  canvas.toDataURL("image/jpg")

    const context = canvas.getContext("2d")
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }


  return (
    <div className="w-auto h-screen p-6">
      
      <canvas
        className="border-8 p-2 w-full h-4/6 mx-auto"
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />

      <button className="mt-5 w-full bg-blue-700 rounded-md p-6 text-white" onClick={clearCanvas}>clear</button>
    </div>

  )
}

export default Home
