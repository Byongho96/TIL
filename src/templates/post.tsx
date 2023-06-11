import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import NavigationLayout from '@layouts/navigation-layout'
import CategoryLayout from '@layouts/category-layout'
import { allMarkdownsQuery } from '@queries/index'
import { graphql } from 'gatsby'

const PostPage: React.FC<PageProps> = ({ pageContext, data }) => {
  console.log(pageContext)
  console.log(data)
  return (
    <NavigationLayout>
      <CategoryLayout selectedCategory={pageContext.name}>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </CategoryLayout>
    </NavigationLayout>
  )
}

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
    }
  }
`

export default PostPage
