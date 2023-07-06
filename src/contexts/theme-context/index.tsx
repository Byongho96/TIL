import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  createContext,
} from 'react'

interface Props {
  children: React.ReactNode
}

interface ThemeContext {
  theme: string
  toggleTheme: () => void
}

// Context 생성
export const ThemeContext = createContext<ThemeContext>({
  theme: 'dark',
  toggleTheme: null,
})

// Context API로 theme과 toggleTheme을 하위 컴포넌트에 내려줌
export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState('') // theme 정의
  const toggleTheme = useCallback(() => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light'
    })
  }, [])

  // 페이지 첫 로딩시 테마 결정
  useEffect(() => {
    const sessionTheme = sessionStorage.getItem('theme')
    if (sessionTheme) {
      setTheme(sessionTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }, [])

  // 페이지 첫 mount 시에는 제외하고, theme 변경 시마다 동작
  const isSetted = useRef(false)
  useEffect(() => {
    if (isSetted.current) {
      sessionStorage.setItem('theme', theme) // theme 변경 시마다 세션스토리지에 저장
      const root = document.querySelector(':root') // theme에 따라 :root의 클래스를 토글한다.
      if (theme === 'light') {
        root.classList.add('light')
        root.classList.remove('dark')
      } else {
        root.classList.add('dark')
        root.classList.remove('light')
      }
    }
    isSetted.current = true
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
