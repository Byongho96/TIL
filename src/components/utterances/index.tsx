import React, { createRef, useEffect } from 'react'
import './style.scss'

const src = 'https://utteranc.es/client.js'

export interface IUtterancesProps {
  theme?:
    | 'github-light'
    | 'github-dark'
    | 'preferred-color-scheme'
    | 'github-dark-orange'
    | 'icy-dark'
    | 'dark-blue'
    | 'photon-dark'
    | 'boxy-light'
    | 'gruvbox-dark'
}

const Utterances: React.FC<IUtterancesProps> = React.memo(
  ({ theme = 'github-light' }) => {
    const utterRef = createRef<HTMLDivElement>(null)

    // utternace를 적용하기 위한 script를 html에 성생
    useEffect(() => {
      const utterElement = utterRef.current // return문에서 접근하기 위해 미리 const로 할당
      const utterances = document.createElement('script')

      const attributes = {
        src: 'https://utteranc.es/client.js',
        repo: 'byongho96/TIL',
        'issue-term': 'pathname',
        theme,
        label: '✨💬 comments ✨',
        crossOrigin: 'anonymous',
        async: 'false',
      }

      Object.entries(attributes).forEach(([key, value]) => {
        utterances.setAttribute(key, value)
      })

      utterElement.appendChild(utterances)

      // theme이 변경되면 utterRㄷf의 child를 삭제하고 다시 생성
      return () => {
        utterElement.removeChild(utterElement.firstChild)
      }
    }, [theme])

    // 반환할 element
    return <div id="utterances" ref={utterRef} />
  }
)

export default Utterances
