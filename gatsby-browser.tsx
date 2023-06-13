import '@styles/_reset.scss'
import '@styles/_global.scss'
import '@styles/_markdown.scss'
import 'prismjs/themes/prism-tomorrow.min.css' // 원하는 스타일링 선택
// coy, dark, funky, okaidia, solarizedlight, tomorrow, twilight

import React from 'react'
import ThemeProvider from '@contexts/theme-context'
import NavigationLayout from '@layouts/navigation-layout'

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}

export const wrapPageElement = ({ element, props }) => {
  return <NavigationLayout {...props}>{element}</NavigationLayout>
}
