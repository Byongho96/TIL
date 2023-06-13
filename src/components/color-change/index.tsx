import React, { useState, useEffect, useContext } from 'react'
import * as styles from './style.module.scss'
import SunIcon from '@assets/images/sun-fill.svg'
import MoonIcon from '@assets/images/moon-fill.svg'
import { ThemeContext } from '@contexts/theme-context'

const ColorChange: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  // 1. 컬러 picker
  // 1.1. localStorage에 저장된 --main-color가 있으면 :root element의 --main-color를 변경
  // 1.2. :root element의 --main-color를 컬러 picker의 value로 설정
  useEffect(() => {
    const root = document.querySelector(':root')
    let mainColor = localStorage.getItem('main-color')
    if (mainColor) {
      root.style.setProperty('--main-color', mainColor)
    } else {
      mainColor = getComputedStyle(root).getPropertyValue('--main-color')
    }
    document.querySelector('#color-picker').value = mainColor
  }, [])

  // 1.3.컬러 picker에서 컬러를 선택하면 :root element의 --main-color를 변경
  // 1.4. localStorage에 --main-color 저장
  const handleChange = (e) => {
    const root = document.querySelector(':root')
    root.style.setProperty('--main-color', e.target.value)
    localStorage.setItem('main-color', e.target.value)
  }

  // 2.2. 클릭 이벤트 시마다 isDark 변경
  const handleClick = () => {
    toggleTheme()
  }

  return (
    <div className={styles.container}>
      <input
        id="color-picker"
        className={styles.colorPicker}
        type="color"
        onChange={handleChange}
      />
      <div className={`${styles.theme} ${styles[theme]}`} onClick={handleClick}>
        <div className={`${styles.sun} ${styles[theme]}`}>
          <SunIcon />
        </div>
        <div className={`${styles.moon} ${styles[theme]}`}>
          <MoonIcon />
        </div>
      </div>
    </div>
  )
}

export default ColorChange
