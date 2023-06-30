import * as React from 'react'
import './style.scss'
import { navigate } from 'gatsby'

const PostItem: React.FC = ({ node }) => {
  const { id, parent, frontmatter, excerpt } = node
  const { name, relativePath } = parent
  const { title, createdAt } = frontmatter

  const handleClick = () => {
    navigate(`/posts/${relativePath}`)
  }

  return (
    <article className="post-item" onClick={handleClick}>
      <div className="post-item--flex">
        <h1 className="post-item__title">{title || name}</h1>
        <span className="post-item__date">{createdAt}</span>
      </div>
      <p className="post-item__excerpt">{excerpt}</p>
    </article>
  )
}

export default PostItem
