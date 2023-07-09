import React, { useContext } from 'react'
import './style.scss'
import Taping from '@components/taping'
import { ThemeContext } from '@contexts/theme-context'

const AboutMe: React.FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="about-me">
      <Taping color="white" phrase="coming soon" rotationDeg={10} />
      <Taping
        color="black"
        phrase="Lorem ipsum"
        rotationDeg={-15}
        direction="left"
      />
      <Taping color="white" phrase="coming soon" rotationDeg={5} />
      <p className={`about-me__text ${theme}`}>About Me</p>
    </div>
  )
}

export default AboutMe
