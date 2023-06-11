import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import NavigationLayout from '@layouts/navigation-layout'
import CategoryLayout from '@layouts/category-layout'
import { allMarkdownsQuery } from '@queries/index'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'

const PostGroupPage: React.FC<PageProps> = ({ pageContext, data }) => {
  return (
    <NavigationLayout>
      <CategoryLayout selectedCategory={pageContext.name}>
        {data.allMarkdownRemark.nodes.map((node) => (
          <PostItem key={node.id} node={node} />
        ))}
      </CategoryLayout>
    </NavigationLayout>
  )
}

export const query = graphql`
  query ($regex: String!) {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: $regex } }) {
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
        }
        excerpt
      }
    }
  }
`

export default PostGroupPage

export const Head: HeadFC = () => <title>Post Group Page</title>
