---
title: '자바스크립트 Proxy & Reflect 객체'
updatedAt: '2024-03-08'
createdAt: '2024-03-08'
isCompleted: true
description: '자바스크립트의 Proxy와 Reflect 객체를 알아보자'
tags: ['JavaScript', '자바스크립트', 'Proxy', '프록시', 'Reflect']
reference:
---

# 1. Proxy

`Proxy` 객체는 자바스크립트 `Object`에 대한 기본적인 접근(set, get, define) 요청에 대해 인터셉터를 구현하여, 특정로직을 수행한다.

객체에 대한 접근 로그를 기록하거나, 입력값에 대한 그것을 제공한다. 간다니 말해서 이미 생성된 `Object`에 대해 손쉽게 getter와 setter 구현하는 것이다.

## 1.1. Proxy 트랩 종류

handler 안에 구현된 인터셉터 함수를 `trap`이라고 한다. 각각의 함수들은 특정한 시점에 동작하여, 객체에 대한 접근을 가로챈다. 각 트랩이 받는 인자 정보는 [MDN 문서](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions)에서 확인할 수 있다.

| 트랩                     | 작동 시점                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------- |
| get                      | 프로퍼티를 읽을 때                                                                     |
| set                      | 프로퍼티를 쓸 때                                                                       |
| has                      | in 연산자가 동작할 때                                                                  |
| deleteProperty           | delete 연산자가 동작할 때                                                              |
| apply                    | 함수를 호출할 때                                                                       |
| construct                | new 연산자가 동작할 때                                                                 |
| getPrototypeOf           | Object.getPrototypeOf 가 작동할 때                                                     |
| setPrototypeOf           | Object.setPrototypeOf 가 작동할 때                                                     |
| isExtensible             | Object.isExtensible 가 작동할 때                                                       |
| preventExtensions        | Object.preventExtensions 가 작동할 때                                                  |
| getOwnPropertyDescriptor | Object.getOwnPropertyDescriptor 가 작동할 때                                           |
| ownKeys                  | Object.getOwnPropertyNames 가 작동할 때 <br/>Object.getOwnPropertySymbols 가 작동할 때 |

## 1.2. 기본 활용 예제

