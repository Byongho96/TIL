import * as React from 'react'
import './style.scss'
import { useSiteMetadata } from '@hooks/use-site-metadata'

const PostHeader: React.FC = ({ frontmatter }) => {
  console.log(frontmatter)
  const { author } = useSiteMetadata()
  return (
    <div className="post-header">
      <h1 className="post-header--title">{frontmatter.title}</h1>
      <div className="post-header--date-author">
        {'📅\u00a0' +
          frontmatter.createdAt +
          '\u00a0\u00B7\u00a0' +
          '🖋️\u00a0' +
          author}
      </div>
      <div className="post-header--tags">
        {frontmatter.tags.map((tag) => (
          <div className="post-header--tags--tag">{tag}</div>
        ))}
      </div>
    </div>
  )
}

export default PostHeader
