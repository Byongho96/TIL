import React from 'react'
import * as styles from './style.module.scss'
import Footer from '@components/footer'
import Navigation from '@components/navigation'

interface Props {
  children: React.ReactNode
}

const NavigationLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

export default NavigationLayout
