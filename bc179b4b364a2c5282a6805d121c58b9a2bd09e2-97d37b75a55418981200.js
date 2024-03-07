"use strict";(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[584],{3204:function(e){const t=/[\p{Lu}]/u,a=/[\p{Ll}]/u,r=/^[\p{Lu}](?![\p{Lu}])/gu,n=/([\p{Alpha}\p{N}_]|$)/u,i=/[_.\- ]+/,s=new RegExp("^"+i.source),o=new RegExp(i.source+n.source,"gu"),l=new RegExp("\\d+"+n.source,"gu"),c=(e,n)=>{if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");if(n={pascalCase:!1,preserveConsecutiveUppercase:!1,...n},0===(e=Array.isArray(e)?e.map((e=>e.trim())).filter((e=>e.length)).join("-"):e.trim()).length)return"";const i=!1===n.locale?e=>e.toLowerCase():e=>e.toLocaleLowerCase(n.locale),c=!1===n.locale?e=>e.toUpperCase():e=>e.toLocaleUpperCase(n.locale);if(1===e.length)return n.pascalCase?c(e):i(e);return e!==i(e)&&(e=((e,r,n)=>{let i=!1,s=!1,o=!1;for(let l=0;l<e.length;l++){const c=e[l];i&&t.test(c)?(e=e.slice(0,l)+"-"+e.slice(l),i=!1,o=s,s=!0,l++):s&&o&&a.test(c)?(e=e.slice(0,l-1)+"-"+e.slice(l-1),o=s,s=!1,i=!0):(i=r(c)===c&&n(c)!==c,o=s,s=n(c)===c&&r(c)!==c)}return e})(e,i,c)),e=e.replace(s,""),e=n.preserveConsecutiveUppercase?((e,t)=>(r.lastIndex=0,e.replace(r,(e=>t(e)))))(e,i):i(e),n.pascalCase&&(e=c(e.charAt(0))+e.slice(1)),((e,t)=>(o.lastIndex=0,l.lastIndex=0,e.replace(o,((e,a)=>t(a))).replace(l,(e=>t(e)))))(e,c)};e.exports=c,e.exports.default=c},8032:function(e,t,a){a.d(t,{L:function(){return m},M:function(){return L},P:function(){return E},S:function(){return H},_:function(){return o},a:function(){return s},b:function(){return d},g:function(){return u},h:function(){return l}});var r=a(7294),n=(a(3204),a(5697)),i=a.n(n);function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e},s.apply(this,arguments)}function o(e,t){if(null==e)return{};var a,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)t.indexOf(a=i[r])>=0||(n[a]=e[a]);return n}const l=()=>"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;function c(e,t,a){const r={};let n="gatsby-image-wrapper";return"fixed"===a?(r.width=e,r.height=t):"constrained"===a&&(n="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:n,"data-gatsby-image-wrapper":"",style:r}}function d(e,t,a,r,n){return void 0===n&&(n={}),s({},a,{loading:r,shouldLoad:e,"data-main-image":"",style:s({},n,{opacity:t?1:0})})}function u(e,t,a,r,n,i,o,l){const c={};i&&(c.backgroundColor=i,"fixed"===a?(c.width=r,c.height=n,c.backgroundColor=i,c.position="relative"):("constrained"===a||"fullWidth"===a)&&(c.position="absolute",c.top=0,c.left=0,c.bottom=0,c.right=0)),o&&(c.objectFit=o),l&&(c.objectPosition=l);const d=s({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:s({opacity:t?0:1,transition:"opacity 500ms linear"},c)});return d}const p=["children"],g=function(e){let{layout:t,width:a,height:n}=e;return"fullWidth"===t?r.createElement("div",{"aria-hidden":!0,style:{paddingTop:n/a*100+"%"}}):"constrained"===t?r.createElement("div",{style:{maxWidth:a,display:"block"}},r.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg%20height='"+n+"'%20width='"+a+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},m=function(e){let{children:t}=e,a=o(e,p);return r.createElement(r.Fragment,null,r.createElement(g,s({},a)),t,null)},f=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],y=function(e){let{src:t,srcSet:a,loading:n,alt:i="",shouldLoad:l}=e,c=o(e,f);return r.createElement("img",s({},c,{decoding:"async",loading:n,src:l?t:void 0,"data-src":l?void 0:t,srcSet:l?a:void 0,"data-srcset":l?void 0:a,alt:i}))},b=function(e){let{fallback:t,sources:a=[],shouldLoad:n=!0}=e,i=o(e,h);const l=i.sizes||(null==t?void 0:t.sizes),c=r.createElement(y,s({},i,t,{sizes:l,shouldLoad:n}));return a.length?r.createElement("picture",null,a.map((e=>{let{media:t,srcSet:a,type:i}=e;return r.createElement("source",{key:t+"-"+i+"-"+a,type:i,media:t,srcSet:n?a:void 0,"data-srcset":n?void 0:a,sizes:l})})),c):c};var w;y.propTypes={src:n.string.isRequired,alt:n.string.isRequired,sizes:n.string,srcSet:n.string,shouldLoad:n.bool},b.displayName="Picture",b.propTypes={alt:n.string.isRequired,shouldLoad:n.bool,fallback:n.exact({src:n.string.isRequired,srcSet:n.string,sizes:n.string}),sources:n.arrayOf(n.oneOfType([n.exact({media:n.string.isRequired,type:n.string,sizes:n.string,srcSet:n.string.isRequired}),n.exact({media:n.string,type:n.string.isRequired,sizes:n.string,srcSet:n.string.isRequired})]))};const v=["fallback"],E=function(e){let{fallback:t}=e,a=o(e,v);return t?r.createElement(b,s({},a,{fallback:{src:t},"aria-hidden":!0,alt:""})):r.createElement("div",s({},a))};E.displayName="Placeholder",E.propTypes={fallback:n.string,sources:null==(w=b.propTypes)?void 0:w.sources,alt:function(e,t,a){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Validation failed."):null}};const L=function(e){return r.createElement(r.Fragment,null,r.createElement(b,s({},e)),r.createElement("noscript",null,r.createElement(b,s({},e,{shouldLoad:!0}))))};L.displayName="MainImage",L.propTypes=b.propTypes;const k=["as","className","class","style","image","loading","imgClassName","imgStyle","backgroundColor","objectFit","objectPosition"],C=["style","className"],S=e=>e.replace(/\n/g,""),x=function(e,t,a){for(var r=arguments.length,n=new Array(r>3?r-3:0),s=3;s<r;s++)n[s-3]=arguments[s];return e.alt||""===e.alt?i().string.apply(i(),[e,t,a].concat(n)):new Error('The "alt" prop is required in '+a+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},T={image:i().object.isRequired,alt:x},I=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],N=["style","className"],_=new Set;let O,R;const j=function(e){let{as:t="div",image:n,style:i,backgroundColor:d,className:u,class:p,onStartLoad:g,onLoad:m,onError:f}=e,h=o(e,I);const{width:y,height:b,layout:w}=n,v=c(y,b,w),{style:E,className:L}=v,k=o(v,N),C=(0,r.useRef)(),S=(0,r.useMemo)((()=>JSON.stringify(n.images)),[n.images]);p&&(u=p);const x=function(e,t,a){let r="";return"fullWidth"===e&&(r='<div aria-hidden="true" style="padding-top: '+a/t*100+'%;"></div>'),"constrained"===e&&(r='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg%20height=\''+a+"'%20width='"+t+"'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),r}(w,y,b);return(0,r.useEffect)((()=>{O||(O=a.e(731).then(a.bind(a,6731)).then((e=>{let{renderImageToString:t,swapPlaceholderImage:a}=e;return R=t,{renderImageToString:t,swapPlaceholderImage:a}})));const e=C.current.querySelector("[data-gatsby-image-ssr]");if(e&&l())return e.complete?(null==g||g({wasCached:!0}),null==m||m({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)):(null==g||g({wasCached:!0}),e.addEventListener("load",(function t(){e.removeEventListener("load",t),null==m||m({wasCached:!0}),setTimeout((()=>{e.removeAttribute("data-gatsby-image-ssr")}),0)}))),void _.add(S);if(R&&_.has(S))return;let t,r;return O.then((e=>{let{renderImageToString:a,swapPlaceholderImage:o}=e;C.current&&(C.current.innerHTML=a(s({isLoading:!0,isLoaded:_.has(S),image:n},h)),_.has(S)||(t=requestAnimationFrame((()=>{C.current&&(r=o(C.current,S,_,i,g,m,f))}))))})),()=>{t&&cancelAnimationFrame(t),r&&r()}}),[n]),(0,r.useLayoutEffect)((()=>{_.has(S)&&R&&(C.current.innerHTML=R(s({isLoading:_.has(S),isLoaded:_.has(S),image:n},h)),null==g||g({wasCached:!0}),null==m||m({wasCached:!0}))}),[n]),(0,r.createElement)(t,s({},k,{style:s({},E,i,{backgroundColor:d}),className:L+(u?" "+u:""),ref:C,dangerouslySetInnerHTML:{__html:x},suppressHydrationWarning:!0}))},q=(0,r.memo)((function(e){return e.image?(0,r.createElement)(j,e):null}));q.propTypes=T,q.displayName="GatsbyImage";const z=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"];function A(e){return function(t){let{src:a,__imageData:n,__error:i}=t,l=o(t,z);return i&&console.warn(i),n?r.createElement(e,s({image:n},l)):(console.warn("Image not loaded",a),null)}}const P=A((function(e){let{as:t="div",className:a,class:n,style:i,image:l,loading:p="lazy",imgClassName:g,imgStyle:f,backgroundColor:h,objectFit:y,objectPosition:b}=e,w=o(e,k);if(!l)return console.warn("[gatsby-plugin-image] Missing image prop"),null;n&&(a=n),f=s({objectFit:y,objectPosition:b,backgroundColor:h},f);const{width:v,height:x,layout:T,images:I,placeholder:N,backgroundColor:_}=l,O=c(v,x,T),{style:R,className:j}=O,q=o(O,C),z={fallback:void 0,sources:[]};return I.fallback&&(z.fallback=s({},I.fallback,{srcSet:I.fallback.srcSet?S(I.fallback.srcSet):void 0})),I.sources&&(z.sources=I.sources.map((e=>s({},e,{srcSet:S(e.srcSet)})))),r.createElement(t,s({},q,{style:s({},R,i,{backgroundColor:h}),className:j+(a?" "+a:"")}),r.createElement(m,{layout:T,width:v,height:x},r.createElement(E,s({},u(N,!1,T,v,x,_,y,b))),r.createElement(L,s({"data-gatsby-image-ssr":"",className:g},w,d("eager"===p,!1,z,p,f)))))})),W=function(e,t){for(var a=arguments.length,r=new Array(a>2?a-2:0),n=2;n<a;n++)r[n-2]=arguments[n];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?i().number.apply(i(),[e,t].concat(r)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},F=new Set(["fixed","fullWidth","constrained"]),M={src:i().string.isRequired,alt:x,width:W,height:W,sizes:i().string,layout:e=>{if(void 0!==e.layout&&!F.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}};P.displayName="StaticImage",P.propTypes=M;const H=A(q);H.displayName="StaticImage",H.propTypes=M},3023:function(e,t,a){var r=a(7294),n=a(8032);t.Z=()=>r.createElement(n.S,{className:"profile-image",src:"../../assets/images/profile-image.png",alt:"작성자 프로필",__imageData:a(8010)})},2092:function(e,t,a){var r=a(7294),n=a(193);t.Z=e=>{let{title:t,description:a,pathname:i,children:s}=e;const{title:o,description:l,image:c,siteUrl:d}=(0,n.$)(),u={title:t||o,description:a||l,image:""+d+c,url:""+d+(i||"")};return r.createElement(r.Fragment,null,r.createElement("title",null,u.title),r.createElement("meta",{name:"description",content:u.description}),r.createElement("meta",{name:"image",content:u.image}),r.createElement("meta",{property:"og:type",content:"website"}),r.createElement("meta",{property:"og:url",content:u.url}),r.createElement("meta",{property:"og:title",content:u.title}),r.createElement("meta",{property:"og:description",content:u.description}),r.createElement("meta",{property:"og:site_name",content:o}),r.createElement("meta",{property:"og:locale",content:"ko_KR"}),r.createElement("meta",{property:"og:image",content:u.image}),r.createElement("meta",{property:"og:image:width",content:"1200"}),r.createElement("meta",{property:"og:image:height",content:"630"}),s)}},8010:function(e){e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#b8c8d8","images":{"fallback":{"src":"/TIL/static/1bcdafbf4ebd91a5f6b44871f505e74c/257af/profile-image.png","srcSet":"/TIL/static/1bcdafbf4ebd91a5f6b44871f505e74c/25ed1/profile-image.png 90w,\\n/TIL/static/1bcdafbf4ebd91a5f6b44871f505e74c/a2c25/profile-image.png 180w,\\n/TIL/static/1bcdafbf4ebd91a5f6b44871f505e74c/257af/profile-image.png 360w","sizes":"(min-width: 360px) 360px, 100vw"},"sources":[{"srcSet":"/TIL/static/1bcdafbf4ebd91a5f6b44871f505e74c/5d191/profile-image.webp 90w,\\n/TIL/static/1bcdafbf4ebd91a5f6b44871f505e74c/52f83/profile-image.webp 180w,\\n/TIL/static/1bcdafbf4ebd91a5f6b44871f505e74c/27ab5/profile-image.webp 360w","type":"image/webp","sizes":"(min-width: 360px) 360px, 100vw"}]},"width":360,"height":360}')}}]);
//# sourceMappingURL=bc179b4b364a2c5282a6805d121c58b9a2bd09e2-97d37b75a55418981200.js.map