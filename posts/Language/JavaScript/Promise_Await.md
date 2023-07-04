---
title: 'Promise와 await를 활용하 JS 8가지 비동기 처리'
updatedAt: '2023-01-02'
createdAt: '2023-01-02'
isCompleted: true
reference:
---

- [1. Promise](#1-promise)
  - [1.1. Promise(executor)](#11-promiseexecutor)
- [2. Aysnc \& Await](#2-aysnc--await)
  - [2.1. async](#21-async)
  - [2.2. await](#22-await)
  - [2.3. try / catch](#23-try--catch)
- [3. Example](#3-example)
  - [3.1. Chaining 처리, Hard Code](#31-chaining-처리-hard-code)
    - [3.1.1. Promise](#311-promise)
    - [3.1.2. await](#312-await)
  - [3.2. Chaining 처리, Soft Code](#32-chaining-처리-soft-code)
    - [3.2.1.Promise](#321promise)
    - [3.2.2. await](#322-await)
  - [3.3. All 처리, 비 순차 결과](#33-all-처리-비-순차-결과)
    - [3.3.1. Promise](#331-promise)
    - [3.3.2. await](#332-await)
  - [3.4. All 처리, 순차 결과](#34-all-처리-순차-결과)
    - [3.4.1. Promise](#341-promise)
    - [3.4.2. await](#342-await)

---

# 1. Promise

## 1.1. Promise(executor)

executor는 resolve, reject 함수를 인수를 전달할 실행 함수이다.
resolve를 호출해 프로미스를 이행하거나, 오류가 발생한 경우 reject를 호출해 거부할 수 있다.

```js
const myFirstPromise = new Promise((resolve, reject) => {
  // do something asynchronous which eventually calls either:
  //
  //   resolve(someValue)        // fulfilled
  // or
  //   reject("failure reason")  // rejected
})
```

# 2. Aysnc & Await

## 2.1. async

async function 선언은 Promise 객체를 반환하는 비동기 함수를 선언한다. 명시적으로 Promise 객체를 반환해줄 수도 있다.

```js
async function f() {
  return 1
}
f().then(alert) // 1

async function f() {
  return Promise.resolve(1)
}
f().then(alert) // 1
```

## 2.2. await

await 키워드는 async 키워드가 붙어있는 함수 내부에서만 사용할 수 있으며, 비동기 함수가 리턴하는 Promise로 부터 결과값을 추출한다.

async 코드 내의 await함수가 선언된 경우, 해당 함수가 끝날 때까지 다음 코드가 실행되지 않는다. **즉 마치 동기적 코드블록처럼 작용한다.**

## 2.3. try / catch

async와 await 키워드를 사용하는 경우, 보통의 코드처럼 try/catch 구문을 사용하여 예외처리할 수 있다.

# 3. Example

```js
function delay_word(word, delay) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve(word)
    }, delay)
  })
}
```

- **setTimeout(functionRef, delay, params\*)**
  - delay 시간 이후에, functionRef를 실행한다.
  - params는 functionRef의 인자값들이다.

## 3.1. Chaining 처리, Hard Code

이전 비동기 작업을 완료한 이후에 순차적으로 다음 작업을 처리한다.

### 3.1.1. Promise

이전 작업이 완료된 이후에, 반환된 객체를 받아서 내부 함수를 순차 실행한다.

```js
delay_word('SAMSUNG', 500).then((resolve) => {
  console.log(resolve)

  delay_word('SW', 490).then((resolve) => {
    console.log(resolve)

    delay_word('ACADEMY', 480).then((resolve) => {
      console.log(resolve)

      delay_word('FOR', 470).then((resolve) => {
        console.log(resolve)

        delay_word('YOUTH', 460).then((resolve) => {
          console.log(resolve)
        })
      })
    })
  })
})
```

위 코드는 아래와 같이 변환 가능하다.

```js
delay_word('SAMSUNG', 500)
  .then((resolve) => {
    console.log(resolve)
    return delay_word('SW', 490)
  })
  .then((resolve) => {
    console.log(resolve)
    return delay_word('ACADEMY', 480)
  })
  .then((resolve) => {
    console.log(resolve)
    return delay_word('FOR', 470)
  })
  .then((resolve) => {
    console.log(resolve)
    return delay_word('YOUTH', 460)
  })
  .then((resolve) => {
    console.log(resolve)
  })
```

### 3.1.2. await

await 함수가 dealy_word로부터 Promise 객체를 받아 실행되며, async 내부의 코드들은 await 함수를 비동기적으로 기다린다.

```js
async function test() {
  const resolve_0 = await delay_word('SAMSUNG', 500)
  console.log(resolve_0)
  const resolve_1 = await delay_word('SW', 490)
  console.log(resolve_1)
  const resolve_2 = await delay_word('ACADEMY', 480)
  console.log(resolve_2)
  const resolve_3 = await delay_word('FOR', 470)
  console.log(resolve_3)
  const resolve_4 = await delay_word('YOUTH', 460)
  console.log(resolve_4)
}
```

## 3.2. Chaining 처리, Soft Code

### 3.2.1.Promise

- **arr.reduce(callback[, initialValue])**
  - callback(accumulator, currentValue)
    - accumulator: 누적값
    - currentValue: 현재 계산값
  - initialValue
    - 초깃값, 없을 경우 배열의 첫번째 값

array의 reduce 메소드를 활용하여 soft한 코드를 작성하였다. `Promise.resolve()`를 사용하여 초깃값으로 Promise 객체를 지정해주었다.

```js
const array = [
  { word: 'SAMSUNG', delay: 500 },
  { word: 'SW', delay: 490 },
  { word: 'ACADEMY', delay: 480 },
  { word: 'FOR', delay: 470 },
  { word: 'YOUTH', delay: 460 },
]

array.reduce((prev, item) => {
  return prev.then(() =>
    delay_word(item.word, item.delay).then((promise) => {
      console.log(promise)
    })
  )
}, Promise.resolve())
```

### 3.2.2. await

반복문을 이용하여 await함수를 반복해서 실행하였다.

```js
const array = [
  { word: 'SAMSUNG', delay: 500 },
  { word: 'SW', delay: 490 },
  { word: 'ACADEMY', delay: 480 },
  { word: 'FOR', delay: 470 },
  { word: 'YOUTH', delay: 460 },
]

async function test() {
  for (const item of array) {
    const resolve = await delay_word(item.word, item.delay)

    console.log(resolve)
  }
}
```

## 3.3. All 처리, 비 순차 결과

### 3.3.1. Promise

forEach문으로 5개의 비동기함수가 실행되었다. 따라서 5개의 비동기함수가 거의 동시에 시작이 되었으므로, 결과값은 dealy시간에 따라 출력된다.

```js
const array = [
  { word: 'SAMSUNG', delay: 500 },
  { word: 'SW', delay: 490 },
  { word: 'ACADEMY', delay: 480 },
  { word: 'FOR', delay: 470 },
  { word: 'YOUTH', delay: 460 },
]

// Promise 객체로 비동기 작업을 처리했기 때문에, async 키워드는 생략 가능하다.
array.forEach(async (item) => {
  delay_word(item.word, item.delay).then((resolve) => {
    console.log(resolve)
  })
})
```

### 3.3.2. await

```js
const array = [
  { word: 'SAMSUNG', delay: 500 },
  { word: 'SW', delay: 490 },
  { word: 'ACADEMY', delay: 480 },
  { word: 'FOR', delay: 470 },
  { word: 'YOUTH', delay: 460 },
]

array.forEach(async (item) => {
  const resolve = await delay_word(item.word, item.delay)

  console.log(resolve)
})
```

## 3.4. All 처리, 순차 결과

**Promise.all()**
여러개의 비동기함수를 병렬적으로 실행하고, **실행순서**따라 결과 Promise객체를 반환한다.

### 3.4.1. Promise

```js
const array = [
  { word: 'SAMSUNG', delay: 500 },
  { word: 'SW', delay: 490 },
  { word: 'ACADEMY', delay: 480 },
  { word: 'FOR', delay: 470 },
  { word: 'YOUTH', delay: 460 },
]

const promise_list = []

array.forEach((item) => {
  const promise = delay_word(item.word, item.delay)

  promise_list.push(promise)
})

Promise.all(promise_list).then((values) => {
  values.forEach((resolve) => {
    console.log(resolve)
  })
})
```

### 3.4.2. await

Promise객체를 병렬적으로 실행시켜서, 진행중인(pending) Promise객체를 배열에 집어넣는다.

그리고 await함수를 통해 값을 할당하여 출력하면, 가장 오랜 시간이 걸리는 Promise객체의 delay시간과 유사한 지연시간을 가진다.

```js
const array = [
  { word: 'SAMSUNG', delay: 500 },
  { word: 'SW', delay: 490 },
  { word: 'ACADEMY', delay: 480 },
  { word: 'FOR', delay: 470 },
  { word: 'YOUTH', delay: 460 },
]

async function test() {
  const async_fun_list = []

  for (item of array) {
    const async_fun = delay_word(item.word, item.delay)

    console.log(async_fun) // Promise { <pending> }

    async_fun_list.push(async_fun)
  }

  for (async_fun of async_fun_list) {
    const resolve = await async_fun

    console.log(resolve)
  }
}
```
