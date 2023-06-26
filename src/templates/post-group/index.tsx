import * as React from 'react'
import * as styles from './style.module.scss'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import ToTheTop from '@components/to-the-top'
import Typing from '@components/typing'
import CategoryLayout from '@layouts/category-layout'

const PostGroupPage: React.FC<PageProps> = ({ pageContext, data }) => {
  return (
    <CategoryLayout selectedCategory={pageContext.name}>
      <div className={styles.container}>
        <h1 className={styles.postGroup}>
          <Typing
            phrases={[pageContext.name]}
            speed="8"
            cursorColor="#888888"
          />
        </h1>
        <div className={styles.postList}>
          {data.allMarkdownRemark.nodes.map((node) => (
            <PostItem key={node.id} node={node} />
          ))}
        </div>
      </div>
      <ToTheTop />
    </CategoryLayout>
  )
}

export const query = graphql`
  query ($regex: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { isCompleted: { eq: true } }
        fileAbsolutePath: { regex: $regex }
      }
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
        }
        excerpt
      }
    }
  }
`

export default PostGroupPage

export const Head: HeadFC = () => <title>Post Group Page</title>
