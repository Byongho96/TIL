import React, { useState, useMemo, useRef } from 'react'
import './posts.scss'
import type { HeadFC, PageProps } from 'gatsby'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import ToTheTop from '@components/to-the-top'
import TypeAnimation from '@components/type-animation'
import useInfiniteScroll from '@hooks/use-infinite-scroll'
import CategoryLayout from '@layouts/category-layout'

const PostPage: React.FC<PageProps> = ({ data }) => {
  const [lastIdx, setLastIdx] = useState(5)
  const infiniteRef = useRef<HTMLElement>(null)

  const shownData = useMemo(() => {
    return data.allMarkdownRemark.nodes.slice(0, lastIdx + 1)
  }, [lastIdx])

  const isEnd = useMemo(() => {
    return lastIdx >= data.allMarkdownRemark.nodes.length - 1
  }, [lastIdx])

  const loadMore = () => {
    setLastIdx((prev) => prev + 5)
  }

  useInfiniteScroll({ ref: infiniteRef, isEnd, loadMore })

  return (
    <CategoryLayout>
      <main className="posts--layout">
        <div className="posts__category">
          <TypeAnimation phrases={['All the Posts']} />
        </div>
        <section className="posts__post-list">
          {shownData.map((node) => (
            <PostItem key={node.id} node={node} />
          ))}
        </section>
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

export default PostPage

export const Head: HeadFC = () => <title>Post Page</title>