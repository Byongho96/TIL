(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[701],{3285:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return k}});var a=l(7294),r=l(2598),n="style-module--active--d7665";var c=e=>{let{toc:t}=e;return(0,a.useEffect)((()=>{const e=new IntersectionObserver((e=>{e.forEach((e=>{const t=encodeURI(e.target.getAttribute("id")),l=document.querySelector('.toc a[href="#'+t+'"]');l&&(e.intersectionRatio>0?l.classList.add(n):l.classList.remove(n))}))}),{rootMargin:"0% 0% -85% 0%"});return document.querySelectorAll(".markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4").forEach((t=>{e.observe(t)})),()=>{e.disconnect()}}),[]),a.createElement("div",{className:"toc style-module--toc--d478a",dangerouslySetInnerHTML:{__html:t}})},o=l(193);var s=e=>{let{frontmatter:t}=e;const{author:l}=(0,o.$)();return a.createElement("div",{className:"style-module--container--3de1a"},a.createElement("h2",{className:"style-module--title--9700c"},t.title),a.createElement("div",{className:"style-module--info--0c9e4"},a.createElement("p",{className:"style-module--date--fa48c"},t.createdAt),a.createElement("p",{className:"style-module--author--4220d"},l)))},m=l(2993);const d=a.memo((e=>{let{theme:t="github-light"}=e;const l=(0,a.createRef)(null);return(0,a.useEffect)((()=>{const e=l.current,a=document.createElement("script"),r={src:"https://utteranc.es/client.js",repo:"byongho96/TIL","issue-term":"pathname",theme:t,label:"✨💬 comments ✨",crossOrigin:"anonymous",async:"false"};return Object.entries(r).forEach((e=>{let[t,l]=e;a.setAttribute(t,l)})),e.appendChild(a),()=>{e.removeChild(e.firstChild)}}),[t]),a.createElement("div",{id:"utterances",ref:l})}));var i=d,u=l(2356),h=l(1883),f=l(5190),E=l.n(f),p=l(2689),v=l.n(p);var y=e=>{let{nextPost:t,prevPost:l}=e;return a.createElement("div",{className:"style-module--posts--74272"},l&&a.createElement(C,{post:l,isNext:!1}),t&&a.createElement(C,{post:t,isNext:!0}))};const C=e=>{let{post:t,isNext:l}=e;const r=l?a.createElement(v(),null):a.createElement(E(),null),n=l?"style-module--next--18928":"style-module--prev--2ffff";return a.createElement("div",{className:"style-module--post--07e6c",onClick:()=>{(0,h.navigate)("/posts/"+t.relativePath)}},a.createElement("div",{className:"style-module--flexbox--8037a "+n},a.createElement("div",{className:"style-module--title--faa50"},t.title),a.createElement("div",{className:"style-module--icon--d5007"},r)),a.createElement("div",null,t.excerpt))};var k=e=>{let{pageContext:t,data:l}=e;const{theme:n}=(0,a.useContext)(u.Ni),o=l.allMarkdownRemark.nodes.map((e=>({id:e.id,title:e.frontmatter.title,createdAt:e.frontmatter.createdAt,updatedAt:e.frontmatter.updatedAt,excerpt:e.excerpt,relativePath:e.parent.relativePath})));console.log(t);const d=o.findIndex((e=>e.id===l.markdownRemark.id)),h=0===d?null:o[d-1],f=d===o.length-1?null:o[d+1];return a.createElement(r.Z,{selectedCategory:t.parent.relativeDirectory},a.createElement("div",{className:"style-module--container--ed3ad"},a.createElement(s,{frontmatter:l.markdownRemark.frontmatter}),a.createElement("div",{className:"style-module--post--e128e"},a.createElement("div",{className:"style-module--markdown-utter--1fb15"},a.createElement("div",{className:"markdown-body "+n+" style-module--markdown--35262",dangerouslySetInnerHTML:{__html:l.markdownRemark.html}}),a.createElement("div",null,a.createElement(y,{prevPost:h,nextPost:f})),a.createElement(i,{theme:"dark"===n?"github-dark":"github-light"})),a.createElement("div",{className:"style-module--toc--734f6"},a.createElement(c,{toc:l.markdownRemark.tableOfContents})))),a.createElement(m.Z,null))}},5190:function(e,t,l){var a=l(7294);function r(e){return a.createElement("svg",e,[a.createElement("g",{clipPath:"url(#clip0_19_75)",key:0},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M7.94002 13.06C7.65912 12.7788 7.50134 12.3975 7.50134 12C7.50134 11.6025 7.65912 11.2213 7.94002 10.94L13.596 5.28202C13.8774 5.00076 14.259 4.8428 14.6569 4.8429C14.8539 4.84294 15.0489 4.88179 15.2309 4.95722C15.4129 5.03265 15.5783 5.14319 15.7175 5.28252C15.8568 5.42185 15.9672 5.58725 16.0426 5.76928C16.1179 5.9513 16.1567 6.14638 16.1567 6.34338C16.1566 6.54038 16.1178 6.73544 16.0423 6.91742C15.9669 7.09941 15.8564 7.26476 15.717 7.40402L11.121 12L15.717 16.596C15.8604 16.7343 15.9747 16.8998 16.0534 17.0828C16.1321 17.2657 16.1736 17.4625 16.1754 17.6617C16.1772 17.8609 16.1394 18.0584 16.064 18.2428C15.9887 18.4272 15.8774 18.5947 15.7366 18.7356C15.5958 18.8765 15.4284 18.988 15.2441 19.0635C15.0598 19.139 14.8623 19.177 14.6631 19.1754C14.464 19.1738 14.2671 19.1325 14.0841 19.0539C13.901 18.9754 13.7355 18.8612 13.597 18.718L7.93802 13.06H7.94002Z",fill:"black"})),a.createElement("defs",{key:1},a.createElement("clipPath",{id:"clip0_19_75"},a.createElement("rect",{width:"24",height:"24",fill:"white"})))])}r.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=r,r.default=r},2689:function(e,t,l){var a=l(7294);function r(e){return a.createElement("svg",e,[a.createElement("g",{clipPath:"url(#clip0_19_79)",key:0},a.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M16.06 10.94C16.3409 11.2212 16.4987 11.6025 16.4987 12C16.4987 12.3975 16.3409 12.7787 16.06 13.06L10.404 18.718C10.1226 18.9992 9.74102 19.1572 9.34316 19.1571C8.9453 19.157 8.56377 18.9989 8.28251 18.7175C8.00125 18.4361 7.84329 18.0545 7.84338 17.6566C7.84348 17.2588 8.00162 16.8772 8.28301 16.596L12.879 12L8.28301 7.40397C8.00964 7.1212 7.85827 6.74237 7.8615 6.34907C7.86473 5.95577 8.0223 5.57947 8.30028 5.30123C8.57827 5.02298 8.95441 4.86505 9.34771 4.86145C9.741 4.85785 10.12 5.00887 10.403 5.28197L16.061 10.939L16.06 10.94Z",fill:"black"})),a.createElement("defs",{key:1},a.createElement("clipPath",{id:"clip0_19_79"},a.createElement("rect",{width:"24",height:"24",fill:"white"})))])}r.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=r,r.default=r}}]);
//# sourceMappingURL=component---src-templates-post-index-tsx-9cc3135b7715bd4c0513.js.map