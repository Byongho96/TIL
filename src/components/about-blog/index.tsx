import React from 'react'
import './style.scss'
import GithubIcon from '@assets/svgs/github.svg'
import RssIcon from '@assets/svgs/rss.svg'
import TypeAnimation from '@components/type-animation'

const AboutBlog: React.FC = () => {
  return (
    <div className="about-blog">
      <div className="about-blog__typing">
        <TypeAnimation phrases={['This is TIL Blog']} />
      </div>
      <nav className="about-blog__navbar">
        <ul className="about-blog__navbar__menu">
          <li className="about-blog__navbar__item">
            <a href="https://github.com/Byongho96/TIL/tree/master">
              <GithubIcon />
            </a>
          </li>
          <li className="about-blog__navbar__item">
            <a href="https://byongho96.github.io/TIL/rss">
              <RssIcon />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default AboutBlog
