import React, { createRef, useEffect, memo } from 'react'
import './style.scss'

export interface UtterancesProps {
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

const Utterances: React.FC<UtterancesProps> = memo(
  ({ theme = 'github-light' }) => {
    const utterRef = createRef<HTMLElement>(null)

    // utternace를 적용하기 위한 script를 html에 성생
    useEffect(() => {
      const utterance = utterRef.current // useMemo 초기화 전에 기억
      const utterScript = document.createElement('script')

      const attributes = {
        src: 'https://utteranc.es/client.js',
        repo: 'byongho96/TIL',
        'issue-term': 'pathname',
        theme: theme,
        label: '🔮comments🔮',
        crossOrigin: 'anonymous',
        async: true,
      }

      Object.entries(attributes).forEach(([key, value]) => {
        utterScript.setAttribute(key, value)
      })

      utterance.appendChild(utterScript)

      return () => {
        // utternance 내부 요소 삭제
        utterance.childNodes.forEach((utterance) => {
          utterance.remove()
        })
      }
    }, [theme])

    return <section ref={utterRef} />
  }
)

export default Utterances
