import * as React from 'react'
import './about.scss'
import AboutBlog from '@components/about-blog'
import AboutMe from '@components/about-me'
import SEO from '@components/seo'
import type { PageProps } from 'gatsby'

const AboutPage: React.FC<PageProps> = () => {
  return (
    <div className="about--layout">
      <AboutBlog />
      <AboutMe />
    </div>
  )
}

export default AboutPage

export const Head = () => <SEO title="TIL About Page" pathname="/about" />
