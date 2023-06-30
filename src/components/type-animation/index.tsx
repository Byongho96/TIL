import React, { useRef, useEffect } from 'react'
import './style.scss'

type Props = {
  phrases: string[] // 순서대로 타이핑 할 문구 리스트
  speed?: number // 타이핑 속도
  style?: object // 인라인 스타일 객체
  pause?: number // 한 개의 텍스트가 완성되고, 다음 텍스트가 타이핑 되기 전 대기시간
  isInfinite?: boolean // 타이핑 무한 반복 여부
}

const TypeAnimation: React.FC<Props> = ({
  phrases,
  speed = 5,
  style = {},
  pause = 2000, // 기본 대기 시간 2초
  isInfinite = false,
}) => {
  const textElementRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const textElement = textElementRef.current // 타이핑을 입력한 타겟 Element

    if (!textElement) return

    textElement.textContent = ''

    let phraseIdx = 0 // 현재 타이핑하는 문구의 인덱스
    let charIdx = 0 // 현재 타이핑하는 글자 인덱스
    let interval = null // setInterval을 담을 변수

    // 2. 타이핑 메인 함수
    function typeText() {
      textElement.style.setProperty('--cursor-opacity', 1) // 타이핑 하는 동안은 커서 깜빡이지 않도록
      const currentPhrase = phrases[phraseIdx] // 현재 타이핑하는 문구

      // 현재 문구 타이핑이 안 끝났을 경우
      if (charIdx < currentPhrase.length) {
        textElement.textContent += currentPhrase[charIdx++] // innerText 대신 textContent 사용해야 공백을 담을 수 있음
        return
      }
      // 현재 문구가 마지막 문구가 아닐 경우
      if (phraseIdx < phrases.length - 1) {
        phraseIdx++ // 다음 문구로 이동
        charIdx = 0 // 첫 번째 글자로 이동
        retypeAfterPause()
        return
      }
      // 무한 반복이 설정되어 있을 경우
      if (isInfinite) {
        phraseIdx = 0 // 처음 문구로 이동
        charIdx = 0 // 첫 번재 글자로 이동
        retypeAfterPause()
        return
      }
      // 타이핑 종료
      textElement.style.setProperty('--cursor-opacity', 0) // 타이핑 종료 후 커서 깜빡이도록
      interval && clearInterval(interval)
    }

    // 3. 일시 정지 후, 문구 초기화한 뒤 타이핑 재시작하는 함수
    function retypeAfterPause() {
      textElement.style.setProperty('--cursor-opacity', 0) // 이리 정지하는 동안 커서 깜빡이도록
      interval && clearInterval(interval) // 기존 setInterval 제거

      // pause 이 후, setInterval 재시작
      setTimeout(() => {
        textElement.innerText = '' // 문구 초기화
        interval = setInterval(typeText, 1000 / speed)
      }, pause)
    }

    // 1. setInterval로 타이핑 시작
    interval = setInterval(typeText, 1000 / speed)

    // clear 함수
    return () => {
      console.log('interval', interval)
      interval && clearInterval(interval)
    }
  }, [phrases, speed, pause, isInfinite])

  return (
    <span ref={textElementRef} className="type-animation" style={style}></span>
  )
}

export default TypeAnimation
