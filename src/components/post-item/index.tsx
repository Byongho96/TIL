import * as React from 'react'
import './style.scss'
import { Link } from 'gatsby'

interface Props {
  post: {
    id: string
    excerpt: string
    name: string
    relativePath: string
    title: string
    createtAt: string
    tags: string[]
    slug: string
  }
}

const PostItem: React.FC<Props> = ({ post }) => {
  const { excerpt, name, relativePath, title, createdAt, tags, slug } = post

  return (
    <Link className="post-item--link" to={slug}>
      <article className="post-item">
        <div className="post-item--flex">
          <h1 className="post-item__title">{title || name}</h1>
          <span className="post-item__date">{createdAt}</span>
        </div>
        {tags ? (
          <ul className="post-item__tag-list">
            {tags.map((tag) => (
              <li key={tag}>
                <div className="post-item__tag">{tag}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="post-item__excerpt">{excerpt}</p>
        )}
      </article>
    </Link>
  )
}

export default PostItem
