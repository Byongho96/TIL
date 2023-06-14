import React, { useEffect, useRef } from 'react'
import * as styles from './style.module.scss'
import UpIcon from '@assets/svgs/up.svg'

type Props = {
  phrase: string
  speed: number
  isInfinite?: boolean
  cursorColor?: string
}

const Typing: React.FC<Props> = ({
  phrase,
  speed,
  isInfinite = false,
  cursorColor = '#000000',
}) => {
  const typingRef = useRef(null)

  useEffect(() => {
    let index = 0
    const textElement = typingRef.current

    const typing = () => {
      textElement.textContent += phrase[index++]
      if (index > phrase.length - 1) {
        if (isInfinite) {
          index = 0
          textElement.textContent = ''
        } else {
          clearInterval(interval)
        }
      }
    }

    const interval = setInterval(typing, 1000 / speed)

    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <span
      ref={typingRef}
      className={styles.typing}
      style={{
        '--cursor-color': cursorColor,
      }}></span>
  )
}

export default Typing
