import React, { useContext } from 'react'
import * as styles from './style.module.scss'
import { ThemeContext } from '@contexts/theme-context'

const IndexLogo: React.FC = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className={`${styles.indexLogo} ${styles[theme]}`}>
      <p>TODAY</p>
      <p>I</p>
      <p>LEARNED</p>
    </div>
  )
}

export default IndexLogo
