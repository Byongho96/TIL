"use strict";(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[754],{7289:function(e,t,l){l.d(t,{Z:function(){return r}});var n=l(7294),a=l(1883);var r=e=>{let{node:t}=e;const{id:l,parent:r,frontmatter:s,excerpt:c}=t,{name:o,relativePath:u}=r,{title:m,createdAt:d}=s;return n.createElement("div",{className:"style-module--container--514a1",onClick:()=>{(0,a.navigate)("/posts/"+u)}},n.createElement("div",{className:"style-module--flex--37bbb"},n.createElement("h3",{className:"style-module--title--dce33"},m||o),n.createElement("p",{className:"style-module--date--7e16c"},d)),n.createElement("p",{className:"style-module--excerpt--5fd4c"},c))}},9762:function(e,t,l){l.d(t,{Z:function(){return a}});var n=l(7294);var a=e=>{let{phrase:t,speed:l,isInfinite:a=!1,cursorColor:r="#000000"}=e;const s=(0,n.useRef)(null);return(0,n.useEffect)((()=>{let e=0;const n=s.current,r=setInterval((()=>{n.textContent+=t[e++],e>t.length-1&&(a?(e=0,n.textContent=""):clearInterval(r))}),1e3/l);return()=>{clearInterval(r)}}),[]),n.createElement("span",{ref:s,className:"style-module--typing--4294b",style:{"--cursor-color":r}})}},3993:function(e,t,l){l.r(t),l.d(t,{Head:function(){return u},default:function(){return o}});var n=l(7294),a=l(2598),r=l(7289),s=l(2993),c=l(9762);var o=e=>{let{data:t}=e;return n.createElement(a.Z,null,n.createElement("div",{className:"posts-module--container--db763"},n.createElement("h1",{className:"posts-module--post-group--6038b"},n.createElement(c.Z,{phrase:"All the Posts",speed:"8",cursorColor:"#888888"})),n.createElement("div",{className:"posts-module--post-list--656a8"},t.allMarkdownRemark.nodes.map((e=>n.createElement(r.Z,{key:e.id,node:e}))))),n.createElement(s.Z,null))};const u=()=>n.createElement("title",null,"Post Page")}}]);
//# sourceMappingURL=component---src-pages-posts-tsx-d4dc32482d3b8db7cf4f.js.map