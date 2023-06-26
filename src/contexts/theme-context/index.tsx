import React, { useState, useEffect, createContext } from 'react'

interface Props {
  children: React.ReactNode
}

// Context 생성
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: null,
})

// Context API로 theme과 toggleTheme을 하위 컴포넌트에 내려줌
export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light'
    })
  }

  // 1. 다크모드 ('light'에 보수적인 코드)
  // 1.1. localStorage에 저장된 theme이 'dark'이면 theme 변경
  // 1.2. localStorgae에 저장된 theme이 'light'이면 시스템의 컬러 모드(prefers-color-scheme)에 따라 theme 변경
  // 1.3. 시스템의 컬러 모드(prefers-color-scheme) 가 변경될 때마다 theme 변경하는 이벤트 리스너 등록
  useEffect(() => {
    const localTheme = localStorage.getItem('theme')

    if (localTheme === 'dark') {
      setTheme(localTheme)
    } else {
      const systemTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      setTheme(systemTheme ? 'dark' : 'light')
    }

    const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)')
    const toggleDark = (e) => {
      setTheme(e.matches ? 'dark' : 'light')
    }
    mediaQueryList.addEventListener('change', toggleDark)
    return () => {
      mediaQueryList.removeEventListener('change', toggleDark)
    }
  }, [])

  // 1.3. theme이 변경되면 localStorage에 theme 저장
  // 1.4. theme 값에 따라 :root element의 classList에 dark 추가/제거
  useEffect(() => {
    localStorage.setItem('theme', theme)

    const root = document.querySelector(':root')
    if (theme === 'light') {
      root.classList.add('light')
    } else {
      root.classList.remove('light')
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
