import * as React from 'react'
import * as styles from './about.module.scss'
import type { HeadFC, PageProps } from 'gatsby'
import Layout from '@layouts/navigation-layout'
import AboutLogo from '@components/about-logo'
import Taping from '@components/taping'

const AboutPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.logo}>
          <AboutLogo />
        </div>
        <div className={styles.tapeFirst}>
          <Taping color="red" />
        </div>
        <div className={styles.tapeSecond}>
          <Taping color="black" />
        </div>
      </div>
    </Layout>
  )
}

export default AboutPage

export const Head: HeadFC = () => <title>About Page</title>
