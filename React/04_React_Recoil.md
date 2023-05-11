# Recoil

[Recoil 공식문서](https://recoiljs.org/ko/docs/basic-tutorial/atoms)의 내용을 정리했습니다.

- [Recoil](#recoil)
- [1. Atoms](#1-atoms)
  - [1.1. Atoms 생성](#11-atoms-생성)
  - [1.2. Atoms 읽기](#12-atoms-읽기)
  - [1.3. Atoms 수정](#13-atoms-수정)
- [2. Selectors](#2-selectors)
  - [2.1. Selectors 생성](#21-selectors-생성)
  - [2.1. Selectors 읽기](#21-selectors-읽기)
- [3. Asynchronous](#3-asynchronous)

# 1. Atoms

Atom은 어플리케이션의 [단일 진실 공급원(source of truth)](https://ko.wikipedia.org/wiki/%EB%8B%A8%EC%9D%BC_%EC%A7%84%EC%8B%A4_%EA%B3%B5%EA%B8%89%EC%9B%90)이다. 즉, 아톰은 특정 데이터의 으뜸되는 하나의 공급원으로 작동하며, 다른 곳에서는 공급원을 참조해서 사용한다. 이 단일 진실 공급원이 갱신될 경우, 해당 데이터를 참조되는 어플리케이션의 모든 곳으로 갱신된 데이터가 전파된다. ~~어렵게 설명했는데 쉽게 말하면 그냥 전역 useState이다.~~

## 1.1. Atoms 생성

`atom()` 함수를 사용해서 atom을 생성할 수 있다.

```js
import { atom } from 'recoil'

export default todoListState = atom({
  key: 'TodoList',
  default: [],
})

export default {todoListState}
```

- **key**  
  atoms를 식별하는 키로, 어플리케이션의 모든 atoms와 selectors에 대해서 유니크한 값이어야 한다.
- **default**  
  atoms 생성 시 할당되는 기본값이다.

## 1.2. Atoms 읽기

리액트 컴포넌트에서는 `useRecoilState()` 훅을 이용해서 atoms의 내용을 참조할 수 있다.

```js
import { useRecoilState } from 'recoil'
import { todoListState } from './state/todoListState'

function TodoList() {
  const todoList = useRecoilValue(todoListState)

  return (
    <>
      {/* 아래 1.3.  Atoms 수정 항목에서 정의되는 컴포넌트이다. */}
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}
    </>
  )
}

export default TodoList
```

## 1.3. Atoms 수정

리액트 컴포넌트에서는 `useSetRecoilState()` 훅을 이용해서 atoms의 내용을 수정하는 함수(setter)에 접근할 수 있다. `useState()`의 setter 함수와 마찬가지로, 갱신시키고자 하는 값을 인자로 넣어서 데이터를 수정할 수 있다. 또한 아래 예시처럼 updater 함수를 인자로 전달시킴으로써 이전 상태를 참조하며 갱신할 수도 있다.

```js
import { useSetRecoilState } from 'recoil'
import { todoListState } from './state/todoListState'

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('')
  const setTodoList = useSetRecoilState(todoListState)

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: new Date(),
        text: inputValue,
        isComplete: false,
      },
    ])
    setInputValue('')
  }

  const onChange = ({ target: { value } }) => {
    setInputValue(value)
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  )
}

export default TodoItemCreator
```

리액트 컴포넌트에서는 `useRecoilState()` 훅을 이용하면, atoms의 값과 setter함수를 모두 참조할 수 있다.

```js
import { useRecoilState } from 'recoil'
import { todoListState } from './state/todoListState'

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const index = todoList.findIndex((listItem) => listItem === item)

  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    })

    setTodoList(newList)
  }

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    })

    setTodoList(newList)
  }

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index)

    setTodoList(newList)
  }

  return (
    <div>
      <input type="text" value={item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </div>
  )
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}

export default TodoItem
```

# 2. Selectors

selector는 순수함수를 통해 atom으로부터 파생된 값이다. 순수함수란 output이 input에만 종속적인 함수이다. 즉 selector의 값은 참조하는 atom의 값으로 결정된다.

## 2.1. Selectors 생성

```js
import { atom } from 'recoil'

const todoListFilterState = atom({
  key: 'TodoListFilter',
  default: 'Show All',
})

const todoListState = atom({
  key: 'TodoList',
  default: [],
})

export { todoListFilterState, todoListState }
```

```js
import { useRecoilState } from 'recoil'
import { todoListFilterState, todoListState } from './state/todoListState'

const filteredTodoListState = selector({
  key: 'FilteredTodoList',
  get: ({ get }) => {
    const filter = get(todoListFilterState)
    const list = get(todoListState)

    switch (filter) {
      case 'Show Completed':
        return list.filter((item) => item.isComplete)
      case 'Show Uncompleted':
        return list.filter((item) => !item.isComplete)
      default:
        return list
    }
  },
})

export { filteredTodoListState }
```

- **get**  
  get 속성은 get 함수를 내부적으로 전달받으며, 전달 받은 get 함수를 통해 다른 **atoms**나 **selectors**를 구독할 수 있다.  
  위의 예시에서 filteredTodoListState 는 `todoListFilterState`와 `todoListState`를 구독하고 있다.

## 2.1. Selectors 읽기

atoms와 동일하게 컴포넌트 단에서 `useRecoilValue`를 이용해서 값을 참조할 수 있다.

말했던 것처럼 soure of truth는 atom이고, selector는 atom으로부터 파생된 값이다. 따라서 아래 예시에서 `TodoListFilters`컴포넌트에서 `filter` atom이 수정되면, `filter`를 구독하는 `filteredTodoListState`가

```js
import { useRecoilState } from 'recoil'
import filteredTodoListState from './selectors/filteredTodoListState'
import { filter } from './state/filteredTodoListState'

function TodoList() {
  // changed from todoListState to filteredTodoListState
  const todoList = useRecoilValue(filteredTodoListState)

  return (
    <>
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </>
  )
}

function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState)

  const updateFilter = ({ target: { value } }) => {
    setFilter(value)
  }

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  )
}
```

1. 이미 선언된 아톰을 구독하고 있다가 함수를 실행
2. 서버와의 비동기적인 통신이 가능

비동기 suspense, loadble 알아보기
recoil은 데이터를 캐싱함!!!

1. 구독중인 state가 변경
2. 요청 파라미터가 새로운 값으로 바뀐경우 (파라미터를 하나 더 만들고
3. https://www.youtube.com/watch?v=7nwpEiSpPqY)
4. 19:50

5. 내 이벤트는 명시적 업데이트
6. 아닌 것은 실시간/주기적 업데이트 : 시간 같은 것을 파라미터를 줌.

이제는 캐싱을 안하는 법이 나온 것 같음. 알아보기

# 3. Asynchronous
