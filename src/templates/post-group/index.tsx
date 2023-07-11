import * as React from 'react'
import './style.scss'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import SEO from '@components/seo'
import ToTheTop from '@components/to-the-top'
import TypeAnimation from '@components/type-animation'
import CategoryLayout from '@layouts/category-layout'
import type { PageProps, HeadProps } from 'gatsby'

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
  fields: {
    slug: string
  }
}

type DataProps = {
  allMarkdownRemark: {
    nodes: MarkdownRemarkNode[]
  }
}

type PageContextType = {
  pagePath: string
  postPathRegex: string
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
            <li key={node.id}>
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
  query ($postPathRegex: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { isCompleted: { eq: true } }
        fileAbsolutePath: { regex: $postPathRegex }
      }
      sort: [
        { frontmatter: { createdAt: DESC } }
        { frontmatter: { title: DESC } }
      ]
    ) {
      nodes {
        id
        excerpt
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
        fields {
          slug
        }
      }
    }
  }
`

export default PostGroupPage

export const Head = ({
  pageContext,
  location,
}: HeadProps<undefined, PageContextType>) => (
  <SEO
    title={pageContext.name}
    description={`Posts about ${pageContext.name}`}
    pathname={location.pathname}
  />
)
