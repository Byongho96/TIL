---
title: 'JavaScript 비동기 처리 Promise & Async'
updatedAt: '2023-09-07'
createdAt: '2023-09-07'
isCompleted: true
tags: ['promise', 'async', 'await', 'try', 'catch', '비동기']
reference: 'https://www.youtube.com/watch?v=aoQSOZfz3vQ'
---

> 이 글은 [드림코딩: 자바스크립드 11 ~ 13 비동기 강의](https://www.youtube.com/@dream-coding)를 듣고 정리한 문서이다.

# 1. Callback

콜백 함수란, **다른 함수의 매개변수로 전달되어 전달된 함수 내부에서 실행될 수 있는 함수**를 말한다.

## 1.1. 동기적 콜백

전달된 콜백함수가 동기적으로 바로 실행되는 것을 말한다.

```js
function runImmediately(cb) {
  cb()
}

console.log(1)
runImmediately(() => console.log(2))
console.log(3)

// 1
// 2
// 3
```

## 1.2. 비동기적 콜백

전달된 콜백함수가 시간차를 두고 비동기적으로 실행되는 것을 말한다. 아래는 `setTimeout`을 썼지만, 보통 프론트에서는 AJAX 요청에 의한 비동기 실행이 더 빈번하다.

```js
function runWithDelay(cb, timeout) {
  setTimeout(cb, timebout)
}

console.log(1)
runWithDelay(() => console.log(2), 1000)
console.log(3)

// 1
// 3
// 2
```

## 1.3. 비동기 api 코드 예시

실제 AJAX 통신을 구현하는 대신, 임의로 3초 이후에 콜백함수를 실행시키도록 설계했다.

```js
class Api {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (id === 'user' && password === '1q2w3e4r!') {
        onSuccess(id)
      } else {
        onError(new Error('not found'))
      }
    }, 3000)
  }
}

Api.loginUSer(
  id,
  password,
  (res) => console.log(res),
  (error) => console.log(err)
)
```

# 2. Promise

Promise는 **비동기 작업의 대기, 완료, 실패를 나타내는 객체**이다. 또한 체이닝을 통해 작업의 완료/실패에 따라 실행할 콜백함수를 가독성 있게 작성할 수 있다.

## 2.1. Promise Producer

Promise 객체는 생성 시에, `executor`라는 콜백 함수를 전달해줘야 한다. `executor`는 생성자에 전달 된 이후 **바로 실행되는 함수**이며, 아래와 같이 **두 개의 콜백함수를 인자**로 받는다.

```ts
// 두 개의 콜백 함수를 인자로 받는다
executor: (resolve, reject) => void

// 동작 시에 promise를 fulfilled 상태로 만들며, 다음 then 체이닝에 value를 전달한다.
resolve: (value?: any) => void

// 동작 시에 promise를 rejected 상태로 만들며, 다음 catch 체이닝에 reason을 전달한다.
reject: (reason?: any) => void
```

```js
const promise = new Promise((resolve, reject) => {
  console.log('run executor')
  setTimeout(() => {
    resolve('success')
    // reject(new Error('no network'))
  }, 1000)
})
```

## 2.2. Promise Consumer

체이닝을 이용하면, Promise의 상태에 따라 **어떤 콜백함수를 이어 실행할 지** 가독성 있게 작성할 수 있다.

- **then**
  - 바로 앞 선 Promise가 성공(fulfilled) 상태일 때 실행된다.
- **catch**
  - 앞 선 Promise중 하나라도 실패(rejected) 상태일 때 실행된다.
- **finally**
  - Promise상태에 관련없이 마지막에 항상 실행된다.

위의 모든 메소드들은 **또 다시 Promise를 반환**하기 때문에, 아래 코드처럼 연달아 작성할 수 있다. 따라서 이를 프로미스 체이닝이라고 일컫는다.

```js
promise
  .then((value) => {
    console.log(value)
  })
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {
    console.log('finally')
  })
```

## 2.3. 에러 핸들링

먼저 정상 동작하는 코드는 다음과 같다.

```js
const getHen = () => {
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐔'), 1000)
  })
}
const getEgg = (hen) => {
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${hen} => 🥚`), 1000)
  })
}
const getCook = (egg) => {
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000)
  })
}

getHen()
  .then((hen) => getEgg(hen))
  .then((egg) => getCook(egg))
  .then((meal) => console.log(meal))

// 🐔 => 🥚 => 🍳
```

두번째 `getEgg`에서 임의로 에러를 발생시켰는데, 이를 잡은 `catch`문이 **return 문으로 정상적인 값을 반환**하면, 이어서 `then`문이 정상적으로 동작할 수 있다.

```js
const getHen = () => {
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('🐔'), 1000)
  })
}
const getEgg = (hen) => {
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 🥚`)), 1000)
  })
}
const getCook = (egg) => {
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 🍳`), 1000)
  })
}

