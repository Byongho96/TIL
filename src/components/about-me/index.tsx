import React, { useContext } from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import * as styles from './style.module.scss'
import { TypeAnimation } from 'react-type-animation'
import Taping from '@components/taping'
import { ThemeContext } from '@contexts/theme-context'

const AboutMe: React.FC = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className={styles.container}>
      <div className={styles.tapeFirst}>
        <Taping color="white" />
      </div>
      <div className={styles.tapeSecond}>
        <Taping color="black" direction="left" />
      </div>
      <div className={styles.tapeThird}>
        <Taping color="white" />
      </div>
      <p className={`${styles.about} ${styles[theme]}`}>About Me</p>
    </div>
  )
}

export default AboutMe
