import React from 'react'
import * as styles from './style.module.scss'
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
    <div className={styles.icon} onClick={handleClick}>
      <UpIcon />
    </div>
  )
}

export default ToTheTop
