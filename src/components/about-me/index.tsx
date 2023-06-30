import React from 'react'
import './style.scss'
import Taping from '@components/taping'
import { ThemeContext } from '@contexts/theme-context'

const AboutMe: React.FC = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className="about-me">
      <p className={`about-me__text ${theme}`}>About Me</p>
      <Taping color="white" />
      <Taping color="black" direction="left" />
      <Taping color="white" />
    </div>
  )
}

export default AboutMe
