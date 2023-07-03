import React, { useContext, useRef } from 'react'
import './404.scss'
import RainingCanvas from '@components/raining-canvas'
import { ThemeContext } from '@contexts/theme-context'

const NotFoundPage: React.FC<PageProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useContext(ThemeContext)

  let color = '#ffffff'
  let isThunder = true
  if (theme === 'light') {
    color = '#888888'
    isThunder = false
  }

  return (
    <div className="not-found--layout" ref={containerRef}>
      <div className="not-found__text">404</div>
      <div className="not-found__background">
        <RainingCanvas
          containerRef={containerRef}
          color={color}
          isThunder={isThunder}
        />
      </div>
    </div>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
