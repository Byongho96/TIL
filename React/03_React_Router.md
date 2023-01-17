# React Router <!-- omit in toc -->

[react-router-dom](https://reactrouter.com/en/main/start/overview)

## Index <!-- omit in toc -->

- [1. Router](#1-router)
  - [1.1. 설치 및 세팅](#11-설치-및-세팅)
  - [1.2. 사용 방법](#12-사용-방법)
    - [1.2.1. Routes](#121-routes)
    - [1.2.2. Switch (v5)](#122-switch-v5)
  - [1.3. 페이지 이동](#13-페이지-이동)
    - [1.3.1. Link](#131-link)
    - [1.3.2. useNavigate](#132-usenavigate)
    - [1.3.3. redirect](#133-redirect)
    - [1.3.4. Navigate](#134-navigate)
- [2. Nested Routes](#2-nested-routes)
- [3. URL Parameter](#3-url-parameter)
- [4. Protected Route](#4-protected-route)

---

# 1. Router

## 1.1. 설치 및 세팅

1. `npm install react-router-dom@6`
2. index.js파일

   ```js
   import { BrowserRouter } from 'react-router-dom'

   const root = ReactDOM.createRoot(document.getElementById('root'))
   root.render(
     <React.StrictMode>
       <BrowserRouter>
         <App />
       </BrowserRouter>
     </React.StrictMode>
   )
   ```

## 1.2. 사용 방법

### 1.2.1. Routes

url경로에 대응하는 path의 컴포넌트를 찾아서 렌더링한다.

```js
import { Routes, Route } from 'react-router-dom'

function App(){
  return (
    (생략)
    <Routes>
      <Route path="/detail" element={ <DetailComponent/> } />
      <Route path="/about" element={ <AboutComponent/> } />
      <Route path="/" element={ <Component404/> } />
    </Routes>
  )
}
```

### 1.2.2. Switch (v5)

react-router-dom 버전5까지는 `Routes`태그는 url경로에 대응하는 모든 컴포넌트를 찾아서 렌더링했다. 따라서 이를 보완하고자 대응하는 path를 찾은 경우, 하나의 컴포넌트만 렌더링하는 `Switch`가 존재했다.

버전 6로 업그레이드 되면서 `Switch`의 기능을 `Routes`가 가지게 되었다.

```js
import { Switch, Route } from 'react-router-dom'

function App(){
  return (
    (생략)
    <Switch>
      <Route path="/detail" element={ <DetailComponent/> } />
      <Route path="/about" element={ <AboutComponent/> } />
      <Route path="/" element={ <Component404/> } />   // 원하는대로 동작
    </Switch>
  )
}
```

## 1.3. 페이지 이동

[react router redirect](https://www.copycat.dev/blog/react-router-redirect/)

### 1.3.1. Link

- a 태그와 다르게 페이지를 전체 reload하지 않는다.
- url 경로가 활성화 된 경우, active 클래스가 자동으로 입혀진다.

```js
import { Link } from 'react-router-dom'

<Link to="/">홈</Link>
<Link to="/detail">상세페이지</Link>
```

### 1.3.2. useNavigate

useNavigate 함수를 사용하여 함수 형식으로 url경로를 바꿀 수 있다. 하지만 컴포넌트 내부에서만 쓰일 수 있다.

```js
import { useNavigate } from 'react-router-dom'

function App(){
  let navigate = useNavigate()

  return (
    (생략)
    <button onClick={()=>{ navigate('/detail') }}>이동버튼</button>
  )
}
```

### 1.3.3. redirect

컴포넌트 바깥에서 loader 혹은 action에서 쓰일 수 있다.

```js
import { redirect } from 'react-router-dom'

const loader = async () => {
  const user = await getUser()
  if (!user) {
    return redirect('/login')
  }
}
```

### 1.3.4. Navigate

선언적 방식으로 리다이렉트 한다. v5까지 존재했던 `<Reidrect />` 컴포넌트를 대체한다.

```js
<Routes>
  <Route path="/" element={<h1>Home Page Component</h1>} />
  <Route path="/login" element={<h1>Login Page Component</h1>} />
  // New line
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
```

---

# 2. Nested Routes

```js
<Route path="/about/member" element={ <AboutMemberComponent /> } />
<Route path="/about/location" element={ <AboutLocationComponent /> } />
```

서로 다른 url 페이지에서 컴포넌트의 중복이 일어날 경우, Nested Routes를 사용하여 일부 컴포넌트만 재렌더링할 수 있다.

부모 컴포넌트는 Nested Route에서 prop으로 받은 컴포넌트를 Outlet 태그 위치에 렌더링한다.

```js
import { Routes, Route, Outlet } from 'react-router-dom'

<Route path="/about" element={<About />}>
  <Route path="member" element={<MemberComponent />} />
  <Route path="location" element={<LocationComponent>} />
</Route>

function About() {
  return (
    <div>
      <h4>about 페이지</h4>
      <Outlet></Outlet>
    </div>
  )
}
```

---

# 3. URL Parameter

url경로의 일부를 변수처럼 사용할 수 있다.

```js
<Route path="/detail/:id" element={<Detail shoes={shoes} />} />
```

```js
import { useParams } from 'react-router-dom'

function Detail({ shoes }) {
  let { id } = useParams()
  console.log(id)

  return <h4>{shoes[id].title}</h4>
}
```

---

# 4. Protected Route

[Protected Route in v6 Youtube](https://www.youtube.com/watch?v=2k8NleFjG7I)
[Protected Route in v6 Blog Post](https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c)

```js
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {
  let auth = { token: true }
  return auth.token ? <Outlet /> : <Navigate to="/login" />
}
```

```js
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
...
function App() {
  return (
    <Router>
        <Routes>
          <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<Users/>} />
              <Route path='/products' element={<Products/>} />
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </Router>
  );
}
```
