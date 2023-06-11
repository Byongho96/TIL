# Redux Toolkit

- [Redux Toolkit](#redux-toolkit)
- [1. Redux Toolkit 기본 사용](#1-redux-toolkit-기본-사용)
- [2. Redux Toolkit 비동기](#2-redux-toolkit-비동기)
  - [2.1. 목표](#21-목표)
  - [2.2. createAsyncThunk](#22-createasyncthunk)
  - [실전 예제](#실전-예제)

# 1. Redux Toolkit 기본 사용

- **Slice 생성**
  slice는 하나의 데이터에 대한 작은 저장소라고 생각할 수 있다.

  ```js
  import { createSlice } from '@reduxjs/toolkit'

  // useReducer와 비슷하게 초깃갓과, reducer을 전달
  const counterSlice = createSlice({
    name: 'cntSlice',
    initialState: { value: 0 },
    reducers: {
      // 각가의 reducer가 하나의 type에 대응
      up: (state, action) => {
        // 1) 액션 크리에이터를 사용할 경우
        state.value = state.value + action.payload
        // 2) 액션 크리에이터를 사용하지 않을 경우
        // state.value = state.value + action.step
      },
    },
  })

  export default counterSlice
  export const { up } = counterSlice.actions // action creator라고 부르며, 이를 통해 컴포넌트 단에서 더 간편한게 action을 생성할 수 있다.
  ```

- **Store 생성**

  redux는 여러 개의 slice를 모아 단 하나의 store에서 관리한다.

  ```js
  import { configureStore } from '@reduxjs/toolkit'
  import counterSlice from './counterSlice'

  const store = configureStore({
    reducer: {
      // 왜 reducer를 넣어주는지는 잘모르겠음..
      counter: counterSlice.reducer, // 왼쪽이름이 나중에 state를 읽을 때 사용된다
    },
  })

  export default store
  ```

- **Provider 생성**

  store값을 읽고자 하는 컴포넌트의 최상윗단에 Provider로 공급한다.

  ```js
  import { Provider } from 'react-redux'
  import store from './store'

  export default function App() {
    return (
      <Provider store={store}>
        <Counter />
      </Provider>
    )
  }
  ```

- **컴포넌트 사용**

  ```js
  import { useSelector, useDispatch } from 'react-redux'
  import counterSlice, { up } from './counterSlice'

  export default function Counter() {
    // store로부터 상태를 읽어온다.
    const count = useSelector((state) => {
      return state.counter.value
    })

    // reducer를 발동시킬 dispatch
    const dispatch = useDispatch()

    function countUp() {
      // 1. 액션 직접 입력
      // dispatch({ type: 'cntSlice/up', step: 1 }) // type에서 slice의 name을 사용한다.

      // 2. 액션 크리에이터 사용
      dispatch(couterSlice.actions.up(2)) // 인자는 자동으로 payload라는 값에 담겨서 감

      // 3. 액션 크리에이터 사용
      dispatch(up(2)) // 인자는 자동으로 payload라는 값에 담겨서 감
    }

    return (
      <div>
        {count}
        <button onClick={countUp}>+</button>
      </div>
    )
  }
  ```

# 2. Redux Toolkit 비동기

리덕스 툴킷 안에 이미 Thunk라는 기능이 내장되어있어 비동기 reducer를 생성할 수 있다.

## 2.1. 목표

동기적 reducer로도 아래처럼 비동기적인 state업데이트를 구현할 수능 있다.

```js
const status = useSelector((state)=> {
  return state.counter.status
})
const value = useSelector((state)=> {
  return state.counter.value
})

// 비동기 요청의 반환 값을 받은 뒤, state를 동기 reducer로 업데이트한다.
async function fetchValue() {
  const res = await fetch('https://api/example')
  const data = await res.json()
  dispatch(set(data.value))
}

return (
<div>{count} | {status}</div>
<button onClick={fetchValue}>데이터 가져오기</button>
)
```

하지만 코드의 불필요한 중복을 줄이고 유지 보수를 용이하게 하기 위해서, 아래처럼 비동기 로직을 reducer 자체에 포함시키고자 한다.

```js
const status = useSelector((state)=> {
  return state.counter.status
})
const vlaue = useSelector((state)=> {
  return state.counter.value
})

async function fetchValue() {
  dispatch(asyncFetchReducer()) // 비동기 reducer 호출
}

return (
<div>{count} | {status}</div>
<button onClick={fetchValue}>데이터 가져오기</button>
)
```

## 2.2. createAsyncThunk

createAsyncThunk를 통해 비동기 함수를 처리하는 액션을 만들다. action creater\*\*

```js
const asyncUpFetch = createAsyncThunk(
  'counterSlice/asyncUpFetch', // 타입 정의
  async () => {
    const resp = await fetch('https://api/example')
    const data = await resp.json()
    return data.value
  }
)
```

```js
const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: {
    value: 0,
    status: 'Welcome',
  },
  // createAsyncThunk가 만들어주는 3가지 상태에 대한 리듀서를 정의
  // 실제 reducer 함수는 두번째 인자로 넘겨준다.
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state, action) => {
      state.status = 'Loading'
    })
    builder.addCase(asyncUpFetch.fullfilled, (state, action) => {
      state.status = action.payload // payload라는 약속된 값으로 위의 코드의 리턴값이 전달됨(data.value)
      state.status = 'complete'
    })
    builder.addCase(asyncUpFetch.pending, (state, action) => {
      state.status = 'fail'
    })
  },
})
```

동기와 비동기 reducers
동기적인 작업은 reducers -> 툴킷이 액션 크리에이터를 자동으로 만들어줌
비동기적인 작업은 extraReducers -> 툴킷이 액션 크리에이터를 자동으로 만들어주지 못함.

```js
const counterSlice = createSlice({
  name: 'cntSlice',
  initialState: { value: 0, status: 'Welcome' },
  reducers: {
    up: (state, action) => {
      //   state.value = state.value + action.step
      state.value = state.value + action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.fullfilled, (state, action) => {
      state.value = state.value + action.payload // payload는 액션의 결과가 온다
      state.status = 'complete'
    })
  },
})
```

## 실전 예제

```js
// counterSlice

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const asyncUpFetch = createAsyncThunk('counterSlice/asyncUpFetch', async () => {
  const resp = await fetch('https://api/example')
  const data = await resp.json()
  return data.value
})

const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: {
    value: 0,
    status: 'Welcome',
  },
  reducers: {
    up: (state, action) => {
      state.value = state.value + action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncUpFetch.pending, (state, action) => {
      state.status = 'Loading'
    })
    builder.addCase(asyncUpFetch.fullfilled, (state, action) => {
      state.status = action.payload // payload라는 약속된 값으로 위의 코드의 리턴값이 전달됨(data.value)
      state.status = 'complete'
    })
    builder.addCase(asyncUpFetch.pending, (state, action) => {
      state.status = 'fail'
    })
  },
})
```

```js
// Counter.js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { up, asyncUpFetch } from './counterSlice'

function Counter() {
  const dispatch = useDisptch()
  const count = useSelector((state) => {
    return state.counter.value
  })
  const status = useSelector((state) => {
    return state.counter.status
  })

  return (
    <div>
      <div>
        {' '}
        {count} | {status}{' '}
      </div>
      <button onClick={() => dispatch(up(2))}>count up</button>
      <button onClick={() => dispatch(asyncUpFetch(2))}>fetch count</button>
    </div>
  )
}
```
