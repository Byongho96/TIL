import * as React from 'react'
import * as styles from './style.module.scss'

type props = {
  color: 'black' | 'red'
  phrase?: string
}

const TableContent: React.FC = ({ color, phrase = 'coming soon' }: props) => {
  const repeatedPhrase = phrase.repeat(10)

  return (
    <div className={`${styles.tape} ${styles[color]}`}> {repeatedPhrase}</div>
  )
}

export default TableContent
