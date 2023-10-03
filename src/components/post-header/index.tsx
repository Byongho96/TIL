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
        <time dateTime={frontmatter.createdAt}>📅 {frontmatter.createdAt}</time>
        <div aria-label={`작성자 ${author}`}>🖋️ {author}</div>
      </div>
      {frontmatter.tags && (
        <ul className="post-header__tag-list" aria-label="관련 태그 목록">
          {frontmatter.tags.map((tag) => (
            <li key={tag} className="post-header__tag">
              {tag}
            </li>
          ))}
        </ul>
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
