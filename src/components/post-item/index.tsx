import * as React from 'react'
import './style.scss'
import { Link } from 'gatsby'

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
    fields: {
      slug: string
    }
  }
}

const PostItem: React.FC<Props> = ({ node }) => {
  const { parent, frontmatter, excerpt, fields } = node
  const { name } = parent
  const { title, createdAt } = frontmatter
  const { slug } = fields

  return (
    <Link className="post-item--link" to={slug}>
      <article className="post-item">
        <div className="post-item--flex">
          <h1 className="post-item__title">{title || name}</h1>
          <span className="post-item__date">{createdAt}</span>
        </div>
        <p className="post-item__excerpt">{excerpt}</p>
      </article>
    </Link>
  )
}

export default PostItem
