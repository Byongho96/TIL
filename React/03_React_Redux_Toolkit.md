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
