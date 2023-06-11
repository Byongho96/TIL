import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import NavigationLayout from '@layouts/navigation-layout'
import CategoryLayout from '@layouts/category-layout'
import { allMarkdownsQuery } from '@queries/index'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'

const PostPage: React.FC<PageProps> = ({ data }) => {
  return (
    <NavigationLayout>
      <CategoryLayout>
        {data.allMarkdownRemark.nodes.map((node) => (
          <PostItem key={node.id} node={node} />
        ))}
      </CategoryLayout>
    </NavigationLayout>
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
        }
        excerpt
      }
    }
  }
`

export default PostPage

export const Head: HeadFC = () => <title>Post Page</title>
