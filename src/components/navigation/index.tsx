import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from './style.module.scss'
import { useSiteMetadata } from '@hooks/use-site-metadata'
import ColorChange from '@components/color-change'

const Navigation: React.FC = () => {
  const { author } = useSiteMetadata()
  return (
    <div className={styles.navBar}>
      <Link to="/" className={styles.navLinkText}>
        {author}
      </Link>
      <ColorChange />
      <nav>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navLinkText}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLinkText}>
              About
            </Link>
          </li>
          <li>
            <Link to="/posts" className={styles.navLinkText}>
              Posts
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
