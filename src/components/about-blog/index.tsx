import React, { useContext } from 'react'
import './style.scss'
import GithubIcon from '@assets/svgs/github.svg'
import RssIcon from '@assets/svgs/rss.svg'
import TypeAnimation from '@components/type-animation'
import { ThemeContext } from '@contexts/theme-context'

const AboutBlog: React.FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="about-blog">
      <div className="about-blog__typing">
        <TypeAnimation phrases={['This is TIL Blog']} />
      </div>
      <nav className="about-blog__navbar">
        <ul className="about-blog__navbar__menu">
          <li className="about-blog__navbar__item">
            <GithubIcon />
          </li>
          <li className="about-blog__navbar__item">
            <RssIcon />
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AboutBlog
