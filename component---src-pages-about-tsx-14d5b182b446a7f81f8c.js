"use strict";(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[49],{559:function(e,t,n){var r=n(7294);t.Z=e=>{let{phrases:t,speed:n=5,style:s={},pause:a=2e3,isInfinite:o=!1}=e;const l=(0,r.useRef)(null);return(0,r.useEffect)((()=>{const e=l.current;if(!e)return;e.textContent="";let r=0,s=0,c=null;function i(){e.style.setProperty("--cursor-opacity",1);const n=t[r];if(s<n.length)e.textContent+=n[s++];else{if(r<t.length-1)return r++,s=0,void u();if(o)return r=0,s=0,void u();e.style.setProperty("--cursor-opacity",0),c&&clearInterval(c)}}function u(){e.style.setProperty("--cursor-opacity",0),c&&clearInterval(c),setTimeout((()=>{e.innerText="",c=setInterval(i,1e3/n)}),a)}return c=setInterval(i,1e3/n),()=>{console.log("interval",c),c&&clearInterval(c)}}),[t,n,a,o]),r.createElement("span",{ref:l,className:"type-animation",style:s})}},7159:function(e,t,n){n.r(t),n.d(t,{Head:function(){return i},default:function(){return c}});var r=n(7294);var s=e=>{let{color:t,phrase:n,direction:s="right",rotationDeg:a=0,speed:o=1}=e;const l=(0,r.useRef)(null),c=(0,r.useRef)(null),i=(0,r.useRef)(0);return(0,r.useEffect)((()=>{const e=l.current,t=c.current;let n=1;"right"===s?e.style.justifyContent="flex-end":(e.style.justifyContent="flex-start",n=-1),e.style.setProperty("--rotate-deg",a+"deg");let r=null;const u=()=>{i.current+=o,i.current>t.scrollWidth/2&&(t.style.transform="translateX(0)",i.current=0),t.style.transform="translateX("+n*i.current+"px)",r=window.requestAnimationFrame(u)};return u(),()=>{window.cancelAnimationFrame(r)}}),[o,s,a]),r.createElement("div",{ref:l,className:"tape "+t},r.createElement("p",{ref:c,className:"tape__text"},(n+"    ").repeat(20)))},a=n(2356);var o=()=>{const{theme:e}=r.useContext(a.Ni);return r.createElement("div",{className:"about-me"},r.createElement(s,{color:"white",phrase:"coming soon",rotationDeg:10}),r.createElement(s,{color:"black",phrase:"Lorem ipsum",rotationDeg:-15,direction:"left"}),r.createElement(s,{color:"white",phrase:"coming soon",rotationDeg:5}),r.createElement("p",{className:"about-me__text "+e},"About Me"))},l=n(559);var c=()=>r.createElement("div",{className:"about--layout"},r.createElement("div",{className:"about__typing"},r.createElement(l.Z,{phrases:["Hi, I'm Front Dev. Byongho!","I'm Working on this Blog."],speed:7,pause:2e3,isInfinite:!0})),r.createElement(o,null));const i=()=>r.createElement("title",null,"About Page")}}]);
//# sourceMappingURL=component---src-pages-about-tsx-14d5b182b446a7f81f8c.js.map