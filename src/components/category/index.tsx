import React, { useState } from 'react'
import { Link } from 'gatsby'
import * as styles from './style.module.scss'
import { useCategorizedPosts } from '@hooks/use-categorized-posts'

// 최대 3단계 카테고리까지만(루트 카테고리 포함) 지원

const Category: React.FC = ({ selectedCategory = '' }) => {
  const data = useCategorizedPosts()
  const [clickedCategory, setClickedCategory] = useState(selectedCategory)

  console.log(data)

  const handleClickCategory = (name) => {
    setClickedCategory(name)
  }

  return (
    <ul className={`${styles.container} ${styles.categories}`}>
      {/* 루트 카테고리 */}
      {data.map((category) => (
        <li key={category.name}>
          <CategoryName
            name={category.name}
            handleClickCategory={handleClickCategory}
          />
          <ul className={styles.categories}>
            {/* 서브 카테고리 1 */}
            {category.subCategories.length > 1 &&
              category.subCategories.map((subCategory) => (
                <li key={subCategory.name}>
                  <CategoryName
                    name={subCategory.name}
                    handleClickCategory={handleClickCategory}
                  />
                  <ul className={styles.categories}>
                    {/* 서브 카테고리 2 */}
                    {subCategory.subCategories.length > 1 &&
                      subCategory.subCategories.map((subCategory) => (
                        <li key={subCategory.name}>
                          <CategoryName
                            name={subCategory.name}
                            handleClickCategory={handleClickCategory}
                          />
                          {/* 서브 카테고리 2 포스트 */}
                          {clickedCategory === subCategory.name && (
                            <Posts posts={subCategory.posts} />
                          )}
                        </li>
                      ))}
                  </ul>
                  {/* 서브 카테고리 1 포스트 */}
                  {clickedCategory === subCategory.name && (
                    <Posts posts={subCategory.posts} />
                  )}
                </li>
              ))}
          </ul>
          {/* 루트 카테고리 포스트 */}
          {clickedCategory === category.name && (
            <Posts posts={category.posts} />
          )}
        </li>
      ))}
    </ul>
  )
}

const CategoryName: React.FC = ({ name, handleClickCategory }) => {
  return (
    <Link
      to={`/posts/${name}`}
      activeClassName="active"
      className={styles.category}
      onClick={() => {
        handleClickCategory(name)
      }}>
      {name}
    </Link>
  )
}

const Posts: React.FC = ({ posts }) => {
  return (
    <ul className={styles.posts}>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            to={`/posts/${post.relativePath}`}
            activeClassName="active"
            className={styles.post}>
            {post.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Category
