# React Hooks <!-- omit in toc -->

## Index <!-- omit in toc -->

[React Hook Youtube](https://www.youtube.com/watch?v=G3qglTF-fFI&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=1)

- [1. useRef](#1-useref)
  - [1.1. 변수관리](#11-변수관리)
  - [1.2. DOM 접근](#12-dom-접근)
- [2. useContext](#2-usecontext)
- [3. useMemo](#3-usememo)
  - [3.1. 객체 타입 참조](#31-객체-타입-참조)
- [4. useCallback](#4-usecallback)
- [5. useReducer](#5-usereducer)
  - [5.1. 예제1](#51-예제1)
  - [5.2. 예제2](#52-예제2)
- [5. memo](#5-memo)
  - [5.1. memo with useMemo](#51-memo-with-usememo)
  - [5.2. memo with useCallback](#52-memo-with-usecallback)
- [6. custom Hooks](#6-custom-hooks)
  - [6.1. 예제1: useInput](#61-예제1-useinput)
  - [6.2. 예제2: useFetch](#62-예제2-usefetch)

---

# 1. useRef

## 1.1. 변수관리

mount 이후 update 되더라도 변수의 값을 유지하고 있다. 또한 변수의 값이 변하더라도 렌더링에는 영향을 미치지 않는다.

```js
import React, { useState, useRef } from 'react'

const App = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  // {current : 0}

  const increaseCountState = () => {
    setCount(count + 1)
  }

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1
  }

  return (
    <div>
      <button onClick={increaseCountState}>State +</button>
      <button onClick={increaseCountRef}>Ref +</button>
    </div>
  )
}
```

## 1.2. DOM 접근

```js
import React, { useState, useRef } from 'react'

const App = () => {
  const inputRef = useRef()
  // {current : input}

  return (
    <div>
      <input ref={inputRef} type="text" />
    </div>
  )
}
```

# 2. useContext

[Redux and contextAPI](https://dev.to/ruppysuppy/redux-vs-context-api-when-to-use-them-4k3p)

```js
// ThemeContext
import { createContext } from 'react'

export const ThemeContext = createContext(null)
// value를 넘겨주지 않을 경우 초깃값을 지정
```

```js
// App
import React, { useState } from 'react'
import Page from './Page'
import { ThemeContext } from './ThemeContext'

const App = () => {
  const [isDark, setIsDark] = useState(0)

  return (
    <div>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <Page />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
```

```js
// App
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Page = () => {
  const data = useContext(ThemeContext)
  console.log('data', data)
  // {data: {isDark: false, setIsDark: f()}}

  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default Page
```

```js
// App
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

const Header = () => {
  const { isDark } = useContext(ThemeContext)

  return <div>Header</div>
}

export default Header
```

# 3. useMemo

useEffect와 비슷하게 동작하지만 useEffect는 컴포넌트가 전부 렌더링 된 후 실행되는 반면, useMemo는 렌더링보다 먼저 실행되는 차이점이 있다.

또한 useMemo 는 **함수의 반환 값**을 캐싱한다는 의미상의 차이점이 있다.

```js
import React, { useMemo, useState } from 'react'

const hardCaculate = (number) => {
  console.log('어려운 계산!')
  for (let i = 0; i < 9999999; i++) {}
  return number + 10000
}

const easyCaculate = (number) => {
  console.log('어려운 계산!')
  return number + 1
}

function App() {
  const [hardNumber, setHardNumber] = useState(1)
  const [easyNumber, setEasyNumber] = useState(1)

  const hardSum = useMemo(() => {
    return hardCaculate(hardNumber)
  }, [hardNumber])
  const easySum = easyCalculate(easyNumber)

  return (
    <div>
      <h3>어려운 계산기</h3>
      <input
        type="number"
        value={hardNumber}
        onChange={(e) => setHardNumber(parseInt(e.target.value))}
      />
      <h3>쉬운 계산기</h3>
      <input
        type="number"
        value={easyNumber}
        onChange={(e) => setEasyNumber(parseInt(e.target.value))}
      />
    </div>
  )
}
```

## 3.1. 객체 타입 참조

원시 타입처럼 값 자체가 아닌 메모리 주소를 가리키는 객체 타입의 특징 상, 동일한 값의 객체라도 매 렌더링마다 주소가 다르게 할당된다.

따라서 실제로 객체의 데이터가 변하지 않았음에도 객체를 참조하는 useEffect와 useMemo의 로직이 실행된다.

**이러한 경우, useMemo와 useEffect를 조합하여 객체의 메모리주소를 유지할 수 있다.**

```js
import logo from './logo.svg'
import './App.css'
import { useState, useEffect, useMemo } from 'react'

function App() {
  const [number, setNumber] = useState(0)
  const [isKorea, setIsKorea] = useState(true)

  const location = useMemo(() => {
    console.log('useMemo호출')
    return {
      country: isKorea ? '한국' : '외국',
    }
  }, [isKorea])

  useEffect(() => {
    console.log('useEffect 호출')
  }, [location])

  return (
    <div>
      <h2>하루에 몇끼 먹어요?</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <hr />
      <h2>어느 나라에 있어요?</h2>
      <p>나라: {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  )
}

export default App
```

# 4. useCallback

useMemo와 비슷하게 동작하지만, 함수의 반환 값이 아닌 함수 자체를 캐싱한다는 차이점이 있다.

```js
import {useEffect, useState, useCallback} from 'react'

function App() {
    const [number, setNumber] = useState(0)

    const someFunction  = useCallback(() => {
        console.log(`someFunc: number: ${number}`)
        return;
    }, [number])

    useEffect(( => {
        console.log('someFunction이 변경되었습니다.')
    }), [someFunction])

    return  (
        <div>
            <input
            type="number"
            value={number}
            onChange ={(e) => setNumber(e.target.value)}
            />
            <br/>
            <button conClick={someFunction}>Call someFunc</button>
        </div>
    )
}
```

# 5. useReducer

## 5.1. 예제1

여러개의 하위값을 포함하는 복잡한 state를 다룰 때 효율적인 react hook

- reducer: state를 업데이트 하는 함수
- dispatch: reducer를 호출
- action: reducer를 호출하는 옵션

```js
import React, {useState, useReducer} from 'react'

// 이거 안쓰고 바로 'depoist'과 'withdraw'도 사용 가능하지만, 예외케이스를 없애기 위해서
const ACTION_TYPES = {
    deposit: 'sfasdfsdf'
    withdraw: 'sdasfdsadfsad',
}
// state: 현재 상태, action: 옵션
const reducer = (state, action) => {
    console.log('reducer가 호출')
    switch (action.type) {
        case ACTION_TYPES.deposit:
            return state + action.payload
        case ACTION_TYPES.withdraw:
            return state - action.payload
        default:
            return state
    }
};


function App() {
    const [number, setNumber] = useState(0);
    const [money, dispatch] = useReducer(reducer, 0);
    // useReducer(reducer, 초깃값)

    return  (
        <div>
            <h2>은행</h2>
            <p>잔고: {money}원</p>

            <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
            step='1000'/>
            <button onClick={( => {
                dispatch({type: ACTION_TYPES.deposit, payload: number})})}>예금</button>
            <button onClick={( => {
                dispatch({type:ACTION_TYPES.withdraw, payload: number})})}>출금</button>
        </div>
    )
}
```

## 5.2. 예제2

```js
import React, {useReducer, useState } from 'react'
import Student from  './Student'

const reducer = (state, action) => {
    switch (action.type) {
        case 'add-student':
            const name = action.payload.name;
            const newStudent = {
                id: Date.now(),
                name,
                isHere: false,
            }
            return {
                count: state.count + 1,
                students: [...state.students, newStudent],
            }
        case 'delete-student':
            return {
                count: state.count - 1,
                students: state.students.filter((student) =>
                student.id !== action.payload.id)
            }
        case 'mark-student':
            return {
                count: state.count,
                students: state.students.map((student) =>
                if(student.id === action.payload.id) {
                    return {...student, isHere: !student.isHere}
                })
            }
        default:
            return state
    }
};

const initialState = {
    count: 0 ,
    students: [
    ],
}

fucntion App() {
    const [name, setNAme] = useState('')
    const [studentsInfo, dispatch] = useReducer(reducer, initialState)

    return  (
        <div>
            <h1>출석부</h1>
            <p>총 학생 수: {studentsInfo.count}</p>
            <input
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <button onClick={()=> {
                dispatch({type:'add-student', payload: {name}})}}>
                추가</button>
            {studentsInfo.students.map((student)=> {
                return <Student key={student.id} name={student.name} dispatch={dispatch} id={student.id} isHere={student.isHere}/>
            })}
        </div>
    )
}

```

```js
import React from 'react'

const Student = ({ name, dispatch, id, isHere }) => {
  return (
    <div>
      <span
        style={{
          textDecoration: isHere ? 'line-throug' : 'none',
          color: isHere ? 'gray' : 'black',
        }}
        onClick={() => {
          dispatch({ type: 'mark-student', payload: { id } })
        }}>
        {name}
      </span>
      <button
        onClick={() => {
          dispatch({ type: 'delete-student', payload: { id } })
        }}>
        삭제
      </button>
    </div>
  )
}

export default Student
```

# 5. memo

컴포넌트를 캐싱해두었다가 prop이 변경되는 경우에만 재렌더링을 진행한다.
prop저장하고 비교하는데 메모리가 사용되므로 복잡한 컴포넌트에만 사용한다.

```js
import { useState } from 'react'
import Child from './Child'

function App() {
  const [parentAge, setParentAge] = useState(0)
  const [childAge, setChildAge] = useState(0)

  const increaseParentAge = () => {
    setParentAge(parentAge + 1)
  }

  const increaseChildAge = () => {
    setChildAge(childAge + 1)
  }

  console.log('부모 컴포넌트 재렌더링')

  return (
    <div>
      <h1>부모</h1>
      <p>age:{parentAge}</p>
      <button onClick={increaseParentAge}>부모 나이 증가</button>
      <button onClick={increaseChildAge}>자식 나이 증가</button>
      <Child name={'홍길동'} age={childAge} />
    </div>
  )
}

export default App
```

```js
import React, { memo } from 'react'

function Child({ name, age }) {
  consol.elog('자녀 컴포넌트 재렌더링')
  return (
    <div>
      <h3>자녀</h3>
      <p>name:{name}</p>
      <p>age:{age}</p>
    </div>
  )
}

export default memo(Child)
```

## 5.1. memo with useMemo

```js
import { useState, useMemo } from 'react'
import Child from './Child'

function App() {
  const [parentAge, setParentAge] = useState(0)

  const increaseParentAge = () => {
    setParentAge(parentAge + 1)
  }

  console.log('부모 컴포넌트 재렌더링')

  const name = useMemo(() => {
    return {
      lastName: '홍',
      firstName: '길동',
    }
  }, [])

  return (
    <div>
      <h1>부모</h1>
      <p>age:{parentAge}</p>
      <button onClick={increaseParentAge}>부모 나이 증가</button>
      <button onClick={increaseChildAge}>자식 나이 증가</button>
      <Child name={name} />
    </div>
  )
}

export default App
```

```js
import React, { memo } from 'react'

function Child({ name }) {
  consol.elog('자녀 컴포넌트 재렌더링')
  return (
    <div>
      <h3>자녀</h3>
      <p>성:{name.lastName}</p>
      <p>이름:{name.firstName}</p>
    </div>
  )
}

export default memo(Child)
```

## 5.2. memo with useCallback

```js
import { useState, useCallback } from 'react'
import Child from './Child'

function App() {
  const [parentAge, setParentAge] = useState(0)

  const increaseParentAge = () => {
    setParentAge(parentAge + 1)
  }

  console.log('부모 컴포넌트 재렌더링')

  const name = useCallback(() => {
    console.log('대답이다')
  }, [])

  return (
    <div>
      <h1>부모</h1>
      <p>age:{parentAge}</p>
      <button onClick={increaseParentAge}>부모 나이 증가</button>
      <button onClick={increaseChildAge}>자식 나이 증가</button>
      <Child name={'홍길동'} tellMe={tellMe} />
    </div>
  )
}

export default App
```

```js
import React, { memo } from 'react'

function Child({ name, tellMe }) {
  consol.elog('자녀 컴포넌트 재렌더링')
  return (
    <div>
      <p>이름:{name}</p>
      <button onClick={tellMe}>대답</button>
    </div>
  )
}

export default memo(Child)
```

# 6. custom Hooks

리액트 훅을 커스텀!

## 6.1. 예제1: useInput

```js
import { useInput } from './useInput'

function displayMessage(message) {
  alert(message)
}

function App() {
  const [inputValue, handleChange, handleSubmit] = useInput('', displayMessage)

  return (
    <div>
      <h1>useInput</h1>
      <input value={inputValue} onChange={handleChange} />
      <button onClick={handleSubmit}>확인</button>
    </div>
  )
}
```

```js
import { useState } from './useInput'

export function useInput(initialValue, submitAction) {
  const [inputValue, setInputVale] = useState(initialValue)

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = () => {
    setInputValue('')
    subnitAction(inputValue)
  }

  return [inputValue, handleChange, handleSubmit]
}
```

## 6.2. 예제2: useFetch

```js
import { useFetch } from './useInput'

const baseUrl = 'https://jsonplaceholder.typicode.com'

function App() {
  const { data, fetchUrl } = useFetch(baseUrl, 'users')

  return (
    <div>
      <h1>useFetch</h1>
      <button onClick={() => fetchUrl('users')}>Users</button>
      <button onClick={() => fetchUrl('posts')}>Posts</button>
      <button onClick={() => fetchUrl('todos')}>Todos</button>
      <pre>{JSON.stringfy(data, null, 2)}</pre>
    </div>
  )
}
```

```js
import { useEffect, useState } from 'react'

export function useFetch(baseUrl, initialType) {
  const [data, setData] = useState(null)

  const fetchUrl = (type) => {
    fetch(baseUrl + '/' + type)
      .then((res) => res.json())
      .then((res) => setData(res))
  }

  useEffect(() => {
    fetchUrl(initialType)
  }, [])

  return {
    data,
    fetchUrl,
  }
}
```
