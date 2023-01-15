# 1. useRef

## 1.1. 변수관리

mount 이후 update 되더라도 변수의 값을 유지하고 있다. 또한 변수의 값이 변하더라도 렌더링에는 영향을 미치지 않는다.

```js
import React, { useState, useRef } from 'react'

const App = () => {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  // {current : 0}

  const increaseCountState = () => {
    setCount(count + 1)
  }

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1
  }

  return (
    <div>
      <button onClick={increaseCountState}>State +</button>
      <button onClick={increaseCountRef}>Ref +</button>
    </div>
  )
}
```

## 1.2. DOM 접근

```js
import React, { useState, useRef } from 'react'

const App = () => {
  const inputRef = useRef()
  // {current : input}

  return (
    <div>
      <input ref={inputRef} type="text" />
    </div>
  )
}
```

# 2. useContext

[Redux and contextAPI](https://dev.to/ruppysuppy/redux-vs-context-api-when-to-use-them-4k3p)

```js
// ThemeContext
import { createContext } from 'react'

export const ThemeContext = createContext(null)
// value를 넘겨주지 않을 경우 초깃값을 지정
```

```js
// App
import React, { useState } from 'react'
import Page from './Page'
import { ThemeContext } from './ThemeContext'

const App = () => {
  const [isDark, setIsDark] = useState(0)

  return (
    <div>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <Page />
      </ThemeContext.Provider>
    </div>
  )
}

export default App
```

```js
// App
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Page = () => {
  const data = useContext(ThemeContext)
  console.log('data', data)
  // {data: {isDark: false, setIsDark: f()}}

  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

export default Page
```

```js
// App
import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

const Header = () => {
  const { isDark } = useContext(ThemeContext)

  return <div>Header</div>
}

export default Header
```

# 3. useMemo

# 4. useCallback

# 5. useReducer

# 6. custom Hooks
