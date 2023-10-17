---
title: '자바스크립트 this 정복하기'
updatedAt: '2023-09-24'
createdAt: '2023-09-24'
isCompleted: true
description: '자바스크립트 this의 동작원리'
tags: ['this', 'bind', 'apply', 'new', '화살표 함수', '바인딩']
reference:
---

# 1. this 란?

this는 **함수가 실행컨텍스트에서 참조하고 있는 객체**이다. 따라서 모든 함수는 자신만의 this를 가지고 있다. 문제는 이 this가 **호출되는 시점**에 따라 다이나믹하게 결정된다는 것이다. 물론 아무렇게나 결정되는 것은 아니고 앞으로 설명하는 규칙들을 따른다.

# 2. 기본 바인딩

함수 **단독으로 실행 시**, this는 **전역객체**를 가리킨다. 전역객체란 브라우저에서는 `window`이며, Node.js에서는 `global`을 말한다. 그런데 아주 사소한 차이가 있다.

## 2.1. Browser

- **비엄격모드**  
  비엄격모드에서는 `window` 객체가 그대로 출력된다.

  ```js
  const printThis = function () {
    console.log(this)
  }

  printThis() // Window
  ```

- **엄격모드**  
  엄격모드에서는 `window` 객체 참조가 막히기 때문에 `undefined`가 출력된다.

  ```js
  'use strict'

  const printThis = function () {
    console.log(this)
  }

  printThis() // undefined
  ```

## 3.2. Node.js

- **함수코드**  
  함수 내부에서 가리키는 this가 단독 실행되었을 때, `global`객체가 출력된다.

  ```js
  const printThis = function () {
    console.log(this)
  }

  printThis() // Object [global]
  ```

- **전역코드**  
  전역 코드에서 this를 바로 확인할 경우, 빈 객체(`{}`)가 출력되는데 이는 파일의 모듈 객체(`module.exports`)를 가리킨다.

  ```js
  console.log(this) // {}
  console.log(this === module.exports) // True
  ```

# 3. 암시적 바인딩

**객체의 메소드로 함수를 실행**할 경우, this는 **함수를 호출한 객체**를 가리킨다. 즉 '.'앞의 객체를 가리키는 것이다.

```js
const obj = {
  name: 'Hi',
  printThis() {
    console.log(this)
  },
}

obj.printThis() // { name: 'Hi', printThis: [Function: printThis] }
```

그러나 메소드를 **다른 변수에 할당**하거나, **콜백함수 인자**로 넘겨주게 되면 단독실행과 동일하게 동작한다. 함수가 참조타입 임에도 this에 대한 정보는 전달되지 않기 때문이다.

```js
const obj = {
  name: 'Hi',
  printThis() {
    console.log(this)
  },
}

const pT = obj.printThis
pT() // Object [global]
```

```js
const obj = {
  name: 'Hi',
  printThis() {
    console.log(this)
  },
}

const callbackThis = function (callback) {
  callback()
}

callbackThis(obj.printThis) // Object [global]
```

# 4. 명시적 바인딩

명시적 바인딩을 통해 함수의 this가 **항상 특정 객체를 바라보도록** 지정할 수 있다. `bind`와 `apply` 두가지 메소드로 구현된다.

- **bind(thisArg, arg1, arg2, ...)**  
  `bind`는 첫번째 인자로 바인딩할 객체를 받고, 이어서 **추가 인자를 개별 전달**한다. 또한 this가 **바인딩된 콜백함수를 반환**한다.

  ```js
  const obj = {
    printThis(...args) {
      console.log(this, args)
    },
  }

  const bindObj = {
    name: 'Hello',
  }

  const bindPrintThis = obj.printThis.bind(bindObj, 1, 2)
  bindPrintThis() // { name: 'Hello' } [ 1, 2 ]
  ```