아래 예제들은 [JavaScript.info 문서](https://ko.javascript.info/proxy)를 기반으로 작성했다.

### 1.2.1. get

get 트랩으로 프로퍼티의 기본값을 설정할 수 있다.

- `target`: 원본 객체
- `property`: 프로퍼티 네임
- `receiver`: 프록시 혹은 프록시를 상속받은 객체. 이녀석에 대한 자세한 내용은 Reflect에서 확인할 수 있다.

```js
let numbers = [0, 1, 2]

numbers = new Proxy(numbers, {
  get(target, prop, receiver) {
    if (prop in target) {
      return target[prop]
    } else {
      return 0 // 기본값
    }
  },
})

console.log(numbers[1]) // 1
console.log(numbers[123]) // 0
```

### 1.2.2. set

set 트랩으로 프로퍼티에 쓰려는 값을 검증할 수 있다.

- `target`: 원본 객체
- `property`: 프로퍼티 이름
- `value` : 프로퍼티에 쓰려는 값
- `receiver`: 프록시 혹은 프록시를 상속받은 객체. 이녀석에 대한 자세한 내용은 Reflect에서 확인할 수 있다.

> set 트랩이 성공했을 때 반드시 true를 반환해야한다. true이외의 값이 반환되면 TypeError가 발생한다.

```js
let numbers = []

numbers = new Proxy(numbers, {
  set(target, prop, val) {
    if (typeof val == 'number') {
      target[prop] = val
      return true
    } else {
      return false
    }
  },
})

numbers.push(1)
numbers.push(2)
numbers.push('test') // Error: 'set' on proxy

console.log('윗줄에서 에러가 발생했기 때문에 이 줄이 실행되지 않음')
```

### 1.2.3. has

has 트랩으로 범위 내 여부를 확인하는 프록시 객체를 만들 수 있다.

- `target`: 원본 객체
- `property`: 프로퍼티 네임

```js
let range = {
  start: 1,
  end: 10,
}

range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end
  },
})

console.log(5 in range) // true
console.log(50 in range) // false
```

### 1.2.4. deleteProperty와 여러 트랩으로 프로퍼티 보호

보통 프로그래밍에서 `_`가 프로퍼티 이름 앞에 붙으면, 이는 외부에서 접근할 수 없는 내부용 프로퍼티임을 암시한다. `deleteProperty`를 포함한 여러 트랩을 조합하여 해당 기능이 구현된 Proxy 객체를 만들 수 있다.

- `target`: 원본 객체
- `property`: 프로퍼티 네임

```js
let user = {
  name: 'John',
  _password: '***',
}

user = new Proxy(user, {
  get(target, prop) {
    if (prop.startsWith('_')) {
      return '접근이 제한되어있습니다.'
    }
    let value = target[prop]
    return typeof value === 'function' ? value.bind(target) : value
  },
  deleteProperty(target, prop) {
    if (prop.startsWith('_')) {
      return '접근이 제한되어있습니다.'
    }
    delete target[prop]
    return true
  },
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith('_'))
  },
})

console.log(user._password) // 접근이 제한되어있습니다.
console.log(delete user._password) // true
console.log(user.keys()) //[ 'name' ]
```

### 1.2.5. 유의 사항

위 코드에서 `get` 트랩을 보면 최초 접근하는 프로퍼티가 함수일 경우에 `this`를 바인딩 했다. `this`에서 직감할 수 있듯이 결국 누가 함수를 호출하는지의 문제이다.

```js
get(target, prop) {
  // ...
  let value = target[prop];
  return (typeof value === 'function') ? value.bind(target) : value;
}
```

만일 user 객체에 다음과 같은 `checkPassword`라는 메소드가 있다고 가정해자. `checkPassword`는 객체의 메소드이기 때문에 내부 변수에 문제없이 접근할 수 있어야 한다.

```js
let user = {
  // ...
  checkPassword(value) {
    return value === this._password // 이 this는 Proxy가 아닌, 원본 객체여야 한다.
  },
}
```

즉 아래 코드에서 `user`는 Proxy 객체이지만, 실제 `checkPassword`를 실행하는 녀석은 Proxy가 아닌 원본 객체여야 한다. 이것을 구현하기 위해 `get` 트랩에서 최초 접근 프로퍼티가 함수일 경우 바인딩 하는 것이다.

```js
let user = {...}
user = new Proxy(user, {...})
user.checkPassword('password')  // user는 Proxy 객체지만, 실제 checkPassword를 호출은 원본 객체가 해야한다.
```

물론 메소드간 연관성이 복잡해져서, 애초에 **원본 객체**가 넘어가거나 **Proxy가 여러번 덧대어진 객체**가 넘어가면 불상사가 발생한다.

# 2. Reflect

Reflect는 <mark>Proxy의 모든 트랩에 대응하는 함수들을 가진 namespace</mark>이다. 단순한 namespace이기 때문에 생성자로 객체를 생성하지 않고 바로 사용한다. 정적 클래스라고 생각하면 더 직관적이겠다.

```js
let user = {}

Reflect.set(user, 'name', 'John')
```

Proxy 트랩에 대응하는 모든 함수를 가지고 있다고 하지만, 특별한 기능이 구현되어 있지는 않다. 그런걸 왜 쓰는지는 아래에 정리했다.

## 2.1. Proxy의 return 값

> So, return Reflect... provides a safe no-brainer to forward the operation and make sure we don’t forget anything related to that. [Ilya kantor, 모던 JavaScript 튜토리얼 저자]

Proxy 트랩에 반환값을 작성해야 하는데, 늘 대응되는 객체 메소드와 인자를 쓰는 것은 어려운 일이다 (`get`하고 `set`밖에 안써서 어렵다고 느낄 일이 없지만...). 그럴 때 구글링하지 말고 그냥 `Reflect`에서 **동일한 함수**에 **동일한 인자**를 넣어 반환하면 된다.

```js
let user = {
  name: 'John',
}

user = new Proxy(user, {
  get(target, prop, receiver) {
    console.log(`GET ${prop}`)
    return Reflect.get(target, prop, receiver)
  },
  set(target, prop, val, receiver) {
    console.log(`SET ${prop}=${val}`)
    return Reflect.set(target, prop, val, receiver)
  },
})

let name = user.name // GET name
user.name = 'Pete' // "SET name=Pete
```

## 2.2. Proxy 상속 객체 핸들링

또한 **Proxy를 상속받은 객체**가 마치 **Proxy가 가장 밖에 둘러싼 것**처럼 동작하게 만든다.

다음과 같이 `_name` 프로퍼티에 대한 getter를 Proxy로 구현했다.

```js
let user = {
  _name: 'Guest',
  get name() {
    return this._name
  },
}

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]
  },
})

console.log(userProxy.name) // Guest
```

위에 정의한 `userProxy`를 상속 받고 `_name` 프로퍼티가 오버라이딩한 `admin`객체가 있다. 이 객체는 Proxy를 프로토타입으로 가지기 때문에 아래와 같이 Proxy가 새로 정의된 프로퍼티를 커버하지 못하는 것이 당연하다.

```js
let admin = {
  __proto__: userProxy,
  _name: 'Admin',
}

alert(admin.name) // Guest
```

하지만 내가 Proxy를 상속받았을지라도, 결국에는 Proxy가 가장 바깥에서 동작하는 것처럼 보이고 싶을 때 `Reflect`를 쓰면 된다. 앞 서 Proxy 핸들러 메소드 중 몇개가 `receiver`를 인자로 받았다.

바로 이 `receiver`에 Proxy를 상속받은 객체에 대한 정보가 있기 때문에, `Reflect`에 넘겨주면 내부적으로 잘 처리하여 원하는 기능이 구현된다.

```js
let user = {
  _name: 'Guest',
  get name() {
    return this._name
  },
}

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver) // receiver = admin
  },
})

let admin = {
  __proto__: userProxy,
  _name: 'Admin',
}

console.log(admin.name) // Admin
```

# 참조

- [MDN : "Proxy"](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN : "Reflect"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [JAVASCRIPT.INFO : "Proxy와 Reflect"](https://ko.javascript.info/proxy)
- [Inpa Dev : "자바스크립트 Proxy & Reflect 고급 기법"](https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Proxy-Reflect-%EA%B3%A0%EA%B8%89-%EA%B8%B0%EB%B2%95)
