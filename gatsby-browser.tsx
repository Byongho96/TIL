import '@styles/_reset.scss'
import '@styles/_global.scss'
import React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import ThemeProvider from '@contexts/theme-context'
import NavigationLayout from '@layouts/navigation-layout'

export const wrapRootElement: GatsbyBrowser = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}

export const wrapPageElement: GatsbyBrowser = ({ element, props }) => {
  return <NavigationLayout {...props}>{element}</NavigationLayout>
}
