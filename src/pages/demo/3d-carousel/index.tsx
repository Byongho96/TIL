import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './style.scss'

const Carousel3DPage: React.FC = () => {
  return (
    <div className="carousel-3d-page">
      <Carousel3D>
        <img src="https://source.unsplash.com/random/?puppy" alt="unsplash-1" />
        <img
          src="https://source.unsplash.com/random/?mountain"
          alt="unsplash-2"
        />
        <img src="https://source.unsplash.com/random/?river" alt="unsplash-3" />
        <img src="https://source.unsplash.com/random/?dog" alt="unsplash-4" />
        <img src="https://source.unsplash.com/random/?cat" alt="unsplash-4" />
      </Carousel3D>
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
  interval = 3000,
  transitionTime = 300,
  infiniteLoop = true,
  startIdx = 0,
  showArrows = true,
  showStatus = true,
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
      slideNext()
    }

    // start the animation
    const intervalId = setInterval(slide, interval)

    return () => {
      clearInterval(intervalId)
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
    <div
      className="carousel-3d-container"
      ref={containerRef}
      style={{ height: height }}
    >
      {children.map((child: React.ReactNode, index: number) => (
        <div
          className="carousel-3d-item"
          key={index}
          style={{ width: width, height: height }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
