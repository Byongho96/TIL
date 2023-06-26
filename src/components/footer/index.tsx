import React, { useContext } from 'react'
import * as styles from './style.module.scss'
import { ThemeContext } from '@contexts/theme-context'

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      Copyright © 2023{' '}
      <a className={styles.link} href="https://github.com/Byongho96">
        Byongho96
      </a>{' '}
      & Powered by{' '}
      <a className={styles.link} href="https://www.gatsbyjs.com/">
        Gatsby
      </a>
    </div>
  )
}

export default Footer
