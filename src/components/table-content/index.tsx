import React, { useEffect } from 'react'

import * as styles from './style.module.scss'

const TableContent: React.FC = ({ toc }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = encodeURI(entry.target.getAttribute('id')) // 한글 url 인코딩
          const targetContent = document.querySelector(`.toc a[href="#${id}"]`) // toc에서 해당 id를 가진 태그 선택
          if (targetContent) {
            if (entry.intersectionRatio > 0) {
              targetContent.classList.add(styles.active)
            } else {
              targetContent.classList.remove(styles.active)
            }
          }
        })
      },
      { rootMargin: `0% 0% -85% 0%` } // 관측 영역: TOP, RIGHT, BOTTOM, LEFT
    )
    // 트래킹하고 싶은 태그들 선택
    document
      .querySelectorAll(
        '.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4'
      )
      .forEach((section) => {
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
