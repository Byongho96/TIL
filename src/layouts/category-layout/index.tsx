import * as React from 'react'
import * as styles from './style.module.scss'
import Category from '@components/category'

const CategoryLayout = ({ selectedCategory, children }) => {
  return (
    <div className={styles.container}>
      <Category selectedCategory={selectedCategory} />
      {children}
    </div>
  )
}

export default CategoryLayout
