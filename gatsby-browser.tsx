import '@styles/_reset.scss'
import '@styles/_global.scss'
import '@styles/_markdown.scss'
import 'prismjs/themes/prism-solarizedlight.css' // markdown외부에서 prismjs 스타일링이 필요할 시 주석 해제

import React from 'react'
import ThemeProvider from '@contexts/theme-context'
import NavigationLayout from '@layouts/navigation-layout'

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}

export const wrapPageElement = ({ element, props }) => {
  return <NavigationLayout {...props}>{element}</NavigationLayout>
}
