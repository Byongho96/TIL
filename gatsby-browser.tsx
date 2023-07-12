import '@styles/_reset.scss'
import '@styles/_global.scss'
import React from 'react'
import ThemeProvider from '@contexts/theme-context'
import NavigationLayout from '@layouts/navigation-layout'
import type { GatsbyBrowser } from 'gatsby'

export const wrapRootElement: GatsbyBrowser = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>
}

export const wrapPageElement: GatsbyBrowser = ({ element, props }) => {
  return <NavigationLayout {...props}>{element}</NavigationLayout>
}

// 서비스 워커 업데이트
export const onServiceWorkerUpdateReady: GatsbyBrowser = () => {
  const answer = window.confirm(
    `This application has been updated. ` +
      `Reload to display the latest version?`
  )

  if (answer === true) {
    window.location.reload()
  }
}
