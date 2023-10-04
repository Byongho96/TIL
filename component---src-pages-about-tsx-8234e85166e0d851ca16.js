(self.webpackChunkbyongho_s_til=self.webpackChunkbyongho_s_til||[]).push([[49],{559:function(e,t,n){"use strict";var l=n(7294);t.Z=e=>{let{phrases:t,speed:n=5,style:a={},pause:r=2e3,isInfinite:c=!1}=e;const s=(0,l.useRef)(null);return(0,l.useEffect)((()=>{const e=s.current;if(!(e instanceof HTMLParagraphElement))return;e.textContent="";let l=0,a=0,o=null;const i=function(){e.style.setProperty("--cursor-opacity",1);const n=t[l];if(a<n.length)e.textContent+=n[a++];else{if(l<t.length-1)return l++,a=0,void u();if(c)return l=0,a=0,void u();e.style.setProperty("--cursor-opacity",0),o&&clearInterval(o)}},u=function(){e.style.setProperty("--cursor-opacity",0),o&&clearInterval(o),setTimeout((()=>{e.innerText="",o=setInterval(i,1e3/n)}),r)};return o=setInterval(i,1e3/n),()=>{o&&clearInterval(o)}}),[t,n,r,c]),l.createElement("p",{ref:s,className:"type-animation",style:a})}},4194:function(e,t,n){"use strict";n.r(t),n.d(t,{Head:function(){return g},default:function(){return d}});var l=n(7294),a=n(8032),r=n(559);var c=()=>l.createElement("article",{className:"about-blog"},l.createElement("section",{className:"about-blog__header"},l.createElement("h1",{className:"about-blog__header__title"},"About Blog"),l.createElement("a",{href:"/TIL/posts/Gatsby/",className:"about-blog__header__typing",tabIndex:-1},l.createElement(r.Z,{phrases:["블로그 제작 시리즈 Click Here!"]}))),l.createElement("section",{className:"about-blog__content"},l.createElement("h2",null,"기획 배경"),l.createElement("div",null,l.createElement("p",null,"SSAFY에서 TIL을 작성하라는 강권에 못이겨 껍데기같은 문서들을 싸내려가기 시작했다. 그런데 그것도 꽤 쌓이니까 뿌듯해서 남들에게 보여주고 싶었다. 마침 교육도 끝나서 시간이 남는터라 직접 블로그를 만들기로 했다. 원래는 상남자답게 바닐라 자바스크립트로 만들려했는데, 5시간만에 포기하고 Gatsby로 갈아탔다."))),l.createElement("section",{className:"about-blog__content"},l.createElement("h2",null,"쓰인 기술"),l.createElement("h3",null,"Gatsby"),l.createElement("div",null,l.createElement("p",null,"바닐라 자바스크립트에 손사래를 치고 방황하고 있을 때, 마치 누군가 나를 위해 준비한 동앗줄 같았다. 공식문서의 튜토리얼부터 '마크다운 파일로 블로그 만들기'이다. 그렇다고 모든 과정이 생각처럼 쉽게 풀린 것은 아니었지만, 여전히 새 프레임워크를 적용한 것 치고는 수월하게 블로그를 만든 것 같다. Next.js로 만들껄...")),l.createElement("h3",null,"GraphQL"),l.createElement("div",null,l.createElement("p",null,"Gatsby를 선택하니까 GraphQL이라는게 자매상품처럼 딸려왔다. Gatsby의 플러그인과 결합해서 파일 시스템으로부터 자동으로 GraphQL 노드를 생성한다. 덕분에 손쉽게 블로그를 만들 수 있었다. 말은 이렇게 했는데, 솔직히 지금도 녀석의 정체를 잘 모르겠다. 실제 백엔드 프레임워크에 GraphQL을 적용해봐야지 감이 올 것 같다.")),l.createElement("h3",null,"Sass & CSS BEM"),l.createElement("div",null,l.createElement("p",null,"Sass와 CSS BEM 네이밍 규칙을 적용했다. BEM 네이밍을 쓰니까 뭔가 있어보여서 기분이 좋다. 그런데 지금 보니까 너무 남발해서 도대체 무슨 클래스인지 나조차도 모르겠다. 이제는 신 만이 아실 것이다."))),l.createElement("section",{className:"about-blog__content"},l.createElement("h2",null,"블로그 특징"),l.createElement("h3",null,"전형적인 반응형 UI"),l.createElement(a.S,{src:"../../assets/images/mockup.png",alt:"profile image",__imageData:n(2462)}),l.createElement("div",null,l.createElement("p",null,'"3단 메뉴바 형식 너무 식상하지 않음?" 이라고 나도 생각했다. 그런데 곰곰히 생각해보니 그 식상한 걸 구현해본 적이 없더라. 그래서 이번에 한 번 구현해보기로 했다. 반응형 UI도 4가지 기기에 따라 구현했는데 심히 노가다스러웠다. 현업에서도 이렇게 하는지가 궁금하다.')),l.createElement("h3",null,"메인 컬러 커스텀"),l.createElement("div",null,l.createElement("p",null,"네비게이션바 왼쪽 상단에서 메인 컬러를 커스텀할 수 있다. 메인컬러를 CSS 변수로 사용하기 때문에 이곳저곳의 색깔이 죄다 바뀐다. 그런데 사실 고백하자면, CSS 변수를 이번에 처음 알게되었다. 사람이 이래서 기본기를 착실하게 다져야한다.")),l.createElement("h3",null,"다크 모드"),l.createElement("div",null,l.createElement("p",null,"나름 다크모드를 설계하는데 공을 들였다. prefers-color-scheme 미디어 쿼리랑 세션 스토리지를 혼용했는데, 그럼에도 flicker 현상을 막을 방법은 찾지 못했다. SSG방식의 웹사이트에서 flicker 현상을 막는 방법을 아시면 제발 메일로 알려줬으면 좋겠다.")),l.createElement("h3",null,"검색 기능"),l.createElement("div",null,l.createElement("p",null,"fuse.js를 기반으로 만들어진 gatsby-plugin-fusejs를 이용해서 구현했다. 원래 단순히 반복문으로 구현할 생각이었는데, 하마터면 시간과 효율 모두 놓칠 뻔했다. 자체적으로 인덱스 트리를 만들기 때문에 유사 검색도 가능한데, 원리는 잘 모르겠고 아무튼 신기하다.")),l.createElement("h3",null,"댓글 및 좋아요"),l.createElement("div",null,l.createElement("p",null,"giscus라는 Git API 기반 라이브러리를 이용해서 구현했다. 서버가 없어서 당연히 댓글 기능 같은 건 구현 못할 줄 알았는데, 다른 개발자들이 다 방법을 만들어놓았다."))),l.createElement("section",{className:"about-blog__content"},l.createElement("h2",null,"개발 후기"),l.createElement("div",null,l.createElement("p",null,"전체적으로 기본기를 다질 수 있던 프로젝트였다고 생각한다. 반응형 UI, SVG 애니메이션, 웹 접근성, SEO 등을 공부하고 적용했다. 물론 그것도 3달쯤 지나서 보니 죄다 거지같다. 그만큼 성장했다는 의미로 받아들이려고 한다."),l.createElement("p",null,"원래 목표는 많이 싼 마크다운 문서를 자랑하는 거였는데, 방문자 수를 보니 글러먹은 것 같다. 하라는 SEO는 다했는데 어디서부터 잘못된건지 도저히 모르겠다. 그럼에도 불구하고 블로그가 있으니까, 글 하나를 쓰더라도 좀 더 정성스럽게 작성하게 된다는 장점이 있다.")))),s=n(8324),o=n.n(s),i=n(6405),u=n.n(i),m=n(7677),p=n.n(m),E=n(3023),h=n(2356);var f=()=>{const{theme:e}=(0,l.useContext)(h.Ni);return l.createElement("article",{className:"about-me"},l.createElement("h1",{className:"about-me__title"},"About Me"),l.createElement("div",{className:"about-me__content"},l.createElement("div",{className:"about-me__content__image"},l.createElement(E.Z,null),l.createElement("nav",{className:"about-me__content__image__links"},l.createElement("a",{href:"https://github.com/Byongho96/","aria-label":"작성자의 깃헙"},l.createElement(o(),null)),l.createElement("a",{href:"https://www.linkedin.com/in/byongho-lee-b445ba22a","aria-label":"작성자의 링크드인"},l.createElement(p(),null)),l.createElement("a",{href:"mailto:unlike96@gmail.com","aria-label":"작성자에게 구글 메일 전송"},l.createElement(u(),null)))),l.createElement("div",{className:"about-me__content__typing"},l.createElement(r.Z,{phrases:["상상을 구현하려고 공부합니다"]})),l.createElement("div",{className:"about-me__content__writing"},l.createElement("p",null,"건축공학과 전기전자공학을 이중전공하는 패기를 부리고서는, 하라는 취직은 안하고 프로그래밍을 공부하고 있다."),l.createElement("p",null,"전공수업에서 대륙 간 해저케이블이 놓여있다는 걸 듣고, 인터넷에 흥미를 느낀게 모든 일의 발단이었다."),l.createElement("p",null,"컴퓨터만 있으면 머릿속 생각을 구현하고, 인터넷으로 전세계에 선보일 수 있다니 아무리 생각해도 치트키 같다."))))},C=n(2092);var b=e=>{let{color:t,phrase:n,direction:a="right",rotationDeg:r=0,speed:c=1}=e;const s=(0,l.useRef)(null),o=(0,l.useRef)(null),i=(0,l.useRef)(0);return(0,l.useEffect)((()=>{const e=s.current,t=o.current;if(!(e instanceof HTMLDivElement&&t instanceof HTMLSpanElement))return;let n=1;"right"===a?e.style.justifyContent="flex-end":(e.style.justifyContent="flex-start",n=-1),e.style.setProperty("--rotate-deg",r+"deg");let l=null;const u=()=>{i.current+=c,i.current>t.scrollWidth/2&&(t.style.transform="translateX(0)",i.current=0),t.style.transform="translateX("+n*i.current+"px)",l=window.requestAnimationFrame(u)};return u(),()=>{window.cancelAnimationFrame(l)}}),[c,a,r]),l.createElement("div",{ref:s,className:"tape "+t},l.createElement("span",{ref:o,className:"tape__text"},(n+"    ").repeat(20)))};var d=()=>l.createElement("div",{className:"about--layout"},l.createElement("div",{className:"about__article"},l.createElement(f,null)),l.createElement(b,{color:"white",phrase:"Why it's not working...",rotationDeg:5,direction:"right"}),l.createElement(b,{color:"black",phrase:"Why am I crying",rotationDeg:-9,direction:"left"}),l.createElement("div",{className:"about__article"},l.createElement(c,null)),l.createElement(b,{color:"white",phrase:"Why it's working...",rotationDeg:6,direction:"right"}));const g=()=>l.createElement(C.Z,{title:"TIL About Page",pathname:"/about"})},8324:function(e,t,n){var l=n(7294);function a(e){return l.createElement("svg",e,l.createElement("path",{d:"M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 14.42 2.87 18.17 6.84 19.5C7.34 19.58 7.5 19.27 7.5 19V17.31C4.73 17.91 4.14 15.97 4.14 15.97C3.68 14.81 3.03 14.5 3.03 14.5C2.12 13.88 3.1 13.9 3.1 13.9C4.1 13.97 4.63 14.93 4.63 14.93C5.5 16.45 6.97 16 7.54 15.76C7.63 15.11 7.89 14.67 8.17 14.42C5.95 14.17 3.62 13.31 3.62 9.5C3.62 8.39 4 7.5 4.65 6.79C4.55 6.54 4.2 5.5 4.75 4.15C4.75 4.15 5.59 3.88 7.5 5.17C8.29 4.95 9.15 4.84 10 4.84C10.85 4.84 11.71 4.95 12.5 5.17C14.41 3.88 15.25 4.15 15.25 4.15C15.8 5.5 15.45 6.54 15.35 6.79C16 7.5 16.38 8.39 16.38 9.5C16.38 13.32 14.04 14.16 11.81 14.41C12.17 14.72 12.5 15.33 12.5 16.26V19C12.5 19.27 12.66 19.59 13.17 19.5C17.14 18.16 20 14.42 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z",fill:"black"}))}a.defaultProps={width:"20",height:"20",viewBox:"0 0 20 20",fill:"none"},e.exports=a,a.default=a},6405:function(e,t,n){var l=n(7294);function a(e){return l.createElement("svg",e,l.createElement("path",{d:"M24 3.45709V17.3661C24 18.2701 23.268 19.0021 22.364 19.0021H18.545V9.73009L12 14.6401L5.455 9.73009V19.0031H1.636C1.42107 19.0031 1.20825 18.9607 1.0097 18.8785C0.811145 18.7962 0.63075 18.6756 0.47882 18.5236C0.32689 18.3715 0.206404 18.1911 0.124246 17.9925C0.0420884 17.7939 -0.000131068 17.581 3.05652e-07 17.3661V3.45709C3.05652e-07 1.43409 2.309 0.27909 3.927 1.49309L5.455 2.64009L12 7.54809L18.545 2.63809L20.073 1.49309C21.69 0.280089 24 1.43409 24 3.45709Z",fill:"black"}))}a.defaultProps={width:"24",height:"20",viewBox:"0 0 24 20",fill:"none"},e.exports=a,a.default=a},7677:function(e,t,n){var l=n(7294);function a(e){return l.createElement("svg",e,l.createElement("path",{d:"M16 0C16.5304 0 17.0391 0.210714 17.4142 0.585786C17.7893 0.960859 18 1.46957 18 2V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H16ZM15.5 15.5V10.2C15.5 9.33539 15.1565 8.5062 14.5452 7.89483C13.9338 7.28346 13.1046 6.94 12.24 6.94C11.39 6.94 10.4 7.46 9.92 8.24V7.13H7.13V15.5H9.92V10.57C9.92 9.8 10.54 9.17 11.31 9.17C11.6813 9.17 12.0374 9.3175 12.2999 9.58005C12.5625 9.8426 12.71 10.1987 12.71 10.57V15.5H15.5ZM3.88 5.56C4.32556 5.56 4.75288 5.383 5.06794 5.06794C5.383 4.75288 5.56 4.32556 5.56 3.88C5.56 2.95 4.81 2.19 3.88 2.19C3.43178 2.19 3.00193 2.36805 2.68499 2.68499C2.36805 3.00193 2.19 3.43178 2.19 3.88C2.19 4.81 2.95 5.56 3.88 5.56ZM5.27 15.5V7.13H2.5V15.5H5.27Z",fill:"black"}))}a.defaultProps={width:"18",height:"18",viewBox:"0 0 18 18",fill:"none"},e.exports=a,a.default=a},2462:function(e){"use strict";e.exports=JSON.parse('{"layout":"constrained","backgroundColor":"#c8c8c8","images":{"fallback":{"src":"/TIL/static/60b1e2d55ca50451c023199c81357017/54810/mockup.png","srcSet":"/TIL/static/60b1e2d55ca50451c023199c81357017/2512b/mockup.png 750w,\\n/TIL/static/60b1e2d55ca50451c023199c81357017/ce246/mockup.png 1500w,\\n/TIL/static/60b1e2d55ca50451c023199c81357017/54810/mockup.png 3000w","sizes":"(min-width: 3000px) 3000px, 100vw"},"sources":[{"srcSet":"/TIL/static/60b1e2d55ca50451c023199c81357017/80f13/mockup.webp 750w,\\n/TIL/static/60b1e2d55ca50451c023199c81357017/faf18/mockup.webp 1500w,\\n/TIL/static/60b1e2d55ca50451c023199c81357017/abec5/mockup.webp 3000w","type":"image/webp","sizes":"(min-width: 3000px) 3000px, 100vw"}]},"width":3000,"height":1800}')}}]);
//# sourceMappingURL=component---src-pages-about-tsx-8234e85166e0d851ca16.js.map