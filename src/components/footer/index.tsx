import React, { useContext } from 'react'
import './style.scss'
import { ThemeContext } from '@contexts/theme-context'

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <footer className={`footer ${theme}`}>
      <p>
        Copyright © 2023&nbsp;
        <a
          className="footer--link"
          href="https://github.com/Byongho96"
          aria-label="작성자의 깃헙"
        >
          Byongho96
        </a>
        &nbsp; & Powered by&nbsp;
        <a
          className="footer--link"
          href="https://www.gatsbyjs.com/"
          aria-label="개츠비 홈페이지"
        >
          Gatsby
        </a>
      </p>
    </footer>
  )
}

export default Footer
