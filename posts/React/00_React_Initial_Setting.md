# 리액트 초기 셋팅<!-- omit in toc -->

추후 참고하기 위해, 반복되는 리액트 초기 셋팅 작업을 공식문서를 기반하여 정리한 문서이다.

## Index<!-- omit in toc -->

- [1. Create React App](#1-create-react-app)
- [2. eslint \& prettier](#2-eslint--prettier)
  - [2.1. eslint](#21-eslint)
  - [2.2. prettier](#22-prettier)
- [3. React Router](#3-react-router)
- [4. React Global Store](#4-react-global-store)
  - [4.1. Recoil](#41-recoil)
  - [4.2. Redux Toolkit](#42-redux-toolkit)
- [5. Axios](#5-axios)
- [6. CSS styling](#6-css-styling)
  - [6.1. Sass](#61-sass)
  - [6.2. Styled Component](#62-styled-component)

# 1. Create React App

[Create React App](https://create-react-app.dev/docs/getting-started)은 CSR방식의 리액트 Single Page Application을 쉽게 시작할 수 있도록 도와주는 오픈소스 도구이다. 초기 설정, 구성, 패키지 의존성 등을 자동으로 설정해주기 때문에 개발을 더 빠르게 쉽게 시작할 수 있다.

```bash
npx create-react-app my-app --template typescript
```

- **npx**  
  npm 패키지를 실행하기 위한 도구이다.  
  차이점은 npx는 로컬이나 글로벌에 설치되어 있지 않은 node 패키지도 실행할 수 있다. 또한 이 때, 해당 패키지를 설치하지 않기 때문에 항상 최신 버전의 node 패키지를 실행시킨다.  
  그러한 관점에서 create-react-app은 자주 업데이트 되는 모듈이기 때문에 npx를 통해 실행시키는 것이 적합하다. 공식문서에서도 만일 `npm install -g create-react-app`을 통해 global하게 create-react-app을 설치한 적이 있으면, 이를 uninstall하고 npx로 실행시키길 권장한다.

- **--template typescript**  
  해당 옵션을 이용해 typescript 버전의 리액트 템플릿을 제공받을 수 있다.

[CRA 공식문서](https://create-react-app.dev/docs/importing-a-component/#absolute-imports)를 보면 `tsconfig.json`파일을 수정해서 프로젝트의 절대경로를 수정할 수 있다.

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

# 2. eslint & prettier

협업 개발환경에서 개발자들간 코드 스타일링을 통일시키고, 코드의 품질을 높이기 위해서 eslint와 prettier을 사용한다.

## 2.1. eslint

[eslint 공식문서](https://eslint.org/docs/latest/use/getting-started)에 따라 설치를 진행한다.

1. **기본 명령어 실행**

   ```bash
   npm init @eslint/config
   ```

   위 명령어를 실행할 경우, 프론트엔드 프레임워크, typescript 사용여부 등 다양한 사용자 선택 요청이 나타난다. 자신의 프로젝트에 맞게 선택하면 된다.

2. **.eslintrc 확인**

   ```json
   {
     "extends": "eslint:recommended",
     "rules": {
       "semi": ["error", "always"],
       "quotes": ["error", "double"]
     }
   }
   ```

   명령어를 통해 eslint를 설치하면 .eslintrc라는 config파일이 생성된다.

   - **extends**
     일종의 rules 패키지이다. 자주 사용되는 rule 설정을 하나의 이름으로 모아서 제공한다.
   - **rules**  
     [eslint rules](https://eslint.org/docs/latest/rules)에 기재된 rule을 개별적으로 적용시킬 수 있기 때문에 extends 설정 이후 규칙을 미세조정하는 용도로 사용된다. rule의 강도는 다음과 같이 3가지로 구분된다.

     - "off" or 0: 해당 rule을 적용시키지 않는다.
     - "warn" or 1: 경고 문구만을 표시한다.
     - "error" or 2 - 에러로 처리하고 프로젝트를 실행시키지 않는다.

## 2.2. prettier

prettier는 eslint와 비슷하게 개발자들간의 코드 스타일링을 통일시키는데, 기능과 무관한 **코드 스타일**에 대해서만 작동한다. 보통 eslint와 prettier을 모두 사용하고, 둘 간의 충돌하는 부분에 대해서는 prettier에 설정한 값을 따르도록 한다.

아래 내용은 [prettier 공식문서](https://prettier.io/docs/en/install.html)를 따라 작성하였다.

1. **prettier 설치**

   ```bash
   npm install --save-dev --save-exact prettier
   ```

2. **prettier 설정파일 생성**

   ```bash
   echo {}> .prettierrc.json
   ```

   위 명령어로 프로젝트 루트 경로에 .prettierrc.json 파일을 생성한다. [prettierrc 설정 옵션 문서](https://prettier.io/docs/en/options.html)에서 설정가능한 옵션들을 확인할 수 있으며, [기본설정](https://prettier.io/docs/en/configuration.html)은 다음과 같다.

   ```json
   {
     "trailingComma": "es5",
     "tabWidth": 4,
     "semi": false,
     "singleQuote": true
   }
   ```

3. **.prettierignore 생성**  
    .prettierignore을 통해 prettier을 적용시키지 않을 문서를 설정할 수 있다.

   ```
   # Ignore artifacts:
   build
   coverage
   ```

4. **prettier 포맷팅 실행**

   ```bash
   npx prettier --write .

   # 특정 파일 지정
   npx prettier --write app/components/Button.js
   ```

   위 명령어를 통해 모든 파일 혹은 특정 경로의 파일에 대해 prettier 포맷팅을 적용할 수 있다.

   ```bash
   npx prettier --check .
   ```

   check 옵션은 prettier 포맷팅에 대해 검사만 하고, 코드를 실제 수정하지는 않는다.

5. **prettier editor 적용**  
   사용하는 editor에 prettier을 적용해, 수정된 코드를 바로 바로 확인할 수도 있다. 각 에디터별 prettier 적용방법을 [여기](https://prettier.io/docs/en/editors.html)에서 확인할 수 있고, 대표적인 vsCode의 경우 **Prettier - Code formatter** 플러그인을 설치하면 된다.

6. **eslint-config-prettier 적용**  
   eslint와 prettier 간 충돌이 일어날 때, prettier의 규칙을 따르도록 eslint-config-prettier 패키지를 설치한다.

   ```bash
   npm install --save-dev eslint-config-prettier
   ```

   패키지 설치 후, .eslintrc 파일을 다음과 같이 수정한다.

   ```json
   {
     "extends": ["some-other-config-you-use", "prettier"]
   }
   ```

7. **Git hook 적용**  
   (최근 리액트 프로젝트에서 해당 내용은 적용하지 못했다. husky를 사용하기 위해서는 package.json과 .git이 동일 위치에 있어야 한다. 하지만 우리 프로젝트는 리액트 프로젝트가 .git위치에 비해 1개 depth 하단에 있다. 이에 대한 해결책이 [husky 공식문서](https://typicode.github.io/husky/#/?id=custom-directory)의 custom directory항목에 있었지만, 따라해도 해결되지 않았다.)

   코드 스타일링이 맞지 않으면 git merge시 불필요한 충돌이 일어난다. 따라서 git pre-commit hook에 `prettier --write`명령어를 실행함으로써 모든 커밋의 code 포맷을 맞출 수 있다.[husky](https://github.com/typicode/husky)와 [lint-staged](https://github.com/okonet/lint-staged)는 각각 Git hook과 Git에 등록된 파일을 관리하기 위한 도구이다.

   ```bash
   # --save-dev 옵션이 해당 패키지가
   npm install --save-dev husky lint-staged
   npx husky install
   npm pkg set scripts.prepare="husky install"
   npx husky add .husky/pre-commit "npx lint-staged"
   ```

   - **--save-dev**  
     해당 패키지가 개발환경에만 쓰이는 것을 명시하는 옵션이다. 해당 옵션을 추가할 경우, pacakage.json의 `devDependencies`항목에 패키지가 추가된다. 반대의 경우에는 `dependencies`항목에 추가된다.

   ```json
   {
     "lint-staged": {
       "**/*": "prettier --write --ignore-unknown"
       // "**/*": ["eslint --fix", "prettier --write"]
     }
   }
   ```

   위의 내용을 package.json에 추가한다. 만일 lint-staged에서 eslint관련 작업을 수행할 경우, eslint 작업이 prettier작업보다 선행되어야 한다.

# 3. React Router

React 프로젝트에서 가장 보편적으로 쓰이는 라우팅 라이브러리이다. [React Router 공식문서](https://reactrouter.com/en/main/routers/create-browser-router)에 튜토리얼이 아주 장황하고 이상하게 설명되어 있다. 임의로 핵심만 골라 정리했다.

1. **react-router-dom 설치**

   ```bash
   npm install react-router-dom
   ```

2. **index.tsx 수정**  
   [\<BrouserRouter>](https://reactrouter.com/en/main/router-components/browser-router)는 현재 브라우저의 url주소를 브라우저의 history stack에 저장한다.

   ```ts
   import React from 'react'
   import ReactDOM from 'react-dom/client'
   import { BrowserRouter } from 'react-router-dom'
   import App from './App'

   const root = ReactDOM.createRoot(
     document.getElementById('root') as HTMLElement
   )
   root.render(
     <React.StrictMode>
       <BrowserRouter>
         <App />
       </BrowserRouter>
     </React.StrictMode>
   )
   ```

3. **App.tsx 수정**  
   [\<Rotues>](https://reactrouter.com/en/main/components/routes)는 history의 현재 location이 수정될 때마다 하위 <Route> 순회하며 UI에 렌더링할 컴포넌트를 찾는다.

   ```ts
   import React from 'react'
   import { Routes, Route } from 'react-router-dom'

   function App() {
     return (
       <Routes>
         <Route path="/" element={<Main />} />
       </Routes>
     )
   }

   export default App

   function Main() {
     return (
       ...
     )
   }
   ```

# 4. React Global Store

Recoil과 Redux Toolkit은 리액트에서 잘 쓰이는 전역 저장소이다. 둘 중 프로젝트에 적합한 전역 저장소를 설치한다.

## 4.1. Recoil

[Recoil 공식문서](https://recoiljs.org/ko/docs/introduction/getting-started)에 따라 recoil을 설치한다.

1. **recoil 설치**

   ```bash
   npm install recoil
   ```

2. **App.tsx 수정**

   ```tsx
   import React from 'react'
   import { RecoilRoot } from 'recoil'

   function App() {
     return (
       <RecoilRoot>
         <children />
       </RecoilRoot>
     )
   }
   ```

3. **recoil-persist 설치**  
    새로고침 되었을 때도 recoil의 상태값을 유지하기 위해, recoil의 상태를 local storage에 동기화할 수 있다. 이를 위한 대표적인 라이브러리 중 하나가 [recoil-persist](https://www.npmjs.com/package/recoil-persist)이다.

   ```bash
   npm install recoil-persist
   ```

   다음은 recoil-persist를 사용해 access token과 refresh token의 atoms를 설계한 예제이다.

   ```tsx
   import { atom } from 'recoil'
   import { recoilPersist } from 'recoil-persist'

   const { persistAtom } = recoilPersist({
     key: 'recoil-persist', // this key is using to store data in local storage
     storage: localStorage, // configurate which stroage will be used to store the data
   })

   // JWT 토큰 관련 설정
   const ACCESS_TOKEN_KEY = 'AccessToken'
   const REFRESH_TOKEN_KEY = 'RefreshToken'

   // Recoil atom 정의
   const authTokenState = atom<string>({
     key: ACCESS_TOKEN_KEY,
     default: localStorage.getItem(ACCESS_TOKEN_KEY) ?? '',
     effects_UNSTABLE: [persistAtom],
   })

   const refreshTokenState = atom<string>({
     key: REFRESH_TOKEN_KEY,
     default: localStorage.getItem(REFRESH_TOKEN_KEY) ?? '',
     effects_UNSTABLE: [persistAtom],
   })

   export { authTokenState, refreshTokenState }
   ```

## 4.2. Redux Toolkit

# 5. Axios

Single Page Application으로 동작하는 React 프로젝트에서 서버로 AJAX요청을 날리는 것은 거의 필수이다. Axios는 node.js에서 사용할 수 있는 Promise 기반 HTTP 클라이언트 라이브러리로, 클라이언트(브라우저)에서는 XMLHttpRequests를 생성한다.

1. **axios 설치**

   ```bash
   npm install axios
   ```

2. **axios instance 생성**

   [axios instance](https://axios-http.com/docs/instance)를 생성할 경우, axios interceptor와 같은 편리한 기능을 사용할 수 있다.

   ```js
   // Create instance
   const instance = axios.create({
     baseURL: 'https://some-domain.com/api/',
     timeout: 1000,
     headers: { 'X-Custom-Header': 'foobar' },
   })

   // Add a request interceptor
   instance.interceptors.request.use(
     function (config) {
       // Do something before request is sent
       return config
     },
     function (error) {
       // Do something with request error
       return Promise.reject(error)
     }
   )

   // Add a response interceptor
   instance.interceptors.response.use(
     function (response) {
       // Any status code that lie within the range of 2xx cause this function to trigger
       // Do something with response data
       return response
     },
     function (error) {
       // Any status codes that falls outside the range of 2xx cause this function to trigger
       // Do something with response error
       return Promise.reject(error)
     }
   )
   ```

# 6. CSS styling

CSS 스타일링 방법은 매우 다양하다. 자신의 프로젝트에 적합한 CSS 스타일링을 찾아 관련 라이브러리를 설치한다.

## 6.1. Sass

[Create React App 공식문서](https://create-react-app.dev/docs/adding-a-sass-stylesheet)에 Sass 관련 설정이 자세하게 나와있다.

1. **Sass 설치**

   ```bash
   npm uninstall node-sass
    npm install sass
   ```

   node-sass 지원이 중단되었으므로 sass 패키지 사용을 권장하고 있다.

2. **SASS_PATH 추가**

   프로젝트 루트 경로에 .env 파일을 만들고 참조하고자 하는 Sass 상대경로를 아래와 같이 추가한다.

   ```env
   # Linux
   SASS_PATH=path1:path2:path3

   # Window는 세미콜론(;)으로 경로를 구분한다
   SASS_PATH=path1;path2;path3
   ```

3. **CSS 초기화**

   index.css에 다음을 import함으로써 브라우저별 css를 초기화 할 수 있다.

   ```css
   @import-normalize; /* bring in normalize.css styles */

   /* rest of app styles */
   ```

## 6.2. Styled Component
