import React, { useState, useRef, useEffect } from 'react'
import { navigate } from 'gatsby'
import * as styles from './style.module.scss'
import { useCategories } from '@hooks/use-categories'

const IndexWheel: React.FC = () => {
  const data = useCategories()
  data.sort(() => 0.5 - Math.random()) // 데이터 섞기

  // 이벤트 발생 element에 styles.stop 클래스 추가
  const handleMouseEnter = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement
    target.classList.add(styles.stop)
  }

  // 이벤트 발생 element에 styles.stop 클래스 추가
  const handleMouseLeave = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLUListElement
    target.classList.remove(styles.stop)
  }

  const handleClick = (name: string) => {
    navigate(`/posts/${name}`)
  }

  return (
    <ul
      className={styles.categories}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {data.slice(0, 15).map((category) => (
        <li
          className={styles.category}
          key={category.id}
          onClick={() => handleClick(category.name)}>
          {category.name}
        </li>
      ))}
    </ul>
  )
}

export default IndexWheel
