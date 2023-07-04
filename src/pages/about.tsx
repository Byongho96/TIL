import * as React from 'react'
import './about.scss'
import type { PageProps } from 'gatsby'
import AboutMe from '@components/about-me'
import SEO from '@components/seo'
import TypeAnimation from '@components/type-animation'

const AboutPage: React.FC<PageProps> = () => {
  return (
    <div className="about--layout">
      <div className="about__typing">
        <TypeAnimation
          phrases={["Hi, I'm Front Dev. Byongho!", "I'm Working on this Blog."]}
          speed={7}
          pause={2000}
          isInfinite={true}
        />
      </div>
      <AboutMe />
    </div>
  )
}

export default AboutPage

export const Head = () => <SEO title="About Page" pathname="/about" />
