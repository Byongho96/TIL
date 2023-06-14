import * as React from 'react'
import * as styles from './404.module.scss'
import { Link, HeadFC, PageProps } from 'gatsby'
import Layout from '@layouts/navigation-layout'

const NotFoundPage: React.FC<PageProps> = () => {
  return <div className={styles.notice}>404</div>
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
