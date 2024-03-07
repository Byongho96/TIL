---
title: '자바스크립트 Proxy & Reflect 객체'
updatedAt: '2024-03-07'
createdAt: '2024-03-07'
isCompleted: false
description: '자바스크립트의 Proxy와 Reflect 객체를 알아보자'
tags: ['JavaScript', '자바스크립트', 'Proxy', '프록시', 'Reflect']
reference:
---

# 1. Proxy

`Proxy` 객체는 자바스크립트 `Object`에 대한 기본적인 접근(set, get, define) 요청에 대해 인터셉터를 구현하여, 특정로직을 수행한다.

객체에 대한 접근 로그를 기록하거나, 입력값에 대한 그것을 제공한다. 간다니 말해서 이미 생성된 `Object`에 대해 손쉽게 getter와 setter 구현하는 것이다.

## 1.1. 기본 사용법

- `target`: 원본 객체
- `handler`: 인터셉터 로직이 구현된 객체

```js
const target = {
  message1: 'hello',
  message2: 'everyone',
}

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      return `${target[prop]} :: returned by Proxy`
    }
    return `${prop} doesn't exist :: returned by Proxy`
  },
}

const proxy = new Proxy(target, handler)

console.log(proxy.message1)
console.log(proxy.message3)
```

```bash
hello :: returned by Proxy
message3 doesn't exist :: returned by Proxy
```

## 1.2. Proxy 트랩 종류

handler 안에 구현된 인터셉터 함수를 `trap`이라고 한다. 각각의 함수들이 동작하는 시점이 정해져있다. 아래는 그 시점을 정리한 것이며, 함수마다의 구체적인 인자 정보는 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions)에서 확인할 수 있따.

공통적인 `target`과 `prop`ㅇ

| 트랩 | 작동 시점     |
| ---- | ------------- |
| get  | 프로퍼팅 접근 |

# 2. Reflect

JavaScript 객체의 내부 메서드를 호출하기 위한 정적 메서드를 포함하고 있습니다. 이 메서드들은 프록시 핸들러와 동일합니다. 때문에

무슨 말이냐하면 아래 코드에서 `hasOwnProperty`와 `has`는 모든 객체의 프로퍼티 존재유무를 검사하는 메소드이다. 그런데 `hasOwnProperty`는 Object 자체의 프로토타입 메소드인 반면, `has`는 Reflect에 구현되어 있는 일종의 라이브러리 함수이다.

```js
const obj = {
  message: 'Hi',
}

console.log(obj.hasOwnProperty('message')) // 프로퍼티 검사. 상속 제외
console.log(Reflect.has(obj, 'message')) // 프로퍼티 검사. 상속 포함
```

```bash
true
true
```

## 2.1. 기본 사용법

따라서 Object를 핸들링하는 용도로 사용할 수 있다. 기본적인 set, get, has 메소드의 사용방법은 다음과 같다.

```js
const obj = { a: 1, b: 'zero', c: true }
const arr = [1, 'zero', true]

Reflect.get(obj, 'a') // 1
```

## 2.2. Reflect 메소드

다양한 Reflect 메소드 및 구체적인 인자 정보는 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods)에서 확인할 수 있다.

# 3. Proxy & Reflect

Proxy와 Reflect를 쓰는 이유에 대해서 열심히 알아봤다. JavaScript 객체의 내부 메서드를 호출하기 위한 정적 메서드를 포함하고 있습니다. 이 메서드들은 프록시 핸들러와 동일하기 때문이다.

그외 SideEffect를 방지할 수 있다는데, 솔직히 잘 모르겠다. 나는 오히려 SideEffect라고 말하는 부분이 예상되는 동작 같다.

## 3.1. 조합 예제

# 참조

- [MDN : "Proxy"](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN : "Reflect"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflec)
- [JAVASCRIPT.INFO : "Proxy와 Reflect"](https://ko.javascript.info/proxy#ref-382)
- [Inpa Dev : "자바스크립트 Proxy & Reflect 고급 기법"](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Proxy-Reflect-%EA%B3%A0%EA%B8%89-%EA%B8%B0%EB%B2%95)
