"use strict";(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[754],{7289:function(e,t,l){l.d(t,{Z:function(){return r}});var n=l(7294),a=l(1883);var r=e=>{let{node:t}=e;const{id:l,parent:r,frontmatter:s,excerpt:c}=t,{name:o,relativePath:u}=r,{title:m,createdAt:d}=s;return n.createElement("div",{className:"style-module--container--514a1",onClick:()=>{(0,a.navigate)("/posts/"+u)}},n.createElement("div",{className:"style-module--flex--37bbb"},n.createElement("h3",{className:"style-module--title--dce33"},m||o),n.createElement("p",{className:"style-module--date--7e16c"},d)),n.createElement("p",{className:"style-module--excerpt--5fd4c"},c))}},9762:function(e,t,l){l.d(t,{Z:function(){return a}});var n=l(7294);var a=e=>{let{phrases:t,speed:l,pause:a=2e3,isInfinite:r=!1}=e;const s=(0,n.useRef)(null);return(0,n.useEffect)((()=>{let e=0,n=0;const c=s.current,o=()=>{let l=t[e];if(!(n<l.length))return e<t.length-1?(n=0,e++,void u(a)):r?(n=0,e=0,void u(a)):void clearInterval(m);c.textContent+=l[n++]},u=e=>{clearInterval(m),setTimeout((()=>{c.textContent="",m=setInterval(o,1e3/l)}),e)};let m=setInterval(o,1e3/l);return()=>{clearInterval(m)}}),[]),n.createElement("span",{ref:s,className:"style-module--typing--4294b"})}},3993:function(e,t,l){l.r(t),l.d(t,{Head:function(){return u},default:function(){return o}});var n=l(7294),a=l(2598),r=l(7289),s=l(2993),c=l(9762);var o=e=>{let{data:t}=e;return n.createElement(a.Z,null,n.createElement("div",{className:"posts-module--container--db763"},n.createElement("h1",{className:"posts-module--post-group--6038b"},n.createElement(c.Z,{phrases:["All the Posts"],speed:"8"})),n.createElement("div",{className:"posts-module--post-list--656a8"},t.allMarkdownRemark.nodes.map((e=>n.createElement(r.Z,{key:e.id,node:e}))))),n.createElement(s.Z,null))};const u=()=>n.createElement("title",null,"Post Page")}}]);
//# sourceMappingURL=component---src-pages-posts-tsx-f2554f617b48cde9423b.js.map