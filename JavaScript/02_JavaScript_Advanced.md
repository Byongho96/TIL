## 1. DOM
### 1.1. Browser APIs
APIs built-in Web Browser. JavaScript can do many things by using Browser APIs. There're DOM, Geolocation API, WebGL, and etc...

### 1.2. DOM(Document Object Model)
DOM
: Structured and Represented HTML documents as objects. So that develpoers can access elements of a document with a programming language.
![DOM](./images/DOM.png)

#### 1.2.1. DOM object
**window**
the top-level object referring a tab in browser.

* **Methods**
  * window.open()
    * opens a new tab
  * window.alert()
    * shows an alerting window
  * window.print()
    * shows a tab for printing

**document object**
the top-level object of a document.

* **Attributes**
  * document.title
    * \<title></title>
  * win
    * shows an alerting window
  * window.print()
    * shows a tab for printing



JS의 객체지향

프로토타입을 이용해서 객체지향을 구현하였다. 
this

프로토타입 & 클래스
간단히 말하면, 객체 지향에서 클래스를 만든 이유는.  반복을 줄이기 위해서

1. 자바의 객체는 그 Object
2. 함수도 넣을 수 있음.
   그런데 함수에서 자기 자신에 접근해야할 필요성이 생김!!!! this라고 정의. self랑 같은 의미
    ! 객체 안에서 객체의 속성에 접근하기 위해서 생겨ㅆ다.

3. 상속은???
  하나의 객체가 다른 객체를 가리킨다. 포함 관계가 아니라 포인터 관계. 없으면 연결방향의 객체에 가서 탐색 마치 스코프처럼
```javascript
let cat = {
  name: 'cat',
  age: 5,
  attack () {
    console.log(`${this.name} 냔ㅇ냥편치`)
  }
}

let munchkin = {
  name: 'kitty',
  age: 2,
}

munchkin.__proto__ =cat
munchikin.attack()  // kitty punch
```

4. new는 어떻게 한담. 객체를 클래스로 할수 는 없자나. ES%
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

4-2. ES6. class라는 키워드는 그냥 보기 편하기 위해서. 더이상 이전의 cat으로는 사용을 못함
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

5. this. 콜백함수
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
옛날 대안
```javascript
const myPrice = {
  exchangeRate = 1432,
  prices: [10, 50, 100]
  printPrices: function() {
    this.prices.forEach(function(price)) {    // myPrice
      console.log(price * this.exchangeRate)  // 가리키는 대상이 없음. window를 가리킴
    }.bind(this)  // 지금 위치의 this랑 안에 위치랑 같은 bind 시켜
  }
}
```
콜백 함수의 등장. 단 addEvent에서는 event.target을 가리킨다. 그 태그를 가리킨다.
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