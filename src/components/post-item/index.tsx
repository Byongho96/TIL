import * as React from 'react'
import './style.scss'

interface Props {
  node: {
    id: string
    excerpt: string
    parent: {
      name: string
      relativePath: string
    }
    frontmatter: {
      title: string
      createdAt: string
    }
  }
}

const PostItem: React.FC<Props> = ({ node }) => {
  const { parent, frontmatter, excerpt } = node
  const { name, relativePath } = parent
  const { title, createdAt } = frontmatter

  return (
    <article className="post-item">
      <a href={`/posts/${relativePath}`}>
        <div className="post-item--flex">
          <h1 className="post-item__title">{title || name}</h1>
          <span className="post-item__date">{createdAt}</span>
        </div>
        <p className="post-item__excerpt">{excerpt}</p>
      </a>
    </article>
  )
}

export default PostItem
