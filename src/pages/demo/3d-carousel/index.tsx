import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CircleIcon from '@assets/svgs/circle.svg'
import LeftIcon from '@assets/svgs/left.svg'
import RightIcon from '@assets/svgs/right.svg'
import './style.scss'

const Carousel3DPage: React.FC = () => {
  const [showArrows, setShowArrows] = useState(true)
  const [showIndicators, setShowIndicators] = useState(true)
  const [interval, setInterval] = useState(3000)
  const [transitionTime, setTransitionTime] = useState(300)
  const [infiniteLoop, setInfiniteLoop] = useState(true)

  return (
    <div className="carousel-3d-page">
      <Carousel3D
        showArrows={showArrows}
        showIndicators={showIndicators}
        interval={interval}
        transitionTime={transitionTime}
        infiniteLoop={infiniteLoop}
      >
        <img src="https://source.unsplash.com/random/?puppy" alt="unsplash-1" />
        <img
          src="https://source.unsplash.com/random/?mountain"
          alt="unsplash-2"
        />
        <img src="https://source.unsplash.com/random/?dog" alt="unsplash-3" />
        <img src="https://source.unsplash.com/random/?river" alt="unsplash-4" />
        <img src="https://source.unsplash.com/random/?cat" alt="unsplash-5" />
        <img src="https://source.unsplash.com/random/?ocean" alt="unsplash-6" />
      </Carousel3D>
      <div className="carousel-3d-page__input-form">
        <div className="carousel-3d-page__input">
          <label htmlFor="infinite-loop-input">Infinite Loop</label>
          <input
            type="checkbox"
            id="infinite-loop-input"
            name="infinite-loop"
            checked={infiniteLoop}
            onChange={(e) => setInfiniteLoop(e.target.checked)}
          />
        </div>
        <div className="carousel-3d-page__input">
          <label htmlFor="show-arrows-input">Show Arrows</label>
          <input
            type="checkbox"
            id="show-arrows-input"
            name="show-arrows"
            checked={showArrows}
            onChange={(e) => setShowArrows(e.target.checked)}
          />
        </div>
        <div className="carousel-3d-page__input">
          <label htmlFor="show-indicators-input">Show Indicators</label>
          <input
            type="checkbox"
            id="show-indicators-input"
            name="show-indicators"
            checked={showIndicators}
            onChange={(e) => setShowIndicators(e.target.checked)}
          />
        </div>
        <div className="carousel-3d-page__input">
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
        <div className="carousel-3d-page__input">
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

export default Carousel3DPage

type Props = {
  children: React.ReactNode[]
  width?: string
  height?: string
  autoPlay?: boolean
  interval?: number // 슬라이드 시간 간격 (ms)
  transitionTime?: number // 전환 시간(ms)
  infiniteLoop?: boolean // 무한 반복 영부
  startIdx?: number // 처음띄울 요소 인덱스
  showArrows?: boolean // 호버 시 화살표 여부
  showStatus?: boolean //   우측 상단의 현재 요소의 인덱스 표시
  showIndicators?: boolean // 하단의 점 모양으로 선택된 요소 표시
}

const Carousel3D: React.FC<Props> = ({
  children = [],
  width = '400px',
  height = '300px',
  autoPlay = true,
  interval = 30000,
  transitionTime = 300,
  infiniteLoop = true,
  startIdx = 0,
  showArrows = true,
  showIndicators = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(startIdx)

  // number of slide items
  const length = useMemo(() => {
    return children.length
  }, [children])

  // slide to the next item
  const slideNext = useCallback(
    function () {
      setIndex((index) => (index + 1 > length - 1 ? 0 : index + 1))
    },
    [length]
  )

  // slide to the prev item
  const slidePrev = useCallback(
    function () {
      setIndex((index) => (index - 1 < 0 ? length - 1 : index - 1))
    },
    [length]
  )

  // start play animation
  useEffect(() => {
    if (!autoPlay) return // 자동플레이가 아닐 경우, 실행 안함

    // slide
    const slide = function () {
      if (index == length - 1 && !infiniteLoop) {
        intervalId && clearInterval(intervalId)
        return
      }
      slideNext()
    }

    // start the animation
    const intervalId = setInterval(slide, interval)

    return () => {
      intervalId && clearInterval(intervalId)
    }
  }, [autoPlay, interval, infiniteLoop, index, length])

  // css transition
  useEffect(() => {
    const childElements = containerRef.current.children

    let prevIdx = (index - 1) % length
    if (prevIdx < 0) {
      prevIdx += length
    }
    let doublePrevIdx = (index - 2) % length
    if (doublePrevIdx < 0) {
      doublePrevIdx += length
    }
    const nextIdx = (index + 1) % length
    const doubleNextIdx = (index + 2) % length

    if (length < 5) {
      for (let idx = 0; idx < length; idx++) {
        const item = childElements[idx] as HTMLDivElement
        switch (idx) {
          case index:
            item.style.left = `50%`
            item.style.transform = `translate3d(-50%, 0, 0)`
            item.style.opacity = `1`
            break
          case prevIdx:
            item.style.left = `0`
            item.style.transform = `translate3d(0, 0, -200px) rotateY(30deg)`
            item.style.opacity = `1`
            break
          case nextIdx:
            item.style.left = `100%`
            item.style.transform = `translate3d(-100%, 0, -200px) rotateY(-30deg)`
            item.style.opacity = `1`
            break
          default:
            item.style.left = `50%`
            item.style.transform = `translate3d(-50%, 0, -400px)`
            item.style.opacity = `0`
        }
      }
    } else {
      for (let idx = 0; idx < length; idx++) {
        const item = childElements[idx] as HTMLDivElement
        switch (idx) {
          case index:
            item.style.left = `50%`
            item.style.transform = `translate3d(-50%, 0, 0)`
            item.style.opacity = `1`
            break
          case prevIdx:
            item.style.left = `20%`
            item.style.transform = `translate3d(0, 0, -200px) rotateY(30deg)`
            item.style.opacity = `1`
            break
          case doublePrevIdx:
            item.style.left = `0`
            item.style.transform = `translate3d(0, 0, -400px) rotateY(45deg)`
            item.style.opacity = `1`
            break
          case nextIdx:
            item.style.left = `80%`
            item.style.transform = `translate3d(-100%, 0, -200px) rotateY(-30deg)`
            item.style.opacity = `1`
            break
          case doubleNextIdx:
            item.style.left = `100%`
            item.style.transform = `translate3d(-100%, 0, -400px) rotateY(-45deg)`
            item.style.opacity = `1`
            break
          default:
            item.style.left = `50%`
            item.style.transform = `translate3d(-50%, 0, -600px)`
            item.style.opacity = `0`
        }
      }
    }
  }, [index])

  return (
    <div className="carousel-3d" style={{ height: height }}>
      <div className="carousel-3d__frame" ref={containerRef}>
        {children.map((child: React.ReactNode, index: number) => (
          <div
            className="carousel-3d__frame__item"
            key={index}
            style={{
              width: width,
              height: height,
              transition: `all ${transitionTime}ms ease-in-out`,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <div className="carousel-3d__direction left" onClick={slidePrev}>
            <LeftIcon />
          </div>
          <div className="carousel-3d__direction right" onClick={slideNext}>
            <RightIcon />
          </div>
        </>
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
    <ul className="carousel-3d__indicator">
      {Array.from({ length }, (_, idx) => (
        <li
          key={idx}
          className={`carousel-3d__indicator__circle ${
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
