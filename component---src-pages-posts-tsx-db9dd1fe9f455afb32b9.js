"use strict";(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[754],{7254:function(e,t,n){var r=n(7294),s=n(1883);t.Z=e=>{let{node:t}=e;const{id:n,parent:l,frontmatter:a,excerpt:o}=t,{name:c,relativePath:i}=l,{title:u,createdAt:m}=a;return r.createElement("article",{className:"post-item",onClick:()=>{(0,s.navigate)("/posts/"+i)}},r.createElement("div",{className:"post-item--flex"},r.createElement("h1",{className:"post-item__title"},u||c),r.createElement("span",{className:"post-item__date"},m)),r.createElement("p",{className:"post-item__excerpt"},o))}},559:function(e,t,n){var r=n(7294);t.Z=e=>{let{phrases:t,speed:n=5,style:s={},pause:l=2e3,isInfinite:a=!1}=e;const o=(0,r.useRef)(null);return(0,r.useEffect)((()=>{const e=o.current;if(!e)return;e.textContent="";let r=0,s=0,c=null;function i(){e.style.setProperty("--cursor-opacity",1);const n=t[r];if(s<n.length)e.textContent+=n[s++];else{if(r<t.length-1)return r++,s=0,void u();if(a)return r=0,s=0,void u();e.style.setProperty("--cursor-opacity",0),c&&clearInterval(c)}}function u(){e.style.setProperty("--cursor-opacity",0),c&&clearInterval(c),setTimeout((()=>{e.innerText="",c=setInterval(i,1e3/n)}),l)}return c=setInterval(i,1e3/n),()=>{c&&clearInterval(c)}}),[t,n,l,a]),r.createElement("span",{ref:o,className:"type-animation",style:s})}},1027:function(e,t,n){n.r(t),n.d(t,{Head:function(){return u},default:function(){return i}});var r=n(7294),s=n(7254),l=n(6438),a=n(559);var o=function(e){let{ref:t,isEnd:n,loadMore:s}=e;const l=()=>{const e=t.current?t.current:document.documentElement,{scrollTop:n,scrollHeight:r,clientHeight:l}=e;r-n-l>5||s()};(0,r.useEffect)((()=>{t.current;if(!n)return window.addEventListener("scroll",l),()=>{window.removeEventListener("scroll",l)}}),[t,n,l])},c=n(7732);var i=e=>{let{data:t}=e;const{0:n,1:i}=(0,r.useState)(5),u=(0,r.useRef)(null),m=(0,r.useMemo)((()=>t.allMarkdownRemark.nodes.slice(0,n+1)),[n]),p=(0,r.useMemo)((()=>n>=t.allMarkdownRemark.nodes.length-1),[n]);return o({ref:u,isEnd:p,loadMore:()=>{i((e=>e+5))}}),r.createElement(c.Z,null,r.createElement("main",{className:"posts--layout"},r.createElement("div",{className:"posts__category"},r.createElement(a.Z,{phrases:["All the Posts"]})),r.createElement("section",{className:"posts__post-list"},m.map((e=>r.createElement(s.Z,{key:e.id,node:e}))))),r.createElement(l.Z,null))};const u=()=>r.createElement("title",null,"Post Page")}}]);
//# sourceMappingURL=component---src-pages-posts-tsx-db9dd1fe9f455afb32b9.js.map