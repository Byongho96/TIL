import * as React from 'react'
import * as styles from './style.module.scss'
import Navigation from '@components/navigation'

const NavigationLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navigation />
      {children}
    </div>
  )
}

export default NavigationLayout
