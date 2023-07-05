import React, { useEffect, useRef } from 'react'
import './style.scss'
import Category from '@components/category'
import ProfileImage from '@components/profile-image'

const CategoryLayout = ({ defaultCategory, children }) => {
  const asideRef = useRef<HTMLElement>(null)
  const asideButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClickToggle = (event) => {
    event.stopPropagation()
    asideRef.current.classList.toggle('active')
    asideButtonRef.current.classList.toggle('active')
    modalRef.current.classList.toggle('active')
  }

  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    const asideEle = asideRef.current

    function handleScroll() {
      const navbarHeight = navbar.offsetTop + navbar.offsetHeight
      if (window.scrollY > navbarHeight) {
        asideEle.style.setProperty('--position-top', '0px')
        return
      }
      asideEle.style.setProperty(
        '--position-top',
        navbarHeight.toString() + 'px'
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
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
    </>
  )
}

export default CategoryLayout
