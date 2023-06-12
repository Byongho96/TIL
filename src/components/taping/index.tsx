import React, { useEffect, useRef } from 'react'
import * as styles from './style.module.scss'

type props = {
  color: 'black' | 'white'
  phrase?: string
  direction?: 'right' | 'left'
}

const Taping: React.FC = ({
  color,
  phrase = 'coming soon',
  direction = 'right',
}: props) => {
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
      position++
      moveText()
      animationId = window.requestAnimationFrame(animate)
    }

    // 스크롤 발생 시, speed 조절
    const scrollHandler = () => {
      position += 15
    }

    // 스크롤 이벤트, 애니메이션 실행
    window.addEventListener('scroll', scrollHandler)
    animate()

    return () => {
      // 스크롤 이벤트, 애니메이션 clear
      window.removeEventListener('scroll', scrollHandler)
      window.cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div ref={tapeRef} className={`${styles.tape} ${styles[color]}`}>
      <p ref={textRef} className={styles.text}>
        {(phrase + '\u00a0\u00a0\u00a0\u00a0').repeat(30)}
      </p>
    </div>
  )
}

export default Taping
