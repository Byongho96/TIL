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
  const { name, relativePath } = parent
  const { title, createdAt } = frontmatter
  const { slug } = fields

  return (
    <article className="post-item">
      <Link className="post-item--link" to={slug}>
        <div className="post-item--flex">
          <h1 className="post-item__title">{title || name}</h1>
          <span className="post-item__date">{createdAt}</span>
        </div>
        <p className="post-item__excerpt">{excerpt}</p>
      </Link>
    </article>
  )
}

export default PostItem
