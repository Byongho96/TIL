import React from 'react'
import * as styles from './style.module.scss'
import Navigation from '@components/navigation'
import Footer from '@components/footer'

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
