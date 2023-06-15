import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import * as styles from './style.module.scss'
import { TypeAnimation } from 'react-type-animation'
import Typing from '@components/typing'

const AboutLogo: React.FC = () => {
  return (
    <p className={styles.container}>
      <Typing
        phrases={[
          "Hi! I'm Frontend Developer, Byongho",
          "I'm Working on this Blog",
        ]}
        speed={7}
        cursorColor="#888888"
        isInfinite={true}
      />
    </p>
  )
}

export default AboutLogo
