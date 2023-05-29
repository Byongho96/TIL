// import styles from './Header.scss'

class Header {
  constructor($body) {
    this.$body = $body
  }

  createMenuElem(divClass, spanClass, spanId, menuText) {
    const div = document.createElement('div')
    div.setAttribute('class', divClass)

    const span = document.createElement('span')
    span.setAttribute('class', spanClass)
    span.setAttribute('id', spanId)
    span.appendChild(document.createTextNode(menuText))

    div.appendChild(span)
    return div
  }

  render() {
    const header = document.createElement('header')
    const home_menu = this.createMenuElem(
      'header header_left',
      'menu_name',
      'menu_home',
      'HOME'
    )
    const signup_menu = this.createMenuElem(
      'header header_right',
      'menu_name',
      'menu_signup',
      'SIGNUP'
    )

    header.appendChild(home_menu)
    header.appendChild(signup_menu)
    this.$body.appendChild(header)

    // HOME 메뉴 클릭 이벤트
    home_menu.addEventListener('click', () => {
      window.history.pushState('', '', '/web/')
      const urlChange = new CustomEvent('urlchange', {
        detail: { href: '/web/' },
      })
      document.dispatchEvent(urlChange)
    })

    // SIGNUP 메뉴 클릭 이벤트
    signup_menu.addEventListener('click', () => {
      window.history.pushState('', '', '/web/signup')
      const urlChange = new CustomEvent('urlchange', {
        detail: { href: '/web/signup' },
      })
      document.dispatchEvent(urlChange)
    })
  }
}

export default Header
