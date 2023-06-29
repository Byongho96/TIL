import React, { useState, useRef, useEffect } from 'react'
import './style.scss'
import { Link } from 'gatsby'
import { useCategorizedPosts } from '@hooks/use-categorized-posts'

interface Props {
  defaultCategory?: string // 기본으로 선택된 카테고리
}

// 최대 3단계 카테고리까지만(루트 카테고리 포함) 지원
const Category: React.FC<Props> = ({ defaultCategory = '' }) => {
  const { totalPosts, categories } = useCategorizedPosts()
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory)

  // 카테고리 클릭 이벤트 처리
  const handleClickCategory = (event, name) => {
    if (event.detail > 1) return // 더블 클릭 이상이면 Link 동작
    event.preventDefault() // 한번 클릭이면 Link 이동 막고, selecedCategory 토글
    setSelectedCategory(selectedCategory === name ? '' : name)
  }

  return (
    <nav className="sidebar">
      <div className="sidebar__total">{`전체 글 (${totalPosts})`}</div>
      <ul className="sidebar__category">
        {/* 루트 카테고리 */}
        {categories.map((category) => (
          <li key={category.name}>
            <CategoryName
              name={category.name}
              num={category.num}
              handleClickCategory={handleClickCategory}
            />
            <ul className="sidebar__category">
              {/* 서브 카테고리 1 */}
              {category.subCategories.map((subCategory) => (
                <li key={subCategory.name}>
                  <CategoryName
                    name={subCategory.name}
                    num={subCategory.num}
                    handleClickCategory={handleClickCategory}
                  />
                  <ul className="sidebar__category">
                    {/* 서브 카테고리 2 */}
                    {subCategory.subCategories.map((subCategory) => (
                      <li key={subCategory.name}>
                        <CategoryName
                          name={subCategory.name}
                          num={subCategory.num}
                          handleClickCategory={handleClickCategory}
                        />
                        {/* 서브 카테고리 2 포스트 */}
                        <Posts
                          posts={subCategory.posts}
                          isSelected={selectedCategory === subCategory.name}
                        />
                      </li>
                    ))}
                  </ul>
                  {/* 서브 카테고리 1 포스트 */}
                  <Posts
                    posts={subCategory.posts}
                    isSelected={selectedCategory === subCategory.name}
                  />
                </li>
              ))}
            </ul>
            {/* 루트 카테고리 포스트 */}
            <Posts
              posts={category.posts}
              isSelected={selectedCategory === category.name}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Category

// <카테고리 이름> 서브 컴포넌트
const CategoryName: React.FC = React.memo(
  ({ name, num, handleClickCategory }) => {
    return (
      <Link
        to={`/posts/${name}`}
        className="sidebar__category--text"
        onClick={(event) => {
          handleClickCategory(event, name)
        }}
      >
        {`${name}\u00a0\u00a0(${num})`}
      </Link>
    )
  }
)

// <포스트 목록> 서브 컴포넌트
const Posts: React.FC = React.memo(({ posts, isSelected }) => {
  const postsRef = useRef<HTMLUListElement>(null)

  // css를 위한 변수 전달
  useEffect(() => {
    const postsEle = postsRef.current
    postsEle &&
      postsEle.style.setProperty('--posts-count', posts.length.toString())
  }, [])

  // 디렉토리 선택 여부
  const selected = isSelected ? 'open' : null

  return (
    <ul ref={postsRef} className={`sidebar__posts ${selected}`}>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/posts/${post.relativePath}`} activeClassName="active">
            {post.title || post.name}
          </Link>
        </li>
      ))}
    </ul>
  )
})
