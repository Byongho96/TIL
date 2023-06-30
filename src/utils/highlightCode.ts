import hljs from 'highlight.js'
import '@styles/_highlight.scss'

export default function highlightCode() {
  const codeBlocks = document.querySelectorAll('pre > code')
  codeBlocks.forEach((codeBlock) => {
    if (typeof codeBlock === 'object') {
      hljs.highlightElement(codeBlock)
    }
  })
}
