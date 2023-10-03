import React, { useCallback, useEffect, useRef } from 'react'
import './style.scss'
import Category from '@components/category'
import ProfileImage from '@components/profile-image'

interface Props {
  defaultCategory: string
  childern: React.ReactNode
}

const CategoryLayout: React.FC<Props> = ({ defaultCategory, children }) => {
  const asideRef = useRef<HTMLElement>(null)

  // 포커스 트랩 메인 함수
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const aside = asideRef.current
    if (!aside) return

    const focusableElements = aside.querySelectorAll(`input, a[href]`)
    const inputElement = aside.querySelector(`input`)

    const firstEle = focusableElements[0]
    const lastEle = focusableElements[focusableElements.length - 1]

    if (event.key === 'Tab') {
      if (document.activeElement === lastEle && !event.shiftKey) {
        // eslint-disable-next-line
        firstEle.focus()
        event.preventDefault()
      } else if (document.activeElement === firstEle && event.shiftKey) {
        // eslint-disable-next-line
        lastEle.focus()
        event.preventDefault()
      }
    } else if (event.key === 'Escape') {
      inputElement.checked = false
    }
  }, [])

  // 카테고리 모달창 on/off에 따라 포커스 트랩 토글
  const handleChange = function toggleFocusTrap(event: InputEvent) {
    if (event.target.checked) {
      document.addEventListener('keydown', handleKeyDown)
    } else {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }

  // input(type="checkbox") Enter키로 토글 가능
  useEffect(() => {
    const aside = asideRef.current
    if (!aside) return

    const inputElement = aside.querySelector(`input`)
    if (!inputElement) return

    const handleKeyDown = function toggleWithEnter(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        inputElement.checked = !inputElement.checked
      }
    }

    inputElement.addEventListener('keydown', handleKeyDown)
    return () => {
      inputElement.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className="category-layout">
      {children}
      <aside ref={asideRef}>
        <input
          id="category-layout-modal"
          type="checkbox"
          onChange={handleChange}
        />
        <label htmlFor="category-layout-modal" aria-label="카테고리바 열기">
          POSTS
        </label>
        <label htmlFor="category-layout-modal" aria-label="카테고리바 닫기">
          X
        </label>
        <div className="category-layout__modal-bg" />
        <div className="category-layout__sidebar">
          <div className="category-layout__sidebar__profile">
            <ProfileImage />
          </div>
          <Category defaultCategory={defaultCategory} />
        </div>
      </aside>
    </div>
  )
}

export default CategoryLayout
