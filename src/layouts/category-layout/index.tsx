import React, { useState } from 'react'
import * as styles from './style.module.scss'
import Category from '@components/category'
import ProfileImage from '@components/profile-image'

const CategoryLayout = ({ selectedCategory, children }) => {
  const [isCategoryActive, setIsCategoryActive] = useState(false)

  const toggleActive = () => {
    const isActive = !isCategoryActive
    setIsCategoryActive(isActive)

    const categoryElemnt = document.querySelector(`.${styles.category}`)
    const modalElement = document.querySelector(`.${styles.modal}`)

    if (isActive) {
      categoryElemnt.classList.add(`${styles.active}`)
      modalElement.classList.add(`${styles.active}`)
    } else {
      categoryElemnt.classList.remove(`${styles.active}`)
      modalElement.classList.remove(`${styles.active}`)
    }
  }

  const handleCategoryClick = (event) => {
    event.stopPropagation()
    if (isCategoryActive) return
    toggleActive()
  }

  const handleModalClick = (event) => {
    event.stopPropagation()
    if (!isCategoryActive) return
    toggleActive()
  }

  return (
    <div className={styles.container}>
      <div className={styles.category} onClick={handleCategoryClick}>
        <div className={styles.profileImage}>
          <ProfileImage />
        </div>
        <Category selectedCategory={selectedCategory} />
      </div>
      {children}
      <div className={styles.modal} onClick={handleModalClick} />
    </div>
  )
}

export default CategoryLayout
