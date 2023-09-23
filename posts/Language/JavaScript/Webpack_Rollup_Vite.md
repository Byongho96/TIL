---
title: 'Webpack vs Rollup vs Vite 비교 분석'
updatedAt: '2023-09-10'
createdAt: '2023-09-10'
isCompleted: true
tags: ['Webpack', 'Rollup', 'Vite', '번들러']
reference:
---

# 1. 번들러

## 1.1. 번들러란?

[웹팩 공홈](https://webpack.js.org/)에 들어가면 있는 아래 그림이 번들러를 가장 잘 표현한 것 같다.

<img src="./images/webpack.png" alt="webpack.png" width=700/>

**번들러는 자바스크립트 코드의 모듈관계를 분석하여 하나의 자바스크립트 파일로 만들어준다.** 쉽게 말해 내가 참조한 자바스크립트 파일을 다 끌고와 하나의 파일에 쑤셔박는거다. 쑤셔박는다고 표현했지만, 그 복잡한 모듈 의존성을 어떻게 분석하는 것인지 참 신기하다.

css, html, 그리고 각종 미디어 파일은 들러리일 뿐이다. '자바스크립트 코드 번들링하는 김에 너도 해줄게!' 이런 느낌이다. 때문에 css파일이나 미디어 파일을 번들링하기 위해서는, 대부분의 경우 별도의 로더를 번들러에 추가해줘야 한다.

## 1.2. 번들러의 아주 간단한 역사

- **Grunt, Gulp, Google Closure Compiler**  
  이것들은 <b>빌드도구 혹은 태스크 러너(task runner)</b>로 출발했다. 복사, 압축, 최적화, 테스트, CSS 전처리 등의 빌드를 위한 작업을 수행한다. 이러한 작업들이 현대의 번들러에 모두 흡수되었다.

- **Browserify (2011)**  
  **최초의 번들러**라고 할 수 있다. commonJS가 자바스크립트의 대표 모듈 시스템이 되어 클라이언트측이 발만 동동 구르고 있을 때, '클라이언트측을 위한 모듈 시스템이 없다면 걍 하나로 합쳐버리면 되지!'라는 혁신적인 아이디어와 함께 등장했다. 현재 번들러와 개념이 거의 동일하다.  
   ES6의 등장으로 브라우저에서도 공식적으로 모듈시스템을 지원할 수 있게 되었지만, 여러개의 모듈을 네트워크를 통해 비동기적으로 로드하는 것은 비효율적이기 때문에 여전히 번들러가 사용된다.

- **Webpack (2012)**  
  **가장 대표적인 번들러**이다. 풍부한 생태계와 그에 따른 다양한 플러그인을 가진다. 따라서 세세한 커스터마이징 및 안정적인 번들링 작업을 수행할 수 있다.

- **Rollup, Snowpack, Parcel**  
  웹팩과는 각기 다른 장단점으로 선호되는 번들러들이다. 어디서 webpack이 번들러의 춘추전국시대를 마무리 지었다는 글을 보았는데, 내 생각에는 반대 같다.

- **esbuild(2020)**  
  esbuild는 아직 공식적인 v1.0이 나오지 않았음에도, 엄청나게 빠른 빌드 속도로 주목을 받고 있다. Go언어로 작성되어 멀티스레드를 사용하기 때문에 JavaScript로 작성된 다른 빌드도구보다 월등히 빠른 속도를 자랑한다.

# 2. Webpack vs Rollup

<img src="./images/rollup-vs-webpack.png" alt="rollup-vs-webpack.png" width=600/>

니중에 설명하겠지만 Vite는 하나의 번들러라고 할 수 없다. 따라서 이 절에서는 Webpack과 Rollup 만을 비교한다.

## 2.1. 개요

Webpack과 Rollup 모두 인기있는 번들러이고, 적절하게 설정해주면 **어떤 번들러로든 원하는 결과물**을 얻을 수 있다. 다만 설계된 방식에 따라 **장단점의 경향세가 있을 뿐**이다. [여기](https://bundlers.tooling.report/)에 가면, 기능에 따라 각 번들러의 평가 지표를 볼 수 있다.

그래서 결론만 말하면, 어플리케이션 만들 땐 webpack으로 빌드하고, 라이브러리 만들 땐 rollup으로 빌드하는게 통상적이란다.

## 2.2. 비교

Alexey님의 [Head-to-Head: Rollup vs Webpack Analysis](https://moiva.io/?npm=rollup+webpack#:~:text=Rollup%20is%20generally%20faster%20than,build,%20especially%20for%20larger%20projects.)글을 아주 많이 참조해서 작성했다.

- **설정**  
  웹팩이 보다 다양하고 복잡한 기능을 제공하는 만큼 설정이 더 복잡하다. 반면, 롤업은 단순성에 중점을 두기 때문에 더 간편한게 설정할 수 있다.
- **번들 사이즈**  
  일반적으로 롤업이 웹팩에 비해 더 작은 번들 크기를 생성한다. 이는 롤업이 보다 더 뛰어난 트리쉐이킹 기능을 제공하기 때문이다.
- **코드 분할**  
  웹팩이 더 뛰어난 코드분할 기능을 제공한다. 롤업 또한 코드 분할 기능이 있지만 웹팩에 비해 제한적이다.
- **모듈 시스템**  
  웹팩은 다양한 모듈 시스템과 호환된다. 롤업은 ESM모듈에 더 특화되어 있지만, 플러그인을 설치해서 다른 모듈 시스템과도 호환 가능하다.
- **빌드 속도**  
  일반적으로 롤업이 웹팩보다 빌드 시간이 빠릅니다. 이는 롤업의 빌드 프로세스가 더 간단하기 때문이다.

# 3. Vite

<img src="./images/vite3.png" alt="vite3.png" width=500/>

**Vite는 빌드도구로 번들링을 위해 번들러를 사용한다.** 개발 서버를 제공하기 위해서는 esbuild를 사용하고, 배포를 위한 빌드에는 rollup을 사용한다.

## 3.2. Vite 개발 서버

Vite는 매우 특이한 동작으로 빠르게 개발 서버를 제공한다.

### 3.2.1. 브라우저 모듈 시스템

Vite는 개발서버를 제공하기 위해서, 기존에 우리가 생각했던 번들링 작업을 수행하지 않는다. 대신 브라우저의 모듈 시스템 기능을 사용한다.

  <img src="./images/browser-esm.png" alt="browser-esm.png" width=500/>

ECMAScript가 ESM을 발표한 이 후, 모든 브라우저가 모듈시스템을 지원하기 시작했다. 그럼에도 이 모듈 시스템을 이용하는 대신, 번들링을 하는 이유는 네트워크 비용을 아끼기 위해서이다. 그런데 어차피 로컬에서 띄우는 개발서버라면 굳이 네트워크 비용을 생각할 필요 없다. 파일 시스템에서 읽는 것마냥 매우 빠르게 제공할 수 있기 때문이다.

그러한 이유로 **Vite는 개발서버를 위해 기존의 번들링 작업을 진행하지 않는다.** 최초 진입점만 알려주고, 브라우저 자체 모듈 시스템 기능에 맡기는 것이다.

### 3.2.2 사전 번들링 작업

그러나 개발서버를 띄우기 전에, **esbuild로 사전 번들링이라는 최소한의 작업**을 수행한다.

- **ESM 모듈화**  
  브라우저는 ESM 모듈만을 지원한다. 하지만 많은 라이브러리들이 commonJS 방식으로 작성되었다. 따라서 번들리없이 브라우저의 모듈시스템을 사용하기 위해서는 commonJS로 선언된 모듈들을 ESM모듈 형식으로 바꾸는 작업이 선행되어야 한다.

- **모듈 단순화**  
   많은 내부 모듈을 하나의 모듈로 단순화한다. 아무리 로컬 서버에서 모듈을 로드한다고 해도 지나치게 많은 비동기 요청은 성능을 저하시킨다. 대표적으로 `lodash-es`라이브러리의 경우 내부모듈이 600개이기 때문에, 그냥 사용할 경우 600번의 HTTP요청이 발생한다. 이러한 모듈을 하나의 모듈로 단순화하면 큰 성능향상을 기대할 수 있다.

## 3.2. Vite 배포 번들링

배포 시에는, **우리가 아는 그 번들링 작업을 Rollup으로 수행**한다. Rollup으로도 충분한 설정이 가능하다고 판단한 것 같다.

'왜 esbuild를 사용하지 않냐?'는 문의가 있었던 것 같은데, 아직 esbuild가 다양한 애플리케이션 빌드를 지원할만큼 충분히 성장하지 않았기 때문인 것 같다. 추후 esbuild가 충분히 성장하면 적용할 것이라고 [공식문서](https://ko.vitejs.dev/guide/why.html#why-not-bundle-with-esbuild)에 적혀있다.

# 4. 참고자료

- [Vite: Vite를 사용해야 하는 이유](https://ko.vitejs.dev/guide/why.html)
- [Vite: Dependency Pre-bundling](https://vitejs.dev/guide/dep-pre-bundling.html)
- [Head-to-Head: Rollup vs Webpack Analysis](https://moiva.io/?npm=rollup+webpack#:~:text=Rollup%20is%20generally%20faster%20than,build%2C%20especially%20for%20larger%20projects.)
- [지그재그의 개발 블로그: JavaScript 번들러로 본 조선시대 붕당의 이해](https://yozm.wishket.com/magazine/detail/1261/)
- [Tooling.Report](https://bundlers.tooling.report/)
