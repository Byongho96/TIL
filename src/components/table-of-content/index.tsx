import React, { useEffect } from 'react'
import './style.scss'

const TableOfContent: React.FC = ({ toc }) => {
  useEffect(() => {
    function handleScroll() {
      const TOP_THRESHOLD = 100
      const headerElements = document.querySelectorAll(
        '.markdown-body h1, .markdown-body h2, .markdown-body h3'
      ) // toc 스크롤 기능을 적용하고자하는 헤더를 선택한다.

      let isSet = false
      for (let idx = 0; idx < headerElements.length; idx++) {
        const headerElement = headerElements[idx]
        const { top } = headerElement.getBoundingClientRect() // 현재 뷰포인트 기준, 요소의 상단 상대적 위치

        // toc에서 헤더 id에 대응하는 요소를 탐색
        const id = encodeURI(headerElement.id) // 한글을 url 형식으로 인코딩
        const tocElement = document.querySelector(`.toc a[href="#${id}"]`)

        if (!tocElement) return // 대응하는 toc 요소가 없으면 종료(비정상)

        // 조건에 만족하는 첫번째 헤더를 찾았을 때
        if (top > TOP_THRESHOLD && !isSet) {
          isSet = true
          tocElement.classList.remove('active') // 현제 헤더도 active 클래스 제거
          if (idx > 0) {
            // 첫번째 요소가 아닐경우, 이전 헤더를 찾아 active 클래스 추가
            const previousHeaderElement = headerElements[idx - 1]
            const previousId = encodeURI(previousHeaderElement.id)
            const previousTocElement = document.querySelector(
              `.toc a[href="#${previousId}"]`
            )
            previousTocElement.classList.add('active')
          }
        } else {
          // 그 외는 모두 active 클래스 제거
          tocElement.classList.remove('active')
        }
      }

      // 모든 헤더를 탐색 완료했을 때까지 isSet이 false이면, 마지막 헤더에 active 클래스 추가
      if (!isSet) {
        const headerElement = headerElements[headerElements.length - 1]
        const id = encodeURI(headerElement.id)
        const tocElement = document.querySelector(`.toc a[href="#${id}"]`)
        tocElement.classList.add('active')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      // clean-up
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return <div className={`toc`} dangerouslySetInnerHTML={{ __html: toc }} />
}

export default TableOfContent
