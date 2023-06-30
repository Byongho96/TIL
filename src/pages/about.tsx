import * as React from 'react'
import './about.scss'
import type { HeadFC, PageProps } from 'gatsby'
import AboutLogo from '@components/about-logo'
import AboutMe from '@components/about-me'

const AboutPage: React.FC<PageProps> = () => {
  return (
    <div className="about-layout">
      <AboutLogo />
      <AboutMe />
    </div>
  )
}

export default AboutPage

export const Head: HeadFC = () => <title>About Page</title>
