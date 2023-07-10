import React, { useEffect, useRef } from 'react'
import './style.scss'
import SEO from '@components/seo'
import type { HeadProps } from 'gatsby'

const ScrollInfiniteTapePage: React.FC = () => {
  return (
    <div className="scroll-infinite-tape-page">
      <ScrollInfiniteTape
        text="Orange is the New Black"
        fontColor="black"
        tapeColor="orange"
        isRight={false}
        rotationDeg={5}
      />
      <ScrollInfiniteTape
        text="Easy Peasy Lemon Squeezy"
        fontColor="ivory"
        tapeColor="gold"
        rotationDeg={10}
      />
      <ScrollInfiniteTape
        text="Have a good one"
        fontColor="white"
        tapeColor="skyblue"
        isRight={false}
        rotationDeg={-12}
      />
      <ScrollInfiniteTape
        text="Super Green"
        fontColor="beige"
        tapeColor="green"
        rotationDeg={5}
      />
      <ScrollInfiniteTape
        text="Friday Night"
        fontColor="pink"
        tapeColor="black"
        isRight={false}
        rotationDeg={-3}
      />
    </div>
  )
}

export default ScrollInfiniteTapePage

export const Head = ({ location }: HeadProps) => (
  <SEO
    title="무한 텍스트 스크롤 애니메이션"
    decription="무한 텍스트 스크롤 예시 화면을 확인해볼 수 있습니다."
    pathname={location.pathname}
  />
)

type Props = {
  text?: string
  fontColor?: string
  tapeColor?: string
  isRight?: boolean
  rotationDeg?: number
}

const ScrollInfiniteTape: React.FC = ({
  text = 'Lorem ipsum',
  fontColor = 'black',
  tapeColor = 'yellow',
  isRight = true,
  rotationDeg = 0,
}: Props) => {
  const tapeRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const position = useRef(0) // 중간에 Prop이 바뀌더라도, position 유지하기 위해 밖에 선언

  useEffect(() => {
    const tapeElement = tapeRef.current
    const textElement = textRef.current

    if (
      !(tapeElement instanceof HTMLDivElement) ||
      !(textElement instanceof HTMLParagraphElement)
    )
      return

    // 텍스트가 흐르는 방향을 설정
    let textDirection = 1
    if (isRight) {
      tapeElement.style.justifyContent = 'flex-end'
    } else {
      tapeElement.style.justifyContent = 'flex-start'
      textDirection = -1
    }

    // 텍스트를 이동 시키는 함수
    const moveText = function () {
      position.current += 1
      // 반만큼 이동 했을 때, 다시 원위치로 복귀하여 무한스크롤
      if (position.current > textElement.scrollWidth / 2) {
        textElement.style.transform = `translateX(0)`
        position.current = 0
      }
      textElement.style.transform = `translateX(${
        textDirection * position.current
      }px)`
    }

    // 애니메이션 실행 함수
    let animationId: number = null
    const animate = function () {
      moveText()
      animationId = window.requestAnimationFrame(animate) // 희한하게 정의되기 전에 쓰네?
    }

    // 애니메이션 실행
    animate()

    // 스크롤 함수
    const speedUp = function () {
      position.current += 10
    }
    window.addEventListener('scroll', speedUp)

    // 크린업
    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('scroll', speedUp)
    }
  }, [isRight])

  return (
    <div
      ref={tapeRef}
      className="scroll-infinite-tape__tape"
      style={{
        backgroundColor: tapeColor,
        transform: `rotate(${rotationDeg}deg) translateX(-10%)`,
      }}
    >
      <p
        ref={textRef}
        className="scroll-infinite-tape__text"
        style={{ color: fontColor }}
      >
        {(text + '\u00a0\u00a0\u00a0\u00a0').repeat(20)}
      </p>
    </div>
  )
}
