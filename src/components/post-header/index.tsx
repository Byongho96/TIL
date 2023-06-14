import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from './style.module.scss'
import { useSiteMetadata } from '@hooks/use-site-metadata'

const PostHeader: React.FC = ({ frontmatter }) => {
  const { author } = useSiteMetadata()
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{frontmatter.title}</h2>
      <div className={styles.info}>
        <p className={styles.date}>{frontmatter.createdAt}</p>
        <p className={styles.author}>{author}</p>
      </div>
    </div>
  )
}

export default PostHeader
