(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[382],{7484:function(e,t,a){"use strict";a.r(t);var l=a(7294),n=a(3617),r=a.n(n),s=a(5190),c=a.n(s),i=a(2689),o=a.n(i);t.default=()=>{const{0:e,1:t}=(0,l.useState)(!0),{0:a,1:n}=(0,l.useState)(!0),{0:r,1:s}=(0,l.useState)(3e3),{0:c,1:i}=(0,l.useState)(300),{0:o,1:d}=(0,l.useState)(!0);return l.createElement("div",{className:"carousel-3d-page"},l.createElement(u,{showArrows:e,showIndicators:a,interval:r,transitionTime:c,infiniteLoop:o},l.createElement("img",{src:"https://source.unsplash.com/random/?puppy",alt:"unsplash-1"}),l.createElement("img",{src:"https://source.unsplash.com/random/?mountain",alt:"unsplash-2"}),l.createElement("img",{src:"https://source.unsplash.com/random/?dog",alt:"unsplash-3"}),l.createElement("img",{src:"https://source.unsplash.com/random/?river",alt:"unsplash-4"}),l.createElement("img",{src:"https://source.unsplash.com/random/?cat",alt:"unsplash-5"}),l.createElement("img",{src:"https://source.unsplash.com/random/?ocean",alt:"unsplash-6"})),l.createElement("div",{className:"carousel-3d-page__input-form"},l.createElement("div",{className:"carousel-3d-page__input"},l.createElement("label",{htmlFor:"infinite-loop-input"},"Infinite Loop"),l.createElement("input",{type:"checkbox",id:"infinite-loop-input",name:"infinite-loop",checked:o,onChange:e=>d(e.target.checked)})),l.createElement("div",{className:"carousel-3d-page__input"},l.createElement("label",{htmlFor:"show-arrows-input"},"Show Arrows"),l.createElement("input",{type:"checkbox",id:"show-arrows-input",name:"show-arrows",checked:e,onChange:e=>t(e.target.checked)})),l.createElement("div",{className:"carousel-3d-page__input"},l.createElement("label",{htmlFor:"show-indicators-input"},"Show Indicators"),l.createElement("input",{type:"checkbox",id:"show-indicators-input",name:"show-indicators",checked:a,onChange:e=>n(e.target.checked)})),l.createElement("div",{className:"carousel-3d-page__input"},l.createElement("label",{htmlFor:"interval-input"},"Slide Interval"),l.createElement("input",{type:"range",id:"interval-input",name:"interval",min:"1000",max:"10000",step:"1000",value:r,onChange:e=>s(e.target.value)})),l.createElement("div",{className:"carousel-3d-page__input"},l.createElement("label",{htmlFor:"transition-time-input"},"Slide Transition Time"),l.createElement("input",{type:"range",id:"transition-time-input",name:"interval",min:"100",max:"1000",step:"100",value:c,onChange:e=>i(e.target.value)}))))};const u=e=>{let{children:t=[],width:a="400px",height:n="300px",autoPlay:r=!0,interval:s=3e4,transitionTime:i=300,infiniteLoop:u=!0,startIdx:m=0,showArrows:p=!0,showIndicators:h=!0}=e;const C=(0,l.useRef)(null),{0:f,1:y}=(0,l.useState)(m),g=(0,l.useMemo)((()=>t.length),[t]),E=(0,l.useCallback)((function(){y((e=>e+1>g-1?0:e+1))}),[g]),v=(0,l.useCallback)((function(){y((e=>e-1<0?g-1:e-1))}),[g]);return(0,l.useEffect)((()=>{if(!r)return;const e=setInterval((function(){f!=g-1||u?E():e&&clearInterval(e)}),s);return()=>{e&&clearInterval(e)}}),[r,s,u,f,g]),(0,l.useEffect)((()=>{const e=C.current.children;let t=(f-1)%g;t<0&&(t+=g);let a=(f-2)%g;a<0&&(a+=g);const l=(f+1)%g,n=(f+2)%g;if(g<5)for(let r=0;r<g;r++){const a=e[r];switch(r){case f:a.style.left="50%",a.style.transform="translate3d(-50%, 0, 0)",a.style.opacity="1";break;case t:a.style.left="0",a.style.transform="translate3d(0, 0, -200px) rotateY(30deg)",a.style.opacity="1";break;case l:a.style.left="100%",a.style.transform="translate3d(-100%, 0, -200px) rotateY(-30deg)",a.style.opacity="1";break;default:a.style.left="50%",a.style.transform="translate3d(-50%, 0, -400px)",a.style.opacity="0"}}else for(let r=0;r<g;r++){const s=e[r];switch(r){case f:s.style.left="50%",s.style.transform="translate3d(-50%, 0, 0)",s.style.opacity="1";break;case t:s.style.left="20%",s.style.transform="translate3d(0, 0, -200px) rotateY(30deg)",s.style.opacity="1";break;case a:s.style.left="0",s.style.transform="translate3d(0, 0, -400px) rotateY(45deg)",s.style.opacity="1";break;case l:s.style.left="80%",s.style.transform="translate3d(-100%, 0, -200px) rotateY(-30deg)",s.style.opacity="1";break;case n:s.style.left="100%",s.style.transform="translate3d(-100%, 0, -400px) rotateY(-45deg)",s.style.opacity="1";break;default:s.style.left="50%",s.style.transform="translate3d(-50%, 0, -600px)",s.style.opacity="0"}}}),[f]),l.createElement("div",{className:"carousel-3d",style:{height:n}},l.createElement("div",{className:"carousel-3d__frame",ref:C},t.map(((e,t)=>l.createElement("div",{className:"carousel-3d__frame__item",key:t,style:{width:a,height:n,transition:"all "+i+"ms ease-in-out"}},e)))),p&&l.createElement(l.Fragment,null,l.createElement("div",{className:"carousel-3d__direction left",onClick:v},l.createElement(c(),null)),l.createElement("div",{className:"carousel-3d__direction right",onClick:E},l.createElement(o(),null))),h&&l.createElement(d,{length:g,selectedIdx:f,onClick:e=>y(e)}))},d=e=>{let{length:t,selectedIdx:a,onClick:n}=e;return l.createElement("ul",{className:"carousel-3d__indicator"},Array.from({length:t},((e,t)=>l.createElement("li",{key:t,className:"carousel-3d__indicator__circle "+(t===a?"active":""),onClick:()=>n(t)},l.createElement(r(),null)))))}},3617:function(e,t,a){var l=a(7294);function n(e){return l.createElement("svg",e,l.createElement("path",{d:"M10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6867 3.825 17.9743 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.263333 12.6833 0.000666667 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31333 4.88333 2.02567 3.825 2.925 2.925C3.825 2.025 4.88333 1.31267 6.1 0.788C7.31667 0.263333 8.61667 0.000666667 10 0C11.3833 0 12.6833 0.262667 13.9 0.788C15.1167 1.31333 16.175 2.02567 17.075 2.925C17.975 3.825 18.6877 4.88333 19.213 6.1C19.7383 7.31667 20.0007 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6867 15.1167 17.9743 16.175 17.075 17.075C16.175 17.975 15.1167 18.6877 13.9 19.213C12.6833 19.7383 11.3833 20.0007 10 20Z",fill:"black"}))}n.defaultProps={width:"20",height:"20",viewBox:"0 0 20 20",fill:"none"},e.exports=n,n.default=n},5190:function(e,t,a){var l=a(7294);function n(e){return l.createElement("svg",e,l.createElement("g",{clipPath:"url(#clip0_19_75)"},[l.createElement("path",{id:"svg-left-path-1",fillRule:"evenodd",clipRule:"evenodd",d:"M7.94002 13.06C7.65912 12.7788 7.50134 12.3975 7.50134 12C7.50134 11.6025 7.65912 11.2213 7.94002 10.94L13.596 5.28202C13.8774 5.00076 14.259 4.8428 14.6569 4.8429C14.8539 4.84294 15.0489 4.88179 15.2309 4.95722C15.4129 5.03265 15.5783 5.14319 15.7175 5.28252C15.8568 5.42185 15.9672 5.58725 16.0426 5.76928C16.1179 5.9513 16.1567 6.14638 16.1567 6.34338C16.1566 6.54038 16.1178 6.73544 16.0423 6.91742C15.9669 7.09941 15.8564 7.26476 15.717 7.40402L11.121 12L15.717 16.596C15.8604 16.7343 15.9747 16.8998 16.0534 17.0828C16.1321 17.2657 16.1736 17.4625 16.1754 17.6617C16.1772 17.8609 16.1394 18.0584 16.064 18.2428C15.9887 18.4272 15.8774 18.5947 15.7366 18.7356C15.5958 18.8765 15.4284 18.988 15.2441 19.0635C15.0598 19.139 14.8623 19.177 14.6631 19.1754C14.464 19.1738 14.2671 19.1325 14.0841 19.0539C13.901 18.9754 13.7355 18.8612 13.597 18.718L7.93802 13.06H7.94002Z",fill:"black",key:0}),l.createElement("path",{id:"svg-left-path-2",fillRule:"evenodd",clipRule:"evenodd",d:"M7.94002 13.06C7.65912 12.7788 7.50134 12.3975 7.50134 12C7.50134 11.6025 7.65912 11.2213 7.94002 10.94L13.596 5.28202C13.8774 5.00076 14.259 4.8428 14.6569 4.8429C14.8539 4.84294 15.0489 4.88179 15.2309 4.95722C15.4129 5.03265 15.5783 5.14319 15.7175 5.28252C15.8568 5.42185 15.9672 5.58725 16.0426 5.76928C16.1179 5.9513 16.1567 6.14638 16.1567 6.34338C16.1566 6.54038 16.1178 6.73544 16.0423 6.91742C15.9669 7.09941 15.8564 7.26476 15.717 7.40402L11.121 12L15.717 16.596C15.8604 16.7343 15.9747 16.8998 16.0534 17.0828C16.1321 17.2657 16.1736 17.4625 16.1754 17.6617C16.1772 17.8609 16.1394 18.0584 16.064 18.2428C15.9887 18.4272 15.8774 18.5947 15.7366 18.7356C15.5958 18.8765 15.4284 18.988 15.2441 19.0635C15.0598 19.139 14.8623 19.177 14.6631 19.1754C14.464 19.1738 14.2671 19.1325 14.0841 19.0539C13.901 18.9754 13.7355 18.8612 13.597 18.718L7.93802 13.06H7.94002Z",fill:"black",key:1}),l.createElement("path",{id:"svg-left-path-3",fillRule:"evenodd",clipRule:"evenodd",d:"M7.94002 13.06C7.65912 12.7788 7.50134 12.3975 7.50134 12C7.50134 11.6025 7.65912 11.2213 7.94002 10.94L13.596 5.28202C13.8774 5.00076 14.259 4.8428 14.6569 4.8429C14.8539 4.84294 15.0489 4.88179 15.2309 4.95722C15.4129 5.03265 15.5783 5.14319 15.7175 5.28252C15.8568 5.42185 15.9672 5.58725 16.0426 5.76928C16.1179 5.9513 16.1567 6.14638 16.1567 6.34338C16.1566 6.54038 16.1178 6.73544 16.0423 6.91742C15.9669 7.09941 15.8564 7.26476 15.717 7.40402L11.121 12L15.717 16.596C15.8604 16.7343 15.9747 16.8998 16.0534 17.0828C16.1321 17.2657 16.1736 17.4625 16.1754 17.6617C16.1772 17.8609 16.1394 18.0584 16.064 18.2428C15.9887 18.4272 15.8774 18.5947 15.7366 18.7356C15.5958 18.8765 15.4284 18.988 15.2441 19.0635C15.0598 19.139 14.8623 19.177 14.6631 19.1754C14.464 19.1738 14.2671 19.1325 14.0841 19.0539C13.901 18.9754 13.7355 18.8612 13.597 18.718L7.93802 13.06H7.94002Z",fill:"black",key:2})]))}n.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=n,n.default=n},2689:function(e,t,a){var l=a(7294);function n(e){return l.createElement("svg",e,[l.createElement("g",{clipPath:"url(#clip0_19_79)",key:0},l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M16.06 10.94C16.3409 11.2212 16.4987 11.6025 16.4987 12C16.4987 12.3975 16.3409 12.7787 16.06 13.06L10.404 18.718C10.1226 18.9992 9.74102 19.1572 9.34316 19.1571C8.9453 19.157 8.56377 18.9989 8.28251 18.7175C8.00125 18.4361 7.84329 18.0545 7.84338 17.6566C7.84348 17.2588 8.00162 16.8772 8.28301 16.596L12.879 12L8.28301 7.40397C8.00964 7.1212 7.85827 6.74237 7.8615 6.34907C7.86473 5.95577 8.0223 5.57947 8.30028 5.30123C8.57827 5.02298 8.95441 4.86505 9.34771 4.86145C9.741 4.85785 10.12 5.00887 10.403 5.28197L16.061 10.939L16.06 10.94Z",fill:"black"})),l.createElement("defs",{key:1},l.createElement("clipPath",{id:"clip0_19_79"},l.createElement("rect",{width:"24",height:"24",fill:"white"})))])}n.defaultProps={width:"24",height:"24",viewBox:"0 0 24 24",fill:"none"},e.exports=n,n.default=n}}]);
//# sourceMappingURL=component---src-pages-demo-3-d-carousel-index-tsx-9bb3e443e9078eb11978.js.map