import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import * as styles from './index.module.scss'
import IndexLogo from '@components/index-logo'
import Layout from '@layouts/navigation-layout'
import IndexWheel from '@components/index-wheel'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className={styles.container}>
      <div>
        <IndexLogo />
      </div>
      <div className={styles.wheel}>
        <IndexWheel />
      </div>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
