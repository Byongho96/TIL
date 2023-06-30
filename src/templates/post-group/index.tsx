import * as React from 'react'
import './style.scss'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import ToTheTop from '@components/to-the-top'
import TypeAnimation from '@components/type-animation'
import CategoryLayout from '@layouts/category-layout'

const PostGroupPage: React.FC<PageProps> = ({ pageContext, data }) => {
  return (
    <CategoryLayout defaultCategory={pageContext.name}>
      <main className="post-group--layout">
        <div className="post-group__category">
          <TypeAnimation phrases={[pageContext.name]} />
        </div>
        <section className="post-group__post-list">
          {data.allMarkdownRemark.nodes.map((node) => (
            <PostItem key={node.id} node={node} />
          ))}
        </section>
      </main>
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
