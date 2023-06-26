import hljs from 'highlight.js'
import './highlight.scss'
// import 'highlight.js/styles/github.css'

export default function highlightCode() {
  const codeBlocks = document.querySelectorAll('pre > code')
  codeBlocks.forEach((codeBlock) => {
    if (typeof codeBlock === 'object') {
      hljs.highlightBlock(codeBlock)
    }
  })
}
