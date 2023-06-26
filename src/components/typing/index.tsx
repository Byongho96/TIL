import React, { useEffect, useRef } from 'react'
import * as styles from './style.module.scss'

type Props = {
  phrases: string[]
  speed: number
  pause?: number
  isInfinite?: boolean
}

const Typing: React.FC<Props> = ({
  phrases,
  speed,
  pause = 2000,
  isInfinite = false,
}) => {
  const typingRef = useRef(null)

  useEffect(() => {
    let phraseIdx = 0
    let stringIdx = 0
    const textElement = typingRef.current

    const typing = () => {
      const phrase = phrases[phraseIdx]
      // 1. 문자가 아직 끝나지 않은 경우
      if (stringIdx < phrase.length) {
        textElement.textContent += phrase[stringIdx++]
        return
      }

      // 2. 끝난 현재 문구가 마지막 문구가 아닌 경우
      if (phraseIdx < phrases.length - 1) {
        stringIdx = 0
        phraseIdx++
        retypeAfter(pause)
        return
      }

      // 3. 마지막 문구인데 무한 반복인 경우
      if (isInfinite) {
        stringIdx = 0
        phraseIdx = 0
        retypeAfter(pause)
        return
      }

      // 4.종료
      clearInterval(interval)
    }

    // 다시 타이핑하는 함수
    const retypeAfter = (pause) => {
      clearInterval(interval)
      setTimeout(() => {
        textElement.textContent = ''
        interval = setInterval(typing, 1000 / speed)
      }, pause)
    }

    let interval = setInterval(typing, 1000 / speed)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return <span ref={typingRef} className={styles.typing}></span>
}

export default Typing
