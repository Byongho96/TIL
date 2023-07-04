import React, { createRef, useEffect } from 'react'
import './style.scss'

export interface GiscusProps {
  theme?:
    | 'light'
    | 'light_high_contrast'
    | 'light_protanopia'
    | 'light_tritanopia'
    | 'dark'
    | 'dark_high_contrast'
    | 'dark_protanopia'
    | 'dark_tritanopia'
    | 'dark_dimmed'
    | 'preferred_color_scheme'
    | 'transparent_dark'
    | 'noborder_light'
    | 'noborder_dark'
    | 'cobalt'
  lang?: 'en' | 'ko'
}

const Giscus: React.FC<GiscusProps> = React.memo(
  ({ theme = 'light', lang = 'ko' }) => {
    const giscusRef = createRef<HTMLElement>(null)

    // utternace를 적용하기 위한 script를 html에 성생
    useEffect(() => {
      const giscusance = giscusRef.current // useMemo 초기화 전에 기억
      const giscusScript = document.createElement('script')

      const attributes = {
        src: 'https://giscus.app/client.js',
        'data-repo': 'Byongho96/TIL',
        'data-repo-id': 'R_kgDOHqT9Kw',
        'data-category': 'Announcements',
        'data-category-id': 'DIC_kwDOHqT9K84CXqXc',
        'data-mapping': 'pathname',
        'data-strict': '0',
        'data-reactions-enabled': '1',
        'data-emit-metadata': '0',
        'data-input-position': 'bottom',
        'data-theme': theme,
        'data-lang': lang,
        crossorigin: 'anonymous',
        async: true,
      }

      Object.entries(attributes).forEach(([key, value]) => {
        giscusScript.setAttribute(key, value)
      })

      giscusance.appendChild(giscusScript)

      return () => {
        // giscuss 내부 요소 삭제
        giscusance.childNodes.forEach((giscusance) => {
          giscusance.remove()
        })
      }
    }, [theme, lang])

    return <section ref={giscusRef} />
  }
)

export default Giscus
