(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[166],{7289:function(e,t,a){"use strict";a.d(t,{Z:function(){return r}});var l=a(7294),n=a(1883);var r=e=>{let{node:t}=e;const{id:a,parent:r,frontmatter:s,excerpt:c}=t,{name:o,relativePath:m}=r,{title:i,createdAt:u}=s;return l.createElement("div",{className:"style-module--container--514a1",onClick:()=>{(0,n.navigate)("/posts/"+m)}},l.createElement("div",{className:"style-module--flex--37bbb"},l.createElement("h3",{className:"style-module--title--dce33"},i||o),l.createElement("p",{className:"style-module--date--7e16c"},u)),l.createElement("p",{className:"style-module--excerpt--5fd4c"},c))}},193:function(e,t,a){"use strict";a.d(t,{$:function(){return n}});var l=a(1883);const n=()=>(0,l.useStaticQuery)("3571427910").site.siteMetadata},8642:function(e,t,a){"use strict";a.d(t,{Z:function(){return u}});var l=a(7294),n=a(1883),r="style-module--category--d0bec";function s(e,t){const a=e.name.toUpperCase(),l=t.name.toUpperCase();return a<l?-1:a>l?1:0}function c(e,t){const a=e.title.toUpperCase(),l=t.title.toUpperCase();return a<l?-1:a>l?1:0}const o=e=>{let{name:t,handleClickCategory:a}=e;return l.createElement(n.Link,{to:"/posts/"+t,activeClassName:"active",onClick:e=>{a(e,t)}},t)},m=e=>{let{posts:t}=e;return l.createElement("ul",null,t.map((e=>{return l.createElement("li",{key:e.id,className:"style-module--post--8179a"},l.createElement(n.Link,{to:"/posts/"+e.relativePath,activeClassName:"active"},(t=e.title||e.name,a=13,t.length>a?t.substring(0,a)+"...":t)));var t,a})))};var i=e=>{let{selectedCategory:t=""}=e;const a=(()=>{const e=(0,n.useStaticQuery)("2123968258"),t=[];return e.allMarkdownRemark.nodes.forEach((e=>{const{id:a,parent:l,frontmatter:n}=e,{name:r,relativePath:o}=l,{title:m}=n,i=o.split("/"),u=i[0];let d=t.find((e=>e.name===u));if(d)d.num+=1;else{const e={name:u,num:1,posts:[],subCategories:[]};t.push(e),d=e}let p=d;i.slice(1,-1).forEach((e=>{let t=p.subCategories.find((t=>t.name===e));if(t)t.num+=1;else{const a={name:e,num:1,posts:[],subCategories:[]};p.subCategories.push(a),p.subCategories.sort(s),t=a}p=t})),p.posts.push({id:a,title:m,name:r,relativePath:o}),p.posts.sort(c)})),t.sort(s),t})(),{0:i,1:u}=(0,l.useState)(t),d=(e,t)=>{1==e.detail&&e.preventDefault(),u(t)};return l.createElement("ul",{className:"style-module--container--36f8e"},a.map((e=>l.createElement("li",{key:e.name,className:r},l.createElement(o,{name:e.name,handleClickCategory:d}),l.createElement("ul",null,e.subCategories.map((e=>l.createElement("li",{key:e.name,className:r},l.createElement(o,{name:e.name,handleClickCategory:d}),l.createElement("ul",null,e.subCategories.map((e=>l.createElement("li",{key:e.name,className:r},l.createElement(o,{name:e.name,handleClickCategory:d}),i===e.name&&l.createElement(m,{posts:e.posts}))))),i===e.name&&l.createElement(m,{posts:e.posts}))))),i===e.name&&l.createElement(m,{posts:e.posts})))))};var u=e=>{let{selectedCategory:t,children:a}=e;return l.createElement("div",{className:"style-module--container--16db0"},l.createElement(i,{selectedCategory:t}),a)}},9951:function(e,t,a){"use strict";a.d(t,{Z:function(){return f}});var l={};a.r(l),a.d(l,{colorPicker:function(){return o},container:function(){return m}});var n=a(7294),r=a(1883),s="style-module--nav-link-text--1f74e",c=a(193),o="style-module--color-picker--4c5e0",m="style-module--container--ca8f7",i=a(919),u=a.n(i),d=a(8822),p=a.n(d);var E=()=>{const{0:e,1:t}=(0,n.useState)("light"),a=document.querySelector(":root");(0,n.useEffect)((()=>{let e=localStorage.getItem("main-color");e?a.style.setProperty("--main-color",e):e=getComputedStyle(a).getPropertyValue("--main-color"),document.querySelector("#color-picker").value=e}),[]);(0,n.useEffect)((()=>{const e=window.matchMedia("(prefers-color-scheme: dark)"),a=e=>{t(e.matches?"dark":"light")};return e.addEventListener("change",a),()=>{e.removeEventListener("change",a)}}),[]);return(0,n.useEffect)((()=>{"dark"===e?a.classList.add("dark"):a.classList.remove("dark")}),[e]),n.createElement("div",{className:m},n.createElement("input",{id:"color-picker",className:o,type:"color",onChange:e=>{a.style.setProperty("--main-color",e.target.value),localStorage.setItem("main-color",e.target.value)}}),n.createElement("div",{className:l.theme+" "+l[e],onClick:()=>{t((e=>"light"===e?"dark":"light"))}},"dark"===e?n.createElement(u(),null):n.createElement(p(),null)))};var k=()=>{const{author:e}=(0,c.$)();return n.createElement("div",{className:"style-module--nav-bar--3417e"},n.createElement(r.Link,{to:"/",className:s},e),n.createElement(E,null),n.createElement("nav",null,n.createElement("ul",{className:"style-module--nav-links--64532"},n.createElement("li",null,n.createElement(r.Link,{to:"/",className:s},"Home")),n.createElement("li",null,n.createElement(r.Link,{to:"/about",className:s},"About")),n.createElement("li",null,n.createElement(r.Link,{to:"/posts",className:s},"Posts")))))};var f=e=>{let{children:t}=e;return n.createElement("div",{className:"style-module--container--24ac7"},n.createElement(k,null),t)}},1346:function(e,t,a){"use strict";a.r(t),a.d(t,{Head:function(){return o},default:function(){return c}});var l=a(7294),n=a(9951),r=a(8642),s=a(7289);var c=e=>{let{pageContext:t,data:a}=e;return l.createElement(n.Z,null,l.createElement(r.Z,{selectedCategory:t.name},l.createElement("div",{className:"style-module--post-list--06c34"},a.allMarkdownRemark.nodes.map((e=>l.createElement(s.Z,{key:e.id,node:e}))))))};const o=()=>l.createElement("title",null,"Post Group Page")},8822:function(e,t,a){var l=a(7294);function n(e){return l.createElement("svg",e,l.createElement("path",{d:"M11.38 2.01898C10.6431 2.7056 10.0521 3.53361 9.64219 4.4536C9.23227 5.37359 9.01185 6.36673 8.99408 7.37376C8.97632 8.38078 9.16156 9.38108 9.53877 10.315C9.91598 11.2488 10.4774 12.0972 11.1896 12.8094C11.9018 13.5216 12.7501 14.083 13.684 14.4602C14.6179 14.8374 15.6182 15.0227 16.6252 15.0049C17.6323 14.9871 18.6254 14.7667 19.5454 14.3568C20.4654 13.9469 21.2934 13.3559 21.98 12.619C21.8234 15.1591 20.7039 17.5439 18.8496 19.2871C16.9953 21.0302 14.546 22.0005 12.001 22C6.477 22 2 17.523 2 12C2 6.68498 6.146 2.33898 11.38 2.01898Z",fill:"black"}))}n.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=n,n.default=n},919:function(e,t,a){var l=a(7294);function n(e){return l.createElement("svg",e,[l.createElement("path",{d:"M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z",fill:"black",key:0}),l.createElement("path",{d:"M12 21V22M21 12H22M12 3V2M3 12H2",stroke:"black",strokeWidth:"2",strokeLinecap:"round",key:1}),l.createElement("path",{d:"M18.5 18.5L19 19M18.5 5.5L19 5M5.5 5.5L5 5M5.5 18.5L5 19",stroke:"black",strokeWidth:"2",strokeLinecap:"round",key:2})])}n.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=n,n.default=n}}]);
//# sourceMappingURL=component---src-templates-post-group-index-tsx-03b01d2df63d615477d6.js.map