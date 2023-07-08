import React, { useEffect, useRef } from 'react'
import './style.scss'
import SEO from '@components/seo'

// https://velog.io/@moonelysian/scroll-client-offset-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B0\
// https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

const Scroll3DCardPage: React.FC = () => {
  return (
    <Scroll3DCard
      backgroundText="My Bucket List"
      cardTexts={[
        'Sky Diving',
        'Korean Airline First Class',
        'Milky Way',
        'Nobel Prize',
      ]}
      primaryColor="#e9e6d5"
      secondaryColor="#2f2c25"
    />
  )
}

export default Scroll3DCardPage

export const Head = ({ location }) => (
  <SEO
    title="스크롤 3D 카드 플립 애니메이션"
    decription="스크롤 3D 카드 플립 애니메이션을 확인해볼 수 있습니다."
    pathname={location.pathname}
  />
)

type Props = {
  backgroundText?: string
  cardTexts?: string[]
  primaryColor?: string
  secondaryColor?: sgring
}

const Scroll3DCard: React.FC<Props> = ({
  backgroundText = 'Type Your Text',
  cardTexts = ['Text1', 'Text2', 'Text3', 'Text4'],
  primaryColor = 'beige',
  secondaryColor = 'black',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  // cardTexts 배열 4개 제한
  useEffect(() => {
    const container = containerRef.current
    const length = cardTexts.length

    // 4개를 초과할 경우 에러 발생
    if (length > 4) {
      throw new Error(
        'cardTexts length is out of range, It should be less than 5'
      )
    }

    // 카드 갯수에 따라 동적으로 gap 설정
    switch (length) {
      case 1:
        container.style.setProperty('--card-gap', '0')
        break
      case 2:
        container.style.setProperty('--card-gap', '20%')
        break
      case 3:
        container.style.setProperty('--card-gap', '11%')
        break
      case 4:
        container.style.setProperty('--card-gap', '1.33%')
        break
    }
  }, [cardTexts.length])

  // 메인컬러, 서브컬러 할당
  useEffect(() => {
    const container = containerRef.current
    container.style.setProperty('--primary-color', primaryColor)
    container.style.setProperty('--secondary-color', secondaryColor)
  }, [primaryColor, secondaryColor])

  // 메인 함수
  useEffect(() => {
    const container = containerRef.current // 가장 바깥의 컨테이너, css 변수를 담는 용도
    const background = mainContentRef.current
    const sticky = stickyRef.current
    const cards = sticky.querySelectorAll('.scroll-3d-card__card')
    const length = cards.length

    let start = 0 // 애니메이션 시작 시, 스크롤 위치
    let end = 0 // 애니메이션 끝날 시, 스크롤 위치
    let step = 0 // 애니메이션 구분 최소 단위

    // 초기화 함수, 화면 리사이즈마다 동작
    function init() {
      start = background.offsetTop
      end = background.offsetTop + background.offsetHeight - sticky.offsetHeight
      step = (end - start) / (length * 2)

      // 추가한 커스텀 로직: 네비게이션 바의 크기를 CSS에 전달 -> start화면 높이 조정
      const navbar = document.querySelector('.navbar')
      const navbarHeight = navbar.offsetHeight
      container.style.setProperty(
        '--navbar-height',
        navbarHeight.toString() + 'px'
      )

      // 추가한 커스텀 로직: 푸터 바의 크기를 CSS에 전달 -> end화면 높이 조정
      const footer = document.querySelector('.footer')
      const footerHeight = footer.offsetHeight
      container.style.setProperty(
        '--footer-height',
        footerHeight.toString() + 'px'
      )
    }

    // 애니메이션 함수
    function animate() {
      const scrollTop = window.scrollY
      cards.forEach((card, i) => {
        const movePoint = start + step * i // 카드 이동 시작 시점, 스크롤 위치
        const flipPoint = movePoint + step * length // 카드 플립 시작 시점, 스크롤 위치
        const endPoint = flipPoint + step // 카드 애니메이션 종료 시점, 스크롤 위치

        // 스크롤 위치에 따라 각 카드마다 애니메이션
        if (scrollTop < movePoint) {
          card.style.transform = `
              translateX(100vw) 
              rotateY(180deg)
            `
        } else if (scrollTop < flipPoint) {
          card.style.transform = `
              translateX(${
                100 + ((scrollTop - movePoint) / (endPoint - movePoint)) * -100
              }vw)
              rotateY(180deg)
            `
        } else if (scrollTop < endPoint) {
          card.style.transform = `
              translateX(${
                100 + ((scrollTop - movePoint) / (endPoint - movePoint)) * -100
              }vw)
              rotateY(${
                180 + (-(scrollTop - flipPoint) / (endPoint - flipPoint)) * 180
              }deg)
            `
        } else {
          card.style.transform = `
              translateX(0vw) 
              rotateY(0deg)
            `
        }
      })
    }

    init() // 초기화

    window.addEventListener('scroll', animate)
    window.addEventListener('resize', init)

    return () => {
      window.removeEventListener('scroll', animate)
      window.removeEventListener('resize', init)
    }
  }, [])

  return (
    <div ref={containerRef}>
      <div className="scroll-3d-card__start">Let's Scroll</div>
      <div className="scroll-3d-card__main-content" ref={mainContentRef}>
        <div className="scroll-3d-card--sticky" ref={stickyRef}>
          {backgroundText}
          <div className="scroll-3d-card__card-frame ">
            {cardTexts.map((text) => (
              <div className="scroll-3d-card__card">
                <div className="scroll-3d-card__card--front">{text}</div>
                <div className="scroll-3d-card__card--back"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="scroll-3d-card__end">The End</div>
    </div>
  )
}

class CardFlipOnScroll {
  constructor(background, sticky) {
    this.backgorund = background
    this.sticky = sticky
    this.cards = sticky.querySelectorAll('.scroll-3d-card__card')
    this.length = this.cards.length

    this.start = 0 // 애니메이션 시작 시, 스크롤 위치
    this.end = 0 // 애니메이션 끝날 시, 스크롤  위치
    this.step = 0 // 애니메이션 구분 최소 단위
  }

  // 초기화 함수
  init() {
    this.start = this.background.offsetTop
    this.end =
      this.background.offsetTop +
      this.background.offsetHeight -
      this.sticky.offsetHeight * 1.2
    this.step = (this.end - this.start) / (this.length * 2)
  }

  // 애니메이션 함수
  animate() {
    this.cards.forEach((card, i) => {
      const movePoint = this.start + this.step * i
      const flipPoint = movePoint + this.step * this.length
      const endPoint = flipPoint + this.step

      if (scrollTop < movePoint) {
        card.style.transform = `
            translateX(100vw) 
            rotateY(180deg)
          `
      } else if (scrollTop < flipPoint) {
        card.style.transform = `
            translateX(${
              100 + ((scrollTop - movePoint) / (endPoint - movePoint)) * -100
            }vw)
            rotateY(180deg)
          `
      } else if (scrollTop < endPoint) {
        card.style.transform = `
            translateX(${
              100 + ((scrollTop - movePoint) / (endPoint - movePoint)) * -100
            }vw)
            rotateY(${
              180 + (-(scrollTop - flipPoint) / (endPoint - flipPoint)) * 180
            }deg)
          `
      } else {
        card.style.transform = `
            translateX(0vw) 
            rotateY(0deg)
          `
      }
    })
  }
}