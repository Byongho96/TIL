import React, { useEffect, useRef } from 'react'
import './style.scss'
import throttle from 'lodash/throttle'
import Category from '@components/category'
import ProfileImage from '@components/profile-image'

interface Props {
  defaultCategory: string
  childern: React.ReactNode
}

const CategoryLayout: React.FC<Props> = ({ defaultCategory, children }) => {
  const asideRef = useRef<HTMLElement>(null)
  const asideButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClickToggle = (event: ClickEvent<HTMLElement>) => {
    event.stopPropagation()
    asideRef.current.classList.toggle('active')
    asideButtonRef.current.classList.toggle('active')
    modalRef.current.classList.toggle('active')
  }

  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    const asideEle = asideRef.current

    if (!(asideEle instanceof HTMLElement)) return

    function handleScroll() {
      const navbarHeight: number =
        navbar instanceof HTMLElement
          ? navbar.offsetTop + navbar.offsetHeight
          : 0

      if (window.scrollY > navbarHeight) {
        asideEle.style.setProperty('--position-top', '0px')
        return
      }
      asideEle.style.setProperty(
        '--position-top',
        navbarHeight.toString() + 'px'
      )
    }

    const throttledHandleScroll = throttle(handleScroll, 100) // 연속해서 이벤트 발생 시, 최소 0.1초 간격으로 실행

    window.addEventListener('scroll', throttledHandleScroll)

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  return (
    <div className="category-layout">
      <aside ref={asideRef} className="category-layout__aside">
        <figure className="category-layout__profile">
          <ProfileImage />
        </figure>
        <div className="category-layout__category">
          <Category defaultCategory={defaultCategory} />
        </div>
        <button
          ref={asideButtonRef}
          className="category-layout__button"
          onClick={handleClickToggle}
        >
          POSTS
        </button>
      </aside>
      {children}
      <div
        ref={modalRef}
        className="category-layout__modal"
        onClick={handleClickToggle}
      />
    </div>
  )
}

export default CategoryLayout
