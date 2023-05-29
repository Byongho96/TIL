import ContentTitle from './ContentTitle'

class SignupPage {
  constructor($main) {
    this.$main = $main
  }

  render() {
    const title = new ContentTitle(this.$main, 'Great PeoPle')
    title.render()
  }
}

export default SignupPage
