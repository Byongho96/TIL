import React, { useContext } from 'react'
import './style.scss'
import { ThemeContext } from '@contexts/theme-context'

const Footer: React.FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <footer className={`footer ${theme}`}>
      Copyright © 2023&nbsp;
      <a className="footer--link" href="https://github.com/Byongho96">
        Byongho96
      </a>
      &nbsp; & Powered by&nbsp;
      <a className="footer--link" href="https://www.gatsbyjs.com/">
        Gatsby
      </a>
    </footer>
  )
}

export default Footer
