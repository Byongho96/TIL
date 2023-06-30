import React, { useEffect, useRef } from 'react'
import './style.scss'

type props = {
  color: 'black' | 'white'
  phrase?: string
  direction?: 'right' | 'left'
  speed?: number
}

const Taping: React.FC = ({
  color,
  phrase = 'coming soon',
  direction = 'right',
  speed = 1,
}: props) => {
  const tapeRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const tapeElement = tapeRef.current
    const textElement = textRef.current
    let textDirection = 1
    if (direction === 'right') {
      textElement.style.justifyContent = 'flex-end'
      textDirection = 1
    } else {
      textElement.style.justifyContent = 'flex-start'
      textDirection = -1
    }
    let animationId = null
    let position = 0

    // 텍스트를 이동 시키는 함수
    const moveText = () => {
      position += speed
      if (position > textElement.scrollWidth / 3) {
        textElement.style.transform = `translate3d(0, 0, 0)`
        position = 0
      }
      textElement.style.transform = `translate3d(${
        textDirection * position
      }px, 0, 0)`
    }

    // 애니메이션 실행 함수
    const animate = () => {
      moveText()
      animationId = window.requestAnimationFrame(animate) // 희한하게 정의되기 전에 쓰네?
    }

    // 애니메이션 실행
    animate()

    // 애니메이션 clear
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [speed])

  return (
    <div ref={tapeRef} className={`tape ${color}`}>
      <p ref={textRef} className="tape__text">
        {'start' + (phrase + '\u00a0\u00a0\u00a0\u00a0').repeat(30)}
      </p>
    </div>
  )
}

export default Taping
