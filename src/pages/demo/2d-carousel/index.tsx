import React, { useEffect, useRef, useState, Children } from 'react'
import './style.scss'
import CircleIcon from '@assets/svgs/circle.svg'
import LeftIcon from '@assets/svgs/left.svg'
import RightIcon from '@assets/svgs/right.svg'
import SEO from '@components/seo'
import type { HeadProps } from 'gatsby'

const Carousel2DPage: React.FC = () => {
  return (
    <div className="carousel-2d-page">
      <Carousel>
        <div className="carousel-2d-page__item">
          <img
            src="https://source.unsplash.com/random/?programming"
            alt="unsplash-1"
          />
        </div>
        <div className="carousel-2d-page__item">
          <img
            src="https://source.unsplash.com/random/?mountain"
            alt="unsplash-2"
          />
        </div>
        <div className="carousel-2d-page__item">
          <img
            src="https://source.unsplash.com/random/?river"
            alt="unsplash-3"
          />
        </div>
      </Carousel>
    </div>
  )
}

export default Carousel2DPage

export const Head = ({ location }: HeadProps) => (
  <SEO
    title="2D 캐러셀 애니메이션"
    decription="2D 캐러셀 애니메이션 예시 화면을 확인해볼 수 있습니다."
    pathname={location.pathname}
  />
)

type Props = {
  autoPlay?: boolean // 자동 재생 여부
  width?: string // 캐러셀 너비
  showArrows?: boolean // 호버 시 화살표 여부
  showStatus?: boolean //   우측 상단의 현재 요소의 인덱스 표시
  showIndicators?: boolean // 하단의 점 모양으로 선택된 요소 표시
  selectedItem?: number // 처음띄울 요소 인덱스
  interval?: number // 슬라이드 시간 간격 (ms)
  transitionTime?: number // 전환 시간(ms)
  infiniteLoop?: boolean // 무한 반복 영부
  children?: React.ReactNode
}

const Carousel: React.FC<Props> = ({
  autoPlay = true,
  width = '100%',
  showArrows = true,
  showStatus = true,
  showIndicators = true,
  selectedItem = 0,
  interval = 2000,
  transitionTime = 300,
  infiniteLoop = true,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)

  const [index, setIndex] = useState(selectedItem)
  const length = Children.count(children)

  const slideNext = function () {
    setIndex((index) => (index + 1 > length - 1 ? 0 : index + 1))
  }

  const slidePrev = function () {
    setIndex((index) => (index - 1 < 0 ? length - 1 : index - 1))
  }

  // 인터벌
  useEffect(() => {
    const container = containerRef.current
    const frame = frameRef.current

    if (
      !(container instanceof HTMLDivElement) ||
      !(frame instanceof HTMLDivElement)
    )
      return

    let containerWidth = 0

    const init = function () {
      containerWidth = container.offsetWidth
      frame.style.transform = `translateX(-${containerWidth * index}px)`
    }

    const slide = function () {
      let tmp_index = index + 1
      if (tmp_index > length - 1) {
        if (!infiniteLoop) clearInterval(intervalId)
        else tmp_index = 0
      }
      frame.style.transform = `translateX(-${containerWidth * tmp_index}px)`
      setIndex(tmp_index)
    }

    autoPlay && init()
    const intervalId = setInterval(slide, interval)
    window.addEventListener('resize', init)

    return () => {
      // clear 함수
      clearInterval(intervalId)
      window.removeEventListener('resize', init)
    }
  }, [autoPlay, interval, infiniteLoop, index])

  // swipe 이벤트 리스너
  useEffect(() => {
    const container = containerRef.current
    if (!(container instanceof HTMLDivElement)) return

    const touchStartInfo = {
      x: 0,
      y: 0,
    }

    const touchStart = function (event: TouchEvent) {
      const touch = event.touches[0]
      touchStartInfo.x = touch.clientX
      touchStartInfo.y = touch.clientY
    }

    const touchEnd = function (event: TouchEvent) {
      if (event.touches.length === 0) {
        const touch = event.changedTouches[event.changedTouches.length - 1]

        const touchoffsetX = touch.clientX - touchStartInfo.x
        const touchoffsetY = touch.clientY - touchStartInfo.y

        if (Math.abs(touchoffsetX) >= 80 && Math.abs(touchoffsetY) <= 10) {
          if (touchoffsetX < 0)
            setIndex((index) => (index - 1 < 0 ? length - 1 : index - 1))
          else setIndex((index) => (index + 1 > length - 1 ? 0 : index + 1))
        }
      }
    }

    container.addEventListener('touchstart', touchStart)
    container.addEventListener('touchend', touchEnd)

    return () => {
      container.removeEventListener('touchstart', touchStart)
      container.removeEventListener('touchend', touchEnd)
    }
  }, [])

  return (
    <div className="carousel-2d" ref={containerRef} style={{ width: width }}>
      <div
        className="carousel-2d__frame"
        ref={frameRef}
        style={{ transition: `transform ${transitionTime}ms ease-in-out` }}
      >
        {children}
      </div>
      {showArrows && (
        <>
          <div className="carousel-2d__left" onClick={slidePrev}>
            <LeftIcon />
          </div>
          <div className="carousel-2d__right" onClick={slideNext}>
            <RightIcon />
          </div>
        </>
      )}
      {showStatus && (
        <div className="carousel-2d__status">{`${index + 1} / ${length}`}</div>
      )}
      {showIndicators && (
        <CarouselIndicator
          length={length}
          selectedIdx={index}
          onClick={(idx: number) => setIndex(idx)}
        />
      )}
    </div>
  )
}

interface CarouselIndicatorProps {
  length: number
  selectedIdx: number
  onClick: (n: number) => void
}

const CarouselIndicator: React.FC<CarouselIndicatorProps> = ({
  length,
  selectedIdx,
  onClick,
}) => {
  return (
    <ul className="carousel-2d__indicator">
      {Array.from({ length }, (_, idx) => (
        <li
          key={idx}
          className={`carousel-2d__indicator__circle ${
            idx === selectedIdx ? 'active' : ''
          }`}
          onClick={() => onClick(idx)}
        >
          <CircleIcon />
        </li>
      ))}
    </ul>
  )
}
