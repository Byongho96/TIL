import React, { useRef, useEffect, useContext } from 'react'
import './style.scss'
import MoonIcon from '@assets/svgs/moon-fill.svg'
import SunIcon from '@assets/svgs/sun-fill.svg'
import { ThemeContext } from '@contexts/theme-context'

const ColorChange: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const colorInputRef = useRef<HTMLInputElement>(null)

  // 첫 마운트 시, <type input="color"/> 추가.  이유: 아직 메인컬러가 안정해졋을 때는 아예 UI에 안보이게 하기 위해
  useEffect(() => {
    // input 요소와 기본 속성 생성
    const colorInput = colorInputRef.current
    if (!(colorInput instanceof HTMLInputElement)) return

    // localstorage 값에 따라 컬러 속성 추가
    let primaryColor = localStorage.getItem('main-color')
    if (!primaryColor) {
      primaryColor = '#ff0000'
    }
    colorInput.value = primaryColor

    // onChange 이벤트 핸들러 추가
    colorInput.addEventListener('change', handleColorChange)

    // root엘리먼트 메인 컬러 설정
    const root = document.querySelector(':root') as HTMLElement // 반드시 있는 요소
    root.style.setProperty('--main-color', primaryColor)

    return () => {
      colorInput.removeEventListener('change', handleColorChange)
    }
  }, [])

  // 메인 컬러가 변경되면 localStorage에 저장하고, :root의 --main-color도 변경
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    localStorage.setItem('main-color', newColor)
    const root = document.querySelector(':root') as HTMLElement // 반드시 있는 요소
    root.style.setProperty('--main-color', newColor)
  }

  // 클릭 이벤트 시마다 isDark 변경
  const handleThemeClick = () => {
    toggleTheme()
  }

  return (
    <div className="color-change">
      <input
        id="primary-color-picker"
        ref={colorInputRef}
        className="color-change__picker"
        type="color"
        aria-label="메인 컬러 선택"
        onChange={handleColorChange}
      />
      <button
        className={`color-change__theme ${theme}`}
        onClick={handleThemeClick}
        aria-label={
          theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'
        }
      >
        <div className={`color-change__theme--sun ${theme}`}>
          <SunIcon />
        </div>
        <div className={`color-change__theme--moon ${theme}`}>
          <MoonIcon />
        </div>
      </button>
    </div>
  )
}

export default ColorChange
