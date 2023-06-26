import React from 'react'
import * as styles from './style.module.scss'
import Footer from '@components/footer'
import Navigation from '@components/navigation'

const NavigationLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

export default NavigationLayout
