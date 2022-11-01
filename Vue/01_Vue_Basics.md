Vue 객체
미리 정의 된 속성과 메소드를 이용

Vue instace를 만들 대는 하나의 객체를 집어 넣는다.

선언적 렌더링: 아예 html에다가 데이터를 집어 넣음.
```html
<body>
  <div id="app">
    {{ message + ' Byongho'}}  <!--  JS문법의 영역이다. -->
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
  <script>
    const vm = new Vue({
      el: '#app', // 나 여기에 인스턴스를 붙일 꺼고, 그 요소에서는 메소드를 사용가능하다.
      data: {
        // 자기가 가지고 있는 데이터를 미리 정의하고, Vue가 이를 감지해서 DOM에 반영
        message: 'Hello, vue!'
      }
    })
    vm.message = "Hello,"  // 바로 반영
  </script>
</body>
```

디렉티브: vue가 가진 기능을 사용하겠금 하는 속성!
v-text
```html
<body>
  <div id="app">
    <!-- <h3>{{ myNum }}</h3> -->
    <h3 v-text="myNum"></h3>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        myNum: 0,
      },
    })
  </script>
</body>
```
coumputed
```html
<body>
  <div id="app">
    <h3>금액: {{money}}</h3>
    <h3>포인트: {{point}}</h3>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: {
        money: 50000,
        ratio: 0.05,
        // point: this.money * this.ratio  // Nan. data가 변경될 때마다, 새롭게 계산되어 재정의 되어야 할 경우 v-computed속성을 사용한다.
      },
      computed: { // 확장된 데이터라고 생각!! 함수나 메소드보다는
        // point: function() {
        //   return this.money * this.ratio
        // }
        point() {
          return this.money * this.ratio
        }
      }
    })
  </script>
</body>
```

v-on: === @
```html
<body>
  <div id="app">
    <button id="myBtn">Click me</button>
    <p id="myElem">0</p>
  </div>

  <script>
    // Vanilla JS
    const myBtn = document.querySelector('#myBtn')
    const myElem = document.querySelector('#myElem')
    let value = parseInt(myElem.innerText)  // it was 0, not {{ myNum }}

    myBtn.addEventListener('click', function (event) {
      value += 1
      myElem.innerText = value
    })
  </script>
</body>
```
```html
<body>
  <div id="app">
    <button id="myBtn" v-on:click="plusNum">Click me</button>
    <p id="myElem">{{ myNum }}</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    // Vue.js
    const vm =new Vue({
      el: '#app',
      data: {
        myNum: 0,
      },
      methods: {
        // plusNum: function() {
        //   this.myNum += 1
        // }
        plusNum() {
          this.myNum += 1
        }

        // plusNum: () => {
        //   this.myNum += 1
        // }
        // 이거 안됨. arrow function을 쓰면 메서드가 정의된 곳의 하나 상위의 객체를 가리킨다.
        // 근데 하나 상위의 객체가 Vue 아냐? function일때 methods인거고
        
        // 우리는 Vue라는 인스턴스가 어더한 구조를 가지고 있는지 살펴보아야 한다.
        // 콘솔창에서 찍어보면 모든 나란히 병렬적으로 vue인스턴스에 바로 붙는다.
        // 즉 구조상으로 plusNum은 바로 vue객체 안쪽에 있음.
        // 그래서 다들 메서드 정의 시에는 화살표 함수 쓰지 말라고 하는 것!
      }
    })
    console.log(vm)
  </script>
</body>
```

v-bind: === :
속성을 바인드 하고 싶을 때
```html
<style>
  #before {
      background-color: greenyellow;
  }
  #after {
    background-color: yellow;
  }
</style>

<body>
  <div id="app">
    <p id="`${elemId}`" @click="clicked">Click me</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    // Vue.js
    new Vue({
      el: '#app',
      data: {
        elemId: 'before'
      },
      methods: {
        clicked() {
          this.elemId = 'after' 
        }
      }
    })
  </script>
</body>
```

```html
<style>
  #before {
      background-color: greenyellow;
  }
  #after {
    background-color: yellow;
  }
</style>

<body>
  <div id="app">
    <p :id="elemId" @click="clicked">Click me</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    // Vue.js
    new Vue({
      el: '#app',
      data: {
        elemId: 'before'
      },
      methods: {
        clicked() {
          this.elemId = 'after' 
        }
      }
    })
  </script>
</body>
```
```html
<style>
  .errorColor {
      color: tomato;
  }
</style>

<body>
  <div id="app">
    <h3 :class="errorText">ERROR</h3>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      data: {
        isError: false,
      },
      computed: {
        errorText() {
          return this.isError ? 'errorColor' : null
        }
      },
    })
  </script>
</body>
```


