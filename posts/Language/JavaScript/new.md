---
title: '자바스크립트 생성자 함수 & new 키워드'
updatedAt: '2023-10-11'
createdAt: '2023-10-11'
isCompleted: true
tags: ['JavaScript', '자바스크립트', 'new', '생성자 함수']
reference:
---

# 1. 생성자 함수 & new 키워드

**new 키워드와 생성자 함수를 사용하면 손쉽게 객체를 찍어낼 수 있다.** 자바스크립트 버전의 OOP라고 생각할 수 있다. 자바가 객체를 찍어내기 위해 `class` 키워드를 사용한다면, 자바스크립트는 생성자 함수와 `new` 키워드를 사용한다. (ES6 버전부터 자바스크립트도 `class`키워드를 지원하지만, 내부 동작은 바뀌지 않았다.)

## 1.1. 정의

생성자 함수는 **객체를 생성(반환)하는 함수**이다. 사실 다른 일반 함수와 기술적으로 동일하다. 다만 다음 2개의 관례를 통해 구분되어 사용된다. (관례라는 것에서 추측할 수 있듯이 강제성은 없다.)

- 함수 이름의 첫 글자는 대문자로 시작한다.
- new 키워드를 붙여 실행한다.

```js
// 생성자 함수
function User(name) {
  this.name = name
  this.sayHi = function () {
    console.log('제 이름은 ' + this.name + '입니다.')
  }
}

const mike = new User('mike')
console.log(mike.name) // mike
mike.sayHi() // 제 이름은 mike입니다.

const sally = new User('sally')
console.log(sally.name) // sally
sally.sayHi() // 제 이름은 sally입니다.
```

## 1.2. 동작 원리

앞서 말했다시피 생성자 함수는 일반 함수와 다르지 않다. 차이를 만드는 것은 `new` 키워드이다. `new` 키워드가 내부적으로 다음 2가지 동작을 추가한다.

- 함수 코드 실행 전, `this`에 빈 객체를 할당한다.
- 함수 코드 실행 후, `this`를 반환한다.

`new` 키워드가 아래처럼 2줄의 주석 코드가 내부적으로 실행한다.

```js
function User(name) {
  // this = {}

  this.name = name
  this.sayHi = function () {
    console.log('제 이름은 ' + this.name + '입니다.')
  }

  // return this
}

const mike = new User('mike')
```

## 1.3. 관례 벗어나보기

앞 서 말한 2개의 관례를 벗어나보자.

- **함수 이름의 첫 글자는 대문자로 시작한다.**  
  아래와 같이 코드를 작성해도 전혀 무리없이 동작한다. 그럼에도 생성자 함수를 대문자로 작성하는 것은, 해당 함수를 `new`키워드로 실행하라는 힌트를 주기 위해서인 것 같다.

  ```js
  function user(name) {
    this.name = name
    this.sayHi = function () {
      console.log('제 이름은 ' + this.name + '입니다.')
    }
  }

  const mike = new user('mike')
  console.log(mike.name) // mike
  mike.sayHi() // 제 이름은 mike입니다.
  ```

- **new 키워드를 붙여 실행한다.**  
  new 키워드 없이 실행하면 에러가 난다. 내부적으로 `this`가 선언되지 않았기 때문에 `undefinend`에 속성을 추가할 수 없기 때문이다.

  ```js
  function User(name) {
    this.name = name
    this.sayHi = function () {
      console.log('제 이름은 ' + this.name + '입니다.')
    }
  }

  const mike = User('mike') // TypeError: Cannot set properties of undefined (setting 'name')
  ```

# 2. return문

그런데 만약 `return`문이 있는 함수를 `new` 키워드로 실행시키면 어떻게 될까?

## 2.1. 원시 타입

리턴하는 값이 원시 타입일 경우, 원래 `return`문을 무시하고 `this`를 반환한다.

```js
function sum(a, b) {
  return a + b
}

const result = new sum(1, 1)
console.log(result) // {}
console.log(typeof result) // object
```

## 2.2. 객체 타입

리턴하는 값이 객체 타입일 경우, 원래 `return`문을 그대로 반환한다.

```js
function sum(a, b) {
  return { result: a + b }
}

const result = new sum(1, 1)
console.log(result) // { result: 2 }
```

참고로 자바스크립트에서는 배열이나 함수도 모두 객체이다. 부디 기억해주길 바란다.

```js
function sum(a, b) {
  return [a + b]
}

const result = new sum(1, 1)
console.log(result) // [ 2 ]
```

# 3. 참고자료

- [Ilya Kantor: new 연산자와 생성자 함수](https://ko.javascript.info/constructor-new)
- [코딩앙마: 자바스크립트 중급 강좌 #2 - 생성자 함수](https://www.youtube.com/watch?v=8hrSkOihmBI&t=1s)
