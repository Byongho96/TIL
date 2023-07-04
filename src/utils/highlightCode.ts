import hljs from 'highlight.js'
import '@styles/_highlight.scss'

hljs.configure({
  ignoreUnescapedHTML: true,
})

export default function highlightCode() {
  // hljs.highlightAll()
  const codeBlocks = document.querySelectorAll('pre > code')
  codeBlocks.forEach((codeBlock) => {
    if (typeof codeBlock === 'object') {
      hljs.highlightElement(codeBlock)
    }
  })
}
