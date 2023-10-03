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
    createdAt: string
    tags: string[]
    slug: string
  }
}

const PostItem: React.FC<Props> = ({ post }) => {
  const { excerpt, name, relativePath, title, createdAt, tags, slug } = post

  return (
    <Link className="post-item--link" to={slug} aria-label={`${title} 포스트`}>
      <article className="post-item">
        <div className="post-item--flex">
          <h1 className="post-item__title">{title || name}</h1>
          <time className="post-item__date" dateTime={createdAt}>
            {createdAt}
          </time>
        </div>
        {tags ? (
          <ul className="post-item__tag-list" aria-hidden="true">
            {tags.map((tag) => (
              <li key={tag} aria-hidden="true">
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
