# React Context API <!-- omit in toc -->

- [1. Context](#1-context)
  - [1.1. Props 와 비교](#11-props-와-비교)
  - [1.2. 예시](#12-예시)
- [1. useReducer](#1-usereducer)
  - [1.1. 개념](#11-개념)
  - [1.2. 예시](#12-예시-1)
  - [1.2. 예시(참조타입)](#12-예시참조타입)

# 1. Context

Props Drilling을 방지 한다. 전역적인 데이터(테마, 언어)

## 1.1. Props 와 비교

장점
단점 : 컴포넌트 재사용이 어려워짐. Prop Drilling을 피하기 위해서는 Component Composition

## 1.2. 예시

```js
import { createContext } from 'react'

export const ThemeContext = createContext(false)
// 초깃값은 해당 context를 통해 내려주는 값이 없을 경우에, 초깃값이 내려간다
```

```js
import React, { useState } from 'react'
import { ThemeContext } from './context/ThemeContext'

function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <Page />
    </ThemeContext.Provider>
  )
}
```

```js
import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'

function Page() {
  const { isDark, setIsDark } = useContext(ThemeContext)

  return <div>Page</div>
}
```

# 1. useReducer

여러값에 하윗값을 포함하는 복잡한 state관리에 좋다ㅣ

## 1.1. 개념

- State : 데이터 상태
- Reducer : State를 업데이트 시키는 함수
- Dispatch : Reducer을 발동시키는 요구
- Action : Dispatch의 내용(인자)

```js
Reducer(State, Action)
Dispatch(Action)
```

## 1.2. 예시

```js
import React, { useState, useReducer } from 'react'

// 리듀서 작성 (현재 상태, 요구의 내용)
const reducer = (state, action) => {
  switch (action.type) {
    case 'deposit':
      return state + action.payload
    case 'withdraw':
      return state - action.payload
    default:
      return state
  }
}

function App() {
  const [amount, setAmount] = useState(0)

  // state, dispatch
  // state 값도 state가 바뀌면 새로렌더링
  const [balance, dispatch] = useReducer(reducer, 0) // reducer: 리듀서, 초깃값

  function deposit() {
    dispatch({ type: 'deposit', payload: number })
  }

  function withdraw() {
    dispatch({ type: 'withdraw', payload: number })
  }

  return (
    <div>
      <p>{balance}원</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setAmount(e.target.value)}
        step="1000"
      />
      <button onClick={deposit}>예금</button>
      <button onClick={withdraw}>출금</button>
    </div>
  )
}
```

## 1.2. 예시(참조타입)

```js

import React, { useState, useReducer } from 'react'

// 리듀서 작성 (현재 상태, 요구의 내용)
const reducer = (state, action) => {
  switch (action.type) {
    case 'add-student':
      const newStudent = {
        id:Date.now(),
        name: action.payload.name;
        isHere: false;
      }
      return {
        count : state.count + 1,
        students: [...state.students, newStudent]
      }
    case 'delete-student':
      return {
        count : state.count - 1,
        students: state.students.filter(
            (student) => student.id !== action.payload.id
        )
      }
    case 'mark-student':
      return return {
        count : state.count,
        students: state.students.map( student => {
          if (student.id === action.payload.id) {
            return {...student, isHere: !student.isHere}
          }
          return student
        })
      }
    default:
      return state
  }
}

function App() {
  const [name, setName] = useState('')

  // state, dispatch
  // state 값도 state가 바뀌면 새로렌더링
  const [studentsInfo, dispatch] = useReducer(reducer, {
    count: 0;
    students: [];
  }) // reducer: 리듀서, 초깃값

  function addStudent() {
    dispatch({ type: 'add-student', payload: name })
  }

  function deleteStudent() {
    dispatch({ type: 'delete-student', payload: id })
  }

  function markStudent() {
    dispatch({ type: 'mark-student', payload: id })
  }

  return (
    <div>
      <p>{studentsInfo.count}명</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  )
}

```
