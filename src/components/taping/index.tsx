import React, { useEffect, useRef } from 'react'
import './style.scss'

type props = {
  color: 'black' | 'white'
  phrase: string
  direction?: 'right' | 'left'
  rotationDeg?: number
  speed?: number
}

const Taping: React.FC = ({
  color,
  phrase,
  direction = 'right',
  rotationDeg = 0,
  speed = 1,
}: props) => {
  const tapeRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const position = useRef(0)

  useEffect(() => {
    const tapeElement = tapeRef.current
    const textElement = textRef.current

    if (
      !(tapeElement instanceof HTMLDivElement) ||
      !(textElement instanceof HTMLSpanElement)
    )
      return

    // 텍스트가 흐르는 방향을 설정
    let textDirection = 1
    if (direction === 'right') {
      tapeElement.style.justifyContent = 'flex-end'
    } else {
      tapeElement.style.justifyContent = 'flex-start'
      textDirection = -1
    }

    // 테이프 각도 회전
    tapeElement.style.setProperty('--rotate-deg', `${rotationDeg}deg`)

    // 텍스트를 이동 시키는 함수
    const moveText = () => {
      position.current += speed
      if (position.current > textElement.scrollWidth / 2) {
        textElement.style.transform = `translateX(0)`
        position.current = 0
      }
      textElement.style.transform = `translateX(${
        textDirection * position.current
      }px)`
    }

    let animationId: number = null
    // 애니메이션 실행 함수
    const animate = () => {
      moveText()
      animationId = window.requestAnimationFrame(animate) // 희한하게 정의되기 전에 쓰네?
    }

    // 애니메이션 실행
    animate()

    return () => {
      // 애니메이션 clear
      window.cancelAnimationFrame(animationId)
    }
  }, [speed, direction, rotationDeg])

  return (
    <div ref={tapeRef} className={`tape ${color}`}>
      <span ref={textRef} className="tape__text">
        {(phrase + '\u00a0\u00a0\u00a0\u00a0').repeat(20)}
      </span>
    </div>
  )
}

export default Taping
