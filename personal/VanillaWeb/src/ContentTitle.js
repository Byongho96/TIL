class ContentTitle {
  constructor($main, $title) {
    this.$main = $main
    this.$title = $title
  }

  render() {
    const div = document.createElement('div')
    div.setAttribute('class', 'content_title')

    const h1 = document.createElement('h1')
    h1.appendChild(document.createTextNode(this.$title))

    div.appendChild(h1)
    this.$main.appendChild(div)
  }
}
export default ContentTitle
