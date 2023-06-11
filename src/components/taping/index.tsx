import * as React from 'react'
import * as styles from './style.module.scss'

type props = {
  color: 'black' | 'red'
  phrase?: string
}

const Taping: React.FC = ({ color, phrase = 'coming soon' }: props) => {
  const repeatArray = new Array(10).fill(null)

  return (
    <div className={`${styles.tape} ${styles[color]}`}>
      {repeatArray.map((_, index) => (
        <p key={index}>{phrase}</p>
      ))}
    </div>
  )
}

export default Taping
