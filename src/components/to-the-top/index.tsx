import React from 'react'
import './style.scss'
import UpIcon from '@assets/svgs/up.svg'

const ToTheTop: React.FC = () => {
  // 클릭 시, 페이지 최상단으로 이동
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 동작 안함
    })
  }

  return (
    <div className="to-the-top" onClick={handleClick}>
      <UpIcon />
      <span style={{ '--i': 0 }} />
      <span style={{ '--i': 1 }} />
    </div>
  )
}

export default ToTheTop
