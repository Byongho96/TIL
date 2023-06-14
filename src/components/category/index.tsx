import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import * as styles from './style.module.scss'
import { useCategorizedPosts } from '@hooks/use-categorized-posts'
import { cutLetters } from '@utils/cutLetters'

// 최대 3단계 카테고리까지만(루트 카테고리 포함) 지원

const Category: React.FC = ({ selectedCategory = '' }) => {
  const { totalPosts, categories } = useCategorizedPosts()
  const [clickedCategory, setClickedCategory] = useState(selectedCategory)

  const handleClickCategory = (event, name) => {
    event.stopPropagation()
    if (event.detail == 1) {
      event.preventDefault()
    }
    if (clickedCategory === name) {
      setClickedCategory('')
    } else {
      setClickedCategory(name)
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.total}>{`전체 글 (${totalPosts})`}</p>
      <ul className={styles.categories}>
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
                          isSelected={clickedCategory === subCategory.name}
                        />
                      </li>
                    ))}
                  </ul>
                  {/* 서브 카테고리 1 포스트 */}
                  <Posts
                    posts={subCategory.posts}
                    isSelected={clickedCategory === subCategory.name}
                  />
                </li>
              ))}
            </ul>
            {/* 루트 카테고리 포스트 */}
            <Posts
              posts={category.posts}
              isSelected={clickedCategory === category.name}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

const CategoryName: React.FC = ({ name, num, handleClickCategory }) => {
  return (
    <Link
      to={`/posts/${name}`}
      className={styles.category}
      activeClassName="active"
      onClick={(event) => {
        handleClickCategory(event, name)
      }}>
      <span className={styles.name}>{name}</span>
      <span className={styles.num}>{'\u00a0\u00a0(' + num + ')'}</span>
    </Link>
  )
}

const Posts: React.FC = ({ posts, isSelected }) => {
  const selected = isSelected ? styles.selected : ''

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className={`${styles.post} ${selected} `}>
          <Link to={`/posts/${post.relativePath}`} activeClassName="active">
            {cutLetters(post.title || post.name, 13)}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Category
