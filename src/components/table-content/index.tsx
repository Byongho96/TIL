import React, { useEffect } from 'react'
import * as styles from './style.module.scss'

const TableContent: React.FC = ({ toc }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        console.log(id)
        const targetContent = document.querySelector(`.toc a[href="#${id}"]`)
        console.log('target', targetContent)
        if (targetContent) {
          if (entry.intersectionRatio > 0) {
            targetContent.classList.add('active')
          } else {
            targetContent.classList.remove('active')
          }
        }
      })
    })

    // Track all sections that have an `id` applied
    document.querySelectorAll('h1, h2, h3, h4').forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className={`toc ${styles.toc}`}
      dangerouslySetInnerHTML={{ __html: toc }}
    />
  )
}

export default TableContent
