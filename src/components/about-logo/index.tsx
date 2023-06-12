import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import * as styles from './style.module.scss'
import { TypeAnimation } from 'react-type-animation'

const AboutLogo: React.FC = () => {
  return (
    <div className={styles.container}>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed out once, initially
          "I'm a Frontend Developer, Byongho",
          4000,
          "I'm working on this blog",
          4000,
        ]}
        wrapper="h1"
        className={styles.aboutLogo}
        speed={20}
        deletionSpeed={60}
        repeat={Infinity}
      />
    </div>
  )
}

export default AboutLogo
