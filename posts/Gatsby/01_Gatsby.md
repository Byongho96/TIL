---
title: '01. React vs Gatsby vs Next.js '
updatedAt: '2023-06-16'
createdAt: '2023-06-16'
description: '정적 사이트 생성기(SSG)의 개념과 Gatsby 프로젝트의 프로젝트 구조를 알아본다.'
tags: ['gatsby', 'SSG', 'SSR', 'CSR', '구조', 'gatsb']
isCompleted: false
reference: 'Gatsby Project Structure: https://www.gatsbyjs.com/docs/reference/gatsby-project-structure/'
---

# 시작하기 앞서...

만약 Gatsby를 통해 Markdown기반의 블로그를 만들고 싶다면, 일단 [Gatsby 공식문서](https://www.gatsbyjs.com/docs/tutorial/getting-started/)를 보길 강력히 추천한다. 마치 맞춤형 강의 마냥 정리가 잘 되어 있다. 실제로 가서 보면 친절하게 챕터마다 강의 영상도 있다.

그래서 난 앞으로의 글에서 Gatsby 튜토리얼에 없는 내용들을 다룰 예정이다. 내가 열심히 삽질한 내용을 결과만 뽑아 이쁘게 정리해서 제공하겠다는 말이다. ~~몇 명이나 볼 지는 모르겠지만~~ 예를 들면 다음과 같은 주제들이 다뤄질 것이다.

- **기존 git 레포지토리에 gatsby 블로그 생성하기**
- **폴더 구조를 바탕으로 사이드 네비게이션 바 자동 생성하기**
- **특정 md 파일들만 필터링해서 페이지 생성하기**
- **다크모드 구현하기**

그리고 첫번째 글의 주제는 바로 [정적 사이트 생성기(SSG)](https://www.gatsbyjs.com/docs/conceptual/rendering-options/)의 개념, 그리고 [Gatsby 파일과 폴더구조](https://www.gatsbyjs.com/docs/reference/gatsby-project-structure/)에 대한 내용이다.

[React Hydration](https://www.gatsbyjs.com/docs/conceptual/react-hydration/)

# 1. 정적 사이트 생성기(SSG)

나는 Git 레포지토리를 블로그로 만들고 싶었을 뿐이고,  
구글링해서 Jekyll과 Gatsby라는 프레임워크를 추천 받았고,  
그 중 Gatsby가 리액트 기반의 프레임워크라길래 선택했을 뿐이다.
Gatsby가 뭔지는 모르겠지만 React 비스무리한데 좀 더 쉬운거겠거니 했다.

하지만 프로젝트를 진행할수록 기존의 React랑은 핵심적인 부분에서 다르다는 것을 느꼈다. React에서는 당연한 것들이 Gatsby에서는 불가능 했고, 물론 그 역의 상황도 가끔씩은 있었다. 그 연유를 종 잡지 못한 채 절름거리며 프로젝트를 왐성했고, 지금 와서야 그 이유를 알아 볼 여유가 생겼다.

그동안 내가 경험한 Frontend 프레임워크는 모두 CSR(Client-side Rendering) 기반이었기 때문에, 무의식적으로 내가 이 둘을 동일시 하고 있었다. 이번 Gatsby 프로젝트를 계기로 SSR(Server-side Rendering)과 SSG(Static Site Generator)의 개념 뿐만 아니라, CSR에 대해서도 좀 더 명확하게 개념을 잡게 되었다.

## 1.1. CSR vs SSG

Gatsby는 정적 사이트 생성기(Static Stie Generator)이며 CSR을 기본적으로 지원한다.

> As already mentioned, Gatsby always supported SSG and client-side rendering.
> [Gatsby: Rendering Options]

그렇다면 정적 사이트가 무엇인지 알아보는 게 인지상정이다. **한 마디로 정적 사이트란, 사용자의 요청에 대해서 늘 동일한 정적 파일(HTML, CSS, JavaScript)를 제공하는 사이트이다.**

여기서 듣고 끄덕인다면 당신은 천재이거나 아니면 똥멍청이 둘 중 하나이다. 생각해보면 리액트같은 CSR 프로젝트도 결과적으로 빌드되면 한 세트의 정적 파일(HTML, CSS, JavaScript)로 변환된어 제공된다. 근데 왜 리액트는 정적 사이트 생성기가 아닐까? 알아본 결과, 다음과 같은 차이점이 있다.

1.  **정적 사이트의 HTML 파일은 이미 렌더링 되어있다.**

    알다시피 CSR 기반의 프로젝트는 빌드되면 다음과 같이 텅 빈 index.html 파일을 내뱉는다. 실제 렌더링은 브라우저가 index.html을 받은 이 후, JavaScript가 `< div id="root" />` 요소를 채워넣으면서 이뤄진다.

    반면 정적 사이트의 html 파일은 빌드 시에, 이미 렌더링이 완성된 상태이다. 즉 브라우저는 완성된 html 파일을 받아 보여줄 뿐이다.

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        ... 메타 태그
        <script defer="defer" src="/static/js/main.ca30c0de.js"></script>
        <link href="/static/css/main.d6754f87.css" rel="stylesheet" />
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>
      </body>
    </html>
    ```

2.  **정적 사이트는 모든 페이지에 대해서 html을 제공한다**

    CSR 프레임워크가 하나의 index.html로 빌드될 수 있었던 까닭은 Single Page Application이기 때문이다. 즉, JavaScript를 이용해서 url마다 다른 컴포넌트를 `< div id="root" />` 붙였다 뗐다 하기 때문이다.

    근데 정적 사이트는 모든 페이지에 대해서 완성된 html 파일을 제공한다. 빌드 시에 접근 가능한 모든 페이지에 대한 html을 생성해두고, 만약 사용자가 요청한 url에 해당하는 index.html 파일이 없을 경우, 일괄적으로 404.html 을 보여준다.

3.  **정적 사이트의 페이지 데이터는 정적이다**

    보통 React나 Vue로 개발할 때, url 경로에 변수를 넣는 경우가 많다. 예를 들어서 프로필을 조회하는 페이지를 `/profile/:id` 라고 설정할 숭 ㅣㅆ다. 그러면 해당 페이지가 렌더링 되었을 때, url 의 변수를 읽어와 서버에 api 요청을 보내고, 그 결과에 따라서 페이지를 렌더링한다.

    Gatsby도 동일한 기능을 제공하기는 하지만, 이러한 **페이지에 대한 데이터**는 정적이다는 점에서 다르다. 좀 더 자세히 설명해보자면, 2번 항목에서 설명한 것처럼 Gatsby는 접근 가능한 모든 페이지에 대한 완성된 html파일을 만든다. 따라서 프로젝트가 빌드 되는 시점의 데이터를 스냅샷하여 페이지를 생성한다.

    한 가지 오해말아야할 것이 **페이지에 대한 데이터**가 정적인다는 것이다. Gatsby에서도 여전히 axios라이브러리를 활용하여 동적으로 데이터를 가져올 수 있다. 이는 Gatsby가 SSG와 더불어 CSR 기능을 제공하기 때문인데, 관련되 내용은

즉 정리하자면, SSG는 CSR과 다르게 이미 모든 페이지(url)경로에 대한 pre-rendered된 html파일을 제공한다.

## 1.2. SSR vs SSG

나의 경우 여기서 두번째 고뇌에 빠졌다. 뭔가 완성된 파일을 제공하는 것이니까 정적사이트 생성기가 곧 SSR인거 아닌가?

이건 내가 SSR에 대한 첫 인식을 잘못 잡았기 때문에 발생한 쓰잘데기 없는 고민이었다.

Server-Side Rendering 말 그대로 서버측에서 렌더링해서 보여주는 것이다. 정적사이트는 정확히 말하면 서버에서 렌더링하는 것이 아니다. 서버란 말 그대로 24시간 돌아가며 요청을 수행하는 컴퓨터인데, 빌드된 정적파일을 제공하기 위해서 githu cloud나 netflify와 같은 서버를 이용하기는 하겠지만, 해당 컴퓨터에서 렌더링이 발생하는 것은 아니다. 렌더링은 프로젝트 빌드 시점에 1회로 완성이 되고, 서버는 그저 완성된 정적파일(html, css, js)를 제공할 뿐이다.

Server-side Rendering이란 서버에서 실시간으로 렌더링이 일어나기 때문에, 정적사이트와 다르게 동적인 실시간 데이터를 바탕으로 렌더링할 수 있다. 예를 들어 아까 말한것처럼 ㅇ

뭔가 설명이 부족하다고 느끼면 착각이 아니다. 왜냐하면 내가 아직 Next.js를 안써봐서 SSR에 경헙지식이 없다.

## 1.3. SSG 장단점

## 1.3. Gatsby의 CSR

정적 사이트를 동작한다

이게 끝이 아니다. CSR을 기반으로 동작한다. 생각해봐라 만일 정말 정적이라며 너무 사이트가 재미없을 것이다. 사용자으 인터랙션에 따라 새로운 데이터르 ㄹfetching하기도 DOM 트리가 변경되기도 해야한느데 말이다.

이를 위해서 Gatsby는 Hydration을 제공한다.

# 2. Gatsby 폴더 구조

# 3. Gatsby 파일

## 1.1. gatsby-config.js: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. Check out the config docs for more detail.

## 1.2. gatsby-node.js: This file is where Gatsby expects to find any usage of the Gatsby node APIs (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

## 1.3. gatsby-browser.js: This file is where Gatsby expects to find any usage of the Gatsby browser APIs (if any). These allow customization/extension of default Gatsby settings affecting the browser.

## 1.4. gatsby-ssr.js:

# 2. gatsby-node

Both static site generators and server-side rendering are used to generate HTML for each of your site’s URLs. The difference is that static rendering happens once at build time, while server rendering happens on-demand, as the user requests each file 123.

With static site generators, you’ll need to generate a single HTML file for every page that the user can access ahead of time. This means that the HTML is generated at build time and will be reused on each request 3.

On the other hand, server-side rendering generates the HTML on each request. When a request is made from the client/browser to the server, the HTML is generated on-the-fly run-time and sent back to the browser to be rendered 4.

In summary, static site generators are ideal for sites with relatively simple content that doesn’t change frequently. Server-side rendering is better suited for sites with more complex content that changes frequently 1.

I hope this helps! Let me know if you have any other questions.

# 4. 참고자료

1. Rendering Optons
2. Hydration
3. Gatsby Project Structure
