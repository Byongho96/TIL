## 1. DOM
### 1.1. Browser APIs
APIs built-in Web Browser. JavaScript can do many things by using Browser APIs. There're DOM, Geolocation API, WebGL, and etc...

### 1.2. DOM(Document Object Model)
DOM
: Structured and Represented HTML documents as objects. So that develpoers can access elements of a document with a programming language.
![DOM](./images/DOM.png)

### 1.3. Special DOM objects
Every <> in a html document can be selected as an object.
However, there are some special object which is out of a document.
* **window**
  the top-level object referring a tab in browser.
  * **[methods and properties](https://www.w3schools.com/jsref/obj_window.asp)**
    * window.open()
      * opens a new tab
    * window.alert()
      * shows an alerting window
    * window.print()
      * shows a tab for printing

* **document**
  one of the properties of window, the top-level object of a document
  * **[methods and properties](https://www.w3schools.com/js/js_htmldom_document.asp)**

* navigator, location, history, screen, etc

### 1.3. Handling DOM

#### 1.3.1. Select
**document.querySelector()**
* selects the first corresponding element.
  ```html
  <body>
    <h1 id="title">DOM</h1>
    <p class="text">paragraph1</p>
    <p class="text">paragraph2</p>

    <script>
      document.querySelector('#title')  // <h1 id="title">DOM</h1>
      document.querySelector('.text')   // <p class="text">paragraph1</p>
    </script>
  </body>
  ```
**document.querySelectorAll()**
* selects all the corresponding elements as a ==static NodeList==.
* JavaScript arry methods can be used with NodeLists.
* Changes to the elements are **not** reflected in the static NodeList in real time.
  * But `Node.childNodes` return a live NodeList which changes in real time. 
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

#### 1.3.2. Manipulation(attributes and methods)
**document.createElement(tagName)**
* creates the HTML element specified by tagNam
**Node.innerText**
* property of the HTMLElement interface represents the rendered text content of a node and its descendants
**Node.appendChild()**
* adds **a node** to the end of the list of children of a specified parent node.
* returns the newly appended node
**Node.removeChild()**
* removes a child node from the DOM
* returns the removed node.
**Node.append()**
* inserts a set of Node objects or string objects ==after the last child== of the Element
**Node.prepend()**
* inserts a set of Node objects or string objects ==before the first child== of the Element
**Node.after()**
* inserts a set of Node or string objects ==just after the Element==
**Node.before()**
* inserts a set of Node or string objects ==just before the Element==
**Element.getAttribute(attributeName)**
* returns the value of a specified attribute on the element.
* If the given attribute does not exist, the value returned will either be null or " "
**Element.setAttribute(name, value)**
* sets the value of an attribute on the specified element
* If the attribute already exists, the value is updated.
**Element.classList**
* returns a live DOMTokenList collection of the class attributes of the element
  * **add()**
    * adds the given tokens to the list
  * **remove()**
    * removes the specified tokens from the list.
  * **replace(oldToken, newToken)**
    * replaces an existing token with a new token.
    * If the first token doesn't exist, replace() returns false immediately, without adding the new token to the token list.
  * **toggle()**
    * removes an existing token from the list and returns false. If the token doesn't exist it's added and the function returns true.

---
## 2. Event
Event object
: Objects containing information about events occurring in the system

### 2.1. Event handler

#### 2.1.1. addEventListenr()
`EventTarget.addEventListener(type, listener[, options])`
When the type of event occurs at the EventTarget, the listener fucntion is excuted.
* **type**
  * a type of the events
  * input, click, submit, scroll, copy, etc
* **listener**
  * a callback function that ==gets the event object as the only parameter==
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

#### 2.1.2. event.preventDefault()
cancel the default function of an HTML tag.
* Examples of the default functions
  * a tag: move to another page
  * form tag: submit the form data
```html
<body>
  <h1>Important Information</h1>

  <script>
    const h1Tag = document.querySelector('h1')
    h1Tag.addEventListener('copy', function (event) {
      event.preventDefault()
      alert('cannot be copied')
    })
  </script>
</body>
```
```html
<body>
  <form action="#">
    <input type="text" class="inputData">
    <input type="submit" value="Add">
  </form>
  <ul></ul>

  <script>
    const formTag = document.querySelector('form')

    const addTodo = function (event) {
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
## 3. this
`this` indicates an object which is ==different depending on how it's called.==

### 3.1. global area
* browser
  * this === window
* Node.js
  * this === global

### 3.2. a Simple Call
* browser
  * this === window
* Node.js
  * this === global
```javaScript
const myFunc = function() {
  console.log(this) // browser: window / Node.js: global 
}
```

### 3.2. Method
* this === the object called the method
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


### 3.3. Nested
* **Simple Call**
  `this` in the function which is simply called in the object also indicates the global area.
  ```javascript
  const myObj = {
    numbers: [1],
    myFunc() {
      console.log(this)       // myObj
      this.numbers.forEach(function (number) {
        console.log(number) // 1
        console.log(this)   // window 
      })
    }
  }

  myObj.muFunc()  //
  ```
* **Arrow Function**
  `this` in an arrow function indciates ==the static scope which is one step above.==
  Unlike the basic functions, it is important for arrow functions where the function is declared.**(lexical scope)**
  ```javascript
  const myObj = {
    numbers: [1],
    myFunc() {
      console.log(this)       // myObj
      this.numbers.forEach((number) => {
        console.log(number) // 1
        console.log(this)   // myObj
      })
    }
  }

  myObj.muFunc()  //
  ```

### 3.4. addEventLister()
In the case of addEventListner, `this` in the function with 'function' keyword indicates `event.target`.
```html
<body>
  <button id="function">function</button>
  <button id="arrow">arrow function</button>

  <script>
    const functionButton = document.querySelector('#function')
    const arrowButton = document.querySelector('#arrow')

    functionButton.addEventLister('click', function(event) {
      console.log(this) // <button id="function">function</button>
    })
    arrowButton.addEventLister('click', (event) => {
      console.log(this) // window
    })
  </script>
</body>
```

---
## 4. JS의 객체지향 역사

1. 자바스크립트는 object에 함수를 넣어 정말 객체처럼 사용할 수 있다.
2. 함수에서 자기 자신의 속성에 접근할 필요성이 생김에 따라 이를 `this`라고 정의하였다.
3. 다른 객체지향 언어의 상속의 개념을 프로토타입을 이용하여 구현하였다. 하지만 이는 상속과 완전히 동일하지 않다. 원래 상속은 부모 클래스를 포함하는 형태로 구현되지만, 자바스크립트는 포인터처럼 특정 객체를 가리킨다. 프로토타입을 순차적으로 탐색하며 이를 prototype 체인이라고 말한다.
  ```javascript
  let cat = {
    name: 'cat',
    age: 5,
    attack () {
      console.log(`${this.name} punch`)
    }
  }

  let munchkin = {
    name: 'kitty',
    age: 2,
  }

  munchkin.__proto__ =cat
  munchikin.attack()  // kitty punch. 프로토타입 체인이 선언되면 임의로 끊을 수 없다.
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

4-2. 다른 객체지향 언어와의 통일 성을 위해 기존의 function 키워드 대신 class 키워드 사용을 허락했다.
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
* this의 문제점
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
* 초기 대안
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
* 콜백 함수의 등장
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