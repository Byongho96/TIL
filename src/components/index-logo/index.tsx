import React from 'react'
import './style.scss'
import { ThemeContext } from '@contexts/theme-context'

const IndexLogo: React.FC = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className={`index-logo ${theme}`}>
      <div>TODAY</div>
      <div>I</div>
      <div>LEARNED</div>
    </div>
  )
}

export default IndexLogo
