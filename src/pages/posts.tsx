import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import NavigationLayout from '@layouts/navigation-layout'
import CategoryLayout from '@layouts/category-layout'
import { allMarkdownsQuery } from '@queries/index'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import * as styles from './posts.module.scss'

const PostPage: React.FC<PageProps> = ({ data }) => {
  return (
    <CategoryLayout>
      <div className={styles.postList}>
        {data.allMarkdownRemark.nodes.map((node) => (
          <PostItem key={node.id} node={node} />
        ))}
      </div>
    </CategoryLayout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/^(?!.*README).*posts.*$/" } }
    ) {
      nodes {
        id
        parent {
          ... on File {
            id
            name
            relativePath
          }
        }
        frontmatter {
          title
          createdAt
          updatedAt
        }
        excerpt
      }
    }
  }
`

export default PostPage

export const Head: HeadFC = () => <title>Post Page</title>
