import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from './style.module.scss'
import { useSiteMetadata } from '@hooks/use-site-metadata'

const Navigation: React.FC = () => {
  const { owner } = useSiteMetadata()
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.navLinkText}>
        {owner}
      </Link>
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
