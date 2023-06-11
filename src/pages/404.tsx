import * as React from 'react'
import * as styles from './404.module.scss'
import { Link, HeadFC, PageProps } from 'gatsby'
import { TypeAnimation } from 'react-type-animation'
import Layout from '@layouts/navigation-layout'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <TypeAnimation
        sequence={["OOPs! there's nothing here", 2000]}
        wrapper="h1"
        className={styles.notice}
        speed={20}
        deletionSpeed={60}
        repeat={Infinity}
      />
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
