---
title: '06. Gatsby 네비게이션 레이아웃 설정'
updatedAt: '2023-06-27'
createdAt: '2023-06-27'
isCompleted: false
description: 'SSG 기반 Gatsby 프로젝트에서 unmount되지 않는 네비게이션 레이아웃을 만든다.'
tags: ['gatsby', 'layout', '레이아웃', 'navigation', '네비게이션']
reference:
---

# 1. SSG 렌더링

React에서는 Nested Route로 손 쉽게 레이아웃을 구현할 수 있다. **그런데 Gatsby는 Single Page Application이 아니다!** Gatsby는 정적 사이트 생성기(SSG)로 빌드 시에, 모든 url 경로에 대한 index.html을 작성하고 사용자가 요청하면 해당 index.html을 반환한다. 다시 말해서 <mark>클라이언트는 매 페이지(url)마다 독립된 index.html을 제공받는다.</mark>

[Gatsby 공식문서](https://www.gatsbyjs.com/docs/how-to/routing/layout-components/)에서도 이를 명확하게 말하고 있다.

> As mentioned earlier, Gatsby does not, by default, automatically wrap pages in a layout component. The “top level” component is the page itself. As a result, when the “top level” component changes between pages, React will re-render all children. This means that shared components like navigations will unmount and remount. 

다행히 이어서 바로 해결방법도 제시한다. browser API & SSR API의 `wrapPageElement`를 사용하면 된다고 한다.

> If you need to set a wrapper component around page components that won’t get unmounted on page changes, use the wrapPageElement browser API and the SSR equivalent.

# 1.1. Navigation Layout

일단 먼저 Layout Component를 작성한다. 나늠 다음과 같이 작성했다.

```js
import React from 'react'
import Footer from '@components/footer'
import Navigation from '@components/navigation'

interface Props {
  children: React.ReactNode
}

const NavigationLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}

export default NavigationLayout
```

# 1.2. WrapPageElement 

그리고 gatsby-browser파일에 다음처럼 코드를 작성하기만 하면 된다. 좀 특이했던 것은 jsx 문법을 사용해야하기 때문에

- `import React from 'react` 구문을 넣고
- 파일 이름을 `gatsby-browser.ts`에서 `gatsby-browser.tsx`로 바꿔야 했다. 

ssr APIs에도 동일한 `wrapPageElement`가 있기 때문에, 본인의 프로젝트가 SSR 렌더링을 사용한다면 gatsby-ssr에도 같은 코드를 입력하면 된다.

```js
import React from 'react'
import NavigationLayout from '@layouts/navigation-layout'

export const wrapPageElement = ({ element, props }) => {
  return <NavigationLayout {...props}>{element}</NavigationLayout>
}
```

이렇게 되면 해당 Layout Component가 항상 페이지를 감싸기 때문에 Page Component에서 따로 Layout과 관련된 코드를 넣지 않아도 된다.

```js
import * as React from 'react'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div>
      Home Page
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
```

# 2. 참조
- [Gatsby Layout Components](https://www.gatsbyjs.com/docs/how-to/routing/layout-components/)
- [Gatsby Browser APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/)