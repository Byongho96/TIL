# Redux

# Redux Toolkit

slice : 작은 스토어
store : 큰 스토어

```js
import { createSlice } from '@reduxjs/toolkit'

// 불변성 유지를 위해서 디스트럭팅 해서 다시 묶는 이런 작업 ㄴㄴ
const counterSlice = createSlice({
  name: 'cntSlice',
  initialState: { value: 0 },
  reducers: {
    up: (state, action) => {
      //   state.value = state.value + action.step
      state.value = state.value + action.payload
    },
  },
})

export default counterSlice
export const { up } = counterSlice.actions // 이것도 액션 크리에이터
```

```js
import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer, // 왼쪽이름이 나중에 state를 읽을 때
  },
})

export default store
```

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

```js
import { useSelector, useDispatch } from 'react-redux'
import { up } from './counterSlice'

export default function Counter() {
  const dispatch = useDispatch()
  const count = useSelector((state) => {
    return state.counter.value
  })

  function countUp() {
    // dispatch({ type: 'cntSlice/up', step: 1 })

    //redux toolkit의 액션 크리에이터
    dispatch(cntSlice.actions.up(2)) // payload라는 값에 담겨서 감
    dispatch(up(2)) // payload라는 값에 담겨서 감
  }

  return (
    <div>
      {count}
      <button onClick={countUp}>+</button>
    </div>
  )
}
```

# Redux Toolkit 비동기

리덕스 툴킷 안에 이미 Thunk라는 기능이 내장되어있음. 비동기적인 작업을 할 때 필요함.

[https://www.youtube.com/watch?v=K-3sBc2pUJ4]

```js
const status = useSelector((state)=> {
  return state.counter.status
})
const status = useSelector((state)=> {
  return state.counter.value
})

async function fetchValue() {
  const res = await fetch('https://api/example')
  const data = await res.json() //json 을 js 객체로 변환하는 함수
  dispatch(set(data.value))
}

return (
<div>{count} | {status}</div>
<button onClick={fetchValue}>데이터 가져오기</button>
)
```

중복과 유지보수

```js
const status = useSelector((state)=> {
  return state.counter.status
})
const status = useSelector((state)=> {
  return state.counter.value
})

async function fetchValue() {
  dispatch(asyncFetchReducer()) // 비동기 함수를 리듀서에 정의
}

return (
<div>{count} | {status}</div>
<button onClick={fetchValue}>데이터 가져오기</button>
)
```

**createAsyncThunk는 비동기 함수를 처리하는 액션을 만들다. action creater**

```js
const asyncUpFetch = createAsyncThunk(
  'counterSlice/asyncUpFetch', // 타입
  async () => {
    const resp = await fetch('https://~~~')
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
      state.vlaue = state.value + action.payload // payload는 액션의 결과가 온다
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
