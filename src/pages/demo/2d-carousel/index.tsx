import React, { useEffect, useMemo, useRef, useState } from 'react'
import './style.scss'
import CircleIcon from '@assets/svgs/circle.svg'
import LeftIcon from '@assets/svgs/left.svg'
import RightIcon from '@assets/svgs/right.svg'
import SEO from '@components/seo'
import type { HeadProps } from 'gatsby'

const Carousel2DPage: React.FC = () => {
  const [showArrows, setShowArrows] = useState(true)
  const [showStatus, setShowStatus] = useState(true)
  const [showIndicators, setShowIndicators] = useState(true)
  const [interval, setInterval] = useState(3000)
  const [transitionTime, setTransitionTime] = useState(300)
  const [infiniteLoop, setInfiniteLoop] = useState(true)

  return (
    <div className="carousel-2d-page">
      <Carousel
        showArrows={showArrows}
        showStatus={showStatus}
        showIndicators={showIndicators}
        interval={interval}
        transitionTime={transitionTime}
        infiniteLoop={infiniteLoop}
      >
        <div className="carousel-2d-page__item">
          <img
            src="https://source.unsplash.com/random/?puppy"
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
      <div className="carousel-2d-page__input-form">
        <div className="carousel-2d-page__input">
          <label htmlFor="infinite-loop-input">Infinite Loop</label>
          <input
            type="checkbox"
            id="infinite-loop-input"
            name="infinite-loop"
            checked={infiniteLoop}
            onChange={(e) => setInfiniteLoop(e.target.checked)}
          />
        </div>
        <div className="carousel-2d-page__input">
          <label htmlFor="show-arrows-input">Show Arrows</label>
          <input
            type="checkbox"
            id="show-arrows-input"
            name="show-arrows"
            checked={showArrows}
            onChange={(e) => setShowArrows(e.target.checked)}
          />
        </div>
        <div className="carousel-2d-page__input">
          <label htmlFor="show-status-input">Show Status</label>
          <input
            type="checkbox"
            id="show-status-input"
            name="show-status"
            checked={showStatus}
            onChange={(e) => setShowStatus(e.target.checked)}
          />
        </div>
        <div className="carousel-2d-page__input">
          <label htmlFor="show-indicators-input">Show Indicators</label>
          <input
            type="checkbox"
            id="show-indicators-input"
            name="show-indicators"
            checked={showIndicators}
            onChange={(e) => setShowIndicators(e.target.checked)}
          />
        </div>
        <div className="carousel-2d-page__input">
          <label htmlFor="interval-input">Slide Interval</label>
          <input
            type="range"
            id="interval-input"
            name="interval"
            min="1000"
            max="10000"
            step="1000"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          />
        </div>
        <div className="carousel-2d-page__input">
          <label htmlFor="transition-time-input">Slide Transition Time</label>
          <input
            type="range"
            id="transition-time-input"
            name="interval"
            min="100"
            max="1000"
            step="100"
            value={transitionTime}
            onChange={(e) => setTransitionTime(e.target.value)}
          />
        </div>
      </div>
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
  interval = 3000,
  transitionTime = 300,
  infiniteLoop = true,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(selectedItem) // 현재 선택된 인덱스

  // 슬라이드의 갯수 (children의 길이)
  const length = useMemo(() => {
    return (children as React.ReactNode[]).length
  }, [children])

  // 다음 슬라이드로 이동하는 함수
  const slideNext = function () {
    setIndex((index) => (index + 1 > length - 1 ? 0 : index + 1))
  }

  // 이전 슬라이드로 이동하는 함수
  const slidePrev = function () {
    setIndex((index) => (index - 1 < 0 ? length - 1 : index - 1))
  }

  // 자동 플레이를 위한 인터벌 함수
  useEffect(() => {
    if (!autoPlay) return // 자동플레이가 아닐 경우, 실행 안함

    const container = containerRef.current
    const frame = frameRef.current

    if (
      !(container instanceof HTMLDivElement) ||
      !(frame instanceof HTMLDivElement)
    )
      return

    let containerWidth = 0 // 부모 컨테이너 너비

    // 부모 컨테이너 너비 설정 & 프레임 초기 위치 설정 (화면 리사이즈마다 실행)
    const init = function () {
      containerWidth = container.offsetWidth
      frame.style.transform = `translateX(-${containerWidth * index}px)`
    }

    // 슬라이드 메인 함수
    const slide = function () {
      let tmp_index = index + 1
      if (tmp_index > length - 1) {
        // 마지막 슬라이드일 경우,
        if (!infiniteLoop) {
          // 무한 반복이 아니면 종료
          clearInterval(intervalId)
          return
        }
        tmp_index = 0 // 무한 반복이면 다시 처음으로
      }
      frame.style.transform = `translateX(-${containerWidth * tmp_index}px)`
      setIndex(tmp_index)
    }

    init() // 초기화
    const intervalId = setInterval(slide, interval) // 인터벌 등록
    window.addEventListener('resize', init) // 이벤트 리스너

    return () => {
      // 클린업
      clearInterval(intervalId)
      window.removeEventListener('resize', init)
    }
  }, [autoPlay, interval, infiniteLoop, index, length])

  // 모바일 동작을 위한 swipe 이벤트 리스너
  useEffect(() => {
    const container = containerRef.current
    if (!(container instanceof HTMLDivElement)) return

    // 터치 시작 위치
    const touchStartInfo = {
      x: 0,
      y: 0,
    }

    // 터시 시작 시, 터치 시작 위치 기록
    const touchStart = function (event: TouchEvent) {
      const touch = event.touches[0]
      touchStartInfo.x = touch.clientX
      touchStartInfo.y = touch.clientY
    }

    // 터치 종료 시, 터지 종료에 따라 동작
    const touchEnd = function (event: TouchEvent) {
      if (event.touches.length !== 0) return
      const touch = event.changedTouches[event.changedTouches.length - 1] // 마지막 터치 위치
      const touchoffsetX = touch.clientX - touchStartInfo.x
      const touchoffsetY = touch.clientY - touchStartInfo.y

      // 가로로 70px이상 && 세로로 60px 이하 이동 시, 터치로 인식
      const isHorizontalSwipe =
        Math.abs(touchoffsetX) >= 70 && Math.abs(touchoffsetY) <= 30

      if (isHorizontalSwipe) {
        const isSwipeLeft = touchoffsetX < 0
        const nextIndex = isSwipeLeft
          ? index + 1 > length - 1
            ? 0
            : index + 1
          : index - 1 < 0
          ? length - 1
          : index - 1
        setIndex(nextIndex)
      }
    }

    // 이벤트 리스너 달기
    container.addEventListener('touchstart', touchStart)
    container.addEventListener('touchend', touchEnd)

    return () => {
      // 클린업
      container.removeEventListener('touchstart', touchStart)
      container.removeEventListener('touchend', touchEnd)
    }
  }, [length])

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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
// 특정길이의 연속적인 정수 배열을 만드는 방법
// Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]

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
