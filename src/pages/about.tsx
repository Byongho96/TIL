import * as React from 'react'
import './about.scss'
import AboutBlog from '@components/about-blog'
import AboutMe from '@components/about-me'
import SEO from '@components/seo'
import Taping from '@components/taping'
import type { PageProps } from 'gatsby'

const AboutPage: React.FC<PageProps> = () => {
  return (
    <div className="about--layout">
      <div className="about__article">
        <AboutMe />
      </div>
      <Taping
        color="white"
        phrase="Chicken Pizza Burger"
        rotationDeg={5}
        direction="right"
      />
      <Taping
        color="black"
        phrase="Lorem Ipsum"
        rotationDeg={-9}
        direction="left"
      />
      <div className="about__article">
        <AboutBlog />
      </div>
      <Taping
        color="white"
        phrase="I never make the same mistake twice"
        rotationDeg={6}
        direction="right"
      />
    </div>
  )
}

export default AboutPage

export const Head = () => <SEO title="TIL About Page" pathname="/about" />
