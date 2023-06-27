import React, { useRef } from 'react'
import './style.scss'
import { Link } from 'gatsby'
import ToggleIcon from '@assets/svgs/toggle.svg'
import ColorChange from '@components/color-change'
import { useSiteMetadata } from '@hooks/use-site-metadata'

const Navigation: React.FC = () => {
  const navbarMenu = useRef<HTMLUListElement>(null)
  const { author } = useSiteMetadata()

  // 토글 버튼 눌렀을때 작동
  const handleToggleClick = () => {
    navbarMenu.current.classList.toggle('open')
  }

  // 토글 버튼 눌렀을때 작동
  const handleLinkClick = () => {
    navbarMenu.current.classList.remove('open')
  }

  return (
    <nav className="navbar">
      <div className="navbar__logoColor">
        <div className="navbar__logo">
          <Link to="/">{author}</Link>
        </div>
        <div className="navbar__color">
          <ColorChange />
        </div>
      </div>
      <ul className="navbar__menu" ref={navbarMenu}>
        <li>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={handleLinkClick}>
            About
          </Link>
        </li>
        <li>
          <Link to="/posts" onClick={handleLinkClick}>
            Posts
          </Link>
        </li>
      </ul>
      <div className="navbar__toggleBtn" onClick={handleToggleClick}>
        <ToggleIcon />
      </div>
    </nav>
  )
}

export default Navigation
