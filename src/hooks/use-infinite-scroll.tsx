import { useEffect, RefObject } from 'react'
import { throttle } from 'lodash'

/*
무한스크롤 커스텀 훅
특정 DOM요소를 ref로 받은 뒤,
해당 요소의 마지막으로 스크롤이 닿았을 때, loadMore 함수(api 요청하는 비동기 함수) 실행
*/

type InfiniteScrollProps = {
  ref?: RefObject<HTMLElement> // 무한스크롤이 동작할 DOM 엘리먼트를 ref로 받음
  isEnd: boolean // 더이상 로드할 데이터가 없을 때, true로 설정
  loadMore: () => void // 컨텐츠를 로드할 함수
}

const useInfiniteScroll = function ({
  ref,
  isEnd,
  loadMore,
}: InfiniteScrollProps): InfiniteScrollReturns {
  // 스크롤 이벤트 감지 함수

  useEffect(() => {
    if (isEnd) return

    const handleScroll = () => {
      const element = ref?.current ? ref.current : document.documentElement
      const THRESHOLD = 20

      const { scrollTop, scrollHeight, clientHeight } = element // 엘리먼트의 스크롤 정보
      if (scrollHeight - scrollTop - clientHeight > THRESHOLD) return

      loadMore()
    }

    const throttledHandleScroll = throttle(handleScroll, 100)

    window.addEventListener('scroll', throttledHandleScroll) // element에 스크롤 이베트 감지함수 부착
    // cleanup 함수
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [ref, isEnd, loadMore])
}

export default useInfiniteScroll