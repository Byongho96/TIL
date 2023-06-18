import React, { useState, useEffect, useMemo, useRef } from 'react'
import type { HeadFC, PageProps } from 'gatsby'
import NavigationLayout from '@layouts/navigation-layout'
import CategoryLayout from '@layouts/category-layout'
import { allMarkdownsQuery } from '@queries/index'
import { graphql } from 'gatsby'
import PostItem from '@components/post-item'
import * as styles from './posts.module.scss'
import ToTheTop from '@components/to-the-top'
import Typing from '@components/typing'
import useInfiniteScroll from '@hooks/use-infinite-scroll'

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
      <div className={styles.container}>
        <h1 className={styles.postGroup}>
          <Typing phrases={['All the Posts']} speed="8" />
        </h1>
        <div className={styles.postList}>
          {shownData.map((node) => (
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
      sort: { frontmatter: { createdAt: DESC } }
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
