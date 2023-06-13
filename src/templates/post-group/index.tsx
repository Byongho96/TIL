import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import NavigationLayout from '@layouts/navigation-layout'
import CategoryLayout from '@layouts/category-layout'
import { allMarkdownsQuery } from '@queries/index'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import * as styles from './style.module.scss'

const PostGroupPage: React.FC<PageProps> = ({ pageContext, data }) => {
  return (
    <CategoryLayout selectedCategory={pageContext.name}>
      <div className={styles.postList}>
        {data.allMarkdownRemark.nodes.map((node) => (
          <PostItem key={node.id} node={node} />
        ))}
      </div>
    </CategoryLayout>
  )
}

export const query = graphql`
  query ($regex: String!) {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: $regex } }
      sort: { frontmatter: { title: ASC } }
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
          title
        }
        excerpt
      }
    }
  }
`

export default PostGroupPage

export const Head: HeadFC = () => <title>Post Group Page</title>
