import React, { useEffect, useRef } from 'react'
import * as styles from './404.module.scss'
import NotFoundIcon from '@assets/svgs/not-found.svg'
import RainingCanvas from '@components/raining-canvas'

const NotFoundPage: React.FC<PageProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const svgMain = document.querySelector(`.svg-main`)
    const svgPaths = svgMain?.querySelectorAll(`path`)
    svgPaths?.forEach((path, index) => {
      const length = path.getTotalLength()
      path.style.setProperty(`--length`, length)
      path.style.setProperty(`--delay`, `${index * 0.2}s`)
      path.style.setProperty(`--duration`, `${length * 0.003}s`)
    })
  }, [])

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.icon}>
        <NotFoundIcon />
      </div>
      <div className={styles.canvas}>
        <RainingCanvas containerRef={containerRef} />
      </div>
    </div>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
