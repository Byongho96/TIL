import React, { useState, useMemo, useRef } from 'react'
import './posts.scss'
import type { PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import SEO from '@components/seo'
import ToTheTop from '@components/to-the-top'
import TypeAnimation from '@components/type-animation'
import useInfiniteScroll from '@hooks/use-infinite-scroll'
import CategoryLayout from '@layouts/category-layout'

const PostsPage: React.FC<PageProps> = ({ data }) => {
  const [lastIdx, setLastIdx] = useState(20)
  const infiniteRef = useRef<HTMLElement>(null)

  const shownData = useMemo(() => {
    return data.allMarkdownRemark.nodes.slice(0, lastIdx + 1)
  }, [lastIdx])

  const isEnd = useMemo(() => {
    return lastIdx >= data.allMarkdownRemark.nodes.length - 1
  }, [lastIdx])

  const loadMore = () => {
    setLastIdx((prev) => prev + 20)
  }

  useInfiniteScroll({ ref: infiniteRef, isEnd, loadMore })

  return (
    <CategoryLayout>
      <main className="posts--layout">
        <div className="posts__category-name">
          <TypeAnimation phrases={['All the Posts']} />
        </div>
        <ul className="posts__post-list">
          {shownData.map((node) => (
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
      sort: [
        { frontmatter: { createdAt: DESC } }
        { frontmatter: { title: DESC } }
      ]
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

export default PostsPage

export const Head = () => (
  <SEO title="Posts Page" decription="All the TIL posts" pathname="/posts" />
)
