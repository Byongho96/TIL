import React from 'react'
import './style.scss'
import { Link } from 'gatsby'
import { useCategorizedPosts } from '@hooks/use-categorized-posts'

interface Props {
  defaultCategory?: string // 기본으로 선택된 카테고리
}

// 최대 3단계 카테고리까지만(루트 카테고리 포함) 지원
const Category: React.FC<Props> = ({ defaultCategory = '' }) => {
  const { totalPosts, categories } = useCategorizedPosts()

  return (
    <nav className="sidebar">
      <Link
        to={`/posts/`}
        aria-label="전체 게시글"
      >{`전체 글 (${totalPosts})`}</Link>
      <ul className="sidebar__root-categories">
        {/* 루트 카테고리 */}
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              to={`/posts/${category.name}`}
              aria-label={`${category.name} 관련 게시글`}
            >
              {category.name}
            </Link>
            <ul className="sidebar__sub-categories">
              {/* 서브 카테고리 1 */}
              {category.subCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={`/posts/${category.name}`}
                    className={
                      defaultCategory === category.name ? 'selected' : ''
                    }
                    aria-label={`${category.name} 관련 게시글`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Category
