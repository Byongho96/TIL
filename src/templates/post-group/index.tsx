import * as React from 'react'
import './style.scss'
import type { PageProps, HeadProps } from 'gatsby'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import SEO from '@components/seo'
import ToTheTop from '@components/to-the-top'
import TypeAnimation from '@components/type-animation'
import CategoryLayout from '@layouts/category-layout'

type MarkdownRemarkNode = {
  id: string
  excerpt: string
  parent: {
    id: string
    name: string
    relativePath: string
  }
  frontmatter: {
    title: string
    createdAt: string
    updatedAt: string
  }
}

type DataProps = {
  allMarkdownRemark: {
    nodes: MarkdownRemarkNode[]
  }
}

type PageContextType = {
  pagePath: string
  regex: string
  id: string
  name: string
  relativePath: string
}

const PostGroupPage: React.FC<PageProps<DataProps, PageContextType>> = ({
  pageContext,
  data,
}) => {
  return (
    <CategoryLayout defaultCategory={pageContext.name}>
      <main className="post-group--layout">
        <div className="post-group__category-name">
          <TypeAnimation phrases={[pageContext.name]} />
        </div>
        <ul className="post-group__post-list">
          {data.allMarkdownRemark.nodes.map((node) => (
            <li>
              <PostItem key={node.id} node={node} />
            </li>
          ))}
        </ul>
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

export const Head = ({
  pageContext,
  data,
  location,
}: HeadProps<undefined, PageContextType>) => (
  <SEO
    title={pageContext.name}
    description={`Posts about ${pageContext.name}`}
    pathname={location.pathname}
  />
)
