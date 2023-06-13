import React, { useState, useEffect, createContext } from 'react'

interface Props {
  children: React.ReactNode
}

// Context 생성
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
})

// Context API로 theme과 toggleTheme을 하위 컴포넌트에 내려줌
export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light'
    })
  }
  console.log('theme1', theme, toggleTheme)

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

  // 2.3. theme 값에 따라 :root element의 classList에 dark 추가/제거
  useEffect(() => {
    const root = document.querySelector(':root')
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
