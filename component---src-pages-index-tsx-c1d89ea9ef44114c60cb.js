(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[691],{193:function(e,t,l){"use strict";l.d(t,{$:function(){return a}});var n=l(1883);const a=()=>(0,n.useStaticQuery)("3571427910").site.siteMetadata},9951:function(e,t,l){"use strict";l.d(t,{Z:function(){return f}});var n={};l.r(n),l.d(n,{colorPicker:function(){return s},container:function(){return u}});var a=l(7294),r=l(1883),c="style-module--nav-link-text--1f74e",o=l(193),s="style-module--color-picker--4c5e0",u="style-module--container--ca8f7",i=l(919),m=l.n(i),d=l(8822),E=l.n(d);var v=()=>{const{0:e,1:t}=(0,a.useState)("light");(0,a.useEffect)((()=>{const e=document.querySelector(":root");let t=localStorage.getItem("main-color");t?e.style.setProperty("--main-color",t):t=getComputedStyle(e).getPropertyValue("--main-color"),document.querySelector("#color-picker").value=t}),[]);(0,a.useEffect)((()=>{const e=window.matchMedia("(prefers-color-scheme: dark)"),l=e=>{t(e.matches?"dark":"light")};return e.addEventListener("change",l),()=>{e.removeEventListener("change",l)}}),[]);return(0,a.useEffect)((()=>{const t=document.querySelector(":root");"dark"===e?t.classList.add("dark"):t.classList.remove("dark")}),[e]),a.createElement("div",{className:u},a.createElement("input",{id:"color-picker",className:s,type:"color",onChange:e=>{document.querySelector(":root").style.setProperty("--main-color",e.target.value),localStorage.setItem("main-color",e.target.value)}}),a.createElement("div",{className:n.theme+" "+n[e],onClick:()=>{t((e=>"light"===e?"dark":"light"))}},"dark"===e?a.createElement(m(),null):a.createElement(E(),null)))};var k=()=>{const{author:e}=(0,o.$)();return a.createElement("div",{className:"style-module--nav-bar--3417e"},a.createElement(r.Link,{to:"/",className:c},e),a.createElement(v,null),a.createElement("nav",null,a.createElement("ul",{className:"style-module--nav-links--64532"},a.createElement("li",null,a.createElement(r.Link,{to:"/",className:c},"Home")),a.createElement("li",null,a.createElement(r.Link,{to:"/about",className:c},"About")),a.createElement("li",null,a.createElement(r.Link,{to:"/posts",className:c},"Posts")))))};var f=e=>{let{children:t}=e;return a.createElement("div",{className:"style-module--container--24ac7"},a.createElement(k,null),t)}},6206:function(e,t,l){"use strict";l.r(t),l.d(t,{Head:function(){return i},default:function(){return u}});var n=l(7294);var a=()=>n.createElement("div",{className:"style-module--index-logo--98cf0"},n.createElement("p",null,"TODAY"),n.createElement("p",null,"I"),n.createElement("p",null,"LEARNED")),r=l(9951),c=l(1883),o="style-module--stop--4e766";var s=()=>{const e=(0,c.useStaticQuery)("82772122").allDirectory.nodes;e.sort((()=>.5-Math.random()));return n.createElement("ul",{className:"style-module--categories--8e8ce",onMouseEnter:e=>{e.target.classList.add(o)},onMouseLeave:e=>{e.target.classList.remove(o)}},e.slice(0,15).map((e=>n.createElement("li",{key:e.id,onClick:()=>{return t=e.name,void(0,c.navigate)("/posts/"+t);var t}},e.name))))};var u=()=>n.createElement(r.Z,null,n.createElement("div",{className:"index-module--container--d86ba"},n.createElement("div",null,n.createElement(a,null)),n.createElement("div",{className:"index-module--wheel--817ae"},n.createElement(s,null))));const i=()=>n.createElement("title",null,"Home Page")},8822:function(e,t,l){var n=l(7294);function a(e){return n.createElement("svg",e,n.createElement("path",{d:"M11.38 2.01898C10.6431 2.7056 10.0521 3.53361 9.64219 4.4536C9.23227 5.37359 9.01185 6.36673 8.99408 7.37376C8.97632 8.38078 9.16156 9.38108 9.53877 10.315C9.91598 11.2488 10.4774 12.0972 11.1896 12.8094C11.9018 13.5216 12.7501 14.083 13.684 14.4602C14.6179 14.8374 15.6182 15.0227 16.6252 15.0049C17.6323 14.9871 18.6254 14.7667 19.5454 14.3568C20.4654 13.9469 21.2934 13.3559 21.98 12.619C21.8234 15.1591 20.7039 17.5439 18.8496 19.2871C16.9953 21.0302 14.546 22.0005 12.001 22C6.477 22 2 17.523 2 12C2 6.68498 6.146 2.33898 11.38 2.01898Z",fill:"black"}))}a.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=a,a.default=a},919:function(e,t,l){var n=l(7294);function a(e){return n.createElement("svg",e,[n.createElement("path",{d:"M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z",fill:"black",key:0}),n.createElement("path",{d:"M12 21V22M21 12H22M12 3V2M3 12H2",stroke:"black",strokeWidth:"2",strokeLinecap:"round",key:1}),n.createElement("path",{d:"M18.5 18.5L19 19M18.5 5.5L19 5M5.5 5.5L5 5M5.5 18.5L5 19",stroke:"black",strokeWidth:"2",strokeLinecap:"round",key:2})])}a.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=a,a.default=a}}]);
//# sourceMappingURL=component---src-pages-index-tsx-c1d89ea9ef44114c60cb.js.map