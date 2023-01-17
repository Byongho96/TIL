# React 기초 <!-- omit in toc -->

## Index <!-- omit in toc -->

- [1. 이벤트 핸들러](#1-이벤트-핸들러)
  - [1.1. 단순 콜백](#11-단순-콜백)
  - [1.2. event 전달](#12-event-전달)
- [2. useState](#2-usestate)
  - [2.1. 선언](#21-선언)
  - [2.2. 사용 방법](#22-사용-방법)
    - [2.2.1. 값 전달](#221-값-전달)
    - [2.2.2. 콜백함수 전달](#222-콜백함수-전달)
- [3. useEffect](#3-useeffect)
  - [3.1. 사용 방법](#31-사용-방법)
- [4. CRUD](#4-crud)
  - [4.1. Create](#41-create)
  - [4.2. Update](#42-update)
  - [4.3. Delete](#43-delete)
- [5. if](#5-if)
  - [5.1. if else](#51-if-else)
  - [5.2. 3항 연산자](#52-3항-연산자)
  - [5.3. 논리연산자](#53-논리연산자)
  - [5.4. switch](#54-switch)
  - [5.5. Array / Object](#55-array--object)

---

# 1. 이벤트 핸들러

## 1.1. 단순 콜백

이벤트 발생 시 동작할 함수를 콜백함수 형태로 선언한다.

```js
const Count() {

  const onClickGreet() {
    console.log('hi')
  }

  return(
    <>
    <button onClick={conClickGreet}>Btn</button>
    <button onClick={() => conClickGreet()}>Btn</button>
    </>
  );
}
```

## 1.2. event 전달

이벤트 핸들러는 콜백함수에 첫번째 인자로 event를 전달한다.

```js
const Count() {

  const onClickGreet(event) {
    console.log(event)
    console.log('hi')
  }

  return(
    <>
    <button onClick={conClickGreet}>Btn</button>
    <button onClick={(event) => conClickGreet(event)}>Btn</button>
    </>
  );
}
```

---

# 2. useState

state에 변동사항이 생길 경우, 해당 state를 사용하는 html이 **자동 재렌더링**된다.

## 2.1. 선언

```js
import { useState } from 'react'

function Component() {
  // destructing array
  let [data, setData] = useDstate('initialValue')
}
```

- **data**  
  변수이름
- **setData**  
  변수를 업데이트 하는 setter 함수
- **initialValue**  
  변수의 초깃값

## 2.2. 사용 방법

[useState 값 전달, 함수 전달 차이](https://velog.io/@juunghunz/ReactuseState-setState-%EC%9D%B8%EC%9E%90-%EA%B0%92-%ED%95%A8%EC%88%98)

### 2.2.1. 값 전달

전달 받은 값으로 data를 업데이트 한다. **단, 연속해서 동일한 데이터를 초기화할 경우 마지막에 호출된 함수만 실행된다.**

```js
export default function UseState1() {
  const [count, setCount] = useState(1)

  const dualCal = () => {
    setCount(count * 2)
    setCount(count + 1)
    console.log(count) // 2
  }

  return <button onClick={dualCal}>Btn</button>
}
```

### 2.2.2. 콜백함수 전달

콜백함수의 첫번째 인자로 기존의 data를 전달한다. 연속하여 set함수를 호출하여도 호출된 함수가 Queue에 저장되어 순서대로 실행된다.

```js
export default function UseState1() {
  const [count, setCount] = useState(1)

  const dualCal = () => {
    setCount((count) => count * 2)
    setCount((count) => count + 1)
    console.log(count) // 2
  }

  return <button onClick={dualCal}>Btn</button>
}
```

---

# 3. useEffect

useEffect 안에 적은 로직은 **html 렌더링 이후에 동작**하며, 함수의 라이프 사이클 혹은 특정 state 변화에 종속시킬 수 있다.

- Life Cycle

  1. **mount**: 컴포넌트 생성

  2. **update**: 컴포넌트 재렌더링

  3. **unmount**: 컴포넌트 삭제

## 3.1. 사용 방법

return 문은 mount시를 제외하고, 항상 useEffect보다 먼저 실행된다. 또한 unmount 시에도 1회 실행된다.

```js
useEffect(() => {
  // 2. 그 다음에 실행
  return () => {
    // 0. mount 시에는 실행 안됨
    // 1. 먼저 실행
    // 3. unmount 시에 1회 실행
  }
})
```

```js
useEffect(() => {
  //mount & update
})

useEffect(() => {
  //mount
}, [])

useEffect(() => {
  // mount & state1 update 시 실행
}, [state1])
```

---

# 4. CRUD

Array, Object와 같은 가변 변수를 수정할 경우, **수정한 데이터를 새로운 메모리 주소**로 가리켜야 한다. 그래야 setState 함수는 해당 데이터가 데이터가 변했음을 인지하고, 재렌더링 과정을 진행한다.

## 4.1. Create

```js
const createTodo = (e) => {
  // 새로운 할 일 데이터
  let newTodo = {
    id: Date.now(),
    title: value,
    completed: false,
  }

  // 원래 있던 할 일에 새로운 할 일 더해주기
  setTodoData((prev) => [...prev, newTodo])
}
```

## 4.2. Update

```js
const updateTodo = (id) => {
  let newTodoData = todoData.map((data) => {
    if (data.id === id) {
      data.title = editedTitle
    }
    return data
  })

  // let newTodoData = [...data];
  // newTodoData[id] = 'editedTitle';

  setTodoData(newTodoData)
}
```

## 4.3. Delete

```js
const deleteTodo = (id) => {
  let newTodoData = todoData.filter((data) => data.id !== id)
  setTodoData(newTodoData)
}
```

---

# 5. if

## 5.1. if else

```js
function Component() {
  if (true) {
    return <p>content</p>
  }
  return null
}
```

## 5.2. 3항 연산자

```js
function Component() {
  return <div>{1 === 1 ? <p>content</p> : null}</div>
}
```

3항 연산자는 중첩하여 사용 가능하며, 이를 통해 if... else if... else 구문을 구현할 수 있다.

```js
function Component() {
  return (
    <div>
      {1 === 1 ? <p>content1</p> : 2 === 2 ? <p>content2</p> : <p>content3</p>}
    </div>
  )
}
```

## 5.3. 논리연산자

`&&`를 사용하여 선행하는 논리연산이 참일 경우에만, 뒤의 컴포넌트를 보여준다.

```js
function Component() {
  return <div>{1 === 1 && <p>content</p>}</div>
}
```

## 5.4. switch

switch 문을 이용하여 특정 변수의 값에 따라서 다른 컴포넌트를 렌더링할 수 있다.

```js
function Component() {
  var user = 'seller'
  switch (user) {
    case 'seller':
      return <h4>seller</h4>
    case 'customer':
      return <h4>customer</h4>
    default:
      return <h4>else</h4>
  }
}
```

## 5.5. Array / Object

Array의 index, Object의 key특징을 활용하여 원하는 컴포넌트만 렌더링할 수 있다.

```js
function Component() {
  var 현재상태 = 'info'
  return (
    <div>
      {
        {
          info: <p>info</p>,
          shipping: <p>shipping</p>,
          refund: <p>refund</p>,
        }[현재상태]
      }
    </div>
  )
}
```
