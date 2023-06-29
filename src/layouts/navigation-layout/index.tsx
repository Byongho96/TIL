import React from 'react'
import './style.scss'
import Footer from '@components/footer'
import Navigation from '@components/navigation'

interface Props {
  children: React.ReactNode
}

const NavigationLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="nav-layout">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

export default NavigationLayout
