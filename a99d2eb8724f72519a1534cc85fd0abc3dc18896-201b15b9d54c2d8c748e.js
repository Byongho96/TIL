(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[426],{3204:function(e){"use strict";const t=/[\p{Lu}]/u,n=/[\p{Ll}]/u,a=/^[\p{Lu}](?![\p{Lu}])/gu,r=/([\p{Alpha}\p{N}_]|$)/u,i=/[_.\- ]+/,o=new RegExp("^"+i.source),s=new RegExp(i.source+r.source,"gu"),l=new RegExp("\\d+"+r.source,"gu"),c=(e,r)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(r={pascalCase:!1,preserveConsecutiveUppercase:!1,...r},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const i=!1===r.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(r.locale),c=!1===r.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(r.locale);if(1===e.length)return r.pascalCase?c(e):i(e);return e!==i(e)&&(e=((e,a,r)=>{let i=!1,o=!1,s=!1;for(let l=0;l<e.length;l++){const c=e[l];i&&t.test(c)?(e=e.slice(0,l)+"-"+e.slice(l),i=!1,s=o,o=!0,l++):o&&s&&n.test(c)?(e=e.slice(0,l-1)+"-"+e.slice(l-1),s=o,o=!1,i=!0):(i=a(c)===c&&r(c)!==c,s=o,o=r(c)===c&&a(c)!==c)}return e})(e,i,c)),e=e.replace(o,""),e=r.preserveConsecutiveUppercase?((e,t)=>(a.lastIndex=0,e.replace(a,(e=>t(e)))))(e,i):i(e),r.pascalCase&&(e=c(e.charAt(0))+e.slice(1)),((e,t)=>(s.lastIndex=0,l.lastIndex=0,e.replace(s,((e,n)=>t(n))).replace(l,(e=>t(e)))))(e,c)};e.exports=c,e.exports.default=c},8032:function(e,t,n){"use strict";n.d(t,{L:function(){return g},M:function(){return k},P:function(){return w},S:function(){return U},_:function(){return s},a:function(){return o},b:function(){return u},g:function(){return d},h:function(){return l}});var a=n(7294),r=(n(3204),n(5697)),i=n.n(r);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o.apply(this,arguments)}function s(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t.indexOf(n=i[a])>=0||(r[n]=e[n]);return r}const l=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;function c(e,t,n){const a={};let r="gatsby-image-wrapper";return"fixed"===n?(a.width=e,a.height=t):"constrained"===n&&(r="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:r,"data-gatsby-image-wrapper":"",style:a}}function u(e,t,n,a,r){return void 0===r&&(r={}),o({},n,{loading:a,shouldLoad:e,"data-main-image":"",style:o({},r,{opacity:t?1:0})})}function d(e,t,n,a,r,i,s,l){const c={};i&&(c.backgroundColor=i,"fixed"===n?(c.width=a,c.height=r,c.backgroundColor=i,c.position="relative"):("constrained"===n||"fullWidth"===n)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),s&&(c.objectFit=s),l&&(c.objectPosition=l);const u=o({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:o({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return u}const m=["children"],p=function(e){let{layout:t,width:n,height:r}=e;return"fullWidth"===t?a.createElement("div",{"aria-hidden":!0,style:{paddingTop:r/n*100+"%"}}):"constrained"===t?a.createElement("div",{style:{maxWidth:n,display:"block"}},a.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg%20height='"+r+"'%20width='"+n+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},g=function(e){let{children:t}=e,n=s(e,m);return a.createElement(a.Fragment,null,a.createElement(p,o({},n)),t,null)},f=["src","srcSet","loading","alt","shouldLoad"],y=["fallback","sources","shouldLoad"],h=function(e){let{src:t,srcSet:n,loading:r,alt:i="",shouldLoad:l}=e,c=s(e,f);return a.createElement("img",o({},c,{decoding:"async",loading:r,src:l?t:void 0,"data-src":l?void 0:t,srcSet:l?n:void 0,"data-srcset":l?void 0:n,alt:i}))},v=function(e){let{fallback:t,sources:n=[],shouldLoad:r=!0}=e,i=s(e,y);const l=i.sizes||(null==t?void 0:t.sizes),c=a.createElement(h,o({},i,t,{sizes:l,shouldLoad:r}));return n.length?a.createElement("picture",null,n.map((e=>{let{media:t,srcSet:n,type:i}=e;return a.createElement("source",{key:t+"-"+i+"-"+n,type:i,media:t,srcSet:r?n:void 0,"data-srcset":r?void 0:n,sizes:l})})),c):c};var b;h.propTypes={src:r.string.isRequired,alt:r.string.isRequired,sizes:r.string,srcSet:r.string,shouldLoad:r.bool},v.displayName="Picture",v.propTypes={alt:r.string.isRequired,shouldLoad:r.bool,fallback:r.exact({src:r.string.isRequired,srcSet:r.string,sizes:r.string}),sources:r.arrayOf(r.oneOfType([r.exact({media:r.string.isRequired,type:r.string,sizes:r.string,srcSet:r.string.isRequired}),r.exact({media:r.string,type:r.string.isRequired,sizes:r.string,srcSet:r.string.isRequired})]))};const E=["fallback"],w=function(e){let{fallback:t}=e,n=s(e,E);return t?a.createElement(v,o({},n,{fallback:{src:t},"aria-hidden":!0,alt:""})):a.createElement("div",o({},n))};w.displayName="Placeholder",w.propTypes={fallback:r.string,sources:null==(b=v.propTypes)?void 0:b.sources,alt:function(e,t,n){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+n+"`. Validation failed."):null}};const k=function(e){return a.createElement(a.Fragment,null,a.createElement(v,o({},e)),a.createElement("noscript",null,a.createElement(v,o({},e,{shouldLoad:!0}))))};k.displayName="MainImage",k.propTypes=v.propTypes;const C=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],x=["style","className"],L=e=>e.replace(/\n/g,""),S=function(e,t,n){for(var a=arguments.length,r=new Array(a>3?a-3:0),o=3;o<a;o++)r[o-3]=arguments[o];return e.alt||""===e.alt?i().string.apply(i(),[e,t,n].concat(r)):new Error('The "alt" prop is required in '+n+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},_={image:i().object.isRequired,alt:S},T=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],N=["style","className"],j=new Set;let O,I;const P=function(e){let{as:t="div",image:r,style:i,backgroundColor:u,className:d,class:m,onStartLoad:p,onLoad:g,onError:f}=e,y=s(e,T);const{width:h,height:v,layout:b}=r,E=c(h,v,b),{style:w,className:k}=E,C=s(E,N),x=(0,a.useRef)(),L=(0,a.useMemo)((()=>JSON.stringify(r.images)),[r.images]);m&&(d=m);const S=function(e,t,n){let a="";return"fullWidth"===e&&(a='<div aria-hidden="true" style="padding-top: '+n/t*100+'%;"></div>'),"constrained"===e&&(a='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height=\''+n+"'%20width='"+t+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),a}(b,h,v);return(0,a.useEffect)((()=>{O||(O=n.e(731).then(n.bind(n,6731)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:n}=e;return I=t,{renderImageToString:t,swapPlaceholderImage:n}})));const e=x.current.querySelector("[data-gatsby-image-ssr]");if(e&&l())return e.complete?(null==p||p({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==p||p({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void j.add(L);if(I&&j.has(L))return;let t,a;return O.then((e=>{let{renderImageToString:n,swapPlaceholderImage:s}=e;x.current&&(x.current.innerHTML=n(o({isLoading:!0,isLoaded:j.has(L),image:r},y)),j.has(L)||(t=requestAnimationFrame((()=>{x.current&&(a=s(x.current,L,j,i,p,g,f))}))))})),()=>{t&&cancelAnimationFrame(t),a&&a()}}),[r]),(0,a.useLayoutEffect)((()=>{j.has(L)&&I&&(x.current.innerHTML=I(o({isLoading:j.has(L),isLoaded:j.has(L),image:r},y)),null==p||p({wasCached:!0}),null==g||g({wasCached:!0}))}),[r]),(0,a.createElement)(t,o({},C,{style:o({},w,i,{backgroundColor:u}),className:k+(d?" "+d:""),ref:x,dangerouslySetInnerHTML:{__html:S},suppressHydrationWarning:!0}))},R=(0,a.memo)((function(e){return e.image?(0,a.createElement)(P,e):null}));R.propTypes=_,R.displayName="GatsbyImage";const M=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function W(e){return function(t){let{src:n,__imageData:r,__error:i}=t,l=s(t,M);return i&&console.warn(i),r?a.createElement(e,o({image:r},l)):(console.warn("Image not loaded",n),null)}}const q=W((function(e){let{as:t="div",className:n,class:r,style:i,image:l,loading:m="lazy",imgClassName:p,imgStyle:f,backgroundColor:y,objectFit:h,objectPosition:v}=e,b=s(e,C);if(!l)return console.warn("[gatsby-plugin-image] Missing image prop"),null;r&&(n=r),f=o({objectFit:h,objectPosition:v,backgroundColor:y},f);const{width:E,height:S,layout:_,images:T,placeholder:N,backgroundColor:j}=l,O=c(E,S,_),{style:I,className:P}=O,R=s(O,x),M={fallback:void 0,sources:[]};return T.fallback&&(M.fallback=o({},T.fallback,{srcSet:T.fallback.srcSet?L(T.fallback.srcSet):void 0})),T.sources&&(M.sources=T.sources.map((e=>o({},e,{srcSet:L(e.srcSet)})))),a.createElement(t,o({},R,{style:o({},I,i,{backgroundColor:y}),className:P+(n?" "+n:"")}),a.createElement(g,{layout:_,width:E,height:S},a.createElement(w,o({},d(N,!1,_,E,S,j,h,v))),a.createElement(k,o({"data-gatsby-image-ssr":"",className:p},b,u("eager"===m,!1,M,m,f)))))})),A=function(e,t){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(a)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},z=new Set(["fixed","fullWidth","constrained"]),H={src:i().string.isRequired,alt:S,width:A,height:A,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!z.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}};q.displayName="StaticImage",q.propTypes=H;const U=W(R);U.displayName="StaticImage",U.propTypes=H},2092:function(e,t,n){"use strict";var a=n(7294),r=n(193);t.Z=e=>{let{title:t,description:n,pathname:i,children:o}=e;const{title:s,description:l,image:c,siteUrl:u}=(0,r.$)(),d={title:t||s,description:n||l,image:""+u+c,url:""+u+(i||"")};return a.createElement(a.Fragment,null,a.createElement("title",null,d.title),a.createElement("meta",{name:"description",content:d.description}),a.createElement("meta",{name:"image",content:d.image}),a.createElement("meta",{property:"og:type",content:"website"}),a.createElement("meta",{property:"og:url",content:d.url}),a.createElement("meta",{property:"og:title",content:d.title}),a.createElement("meta",{property:"og:description",content:d.description}),a.createElement("meta",{property:"og:site_name",content:s}),a.createElement("meta",{property:"og:locale",content:"ko_KR"}),a.createElement("meta",{property:"og:image",content:d.image}),a.createElement("meta",{property:"og:image:width",content:"1200"}),a.createElement("meta",{property:"og:image:height",content:"630"}),o)}},6438:function(e,t,n){"use strict";var a=n(7294),r=n(1056),i=n.n(r);t.Z=()=>a.createElement("button",{className:"to-the-top",onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})},"aria-label":"페이지 최상단으로 이동"},a.createElement(i(),null),a.createElement("span",{style:{"--i":0}}),a.createElement("span",{style:{"--i":1}}))},7732:function(e,t,n){"use strict";n.d(t,{Z:function(){return p}});var a=n(3493),r=n.n(a),i=n(7294),o=n(1883);const s=function(e,t){const n=e.name.toUpperCase(),a=t.name.toUpperCase();return n<a?-1:n>a?1:0};var l=e=>{let{defaultCategory:t=""}=e;const{totalPosts:n,categories:a}=(()=>{const e=(0,o.useStaticQuery)("24302420"),t=e.allMarkdownRemark.nodes.length,n=[];return e.allMarkdownRemark.nodes.forEach((e=>{const{id:t,parent:a,frontmatter:r,fields:i}=e,{name:o,relativePath:l}=a,{title:c}=r,{slug:u}=i,d=l.split("/"),m=d[0];let p=n.find((e=>e.name===m));if(p)p.num+=1;else{const e={name:m,num:1,posts:[],subCategories:[]};n.push(e),p=e}let g=p;d.slice(1,-1).forEach((e=>{let t=g.subCategories.find((t=>t.name===e));if(t)t.num+=1;else{const n={name:e,num:1,posts:[],subCategories:[]};g.subCategories.push(n),g.subCategories.sort(s),t=n}g=t})),g.posts.push({id:t,title:c,name:o,slug:u,relativePath:l})})),n.sort(s),{totalPosts:t,categories:n}})(),{0:r,1:l}=(0,i.useState)(t),d=(e,t)=>{e.detail>1||(e.preventDefault(),l(r===t?"":t))};return i.createElement("nav",{className:"sidebar"},i.createElement(o.Link,{to:"/posts/",className:"sidebar__total"},"전체 글 ("+n+")"),i.createElement("ul",{className:"sidebar__category"},a.map((e=>i.createElement("li",{key:e.name},i.createElement(c,{name:e.name,num:e.num,onClick:d}),i.createElement("ul",{className:"sidebar__category"},e.subCategories.map((e=>i.createElement("li",{key:e.name},i.createElement(c,{name:e.name,num:e.num,onClick:d}),i.createElement("ul",{className:"sidebar__category"},e.subCategories.map((e=>i.createElement("li",{key:e.name},i.createElement(c,{name:e.name,num:e.num,onClick:d}),i.createElement(u,{posts:e.posts,isSelected:r===e.name}))))),i.createElement(u,{posts:e.posts,isSelected:r===e.name}))))),i.createElement(u,{posts:e.posts,isSelected:r===e.name}))))))};const c=(0,i.memo)((e=>{let{name:t,num:n,onClick:a}=e;return i.createElement(o.Link,{to:"/posts/"+t,className:"sidebar__category--text",onClick:e=>{a(e,t)}},t,i.createElement("span",{className:"sidebar__category__num"},"  ("+n+")"))})),u=(0,i.memo)((e=>{let{posts:t,isSelected:n}=e;const a=(0,i.useRef)(null);(0,i.useEffect)((()=>{const e=a.current;e instanceof HTMLUListElement&&e.style.setProperty("--posts-count",t.length.toString())}),[t.length]);const r=n?"open":"";return i.createElement("ul",{ref:a,className:"sidebar__posts "+r},t.map((e=>i.createElement("li",{key:e.id},i.createElement(o.Link,{to:e.slug,activeClassName:"active"},e.title||e.name)))))}));var d=n(8032);var m=()=>i.createElement(d.S,{className:"profile-image",src:"../../assets/images/profile-image.png",alt:"profile image",__imageData:n(8010)});var p=e=>{let{defaultCategory:t,children:n}=e;const a=(0,i.useRef)(null),o=(0,i.useRef)(null),s=(0,i.useRef)(null),c=e=>{e.stopPropagation(),a.current.classList.toggle("active"),o.current.classList.toggle("active"),s.current.classList.toggle("active")};return(0,i.useEffect)((()=>{const e=document.querySelector(".navbar"),t=a.current;if(!(t instanceof HTMLElement))return;const n=r()((function(){const n=e instanceof HTMLElement?e.offsetTop+e.offsetHeight:0;window.scrollY>n?t.style.setProperty("--position-top","0px"):t.style.setProperty("--position-top",n.toString()+"px")}),100);return window.addEventListener("scroll",n),()=>{window.removeEventListener("scroll",n)}}),[]),i.createElement("div",{className:"category-layout"},i.createElement("aside",{ref:a,className:"category-layout__aside"},i.createElement("figure",{className:"category-layout__profile"},i.createElement(m,null)),i.createElement("div",{className:"category-layout__category"},i.createElement(l,{defaultCategory:t})),i.createElement("button",{ref:o,className:"category-layout__button",onClick:c},"POSTS")),n,i.createElement("div",{ref:s,className:"category-layout__modal",onClick:c}))}},2705:function(e,t,n){var a=n(5639).Symbol;e.exports=a},4239:function(e,t,n){var a=n(2705),r=n(9607),i=n(2333),o=a?a.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":o&&o in Object(e)?r(e):i(e)}},7561:function(e,t,n){var a=n(7990),r=/^\s+/;e.exports=function(e){return e?e.slice(0,a(e)+1).replace(r,""):e}},1957:function(e,t,n){var a="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;e.exports=a},9607:function(e,t,n){var a=n(2705),r=Object.prototype,i=r.hasOwnProperty,o=r.toString,s=a?a.toStringTag:void 0;e.exports=function(e){var t=i.call(e,s),n=e[s];try{e[s]=void 0;var a=!0}catch(l){}var r=o.call(e);return a&&(t?e[s]=n:delete e[s]),r}},2333:function(e){var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5639:function(e,t,n){var a=n(1957),r="object"==typeof self&&self&&self.Object===Object&&self,i=a||r||Function("return this")();e.exports=i},7990:function(e){var t=/\s/;e.exports=function(e){for(var n=e.length;n--&&t.test(e.charAt(n)););return n}},3279:function(e,t,n){var a=n(3218),r=n(7771),i=n(4841),o=Math.max,s=Math.min;e.exports=function(e,t,n){var l,c,u,d,m,p,g=0,f=!1,y=!1,h=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function v(t){var n=l,a=c;return l=c=void 0,g=t,d=e.apply(a,n)}function b(e){var n=e-p;return void 0===p||n>=t||n<0||y&&e-g>=u}function E(){var e=r();if(b(e))return w(e);m=setTimeout(E,function(e){var n=t-(e-p);return y?s(n,u-(e-g)):n}(e))}function w(e){return m=void 0,h&&l?v(e):(l=c=void 0,d)}function k(){var e=r(),n=b(e);if(l=arguments,c=this,p=e,n){if(void 0===m)return function(e){return g=e,m=setTimeout(E,t),f?v(e):d}(p);if(y)return clearTimeout(m),m=setTimeout(E,t),v(p)}return void 0===m&&(m=setTimeout(E,t)),d}return t=i(t)||0,a(n)&&(f=!!n.leading,u=(y="maxWait"in n)?o(i(n.maxWait)||0,t):u,h="trailing"in n?!!n.trailing:h),k.cancel=function(){void 0!==m&&clearTimeout(m),g=0,l=p=c=m=void 0},k.flush=function(){return void 0===m?d:w(r())},k}},3218:function(e){e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},7005:function(e){e.exports=function(e){return null!=e&&"object"==typeof e}},3448:function(e,t,n){var a=n(4239),r=n(7005);e.exports=function(e){return"symbol"==typeof e||r(e)&&"[object Symbol]"==a(e)}},7771:function(e,t,n){var a=n(5639);e.exports=function(){return a.Date.now()}},3493:function(e,t,n){var a=n(3279),r=n(3218);e.exports=function(e,t,n){var i=!0,o=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return r(n)&&(i="leading"in n?!!n.leading:i,o="trailing"in n?!!n.trailing:o),a(e,t,{leading:i,maxWait:t,trailing:o})}},4841:function(e,t,n){var a=n(7561),r=n(3218),i=n(3448),o=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,c=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return NaN;if(r(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=r(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=a(e);var n=s.test(e);return n||l.test(e)?c(e.slice(2),n?2:8):o.test(e)?NaN:+e}},1056:function(e,t,n){var a=n(7294);function r(e){return a.createElement("svg",e,[a.createElement("mask",{id:"mask0_12_75",style:{maskType:"luminance"},maskUnits:"userSpaceOnUse",x:"2",y:"2",width:"44",height:"44",key:0},[a.createElement("path",{d:"M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z",stroke:"white",strokeWidth:"4",key:0}),a.createElement("path",{d:"M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z",fill:"white",stroke:"white",strokeWidth:"4",strokeLinejoin:"round",key:1}),a.createElement("path",{d:"M33 27L24 18L15 27",stroke:"black",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round",key:2})]),a.createElement("g",{mask:"url(#mask0_12_75)",key:1},a.createElement("path",{d:"M0 0H48V48H0V0Z",fill:"black"}))])}r.defaultProps={width:"48",height:"48",viewBox:"0 0 48 48",fill:"none"},e.exports=r,r.default=r},8010:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#485878","images":{"fallback":{"src":"/TIL/static/80814805075f553dcd2e61e962332ad2/0762e/profile-image.png","srcSet":"/TIL/static/80814805075f553dcd2e61e962332ad2/a4728/profile-image.png 206w,\\n/TIL/static/80814805075f553dcd2e61e962332ad2/e05b9/profile-image.png 411w,\\n/TIL/static/80814805075f553dcd2e61e962332ad2/0762e/profile-image.png 822w","sizes":"(min-width: 822px) 822px, 100vw"},"sources":[{"srcSet":"/TIL/static/80814805075f553dcd2e61e962332ad2/1302d/profile-image.webp 206w,\\n/TIL/static/80814805075f553dcd2e61e962332ad2/6c8b2/profile-image.webp 411w,\\n/TIL/static/80814805075f553dcd2e61e962332ad2/bc5a4/profile-image.webp 822w","type":"image/webp","sizes":"(min-width: 822px) 822px, 100vw"}]},"width":822,"height":827}')}}]);
//# sourceMappingURL=a99d2eb8724f72519a1534cc85fd0abc3dc18896-201b15b9d54c2d8c748e.js.map