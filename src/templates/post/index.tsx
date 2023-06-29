import React, { useContext, useEffect } from 'react'
import './style.scss'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import NextPosts from '@components/next-posts'
import PostHeader from '@components/post-header'
import TableOfContent from '@components/table-of-content'
import ToTheTop from '@components/to-the-top'
import Utterances from '@components/utterances'
import { ThemeContext } from '@contexts/theme-context'
import CategoryLayout from '@layouts/category-layout'
import highlightCode from '@utils/highlightCode.ts'
import '@styles/_markdown.scss'

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

  useEffect(() => {
    highlightCode()
  })

  return (
    <CategoryLayout defaultCategory={pageContext.relativeDirectory}>
      <main className="post">
        <article className="post--article">
          <PostHeader frontmatter={data.markdownRemark.frontmatter} />
          <div
            className={`post--article--content markdown-body ${theme}`}
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          />
          <NextPosts prevPost={prevPost} nextPost={nextPost} />
          <Utterances
            theme={theme === 'dark' ? 'github-dark' : 'github-light'}
          />
        </article>
        <aside className="post--toc">
          <TableOfContent toc={data.markdownRemark.tableOfContents} />
        </aside>
      </main>
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
        title
        createdAt
        updatedAt
        tags
        description
        reference
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

export const Head = () => {
  return <></>
}
