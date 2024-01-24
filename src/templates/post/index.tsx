import React, { useContext, useEffect } from 'react'
import './style.scss'
import { graphql } from 'gatsby'
import AdjacentPosts from '@components/adjacent-posts'
import Giscus from '@components/giscus'
import PostHeader from '@components/post-header'
import SEO from '@components/seo'
import TableOfContent from '@components/table-of-content'
import ToTheTop from '@components/to-the-top'
import { ThemeContext } from '@contexts/theme-context'
import CategoryLayout from '@layouts/category-layout'
import highlightCode from '@utils/highlightCode.ts'
import '@styles/_markdown.scss'
import 'katex/dist/katex.min.css'
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
  markdownRemark: {
    id: string
    html: string
    tableOfContents: string
    frontmatter: {
      title: string
      createdAt: string
      updatedAt: string
      tags: string[] | null
      description: string | null
      reference: string | null
    }
  }
  allMarkdownRemark: {
    nodes: MarkdownRemarkNode[]
  }
}

type PageContextType = {
  pagePath: string
  siblingPostsPathRegex: string
  relativeDirectory: string
  id: string
  parent: {
    id: string
    name: string
    relativePath: string
  }
}

type PostType = {
  id: string
  name: string
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  excerpt: string
  relativePath: string
}

const PostPage: React.FC<PageProps<DataProps, PageContextType>> = ({
  pageContext,
  data,
}) => {
  const { theme } = useContext(ThemeContext)

  // make post array
  const postArray: PostType[] = data.allMarkdownRemark.nodes.map((node) => {
    return {
      id: node.id,
      name: node.parent.name,
      title: node.frontmatter.title,
      slug: node.fields.slug,
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
  }, [])

  return (
    <CategoryLayout defaultCategory={pageContext.relativeDirectory}>
      <main className="post">
        <aside className="post__toc">
          <TableOfContent toc={data.markdownRemark.tableOfContents} />
        </aside>
        <article className="post__article">
          <PostHeader frontmatter={data.markdownRemark.frontmatter} />
          <div
            className={`post__article__content markdown-body ${theme}`}
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          />
          <AdjacentPosts prevPost={prevPost} nextPost={nextPost} />
          <Giscus theme={theme === 'dark' ? 'dark' : 'light'} />
        </article>
      </main>
      <ToTheTop />
    </CategoryLayout>
  )
}

export const query = graphql`
  query PostPageQuery($id: String!, $siblingPostsPathRegex: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      tableOfContents
      ...PostFrontmatter
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { isCompleted: { eq: true } }
        fileAbsolutePath: { regex: $siblingPostsPathRegex }
      }
      sort: [
        { frontmatter: { createdAt: ASC } }
        { frontmatter: { title: ASC } }
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

export default PostPage

export const Head = ({ data, location }: HeadProps<DataProps>) => (
  <SEO
    title={data.markdownRemark.frontmatter.title}
    description={data.markdownRemark.frontmatter.description}
    pathname={location.pathname}
  />
)