v-if:
조건에 따라 태그를 조작
data or computed의 값
```html
<body>
  <div id="app">
    <div v-if="seen">Wait a second, please</div>
    <div v-else=>Welcome!</div>

    <div v-if="member === 'Kim'">Wait a second, please</div>
    <div v-else-if="member === 'harry'">Welcome!</div>
    <div v-else>Who's this?</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      data: {
        seen: true,
        member: 'harry',
      }
    })
  </script>
</body>
```

v-show:
요소가 dom에 있지만 style="display: none" 처리된다.\
```html
<body>
  <div id="app">
    <div v-if="seen">being seen</div>
    <div v-show="seen">being seen</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      data: {
        seen: false,
      }
    })
  </script>
</body>
```

v-model
사용자의 input값이 data를 바꿈 -> 바뀐 데이터가 dom에 적용
또한, 연결된 data값의 변경이 input의 value를 바꿈. 3가지가 바인딩(input - data - dom)
```html
<body>
  <div id="app">
    <input type="text" @input="inputFunc">
    <p>{{message}}</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      data: {
        message: '',
      },
      methods: {
        inputFunc(event) { // event발생시 event객체를 콜백함수의 첫번째 인자로 받음. event 안써도 되기는 하네
          console.log(event)
          this.message = event.target.value
        }
      }
    })
  </script>
</body>
```
```html
<body>
  <div id="app">
    <input v-model="message">
    <p>{{message}}</p>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      data: {
        message: '',
      },
    })
  </script>
</body>
```

watch
data만 감시하고 coupted는 못받네
언제씀??? 두개는 상호호환가능.
couputed는 데이터의 가공
watch는 변경될 때 실행해야하는 무거운 작업
```html
<body>
  <div id="app">
    <h1>{{num}}</h1>
    <h1>{{doubleNum}}</h1>
    <button @click="plus">+</button>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      data: {
        num: 0,
      },
      computed: {
        doubleNum() {
          return this.num * 2
        }
      },
      methods: {
        plus() {
          this.num++
        }
      },
      watch: {
        num(newValue, oldValue) {
          console.log(oldValue, newValue)
        }
        // doubleNum(newValue, oldValue) {
        //   console.log(oldValue, newValue)
        // }
      },
    })
  </script>
</body>
```

v-for
```html
<body>
  <div id="app">
    <ul>
      <li v-for="fruit in fruits">{{ fruit }}</li>
    </ul>
    <ul>
      <li v-for="(fruit, index) in fruits">{{ index }} - {{ fruit }}</li>
    </ul>
    <ul>
      <li v-for="(todo, index) in todos">{{ index + 1 }} - {{ todo.context }}</li>
    </ul>
    
    <ul>
      <li v-for="todo in todos" v-if="!todo.completed">{{ todo.context }}</li>
    </ul>
    <!-- Not Recommended -->
    <!--
      v-for가 v-if보다 먼저 실행되야함. vue3부터 근데 v-if가 우선순위가 높아짐.
      그래서 두개로 나눠서 하기를 추천
    -->
    <ul>
      <template v-for="todo in todos">
        <li v-if="!todo.completed">{{ todo.context }}</li>
      </template>
    </ul>
    <!-- template속성은 실제 DOM에서 표시되지는 않음 -->
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      data: {
        fruits: ['apple', 'banana', 'coconut'],
        todos: [
          {id:1, context: 'todo1', completed: false},
          {id:2, context: 'todo2', completed: true},
          {id:3, context: 'todo3', completed: false},
        ]
      },
    })
  </script>
</body>
```

돔의 변경 사항을 추적할 때, key가 정해져있으면 훨신 빨리 추적한다.
```html
<body>
  <div id="app">
    <ul>
      <template v-for="(todo,idx) in todos" :key="`todo-${idx}`">
        <li v-if="!todo.completed">{{ todo.context }}</li>
      </template>
    </ul>
    <!-- template속성은 실제 DOM에서 표시되지는 않음 -->
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.7.13/dist/vue.js"></script>

  <script>
    new Vue({
      el: '#app',
      data: {
        fruits: ['apple', 'banana', 'coconut'],
        todos: [
          {id:1, context: 'todo1', completed: false},
          {id:2, context: 'todo2', completed: true},
          {id:3, context: 'todo3', completed: false},
        ]
      },
    })
  </script>
</body>

```