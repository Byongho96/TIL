import * as React from 'react'
import './index.scss'
import type { PageProps } from 'gatsby'
import IndexLogo from '@components/index-logo'
import IndexWheel from '@components/index-wheel'
import SEO from '@components/seo'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="index--layout">
      <IndexLogo />
      <div className="index__wheel-category">
        <IndexWheel />
      </div>
    </div>
  )
}

export default IndexPage

export const Head = () => <SEO title="Home Page" />
