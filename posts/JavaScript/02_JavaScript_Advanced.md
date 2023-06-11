# JavaScript Advanced

## Index

- [1. DOM](#1-dom)
  - [1.1. Document Object Model](#11-document-object-model)
  - [1.2. Special DOM objects](#12-special-dom-objects)
  - [1.3. Handling DOM](#13-handling-dom)
    - [1.3.1. Select](#131-select)
    - [1.3.2. Manipulation](#132-manipulation)
- [2. Event](#2-event)
  - [2.1. Event handler](#21-event-handler)
    - [2.1.1. addEventListener()](#211-addeventlistener)
    - [2.1.2. event.preventDefault()](#212-eventpreventdefault)
- [3. this](#3-this)
  - [3.1. Global Area](#31-global-area)
  - [3.2. Simple Call](#32-simple-call)
  - [3.3. Call by Method](#33-call-by-method)
  - [3.4. Nested Function](#34-nested-function)
    - [3.4.1. Simple Call](#341-simple-call)
    - [3.4.2. Arrow Function](#342-arrow-function)
  - [3.5. addEventListener()](#35-addeventlistener)
- [4. JS의 객체지향 역사](#4-js의-객체지향-역사)

---

# 1. DOM

## 1.1. Document Object Model

Structured and Represented HTML documents as **objects**. Develpoers can access elements of a document with a programming language.
<img src="./images/DOM.png" width=400>

## 1.2. Special DOM objects

- **window**

  - The top-level object referring a tab in browser.

  * **[methods and properties](https://www.w3schools.com/jsref/obj_window.asp)**
    - window.open()
      - opens a new tab
    - window.alert()
      - shows an alerting window
    - window.print()
      - shows a tab for printing

- **document**

  - One of the properties of window, the top-level object of a document

  * **[methods and properties](https://www.w3schools.com/js/js_htmldom_document.asp)**

## 1.3. Handling DOM

### 1.3.1. Select

- **document.querySelector()**

  - selects the first corresponding element.

    ```html
    <body>
      <h1 id="title">DOM</h1>
      <p class="text">paragraph1</p>
      <p class="text">paragraph2</p>

      <script>
        document.querySelector('#title') // <h1 id="title">DOM</h1>
        document.querySelector('.text') // <p class="text">paragraph1</p>
      </script>
    </body>
    ```

* **document.querySelectorAll()**

  - selects all the corresponding elements as a **static NodeList**
    - Changes to the elements are **not** reflected in the static NodeList in real time.
    - But `Node.childNodes` return a live NodeList which changes in real time.
  - JavaScript Array methods can be applied to the NodeList.

  ```html
  <body>
    <h1 id="title">DOM</h1>
    <p class="text">paragraph1</p>
    <p class="text">paragraph2</p>
    <ul>
      <li>list1</li>
      <li>list2</li>
    </ul>

    <script>
      document.querySelectorAll('.text') // NodeList(2) [p.text, p.text]
      document.querySelectorAll('body > ul > li') // NodeList(2) [li, li]
    </script>
  </body>
  ```

### 1.3.2. Manipulation

[HTML DOM APIs](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API)

- **document.createElement(tagName)**
  - Creates a HTML element specified by tagName
- **Node.innerText**
  - Represents the rendered text content of a node and its descendants.
- **Node.appendChild(childNode)**
  - Adds a node to the end of the list of children of a specified parent node.
  - Returns the appended child.
- **Node.removeChild(childNode)**
  - Removes a child node from the DOM.
  - Returns the removed node.
- **Node.append()**
  - Inserts a set of Node objects or string objects <mark>after the last child</mark> of the Element
- **Node.prepend()**
  - Inserts a set of Node objects or string objects <mark>before the first child</mark> of the Element
- **Node.after()**
  - Inserts a set of Node or string objects <mark>just after the Element</mark>
- **Node.before()**
  - Inserts a set of Node or string objects <mark>just before the Element</mark>
- **Element.getAttribute(attributeName)**
  - Returns the value of a specified attribute of the element.
  - If the given attribute does not exist, the value returned will either be `null` or `""`
- **Element.setAttribute(name, value)**
  - Sets the value of an attribute of the element
  - If the attribute already exists, the value is updated.
- **Element.classList**
  - Returns a live DOMTokenList collection of the class attributes of the element
  - The DOMTokenList interface represents a set of space-separated tokens.
  - **add()**
    - Adds the given tokens to the list
  - **remove()**
    - Removes the specified tokens from the list.
  - **replace(oldToken, newToken)**
    - Replaces an existing token with a new token.
    - If the first token doesn't exist, replace() returns false immediately, without adding the new token to the token list.
  - **Toggle()**
    - Removes an existing token from the list and returns false. If the token doesn't exist it's added and the function returns true.

---

# 2. Event

Event Object contains information about events occurring in the system.

## 2.1. Event handler

### 2.1.1. addEventListener()

- `EventTarget.addEventListener(type, listener[, options])`  
  When the type of event occurs ont the EventTarget, the listener fucntion is excuted.

  - **type**
    - Type of the events
  - **listener**
    - Callback function that gets the `event` object as a parameter

```html
<body>
  <button id="btn">Button</button>
  <p id="counter">0</p>

  <script>
    const btn = document.querySelector('#btn')
    const pTag = document.querySelector('#counter')
    let countNum = 0

    btn.addEventListener('click', function (event) {
      countNum += 1
      pTag.innerText = countNum
    })
  </script>
</body>
```

### 2.1.2. event.preventDefault()

Prevent the default function of the HTML tag when the event occurs.

```html
<body>
  <h1>Important Information</h1>

  <script>
    const h1Tag = document.querySelector('h1')
    h1Tag.addEventListener('copy', function (event) {
      // prevent copy
      event.preventDefault()
      alert('cannot be copied')
    })
  </script>
</body>
```

```html
<body>
  <form action="#">
    <input type="text" class="inputData" />
    <input type="submit" value="Add" />
  </form>
  <ul></ul>

  <script>
    const formTag = document.querySelector('form')

    const addTodo = function (event) {
      // prevent submission
      event.preventDefault()

      const inputTag = document.querySelector('.inputData')
      const data = inputTag.value

      if (data.trim()) {
        const liTag = document.createElement('li')
        liTag.innerText = data

        const ulTag = document.querySelector('ul')
        ulTag.appendChild(liTag)
        event.target.reset()
      } else {
        alert('Enter a value!')
      }
    }

    formTag.addEventListener('submit', addTodo)
  </script>
</body>
```

---

# 3. this

[Youtube about this](https://www.youtube.com/watch?v=gvicrj31JOM)

## 3.1. Global Area

`this` indicates the global object.

## 3.2. Simple Call

indicates the global object.

```js
const myFunc = function () {
  console.log(this) // browser: window / Node.js: global
}
```

## 3.3. Call by Method

`this` indicates the object called the method.

```javaScript
const myObj = {
  data: 1,
  myFunc() {
    console.log(this)       // myObj
    console.log(this.data)  // 1
  }
}

myObj.muFunc()  // myObj, 1
```

## 3.4. Nested Function

### 3.4.1. Simple Call

`this` indicates the global object.

```javascript
const myObj = {
  numbers: [1],
  myFunc() {
    console.log(this) // myObj
    this.numbers.forEach(function (number) {
      console.log(number) // 1
      console.log(this) // window
    })
  },
}

myObj.muFunc() //
```

### 3.4.2. Arrow Function

`this` indciates **the static scope which is one step above.**

```javascript
const myObj = {
  numbers: [1],
  myFunc() {
    console.log(this) // myObj
    this.numbers.forEach((number) => {
      console.log(number) // 1
      console.log(this) // myObj
    })
  },
}

myObj.muFunc() //
```

## 3.5. addEventListener()

In the case of `addEventListener`, `this` in the function with `function` keyword indicates `event.target`.

```html
<body>
  <button id="function">function</button>
  <button id="arrow">arrow function</button>

  <script>
    const functionButton = document.querySelector('#function')
    const arrowButton = document.querySelector('#arrow')

    functionButton.addEventListener('click', function (event) {
      console.log(this) // <button id="function">function</button>
    })
    arrowButton.addEventListener('click', (event) => {
      console.log(this) // window
    })
  </script>
</body>
```

---

# 4. JS의 객체지향 역사

1. Object에 함수를 넣어 메소드처럼 사용할 수 있다.
2. 메소드에서 Object의 다른 속성에 접근할 필요성이 생김에 따라 이를 `this`라고 정의하였다.
3. 다른 객체지향 언어의 상속의 개념을 프로토타입을 이용하여 구현하였다. 하지만 이는 상속과 완전히 동일하지 않다.  
   원래 상속은 부모 클래스를 포함하는 형태로 구현되지만, 자바스크립트는 포인터처럼 특정 객체를 가리킨다. 프로토타입을 순차적으로 탐색하며 이를 prototype 체인이라고 말한다.

   ```javascript
   let cat = {
     name: 'cat',
     age: 5,
     attack() {
       console.log(`${this.name} punch`)
     },
   }

   let munchkin = {
     name: 'kitty',
     age: 2,
   }

   munchkin.__proto__ = cat
   munchikin.attack() // kitty punch. 프로토타입 체인이 선언되면 임의로 끊을 수 없다.
   ```

4. new 키워드를 이용하여 함수를 마치 클래스처럼 사용하여 객체를 정의할 수 있다. 또한 객체의 prototype 속성에 프로토타입 속성값을 추가할 수 있다. ES6

   ```javascript
   function Cat(name, age) {
     this.name = name
     this.age = age
   }

   Cat.prototype.attack = function () {
     console.log(`${this.name} punch`)
   }

   let myCat = new Cat('kitty', 3)
   myCat.attack()
   ```

5. 다른 객체지향 언어와의 통일 성을 위해 기존의 function 키워드 대신 class 키워드 사용을 허락했다.

   ```javascript
   class Cat {
     constructor(name, age) {
       this.name = name
       this.age = age
     }
   }

   Cat.prototype.attack = function () {
     console.log(`${this.name} punch`)
   }

   let myCat = new Cat('kitty', 3)
   myCat.attack()
   ```

번외) this의 발전과정

- this의 문제점
  ```javascript
  const myPrice = {
    exchangeRate = 1432,
    prices: [10, 50, 100]
    printPrices: function() {
      this.prices.forEach(function(price)) {    // myPrice
        console.log(price * this.exchangeRate)  // 가리키는 대상이 없음. window를 가리킴
      }
    }
  }
  ```
- 초기 대안
  ```javascript
  const myPrice = {
    exchangeRate = 1432,
    prices: [10, 50, 100]
    printPrices: function() {
      this.prices.forEach(function(price)) {    // myPrice
        console.log(price * this.exchangeRate)
      }.bind(this)  // 지금 위치의 this랑 안에 위치랑 같은 bind 시켜
    }
  }
  ```
- 콜백 함수의 등장
  ```javascript
  const myPrice = {
    exchangeRate = 1432,
    prices: [10, 50, 100]
    printPrices: function() {
      this.prices.forEach((price)) => {    // arrow function에 .bind(this)가 내포되어있다.
        console.log(price * this.exchangeRate)
      }
    }
  }
  ```