- **apply(thisArg, argsArray)**  
  `apply`는 첫번째 인자로 바인딩할 객체를 받고, 이어서 **추가 인자를 배열로 묶음 전달**한다. 또한 this가 **바인딩된 함수를 즉시 실행**한다.

  ```js
  const obj = {
    printThis(...args) {
      console.log(this, args)
    },
  }

  const bindObj = {
    name: 'Hello',
  }

  obj.printThis.apply(bindObj, [1, 2]) // { name: 'Hello' } [ 1, 2 ]
  ```

## 4.1. 바인딩 중첩

- **bind(thisArg, arg1, arg2, ...)**  
  `bind`는 두번째 이후 바인딩을 무시하고, 인자는 계속해서 추가한다.

  ```js
  const obj = {
    printThis(...args) {
      console.log(this, args)
    },
  }

  const firstBindObj = {
    name: 'Hello',
  }

  const secondBindObj = {
    name: 'Hi',
  }

  const firstBindPrintThis = obj.printThis.bind(firstBindObj, 1, 2)
  const secondBindPrintThis = firstBindPrintThis.bind(secondBindObj, 3, 4)
  firstBindPrintThis() // { name: 'Hello' } [ 1, 2 ]
  secondBindPrintThis() // { name: 'Hello' } [ 1, 2, 3, 4 ]
  ```

- **apply(thisArg, argsArray)**  
  `apply`는 모든 바인딩이 독립적이다.

  ```js
  const obj = {
    printThis(...args) {
      console.log(this, args)
    },
  }

  const firstBindObj = {
    name: 'Hello',
  }

  const secondBindObj = {
    name: 'Hi',
  }

  obj.printThis.apply(firstBindObj, [1, 2]) // { name: 'Hello' } [ 1, 2 ]
  obj.printThis.apply(secondBindObj, [3, 4]) // { name: 'Hi' } [ 3, 4 ]
  ```

# 5. 화살표 함수

화살표 함수를 사용할 경우, this는 **렉시컬 스코프를 기준으로 상위 스코프의 this**를 가리킨다. 즉 화살표 함수는 this를 정적 스코프로 묶어준다. 화살표 함수로 this를 직관적으로 사용할 수 있지만, 객체 선언과 이벤트 리스너 등록에서 **사용에 주의가 필요**하다.

```js
const obj = {
  name: 'Hi',
  printThis() {
    setTimeout(() => {
      console.log(this)
    }, 1000)
  },
}

obj.printThis()
```

## 5.1. 객체 메소드 선언

일번적으로 객체 메소드 안의 this는 **메소드가 포함된 객체를 가리키길 희망**할 것이다. 그러나 메소드를 화살표함수로 선언하면, 렉시컬 스코프에 따라 객체 상위 스코프의 this를 물려받는다.

```js
const obj = {
  printThis: () => {
    console.log(this)
  },
}

obj.printThis() // {}
```

## 5.2. 이벤트 리스너

`addEventListener`에 등록된 콜백함수는 원래 **함수가 등록된 HTML요소를 참조**한다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script defer src="./test.mjs"></script>
  </head>
  <body>
    <button>클릭</button>
  </body>
</html>
```

```js
// test.mjs
const button = document.getElementsByTagName('button')[0]

button.addEventListener('click', function () {
  console.log(this) // <button>클릭</button>
})
```

그러나 콜백함수를 화살표 함수로 넘겨줄 경우 **Window 전역 객체**를 가리킨다.

```js
// test.mjs
const button = document.getElementsByTagName('button')[0]

button.addEventListener('click', () => {
  console.log(this) // Window
})
```

# 참고 자료

- [10분 테코톡: 브콜의 This](https://www.youtube.com/watch?v=7RiMu2DQrb4)
- [짐코딩: 자바스크립트 this란 무엇인가?](https://www.youtube.com/watch?v=GteV4zfqPIk)
- [MDN: this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [MDN: Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)
- [MDN: Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
