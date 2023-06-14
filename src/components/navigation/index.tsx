import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from './style.module.scss'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import ColorChange from '@components/color-change'
import ToggleIcon from '@assets/svgs/toggle.svg'

const Navigation: React.FC = () => {
  const { author } = useSiteMetadata()

  // 토글 버튼 눌렀을때 작동
  const handleClick = () => {
    const navBar = document.querySelector(`.${styles.navLinks}`)
    navBar.classList.toggle(styles.active)
  }

  const handleLinkClick = () => {
    const navBar = document.querySelector(`.${styles.navLinks}`)
    navBar.classList.remove(styles.active)
  }

  return (
    <div className={styles.navBar}>
      <div className={styles.navHeader}>
        <Link to="/" className={styles.navLinkText}>
          {author}
        </Link>
        <div className={styles.colorChange}>
          <ColorChange />
        </div>
      </div>
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link
              to="/"
              className={styles.navLinkText}
              onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={styles.navLinkText}
              onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li>
            <Link
              to="/posts"
              className={styles.navLinkText}
              onClick={handleLinkClick}>
              Posts
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.navToggle} onClick={handleClick}>
        <ToggleIcon />
      </div>
    </div>
  )
}

export default Navigation
