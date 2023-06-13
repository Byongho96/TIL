import React, { useState, useEffect, useRef } from 'react'
import * as styles from './style.module.scss'

type props = {
  color: 'black' | 'white'
  phrase?: string
  direction?: 'right' | 'left'
  defaultSpeed?: number
}

const Taping: React.FC = ({
  color,
  phrase = 'coming soon',
  direction = 'right',
  defaultSpeed = 1,
}: props) => {
  const [speed, setSpeed] = useState(defaultSpeed)
  const tapeRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const tapeElement = tapeRef.current
    const textElement = textRef.current
    const numDirection = direction === 'right' ? 1 : -1
    let animationId = null
    let position = 0

    // 텍스트 위치 조정
    if (direction === 'right') {
      tapeElement.style.justifyContent = 'flex-end'
    }

    // 텍스트를 이동 시키는 함수
    const moveText = () => {
      if (position > textElement.scrollWidth / 3) {
        textElement.style.transform = `translate3d(0, 0, 0)`
        position = 0
      }
      textElement.style.transform = `translate3d(${
        numDirection * position
      }px, 0, 0)`
    }

    // 애니메이션 실행 함수
    const animate = () => {
      position += speed
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

  // 마우스 hover 시 속도 조절
  const handleMouseEnter = () => {
    setSpeed(defaultSpeed + 10)
  }

  const handleMouseLeave = () => {
    setSpeed(defaultSpeed)
  }

  return (
    <div
      ref={tapeRef}
      className={`${styles.tape} ${styles[color]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <p ref={textRef} className={styles.text}>
        {(phrase + '\u00a0\u00a0\u00a0\u00a0').repeat(30)}
      </p>
    </div>
  )
}

export default Taping
