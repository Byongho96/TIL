(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[426],{3204:function(e){"use strict";const t=/[\p{Lu}]/u,a=/[\p{Ll}]/u,r=/^[\p{Lu}](?![\p{Lu}])/gu,n=/([\p{Alpha}\p{N}_]|$)/u,s=/[_.\- ]+/,i=new RegExp("^"+s.source),l=new RegExp(s.source+n.source,"gu"),o=new RegExp("\\d+"+n.source,"gu"),c=(e,n)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(n={pascalCase:!1,preserveConsecutiveUppercase:!1,...n},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const s=!1===n.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(n.locale),c=!1===n.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(n.locale);if(1===e.length)return n.pascalCase?c(e):s(e);return e!==s(e)&&(e=((e,r,n)=>{let s=!1,i=!1,l=!1;for(let o=0;o<e.length;o++){const c=e[o];s&&t.test(c)?(e=e.slice(0,o)+"-"+e.slice(o),s=!1,l=i,i=!0,o++):i&&l&&a.test(c)?(e=e.slice(0,o-1)+"-"+e.slice(o-1),l=i,i=!1,s=!0):(s=r(c)===c&&n(c)!==c,l=i,i=n(c)===c&&r(c)!==c)}return e})(e,s,c)),e=e.replace(i,""),e=n.preserveConsecutiveUppercase?((e,t)=>(r.lastIndex=0,e.replace(r,(e=>t(e)))))(e,s):s(e),n.pascalCase&&(e=c(e.charAt(0))+e.slice(1)),((e,t)=>(l.lastIndex=0,o.lastIndex=0,e.replace(l,((e,a)=>t(a))).replace(o,(e=>t(e)))))(e,c)};e.exports=c,e.exports.default=c},8032:function(e,t,a){"use strict";a.d(t,{L:function(){return g},M:function(){return k},P:function(){return E},S:function(){return H},_:function(){return l},a:function(){return i},b:function(){return u},g:function(){return d},h:function(){return o}});var r=a(7294),n=(a(3204),a(5697)),s=a.n(n);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},i.apply(this,arguments)}function l(e,t){if(null==e)return{};var a,r,n={},s=Object.keys(e);for(r=0;r<s.length;r++)t.indexOf(a=s[r])>=0||(n[a]=e[a]);return n}const o=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;function c(e,t,a){const r={};let n="gatsby-image-wrapper";return"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:r}}function u(e,t,a,r,n){return void 0===n&&(n={}),i({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:i({},n,{opacity:t?1:0})})}function d(e,t,a,r,n,s,l,o){const c={};s&&(c.backgroundColor=s,"fixed"===a?(c.width=r,c.height=n,c.backgroundColor=s,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),l&&(c.objectFit=l),o&&(c.objectPosition=o);const u=i({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:i({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return u}const m=["children"],p=function(e){let{layout:t,width:a,height:n}=e;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg%20height='"+n+"'%20width='"+a+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},g=function(e){let{children:t}=e,a=l(e,m);return r.createElement(r.Fragment,null,r.createElement(p,i({},a)),t,null)},f=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],y=function(e){let{src:t,srcSet:a,loading:n,alt:s="",shouldLoad:o}=e,c=l(e,f);return r.createElement("img",i({},c,{decoding:"async",loading:n,src:o?t:void 0,"data-src":o?void 0:t,srcSet:o?a:void 0,"data-srcset":o?void 0:a,alt:s}))},b=function(e){let{fallback:t,sources:a=[],shouldLoad:n=!0}=e,s=l(e,h);const o=s.sizes||(null==t?void 0:t.sizes),c=r.createElement(y,i({},s,t,{sizes:o,shouldLoad:n}));return a.length?r.createElement("picture",null,a.map((e=>{let{media:t,srcSet:a,type:s}=e;return r.createElement("source",{key:t+"-"+s+"-"+a,type:s,media:t,srcSet:n?a:void 0,"data-srcset":n?void 0:a,sizes:o})})),c):c};var v;y.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},b.displayName="Picture",b.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};const w=["fallback"],E=function(e){let{fallback:t}=e,a=l(e,w);return t?r.createElement(b,i({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",i({},a))};E.displayName="Placeholder",E.propTypes={fallback:n.string,sources:null==(v=b.propTypes)?void 0:v.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};const k=function(e){return r.createElement(r.Fragment,null,r.createElement(b,i({},e)),r.createElement("noscript",null,r.createElement(b,i({},e,{shouldLoad:!0}))))};k.displayName="MainImage",k.propTypes=b.propTypes;const C=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],L=["style","className"],S=e=>e.replace(/\n/g,""),N=function(e,t,a){for(var r=arguments.length,n=new Array(r>3?r-3:0),i=3;i<r;i++)n[i-3]=arguments[i];return e.alt||""===e.alt?s().string.apply(s(),[e,t,a].concat(n)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},x={image:s().object.isRequired,alt:N},T=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],I=["style","className"],_=new Set;let O,j;const P=function(e){let{as:t="div",image:n,style:s,backgroundColor:u,className:d,class:m,onStartLoad:p,onLoad:g,onError:f}=e,h=l(e,T);const{width:y,height:b,layout:v}=n,w=c(y,b,v),{style:E,className:k}=w,C=l(w,I),L=(0,r.useRef)(),S=(0,r.useMemo)((()=>JSON.stringify(n.images)),[n.images]);m&&(d=m);const N=function(e,t,a){let r="";return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height=\''+a+"'%20width='"+t+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(v,y,b);return(0,r.useEffect)((()=>{O||(O=a.e(731).then(a.bind(a,6731)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:a}=e;return j=t,{renderImageToString:t,swapPlaceholderImage:a}})));const e=L.current.querySelector("[data-gatsby-image-ssr]");if(e&&o())return e.complete?(null==p||p({wasCached:!0}),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==p||p({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==g||g({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void _.add(S);if(j&&_.has(S))return;let t,r;return O.then((e=>{let{renderImageToString:a,swapPlaceholderImage:l}=e;L.current&&(L.current.innerHTML=a(i({isLoading:!0,isLoaded:_.has(S),image:n},h)),_.has(S)||(t=requestAnimationFrame((()=>{L.current&&(r=l(L.current,S,_,s,p,g,f))}))))})),()=>{t&&cancelAnimationFrame(t),r&&r()}}),[n]),(0,r.useLayoutEffect)((()=>{_.has(S)&&j&&(L.current.innerHTML=j(i({isLoading:_.has(S),isLoaded:_.has(S),image:n},h)),null==p||p({wasCached:!0}),null==g||g({wasCached:!0}))}),[n]),(0,r.createElement)(t,i({},C,{style:i({},E,s,{backgroundColor:u}),className:k+(d?" "+d:""),ref:L,dangerouslySetInnerHTML:{__html:N},suppressHydrationWarning:!0}))},R=(0,r.memo)((function(e){return e.image?(0,r.createElement)(P,e):null}));R.propTypes=x,R.displayName="GatsbyImage";const q=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function M(e){return function(t){let{src:a,__imageData:n,__error:s}=t,o=l(t,q);return s&&console.warn(s),n?r.createElement(e,i({image:n},o)):(console.warn("Image not loaded",a),null)}}const W=M((function(e){let{as:t="div",className:a,class:n,style:s,image:o,loading:m="lazy",imgClassName:p,imgStyle:f,backgroundColor:h,objectFit:y,objectPosition:b}=e,v=l(e,C);if(!o)return console.warn("[gatsby-plugin-image] Missing image prop"),null;n&&(a=n),f=i({objectFit:y,objectPosition:b,backgroundColor:h},f);const{width:w,height:N,layout:x,images:T,placeholder:I,backgroundColor:_}=o,O=c(w,N,x),{style:j,className:P}=O,R=l(O,L),q={fallback:void 0,sources:[]};return T.fallback&&(q.fallback=i({},T.fallback,{srcSet:T.fallback.srcSet?S(T.fallback.srcSet):void 0})),T.sources&&(q.sources=T.sources.map((e=>i({},e,{srcSet:S(e.srcSet)})))),r.createElement(t,i({},R,{style:i({},j,s,{backgroundColor:h}),className:P+(a?" "+a:"")}),r.createElement(g,{layout:x,width:w,height:N},r.createElement(E,i({},d(I,!1,x,w,N,_,y,b))),r.createElement(k,i({"data-gatsby-image-ssr":"",className:p},v,u("eager"===m,!1,q,m,f)))))})),z=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?s().number.apply(s(),[e,t].concat(r)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},A=new Set(["fixed","fullWidth","constrained"]),F={src:s().string.isRequired,alt:N,width:z,height:z,sizes:s().string,layout:e=>{if(void 0!==e.layout&&!A.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}};W.displayName="StaticImage",W.propTypes=F;const H=M(R);H.displayName="StaticImage",H.propTypes=F},2993:function(e,t,a){"use strict";a.d(t,{Z:function(){return i}});var r=a(7294),n=a(1056),s=a.n(n);var i=()=>r.createElement("div",{className:"style-module--icon--610f9",onClick:()=>{window.scrollTo({top:0,behavior:"smooth"})}},r.createElement(s(),null))},2598:function(e,t,a){"use strict";a.d(t,{Z:function(){return h}});var r={};a.r(r),a.d(r,{W3:function(){return i},nC:function(){return l},v_:function(){return o},hv:function(){return c}});var n=a(7294),s=a(1883),i="style-module--category--d0bec",l="style-module--container--36f8e",o="style-module--post--8179a",c="style-module--selected--dc52d";function u(e,t){const a=e.name.toUpperCase(),r=t.name.toUpperCase();return a<r?-1:a>r?1:0}const d=e=>{let{name:t,handleClickCategory:a}=e;return n.createElement(s.Link,{to:"/posts/"+t,activeClassName:"active",onClick:e=>{a(e,t)}},t)},m=e=>{let{posts:t,isSelected:a}=e;const i=a?c:"";return n.createElement("ul",{className:r.posts},t.map((e=>{return n.createElement("li",{key:e.id,className:o+" "+i+" "},n.createElement(s.Link,{to:"/posts/"+e.relativePath,activeClassName:"active"},(t=e.title||e.name,a=13,t.length>a?t.substring(0,a)+"...":t)));var t,a})))};var p=e=>{let{selectedCategory:t=""}=e;const a=(()=>{const e=(0,s.useStaticQuery)("3300660363"),t=[];return e.allMarkdownRemark.nodes.forEach((e=>{const{id:a,parent:r,frontmatter:n}=e,{name:s,relativePath:i}=r,{title:l}=n,o=i.split("/"),c=o[0];let d=t.find((e=>e.name===c));if(d)d.num+=1;else{const e={name:c,num:1,posts:[],subCategories:[]};t.push(e),d=e}let m=d;o.slice(1,-1).forEach((e=>{let t=m.subCategories.find((t=>t.name===e));if(t)t.num+=1;else{const a={name:e,num:1,posts:[],subCategories:[]};m.subCategories.push(a),m.subCategories.sort(u),t=a}m=t})),m.posts.push({id:a,title:l,name:s,relativePath:i})})),t.sort(u),t})(),{0:r,1:o}=(0,n.useState)(t),c=(e,t)=>{1==e.detail&&e.preventDefault(),o(r===t?"":t)};return n.createElement("ul",{className:l},a.map((e=>n.createElement("li",{key:e.name,className:i},n.createElement(d,{name:e.name,handleClickCategory:c}),n.createElement("ul",null,e.subCategories.map((e=>n.createElement("li",{key:e.name,className:i},n.createElement(d,{name:e.name,handleClickCategory:c}),n.createElement("ul",null,e.subCategories.map((e=>n.createElement("li",{key:e.name,className:i},n.createElement(d,{name:e.name,handleClickCategory:c}),n.createElement(m,{posts:e.posts,isSelected:r===e.name}))))),n.createElement(m,{posts:e.posts,isSelected:r===e.name}))))),n.createElement(m,{posts:e.posts,isSelected:r===e.name})))))},g=a(8032);var f=()=>n.createElement(g.S,{className:"style-module--profile-image--06328",src:"../../assets/images/celebrity.png",alt:"profile image",__imageData:a(9383)});var h=e=>{let{selectedCategory:t,children:a}=e;return n.createElement("div",{className:"style-module--container--16db0"},n.createElement("div",{className:"style-module--category--c2b47"},n.createElement("div",{className:"style-module--profile-image--5d1c8"},n.createElement(f,null)),n.createElement(p,{selectedCategory:t})),a)}},1056:function(e,t,a){var r=a(7294);function n(e){return r.createElement("svg",e,[r.createElement("mask",{id:"mask0_12_75",style:{maskType:"luminance"},maskUnits:"userSpaceOnUse",x:"2",y:"2",width:"44",height:"44",key:0},[r.createElement("path",{d:"M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z",stroke:"white",strokeWidth:"4",key:0}),r.createElement("path",{d:"M24 44C35.046 44 44 35.046 44 24C44 12.954 35.046 4 24 4C12.954 4 4 12.954 4 24C4 35.046 12.954 44 24 44Z",fill:"white",stroke:"white",strokeWidth:"4",strokeLinejoin:"round",key:1}),r.createElement("path",{d:"M33 27L24 18L15 27",stroke:"black",strokeWidth:"4",strokeLinecap:"round",strokeLinejoin:"round",key:2})]),r.createElement("g",{mask:"url(#mask0_12_75)",key:1},r.createElement("path",{d:"M0 0H48V48H0V0Z",fill:"black"}))])}n.defaultProps={width:"48",height:"48",viewBox:"0 0 48 48",fill:"none"},e.exports=n,n.default=n},9383:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#c8c8c8","images":{"fallback":{"src":"/TIL/static/f99fb139396f17c0687ee632fdb553a7/b211d/celebrity.png","srcSet":"/TIL/static/f99fb139396f17c0687ee632fdb553a7/63e80/celebrity.png 157w,\\n/TIL/static/f99fb139396f17c0687ee632fdb553a7/95839/celebrity.png 314w,\\n/TIL/static/f99fb139396f17c0687ee632fdb553a7/b211d/celebrity.png 627w","sizes":"(min-width: 627px) 627px, 100vw"},"sources":[{"srcSet":"/TIL/static/f99fb139396f17c0687ee632fdb553a7/64b1e/celebrity.webp 157w,\\n/TIL/static/f99fb139396f17c0687ee632fdb553a7/b0829/celebrity.webp 314w,\\n/TIL/static/f99fb139396f17c0687ee632fdb553a7/01f03/celebrity.webp 627w","type":"image/webp","sizes":"(min-width: 627px) 627px, 100vw"}]},"width":627,"height":587}')}}]);
//# sourceMappingURL=a99d2eb8724f72519a1534cc85fd0abc3dc18896-491c518cf34803956118.js.map