import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import NavigationLayout from '@layouts/navigation-layout'
import CategoryLayout from '@layouts/category-layout'
import { allMarkdownsQuery } from '@queries/index'
import { graphql } from 'gatsby'
import TableContent from '@components/table-content'
import PostHeader from '@components/post-header'
import * as styles from './style.module.scss'

const PostPage: React.FC<PageProps> = ({ pageContext, data }) => {
  return (
    <NavigationLayout>
      <CategoryLayout selectedCategory={pageContext.name}>
        <div className={styles.container}>
          <div className={styles.post}>
            <PostHeader frontmatter={data.markdownRemark.frontmatter} />
            <div
              className={`markdown-body ${styles.postBody}`}
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
          </div>
          <div className={styles.toc}>
            <TableContent toc={data.markdownRemark.tableOfContents} />
          </div>
        </div>
      </CategoryLayout>
    </NavigationLayout>
  )
}

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      tableOfContents
      frontmatter {
        createdAt
        isCompleted
        reference
        title
        updatedAt
      }
    }
  }
`

export default PostPage
