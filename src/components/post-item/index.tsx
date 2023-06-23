import * as React from 'react'
import { navigate } from 'gatsby'
import * as styles from './style.module.scss'

const PostItem: React.FC = ({ node }) => {
  const { id, parent, frontmatter, excerpt } = node
  const { name, relativePath } = parent
  const { title, createdAt } = frontmatter

  const handleClick = () => {
    navigate(`/posts/${relativePath}`)
  }

  return (
    <div className={styles.container} onClick={handleClick}>
      <div className={styles.flex}>
        <h3 className={styles.title}>{title || name}</h3>
        <p className={styles.date}>{createdAt}</p>
      </div>
      <p className={styles.excerpt}>{excerpt}</p>
    </div>
  )
}

export default PostItem