import * as React from 'react'
import './style.scss'
import { graphql } from 'gatsby'
import { useSiteMetadata } from '@hooks/use-site-metadata'

interface Props {
  frontmatter: {
    title: string
    createdAt: string
    updatedAt: string
    tags: string[] | null
    description: string | null
    reference: string | null
  }
}

const PostHeader: React.FC<Props> = ({ frontmatter }) => {
  const { author } = useSiteMetadata()
  return (
    <div className="post-header">
      <h1 className="post-header__title">{frontmatter.title}</h1>
      <div className="post-header__date-author">
        {'📅\u00a0' +
          frontmatter.createdAt +
          '\u00a0\u00B7\u00a0' +
          '🖋️\u00a0' +
          author}
      </div>
      {frontmatter.tags && (
        <div className="post-header__tag-list">
          {frontmatter.tags.map((tag) => (
            <div key={tag} className="post-header__tag">
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PostHeader

export const query = graphql`
  fragment PostFrontmatter on MarkdownRemark {
    frontmatter {
      title
      createdAt
      updatedAt
      tags
      description
      reference
    }
  }
`