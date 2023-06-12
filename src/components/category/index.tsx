import React, { useState } from 'react'
import { Link, navigate } from 'gatsby'
import * as styles from './style.module.scss'
import { useCategorizedPosts } from '@hooks/use-categorized-posts'
import { cutLetters } from '@utils/cutLetters'

// 최대 3단계 카테고리까지만(루트 카테고리 포함) 지원

const Category: React.FC = ({ selectedCategory = '' }) => {
  const data = useCategorizedPosts()
  const [clickedCategory, setClickedCategory] = useState(selectedCategory)

  const handleClickCategory = (event, name) => {
    if (event.detail == 1) {
      event.preventDefault()
    }
    setClickedCategory(name)
  }

  return (
    <ul className={styles.container}>
      {/* 루트 카테고리 */}
      {data.map((category) => (
        <li key={category.name} className={styles.category}>
          <CategoryName
            name={category.name}
            handleClickCategory={handleClickCategory}
          />
          <ul>
            {/* 서브 카테고리 1 */}
            {category.subCategories.map((subCategory) => (
              <li key={subCategory.name} className={styles.category}>
                <CategoryName
                  name={subCategory.name}
                  handleClickCategory={handleClickCategory}
                />
                <ul>
                  {/* 서브 카테고리 2 */}
                  {subCategory.subCategories.map((subCategory) => (
                    <li key={subCategory.name} className={styles.category}>
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
      onClick={(event) => {
        handleClickCategory(event, name)
      }}>
      {name}
    </Link>
  )
}

const Posts: React.FC = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className={styles.post}>
          <Link to={`/posts/${post.relativePath}`} activeClassName="active">
            {cutLetters(post.title || post.name, 13)}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Category
