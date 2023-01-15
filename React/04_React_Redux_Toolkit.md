# 1. Redux Toolkit

## 1.1. 설치

1. package.json `react`, `react-dom`버전 확인
   ```js
   // 18.1.0 이상
   "react": "^18.1.x"
   "react-dom": "^18.1.x"
   ```
2. `npm install @reduxjs/toolkit react-redux`

## 1.2. 생성

1. store.js 생성

   ```js
   import { configureStore } from '@reduxjs/toolkit'

   export default configureStore({
     reducer: {},
   })
   ```

2. index.js `<Provider>`태그 형성

   ```js
   import { Provider } from 'react-redux'
   import store from './store.js'

   const root = ReactDOM.createRoot(document.getElementById('root'))
   root.render(
     <React.StrictMode>
       <Provider store={store}>
         <BrowserRouter>
           <App />
         </BrowserRouter>
       </Provider>
     </React.StrictMode>
   )
   ```

# 2. 사용 방법

[생활코딩 redux-toolkit](https://www.youtube.com/watch?v=9wrHxqI6zuM)

```js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: { value: 0 },
  reducers: {
    up: (state, action) => {
      //state는 기존 data를 가져온다.
      //함수에 전달 받는 인자를. action = {payload: parameter}로 전달 받음
      state.value = state.value + action.payload
    },
  },
})

export default counterSlice
export const { up } = counterSlice.actions // reducers를 의미. setter 함수를 외부로 송출
```

```js
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'

const store = configureStore({
  reducer: {
    // 여기에 counter가 실제로 store에 저장되는 이름
    counter: counterSlice.reducer,
  },
})
export default store
```

```js
import React from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import store from './store'
import { up } from './counterSlice'

function Coutner() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)
  return (
    <div>
      <button onClick={() => dispatch(up(2))}>+</button> {count}
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <Counter></Counter>
    </Provider>
  )
}
```

## 2.1. 원시 값

Array, Object 외의 원시 값의 경우 아래와 같은 방법으로 값을 return 해줌으로써 state를 업데이트 할 수 있다.

```js
let user = createSlice({
  name: 'user',
  initialState: 'kim',
  reducers: {
    changeName(state) {
      return 'john ' + state
    },
  },
})
```

# 3. Redux Persist

[블로그 글1](https://choyeon-dev.tistory.com/14)
[블로그 글2](https://edvins.io/how-to-use-redux-persist-with-redux-toolkit)
