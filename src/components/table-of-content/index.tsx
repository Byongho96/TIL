import React, { useEffect } from 'react'
import './style.scss'

const TableOfContent: React.FC = ({ toc }) => {
  useEffect(() => {
    function handleScroll() {
      const headerElements = document.querySelectorAll(
        '.markdown-body h1, .markdown-body h2, .markdown-body h3'
      )
      const TOP_THRESHOLD = 300

      let isSet = false

      for (let idx = 0; idx < headerElements.length; idx++) {
        const headerElement = headerElements[idx]
        const { top, bottom } = headerElement.getBoundingClientRect()

        const id = encodeURI(headerElement.id) // 한글 url 인코딩
        const tocElement = document.querySelector(`.toc a[href="#${id}"]`) // toc에서 해당 id를 가진 태그 선택

        if (!tocElement) return

        if (top > TOP_THRESHOLD && !isSet) {
          tocElement.classList.remove('active')
          isSet = true
          if (idx > 0) {
            const previousHeaderElement = headerElements[idx - 1]
            const previousId = encodeURI(previousHeaderElement.id) // 한글 url 인코딩
            const previousTocElement = document.querySelector(
              `.toc a[href="#${previousId}"]`
            ) // toc에서 해당 id를 가진 태그 선택
            previousTocElement.classList.add('active')
          }
        } else {
          tocElement.classList.remove('active')
        }
      }

      if (!isSet) {
        const headerElement = headerElements[headerElements.length - 1]
        const id = encodeURI(headerElement.id) // 한글 url 인코딩
        const tocElement = document.querySelector(`.toc a[href="#${id}"]`) // toc에서 해당 id를 가진 태그 선택
        tocElement.classList.add('active')
      }
    }

    const animationFrameTrigger = {}
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <div className={`toc`} dangerouslySetInnerHTML={{ __html: toc }} />
}

export default TableOfContent
