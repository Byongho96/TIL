import React from 'react'
import './style.scss'
import { Link } from 'gatsby'
import useCategories from '@hooks/use-categories'

const NUMBER_OF_LISTS = 15 // 화면에 표시할 카테고리 갯수. CSS 파일의 숫자와 동일해야함

const IndexWheel: React.FC = () => {
  const categories = useCategories()

  categories.sort(() => 0.5 - Math.random()) // 데이터 섞기
  const selectedCategories = categories.slice(0, NUMBER_OF_LISTS)

  // 이벤트 발생 element에 styles.stop 클래스 추가
  const handleMouseEnter = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement
    target.classList.add('stop')
  }

  // 이벤트 발생 element에 styles.stop 클래스 추가
  const handleMouseLeave = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement
    target.classList.remove('stop')
  }

  return (
    <ul
      className="index-wheel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {selectedCategories.map((category) => (
        <li className="index-wheel__category" key={category.id}>
          <Link href={`/posts/${category.name}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default IndexWheel
