import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import NavigationLayout from '@layouts/navigation-layout'
import CategoryLayout from '@layouts/category-layout'
import { allMarkdownsQuery } from '@queries/index'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import * as styles from './posts.module.scss'
import ToTheTop from '@components/to-the-top'
import Typing from '@components/typing'

const PostPage: React.FC<PageProps> = ({ data }) => {
  return (
    <CategoryLayout>
      <div className={styles.container}>
        <h1 className={styles.postGroup}>
          <Typing phrases={['All the Posts']} speed="8" />
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
{
  /* <h1 id='typing' className={styles.postGroup}>All the Posts</h1> */
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { isCompleted: { eq: true } }
        fileAbsolutePath: { regex: "/^(?!.*README).*posts.*$/" }
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

export default PostPage

export const Head: HeadFC = () => <title>Post Page</title>
