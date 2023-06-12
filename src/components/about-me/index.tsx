import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import * as styles from './style.module.scss'
import { TypeAnimation } from 'react-type-animation'
import Taping from '@components/taping'

const AboutMe: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.tapeFirst}>
        <Taping color="red" />
      </div>
      <div className={styles.tapeSecond}>
        <Taping color="black" direction="left" />
      </div>
      <div className={styles.tapeThird}>
        <Taping color="red" />
      </div>
      <p className={styles.about}>About Me</p>
    </div>
  )
}

export default AboutMe
