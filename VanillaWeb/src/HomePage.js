import ContentTitle from './ContentTitle'

class HomePage {
  constructor($main) {
    this.$main = $main
  }

  render() {
    const title = new ContentTitle(this.$main, 'Great PeoPle')
    title.render()
  }
}
export default HomePage