getHen()
  .then((hen) => getEgg(hen))
  .catch((error) => {
    return '🍞'
  })
  .then((egg) => getCook(egg))
  .then((meal) => console.log(meal))

// 🍞 => 🍳
```

## 2.4. 비동기 api 코드 예시

위의 [[1.3. 비동기 api 코드 예시]](#13-api-예시) 항목에서 콜백함수로 작성되었던 코드를 Promise를 이용해서 업데이트했다.

```js
class Api {
  loginUser(id, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id === 'user' && password === '1q2w3e4r!') {
          resolve(id)
        } else {
          reject(new Error('not found'))
        }
      }, 1000)
    })
  }
}

Api.loginUSer(id, password)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
```

# 3. async / await

async와 await는 문법적 설탕(syntatic sugar)로써, **Promise의 생성과 체이닝을 더 쉽게 구현**하도록 도와준다.

## 2.1. async

`async`를 이용하여 함수를 선언하면, **해당 함수는 Promise 객체로 반환**된다.>`return`문으로 `resolve` 콜백함수를 대체할 수 있고, `throw`문으로 `reject` 콜백함수를 대체할 수 있다.

```js
async function fetchUser() {
  return 'user'
}

const user = fetchUser()
console.log(user)
user.then(console.log)

// Promise
// user
```

## 2.2. await

`await`키워드는 `async`로 선언된 함수 내부에서만 사용 가능하다. 비동기 함수가 평가될 때까지 뒤의 코드를 지연시킨다. **Promsie 객체의 `then` 메소드처럼 동작**한다.

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getBanana() {
  await delay(3000)
  return '🍌'
}

function getBanana() {
  return delay(3000).then(() => '🍌')
}
```

## 2.3. 에러 핸들링

`async` 함수는 `try... catch...`문을 통해 에러를 핸들링 할 수 있다.

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getApple() {
  await delay(3000)
  return '🍎'
}

async function getBanana() {
  await delay(3000)
  return '🍌'
}

async function pickFruits() {
  try {
    const apple = await getApple()
    const banana = await getBanana()
  } catch (error) {
    throw error
  }
  return `${apple} + ${banana}`
}
```

# 4. Promise vs async

언뜻 보면 async가 Promise보다 항상 더 나을 것 같다. 하지만 Promise를 적절하게 활용하면, async보다 성능 상의 이점을 얻을 수 있다.

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getApple() {
  await delay(3000)
  return '🍎'
}

async function getBanana() {
  await delay(3000)
  return '🍌'
}

// 아래 코드는 총 6초가 소요된다
async function pickFruits() {
  const apple = await getApple()
  const banana = await getBanana()
  return `${apple} + ${banana}`
}

// 아래 코드는 총 3초가 소요된다
async function pickFruits() {
  const applePromise = getApple()
  const bananaPromise = getBanana()
  const apple = await applePromise()
  const banana = await bananaPromise()
  return `${apple} + ${banana}`
}
```

## 4.1. Promise.all

Promise의 `all` 메소드는 여러 개의 Promise 객체를 배열로 받아, **모든 Promise가 완료되었을 때** 그 결과값을 동일한 순서의 배열로 반환한다.

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getApple() {
  await delay(3000)
  return '🍎'
}

async function getBanana() {
  await delay(3000)
  return '🍌'
}

function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(' + ')
  )
}
```

## 4.2. Promise.race

Promise의 `race` 메소드는 여러 개의 Promise 객체를 배열로 받아, **가장 빨리 완료된 Promise 객체**의 결과값을 반환한다.

```js
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getApple() {
  await delay(3000)
  return '🍎'
}

async function getBanana() {
  await delay(3000)
  return '🍌'
}

function pickOnlyone() {
  return Promise.race([getApple(), getBanana()])
}
```

# 5. 참고자료

- [드림코딩: 자바스크립트 11. 비동기 처리의 시작 콜백 이해하기, 콜백 지옥 체험](https://www.youtube.com/watch?v=s1vpVCrT8f4&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=11)
- [드림코딩: 자바스크립트 12. 프로미스 개념부터 활용까지](https://www.youtube.com/watch?v=JB_yU6Oe2eE&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=12)
- [드림코딩: 자바스크립트 13. 비동기의 꽃 JavaScript async 와 await 그리고 유용한 Promise APIs](https://www.youtube.com/watch?v=aoQSOZfz3vQ&list=PLv2d7VI9OotTVOL4QmPfvJWPJvkmv6h-2&index=13)
