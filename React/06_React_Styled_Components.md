# 1. Theme

```js
// theme.js
const theme = {
  mainColor: blue,
  dangerColor: red,
  successColor: green,
}

export default theme
```

```js
import React, {Component} from  'react'
import styled, { ThemeProvider} from 'styled-components'
import theme from './theme'

const Button = styled.button`
    background-color: ${props => props.theme.successColor}
`

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Form />
        </Container>
      </ThemeProvider>
    )
  }
}

export defaut App
```
