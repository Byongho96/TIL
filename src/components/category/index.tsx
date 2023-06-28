import React, { useState, useRef, useEffect } from 'react'
import './style.scss'
import { Link } from 'gatsby'
import { useCategorizedPosts } from '@hooks/use-categorized-posts'

interface Props {
  openedCategory?: string
}

// 최대 3단계 카테고리까지만(루트 카테고리 포함) 지원
const Category: React.FC<Props> = ({ openedCategory = '' }) => {
  const { totalPosts, categories } = useCategorizedPosts()
  const [selectedCategory, setSelectedCategory] = useState(openedCategory)

  const handleClickCategory = (event, name) => {
    if (event.detail > 1) return
    event.preventDefault()
    setSelectedCategory(selectedCategory === name ? '' : name)
  }

  return (
    <nav className="sidebar">
      <div className="sidebar__total">{`전체 글 (${totalPosts})`}</div>
      <ul className="sidebar__menu">
        {/* 루트 카테고리 */}
        {categories.map((category) => (
          <li key={category.name}>
            <CategoryName
              name={category.name}
              num={category.num}
              handleClickCategory={handleClickCategory}
            />
            <ul>
              {/* 서브 카테고리 1 */}
              {category.subCategories.map((subCategory) => (
                <li key={subCategory.name}>
                  <CategoryName
                    name={subCategory.name}
                    num={subCategory.num}
                    handleClickCategory={handleClickCategory}
                  />
                  <ul>
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

const CategoryName: React.FC = React.memo(
  ({ name, num, handleClickCategory }) => {
    return (
      <Link
        to={`/posts/${name}`}
        className="sidebar__category"
        onClick={(event) => {
          handleClickCategory(event, name)
        }}
      >
        {`${name}\u00a0\u00a0(${num})`}
      </Link>
    )
  }
)

const Posts: React.FC = React.memo(({ posts, isSelected }) => {
  const postsRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const postsEle = postsRef.current

    postsEle &&
      postsEle.style.setProperty('--posts-length', posts.length.toString())
  }, [])

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
export default Category
