import * as React from 'react'
import * as styles from './about.module.scss'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '@layouts/navigation-layout'
import AboutLogo from '@components/about-logo'
import Taping from '@components/taping'
import AboutMe from '@components/about-me'

const AboutPage: React.FC<PageProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <AboutLogo />
      </div>
      <AboutMe />
    </div>
  )
}

export default AboutPage

export const Head: HeadFC = () => <title>About Page</title>
