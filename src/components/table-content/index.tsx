import * as React from 'react'
import * as styles from './style.module.scss'

const TableContent: React.FC = ({ toc }) => {
  console.log(toc)
  return <div className="toc" dangerouslySetInnerHTML={{ __html: toc }} />
}

export default TableContent
