(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[49],{193:function(e,t,n){"use strict";n.d(t,{$:function(){return a}});var r=n(1883);const a=()=>(0,r.useStaticQuery)("3571427910").site.siteMetadata},9951:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var r={};n.r(r),n.d(r,{colorPicker:function(){return u},container:function(){return i}});var a=n(7294),o=n(1883),l="style-module--nav-link-text--1f74e",c=n(193),u="style-module--color-picker--4c5e0",i="style-module--container--ca8f7",s=n(919),f=n.n(s),d=n(8822),m=n.n(d);var h=()=>{const{0:e,1:t}=(0,a.useState)("light");(0,a.useEffect)((()=>{const e=document.querySelector(":root");let t=localStorage.getItem("main-color");t?e.style.setProperty("--main-color",t):t=getComputedStyle(e).getPropertyValue("--main-color"),document.querySelector("#color-picker").value=t}),[]);(0,a.useEffect)((()=>{const e=window.matchMedia("(prefers-color-scheme: dark)"),n=e=>{t(e.matches?"dark":"light")};return e.addEventListener("change",n),()=>{e.removeEventListener("change",n)}}),[]);return(0,a.useEffect)((()=>{const t=document.querySelector(":root");"dark"===e?t.classList.add("dark"):t.classList.remove("dark")}),[e]),a.createElement("div",{className:i},a.createElement("input",{id:"color-picker",className:u,type:"color",onChange:e=>{document.querySelector(":root").style.setProperty("--main-color",e.target.value),localStorage.setItem("main-color",e.target.value)}}),a.createElement("div",{className:r.theme+" "+r[e],onClick:()=>{t((e=>"light"===e?"dark":"light"))}},"dark"===e?a.createElement(f(),null):a.createElement(m(),null)))};var p=()=>{const{author:e}=(0,c.$)();return a.createElement("div",{className:"style-module--nav-bar--3417e"},a.createElement(o.Link,{to:"/",className:l},e),a.createElement(h,null),a.createElement("nav",null,a.createElement("ul",{className:"style-module--nav-links--64532"},a.createElement("li",null,a.createElement(o.Link,{to:"/",className:l},"Home")),a.createElement("li",null,a.createElement(o.Link,{to:"/about",className:l},"About")),a.createElement("li",null,a.createElement(o.Link,{to:"/posts",className:l},"Posts")))))};var y=e=>{let{children:t}=e;return a.createElement("div",{className:"style-module--container--24ac7"},a.createElement(p,null),t)}},181:function(e,t,n){"use strict";n.r(t),n.d(t,{Head:function(){return h},default:function(){return m}});var r={};n.r(r),n.d(r,{black:function(){return u},tape:function(){return i},white:function(){return s}});var a=n(7294),o=n(9951),l=n(9844);var c=()=>a.createElement("div",{className:"style-module--container--ddcb6"},a.createElement(l.e,{sequence:["I'm a Frontend Developer, Byongho",4e3,"I'm working on this blog",4e3],wrapper:"h1",className:"style-module--about-logo--f5187",speed:20,deletionSpeed:60,repeat:1/0})),u="style-module--black--d61a9",i="style-module--tape--e4318",s="style-module--white--9bf5e";var f=e=>{let{color:t,phrase:n="coming soon",direction:o="right"}=e;const l=(0,a.useRef)(null),c=(0,a.useRef)(null);return(0,a.useEffect)((()=>{const e=l.current,t=c.current,n="right"===o?1:-1;let r=null,a=0;"right"===o&&(e.style.justifyContent="flex-end");const u=()=>{a++,a>t.scrollWidth/3&&(t.style.transform="translate3d(0, 0, 0)",a=0),t.style.transform="translate3d("+n*a+"px, 0, 0)",r=window.requestAnimationFrame(u)},i=()=>{a+=15};return window.addEventListener("scroll",i),u(),()=>{window.removeEventListener("scroll",i),window.cancelAnimationFrame(r)}}),[]),a.createElement("div",{ref:l,className:i+" "+r[t]},a.createElement("p",{ref:c,className:r.text},(n+"    ").repeat(30)))};var d=()=>a.createElement("div",{className:"style-module--container--28a04"},a.createElement("div",{className:"style-module--tape-first--9fa1d"},a.createElement(f,{color:"white"})),a.createElement("div",{className:"style-module--tape-second--79474"},a.createElement(f,{color:"black",direction:"left"})),a.createElement("div",{className:"style-module--tape-third--c90d1"},a.createElement(f,{color:"white"})),a.createElement("p",{className:"style-module--about--4e15c"},"About Me"));var m=()=>a.createElement(o.Z,null,a.createElement("div",{className:"about-module--container--307c9"},a.createElement("div",{className:"about-module--logo--3c6f5"},a.createElement(c,null)),a.createElement(d,null)));const h=()=>a.createElement("title",null,"About Page")},9844:function(e,t,n){"use strict";n.d(t,{e:function(){return p}});var r=n(7294);function a(e,t,n,r){return new(n||(n=Promise))((function(a,o){function l(e){try{u(r.next(e))}catch(e){o(e)}}function c(e){try{u(r.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(l,c)}u((r=r.apply(e,t||[])).next())}))}function o(e,t){var n,r,a,o,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,r=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(!((a=(a=l.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){l=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){l.label=o[1];break}if(6===o[0]&&l.label<a[1]){l.label=a[1],a=o;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(o);break}a[2]&&l.ops.pop(),l.trys.pop();continue}o=t.call(e,l)}catch(e){o=[6,e],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}}function l(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function c(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),l=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)l.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return l}function u(e,t,n){if(n||2===arguments.length)for(var r,a=0,o=t.length;a<o;a++)!r&&a in t||(r||(r=Array.prototype.slice.call(t,0,a)),r[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))}function i(e,t,n,r){for(var i=[],d=4;d<arguments.length;d++)i[d-4]=arguments[d];return a(this,void 0,void 0,(function(){var a,d,m,h,p,y;return o(this,(function(o){switch(o.label){case 0:o.trys.push([0,12,13,14]),a=l(i),d=a.next(),o.label=1;case 1:if(d.done)return[3,11];switch(typeof(m=d.value)){case"string":return[3,2];case"number":return[3,4];case"function":return[3,6]}return[3,8];case 2:return[4,s(e,m,t,n,r)];case 3:return o.sent(),[3,10];case 4:return[4,f(m)];case 5:return o.sent(),[3,10];case 6:return[4,m.apply(void 0,u([e,t,n,r],c(i),!1))];case 7:return o.sent(),[3,10];case 8:return[4,m];case 9:o.sent(),o.label=10;case 10:return d=a.next(),[3,1];case 11:return[3,14];case 12:return h=o.sent(),p={error:h},[3,14];case 13:try{d&&!d.done&&(y=a.return)&&y.call(a)}finally{if(p)throw p.error}return[7];case 14:return[2]}}))}))}function s(e,t,n,r,l){return a(this,void 0,void 0,(function(){var a;return o(this,(function(o){switch(o.label){case 0:return a=function(e,t){var n=c(t).slice(0);return u(u([],c(e),!1),[NaN],!1).findIndex((function(e,t){return n[t]!==e}))}(e.textContent,t),[4,d(e,u(u([],c(h(e.textContent,a)),!1),c(m(t,a)),!1),n,r,l)];case 1:return o.sent(),[2]}}))}))}function f(e){return a(this,void 0,void 0,(function(){return o(this,(function(t){switch(t.label){case 0:return[4,new Promise((function(t){return setTimeout(t,e)}))];case 1:return t.sent(),[2]}}))}))}function d(e,t,n,r,u){return a(this,void 0,void 0,(function(){var a,i,s,d,m,h,p,y,v,b,E,g,w;return o(this,(function(k){switch(k.label){case 0:if(a=t,u){for(i=0,s=1;s<t.length;s++)if(d=c([t[s-1],t[s]],2),m=d[0],(h=d[1]).length>m.length||""===h){i=s;break}a=t.slice(i,t.length)}k.label=1;case 1:k.trys.push([1,6,7,8]),p=l(function(e){var t,n,r,a,c,u,i;return o(this,(function(s){switch(s.label){case 0:t=function(e){return o(this,(function(t){switch(t.label){case 0:return[4,{op:function(t){return requestAnimationFrame((function(){return t.textContent=e}))},opCode:function(t){return""===e||t.textContent.length>e.length?"DELETE":"WRITING"}}];case 1:return t.sent(),[2]}}))},s.label=1;case 1:s.trys.push([1,6,7,8]),n=l(e),r=n.next(),s.label=2;case 2:return r.done?[3,5]:(a=r.value,[5,t(a)]);case 3:s.sent(),s.label=4;case 4:return r=n.next(),[3,2];case 5:return[3,8];case 6:return c=s.sent(),u={error:c},[3,8];case 7:try{r&&!r.done&&(i=n.return)&&i.call(n)}finally{if(u)throw u.error}return[7];case 8:return[2]}}))}(a)),y=p.next(),k.label=2;case 2:return y.done?[3,5]:(v=y.value,b="WRITING"===v.opCode(e)?n+n*(Math.random()-.5):r+r*(Math.random()-.5),v.op(e),[4,f(b)]);case 3:k.sent(),k.label=4;case 4:return y=p.next(),[3,2];case 5:return[3,8];case 6:return E=k.sent(),g={error:E},[3,8];case 7:try{y&&!y.done&&(w=p.return)&&w.call(p)}finally{if(g)throw g.error}return[7];case 8:return[2]}}))}))}function m(e,t,n){var r=c(e).slice(0);return void 0===t&&(t=0),void 0===n&&(n=r.length),o(this,(function(e){switch(e.label){case 0:return t<n?[4,r.slice(0,++t).join("")]:[3,2];case 1:return e.sent(),[3,0];case 2:return[2]}}))}function h(e,t,n){var r=c(e).slice(0);return void 0===t&&(t=0),void 0===n&&(n=r.length),o(this,(function(e){switch(e.label){case 0:return n>t?[4,r.slice(0,--n).join("")]:[3,2];case 1:return e.sent(),[3,0];case 2:return[2]}}))}!function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===n&&r.firstChild?r.insertBefore(a,r.firstChild):r.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}(".index-module_type__E-SaG::after {\n  content: '|';\n  animation: index-module_cursor__PQg0P 1.1s infinite step-start;\n}\n\n@keyframes index-module_cursor__PQg0P {\n  50% {\n    opacity: 0;\n  }\n}\n");var p=(0,r.memo)((0,r.forwardRef)((function(e,t){var n=e.sequence,a=e.repeat,o=e.className,l=e.speed,s=void 0===l?40:l,f=e.deletionSpeed,d=e.omitDeletionAnimation,m=void 0!==d&&d,h=e.preRenderFirstString,p=void 0!==h&&h,y=e.wrapper,v=void 0===y?"span":y,b=e.cursor,E=void 0===b||b,g=e.style,w=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n}(e,["sequence","repeat","className","speed","deletionSpeed","omitDeletionAnimation","preRenderFirstString","wrapper","cursor","style"]),k=w["aria-label"],x=w["aria-hidden"];f||(f=s);var C=new Array(2).fill(40);[s,f].forEach((function(e,t){switch(typeof e){case"number":C[t]=Math.abs(e-100);break;case"object":var n=e,r=n.type,a=n.value;if("number"!=typeof a)break;"keyStrokeDelayInMs"===r&&(C[t]=a)}}));var N,S,L,M,P,_,A=C[0],R=C[1],I=function(e,t){void 0===t&&(t=null);var n=(0,r.useRef)(t);return(0,r.useEffect)((function(){e&&("function"==typeof e?e(n.current):e.current=n.current)}),[e]),n}(t),O="index-module_type__E-SaG";N=o?"".concat(E?O+" ":"").concat(o):E?O:"",S=(0,r.useRef)((function(){var e,t=n;return a===1/0?e=i:"number"==typeof a&&(t=Array(1+a).fill(n).flat()),i.apply(void 0,u(u([I.current,A,R,m],c(t),!1),[e],!1)),function(){I.current}})),L=(0,r.useRef)(),M=(0,r.useRef)(!1),P=(0,r.useRef)(!1),_=c((0,r.useState)(0),2)[1],M.current&&(P.current=!0),(0,r.useEffect)((function(){return M.current||(L.current=S.current(),M.current=!0),_((function(e){return e+1})),function(){P.current&&L.current&&L.current()}}),[]);var j=v,q=p?n.find((function(e){return"string"==typeof e}))||"":null;return r.createElement(j,{"aria-hidden":x,"aria-label":k,style:g,className:N,children:k?r.createElement("span",{"aria-hidden":"true",ref:I,children:q}):q,ref:k?void 0:I})})),(function(e,t){return!0}))},8822:function(e,t,n){var r=n(7294);function a(e){return r.createElement("svg",e,r.createElement("path",{d:"M11.38 2.01898C10.6431 2.7056 10.0521 3.53361 9.64219 4.4536C9.23227 5.37359 9.01185 6.36673 8.99408 7.37376C8.97632 8.38078 9.16156 9.38108 9.53877 10.315C9.91598 11.2488 10.4774 12.0972 11.1896 12.8094C11.9018 13.5216 12.7501 14.083 13.684 14.4602C14.6179 14.8374 15.6182 15.0227 16.6252 15.0049C17.6323 14.9871 18.6254 14.7667 19.5454 14.3568C20.4654 13.9469 21.2934 13.3559 21.98 12.619C21.8234 15.1591 20.7039 17.5439 18.8496 19.2871C16.9953 21.0302 14.546 22.0005 12.001 22C6.477 22 2 17.523 2 12C2 6.68498 6.146 2.33898 11.38 2.01898Z",fill:"black"}))}a.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=a,a.default=a},919:function(e,t,n){var r=n(7294);function a(e){return r.createElement("svg",e,[r.createElement("path",{d:"M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z",fill:"black",key:0}),r.createElement("path",{d:"M12 21V22M21 12H22M12 3V2M3 12H2",stroke:"black",strokeWidth:"2",strokeLinecap:"round",key:1}),r.createElement("path",{d:"M18.5 18.5L19 19M18.5 5.5L19 5M5.5 5.5L5 5M5.5 18.5L5 19",stroke:"black",strokeWidth:"2",strokeLinecap:"round",key:2})])}a.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=a,a.default=a}}]);
//# sourceMappingURL=component---src-pages-about-tsx-d804e3f9efbbbd66a661.js.map