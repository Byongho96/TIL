import React, { useContext } from 'react'
import * as styles from './style.module.scss'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import NextPosts from '@components/next-posts'
import PostHeader from '@components/post-header'
import TableContent from '@components/table-content'
import ToTheTop from '@components/to-the-top'
import Utterances from '@components/utterances'
import { ThemeContext } from '@contexts/theme-context'
import CategoryLayout from '@layouts/category-layout'

const PostPage: React.FC<PageProps> = ({ pageContext, data }) => {
  const { theme } = useContext(ThemeContext)

  // make post array
  const postArray = data.allMarkdownRemark.nodes.map((node) => {
    return {
      id: node.id,
      title: node.frontmatter.title,
      createdAt: node.frontmatter.createdAt,
      updatedAt: node.frontmatter.updatedAt,
      excerpt: node.excerpt,
      relativePath: node.parent.relativePath,
    }
  })

  // find index of id is the same to the data.id
  const index = postArray.findIndex(
    (post) => post.id === data.markdownRemark.id
  )

  // prevpost is the post before the current post
  const prevPost = index === 0 ? null : postArray[index - 1]

  // nextpost is the post after the current post
  const nextPost = index === postArray.length - 1 ? null : postArray[index + 1]

  return (
    <CategoryLayout selectedCategory={pageContext.parent.relativeDirectory}>
      <div className={styles.container}>
        <PostHeader frontmatter={data.markdownRemark.frontmatter} />
        <div className={styles.post}>
          <div className={styles.markdownUtter}>
            <div
              className={`markdown-body ${theme} ${styles.markdown}`}
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
            <div>
              <NextPosts prevPost={prevPost} nextPost={nextPost} />
            </div>
            <Utterances
              theme={theme === 'dark' ? 'github-dark' : 'github-light'}
            />
          </div>
          <div className={styles.toc}>
            <TableContent toc={data.markdownRemark.tableOfContents} />
          </div>
        </div>
      </div>
      <ToTheTop />
    </CategoryLayout>
  )
}

export const query = graphql`
  query ($id: String!, $regex: String!) {
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

export default PostPage
