import React, { useRef, useEffect, useContext } from 'react'
import './style.scss'
import MoonIcon from '@assets/svgs/moon-fill.svg'
import SunIcon from '@assets/svgs/sun-fill.svg'
import { ThemeContext } from '@contexts/theme-context'

const ColorChange: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const colorPicker = useRef<HTMLInputElement>(null)

  // 첫 마운트 시, 메인 컬러 초기화
  useEffect(() => {
    const root = document.querySelector(':root')
    const mainColor = localStorage.getItem('main-color')
    if (mainColor) {
      // localStorage 값이 있을 경우, color picker 색상과 :root의 --main-color 동기화
      root.style.setProperty('--main-color', mainColor)
      colorPicker.current.value = mainColor
    } else {
      // localSotrage 값이 없을 경우, color picker 색상을 :root의 --main-color 값으로 초기화
      colorPicker.current.value = '#ff0000' // @styles/_colors.scss 의  $primary-color
    }
  }, [])

  // 메인 컬러가 변경되면 localStorage에 저장하고, :root의 --main-color도 변경
  const handleColorChange = (e) => {
    const newColor = e.target.value
    localStorage.setItem('main-color', e.target.value)
    document
      .querySelector(':root')
      .style.setProperty('--main-color', e.target.value)
  }

  // 클릭 이벤트 시마다 isDark 변경
  const handleThemeClick = () => {
    toggleTheme()
  }

  return (
    <div className="color-change">
      <input
        ref={colorPicker}
        className="color-change__picker"
        type="color"
        onChange={handleColorChange}
      />
      <div
        className={`color-change__theme ${theme}`}
        onClick={handleThemeClick}
      >
        <div className={`color-change__theme--sun ${theme}`}>
          <SunIcon />
        </div>
        <div className={`color-change__theme--moon ${theme}`}>
          <MoonIcon />
        </div>
      </div>
    </div>
  )
}

export default ColorChange
