import React, { useState, useEffect } from 'react'
import * as styles from './style.module.scss'
import SunIcon from '@asset/images/sun-fill.svg'
import MoonIcon from '@asset/images/moon-fill.svg'

const ColorChange: React.FC = () => {
  const [theme, setTheme] = useState('light')
  const root = document.querySelector(':root')

  // 1. 컬러 picker
  // 1.1. localStorage에 저장된 --main-color가 있으면 :root element의 --main-color를 변경
  // 1.2. :root element의 --main-color를 컬러 picker의 value로 설정
  useEffect(() => {
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
    root.style.setProperty('--main-color', e.target.value)
    localStorage.setItem('main-color', e.target.value)
  }

  // 2. 다크모드
  // 2.1. 시스템의 컬러 모드(prefers-color-scheme) 가 변경될 때마다 isDark 병경
  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
    const toggleDark = (e) => {
      setTheme(e.matches ? 'dark' : 'light')
    }

    mediaQueryList.addEventListener('change', toggleDark)
    return () => {
      mediaQueryList.removeEventListener('change', toggleDark)
    }
  }, [])

  // 2.2. 클릭 이벤트 시마다 isDark 변경
  const handleClick = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
  }

  // 2.3. isDark 값에 따라 :root element의 classList에 dark 추가/제거
  useEffect(() => {
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className={styles.container}>
      <input
        id="color-picker"
        className={styles.colorPicker}
        type="color"
        onChange={handleChange}
      />
      <div className={`${styles.theme} ${styles[theme]}`} onClick={handleClick}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </div>
    </div>
  )
}

export default ColorChange
