"use strict";(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[215],{2092:function(e,t,r){var n=r(7294),a=r(193);t.Z=e=>{let{title:t,description:r,pathname:o,children:c}=e;const{title:l,description:s,image:i,siteUrl:d}=(0,a.$)(),m={title:t||l,description:r||s,image:""+d+i,url:""+d+(o||"")};return n.createElement(n.Fragment,null,n.createElement("title",null,m.title),n.createElement("meta",{name:"description",content:m.description}),n.createElement("meta",{name:"image",content:m.image}),n.createElement("meta",{property:"og:type",content:"website"}),n.createElement("meta",{property:"og:url",content:m.url}),n.createElement("meta",{property:"og:title",content:m.title}),n.createElement("meta",{property:"og:description",content:m.description}),n.createElement("meta",{property:"og:site_name",content:l}),n.createElement("meta",{property:"og:locale",content:"ko_KR"}),n.createElement("meta",{property:"og:image",content:m.image}),n.createElement("meta",{property:"og:image:width",content:"1200"}),n.createElement("meta",{property:"og:image:height",content:"630"}),c)}},8644:function(e,t,r){r.r(t),r.d(t,{Head:function(){return o}});var n=r(7294),a=r(2092);t.default=()=>n.createElement(c,{backgroundText:"My Bucket List",cardTexts:["Sky Diving","Korean Airline First Class","Milky Way","Nobel Prize"],primaryColor:"#e9e6d5",secondaryColor:"#2f2c25"});const o=e=>{let{location:t}=e;return n.createElement(a.Z,{title:"스크롤 3D 카드 플립 애니메이션",decription:"스크롤 3D 카드 플립 애니메이션을 확인해볼 수 있습니다.",pathname:t.pathname})},c=e=>{let{backgroundText:t="Type Your Text",cardTexts:r=["Text1","Text2","Text3","Text4"],primaryColor:a="beige",secondaryColor:o="black"}=e;const c=(0,n.useRef)(null),l=(0,n.useRef)(null),s=(0,n.useRef)(null);return(0,n.useEffect)((()=>{const e=c.current,t=r.length;if(t>4)throw new Error("cardTexts length is out of range, It should be less than 5");switch(t){case 1:e.style.setProperty("--card-gap","0");break;case 2:e.style.setProperty("--card-gap","20%");break;case 3:e.style.setProperty("--card-gap","11%");break;case 4:e.style.setProperty("--card-gap","1.33%")}}),[r.length]),(0,n.useEffect)((()=>{const e=c.current;e instanceof HTMLDivElement&&(e.style.setProperty("--primary-color",a),e.style.setProperty("--secondary-color",o))}),[a,o]),(0,n.useEffect)((()=>{const e=c.current,t=l.current,r=s.current,n=r.querySelectorAll(".scroll-3d-card__card");if(!(e instanceof HTMLDivElement&&t instanceof HTMLDivElement&&r instanceof HTMLDivElement))return;const a=n.length;let o=0,i=0,d=0;const m=function(){o=t.offsetTop,i=t.offsetTop+t.offsetHeight-r.offsetHeight,d=(i-o)/(2*a);const n=document.querySelector(".navbar"),c=n instanceof HTMLElement?n.offsetHeight:0;e.style.setProperty("--navbar-height",c.toString()+"px");const l=document.querySelector(".footer"),s=l instanceof HTMLElement?l.offsetHeight:0;e.style.setProperty("--footer-height",s.toString()+"px")},p=function(){const e=window.scrollY;n.forEach(((t,r)=>{const n=o+d*r,c=n+d*a,l=c+d;t.style.transform=e<n?"\n              translateX(100vw) \n              rotateY(180deg)\n            ":e<c?"\n              translateX("+(100+(e-n)/(l-n)*-100)+"vw)\n              rotateY(180deg)\n            ":e<l?"\n              translateX("+(100+(e-n)/(l-n)*-100)+"vw)\n              rotateY("+(180+-(e-c)/(l-c)*180)+"deg)\n            ":"\n              translateX(0vw) \n              rotateY(0deg)\n            "}))};return m(),window.addEventListener("scroll",p),window.addEventListener("resize",m),()=>{window.removeEventListener("scroll",p),window.removeEventListener("resize",m)}}),[]),n.createElement("div",{ref:c},n.createElement("div",{className:"scroll-3d-card__start"},"Let's Scroll"),n.createElement("div",{className:"scroll-3d-card__main-content",ref:l},n.createElement("div",{className:"scroll-3d-card--sticky",ref:s},t,n.createElement("div",{className:"scroll-3d-card__card-frame "},r.map((e=>n.createElement("div",{className:"scroll-3d-card__card"},n.createElement("div",{className:"scroll-3d-card__card--front"},e),n.createElement("div",{className:"scroll-3d-card__card--back"}))))))),n.createElement("div",{className:"scroll-3d-card__end"},"The End"))}}}]);
//# sourceMappingURL=component---src-pages-demo-scroll-3-d-card-index-tsx-4c2098b11137d51093f8.js.map