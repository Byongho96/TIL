import React, { useCallback, useState, useMemo } from 'react'
import './posts.scss'
import { graphql } from 'gatsby'
// import PostItem from '@components/post-item'
import SearchIcon from '@assets/svgs/search.svg'
import PostItem from '@components/post-item'
import SEO from '@components/seo'
import ToTheTop from '@components/to-the-top'
import { useFuseJs } from '@hooks/use-fujse-js'
import useInfiniteScroll from '@hooks/use-infinite-scroll'
import CategoryLayout from '@layouts/category-layout'
import type { PageProps } from 'gatsby'

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
    tags: string[]
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

const PostsPage: React.FC<PageProps<DataProps>> = ({ data }) => {
  const [query, setQuery] = useState('')
  const [lastIdx, setLastIdx] = useState(20)

  // data 가공
  const posts = data.allMarkdownRemark.nodes.map((node) => ({
    item: {
      id: node.id,
      excerpt: node.excerpt,
      name: node.parent.name,
      relativePath: node.parent.relativePath,
      title: node.frontmatter.title,
      createdAt: node.frontmatter.createdAt,
      tags: node.frontmatter.tags, // 수정: 'tiags'가 아닌 'tags'로 수정
      slug: node.fields.slug,
    },
  }))

  // 인덱스에 다라 보여지는 데이터
  const scrolledPosts = useMemo(() => {
    return posts.slice(0, lastIdx)
  }, [lastIdx])

  // 스크롤 완료 여부
  const isEnd = useMemo(() => {
    return lastIdx > posts.length
  }, [lastIdx])

  // 인덱스 업데이트
  const loadMore = useCallback(() => {
    setLastIdx((prev) => prev + 20)
  }, [])

  useInfiniteScroll({ isEnd, loadMore }) // 무한 스크롤

  const searchResult = useFuseJs(query)

  const showingData = searchResult.length > 0 ? searchResult : scrolledPosts

  return (
    <CategoryLayout>
      <main className="posts--layout">
        <div className="posts__search">
          <div className="posts__search__icon">
            <SearchIcon />
          </div>
          <label className="posts__search__label" htmlFor="posts-search-input">
            글 검색하기
          </label>
          <input
            id="posts-search-input"
            className="posts__search__input"
            type="text"
            placeholder="Search Here!"
            value={query}
            autoFocus
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className="posts__post-list" aria-live="assertive">
          {showingData.map((post) => (
            <li key={post.item.id}>
              <PostItem post={post.item} />
            </li>
          ))}
        </ul>
      </main>
      <ToTheTop />
    </CategoryLayout>
  )
}

/* <div className="posts__category-name">
<TypeAnimation phrases={['All the Posts']} />
</div> */

export const query = graphql`
  query PostsPageQuery {
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
          tags
        }
        fields {
          slug
        }
      }
    }
  }
`

export default PostsPage

export const Head = () => (
  <SEO
    title="TIL Posts Page"
    decription="All the TIL posts"
    pathname="/posts"
  />
)
