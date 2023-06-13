import * as React from 'react'
import * as styles from './style.module.scss'
import Category from '@components/category'
import ProfileImage from '@components/profile-image'

const CategoryLayout = ({ selectedCategory, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.category}>
        <div className={styles.profileImage}>
          <ProfileImage />
        </div>
        <Category selectedCategory={selectedCategory} />
      </div>
      {children}
    </div>
  )
}

export default CategoryLayout
