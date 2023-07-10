import hljs from 'highlight.js'
import '@styles/_highlight.scss'

hljs.configure({
  ignoreUnescapedHTML: true,
})

const highlightCode = function () {
  // hljs.highlightAll()
  const codeBlocks = document.querySelectorAll('pre > code')
  codeBlocks.forEach((codeBlock) => {
    if (typeof codeBlock === 'object') {
      hljs.highlightElement(codeBlock)
    }
  })
}

export default highlightCode
