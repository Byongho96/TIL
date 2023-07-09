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

// https://utteranc.es/client.js

// (() => {
//   const e = window.matchMedia('(prefers-color-scheme: dark)').matches
//       ? 'github-dark'
//       : 'github-light',
//     t = new URL(location.href),
//     n = t.searchParams.get('utterances')
//   n &&
//     (localStorage.setItem('utterances-session', n),
//     t.searchParams.delete('utterances'),
//     history.replaceState(void 0, document.title, t.href))
//   let r = document.currentScript
//   void 0 === r &&
//     (r = document.querySelector(
//       'script[src^="https://utteranc.es/client.js"],script[src^="http://localhost:4000/client.js"]'
//     ))
//   const i = {}
//   for (let e = 0; e < r.attributes.length; e++) {
//     const t = r.attributes.item(e)
//     i[t.name.replace(/^data-/, '')] = t.value
//   }
//   'preferred-color-scheme' === i.theme && (i.theme = e)
//   const a = document.querySelector("link[rel='canonical']")
//   ;(i.url = a ? a.href : t.origin + t.pathname + t.search),
//     (i.origin = t.origin),
//     (i.pathname =
//       t.pathname.length < 2
//         ? 'index'
//         : t.pathname.substr(1).replace(/\.\w+$/, '')),
//     (i.title = document.title)
//   const s = document.querySelector("meta[name='description']")
//   i.description = s ? s.content : ''
//   const o = encodeURIComponent(i.description).length
//   o > 1e3 &&
//     (i.description = i.description.substr(
//       0,
//       Math.floor((1e3 * i.description.length) / o)
//     ))
//   const c = document.querySelector(
//     "meta[property='og:title'],meta[name='og:title']"
//   )
//   ;(i['og:title'] = c ? c.content : ''),
//     (i.session = n || localStorage.getItem('utterances-session') || ''),
//     document.head.insertAdjacentHTML(
//       'afterbegin',
//       '<style>\n    .utterances {\n      position: relative;\n      box-sizing: border-box;\n      width: 100%;\n      max-width: 760px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n    .utterances-frame {\n      color-scheme: light;\n      position: absolute;\n      left: 0;\n      right: 0;\n      width: 1px;\n      min-width: 100%;\n      max-width: 100%;\n      height: 100%;\n      border: 0;\n    }\n  </style>'
//     )
//   const l = r.src.match(/^https:\/\/utteranc\.es|http:\/\/localhost:\d+/)[0],
//     h = `${l}/utterances.html`
//   r.insertAdjacentHTML(
//     'afterend',
//     `<div class="utterances">\n    <iframe class="utterances-frame" title="Comments" scrolling="no" src="${h}?${new URLSearchParams(
//       i
//     )}" loading="lazy"></iframe>\n  </div>`
//   )
//   const m = r.nextElementSibling
//   r.parentElement.removeChild(r),
//     addEventListener('message', (e) => {
//       if (e.origin !== l) return
//       const t = e.data
//       t && 'resize' === t.type && t.height && (m.style.height = `${t.height}px`)
//     })
// })()
// //# sourceMappingURL=client.js.map
