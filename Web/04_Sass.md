# Sass <!-- omit in toc -->

이 문서는 [Sass(SCCS) 완전 정복! - HEROPY Tech](https://heropy.blog/2018/01/31/sass/)을 참고해서 작성했습니다.

## Index <!-- omit in toc -->

- [1. 개요](#1-개요)
- [2. 문법](#2-문법)
  - [2.1. 중첩](#21-중첩)
    - [2.1.1. 부모 선택자(\&)](#211-부모-선택자)
    - [2.1.2. @at-root](#212-at-root)
    - [2.1.3. 중첩 속성](#213-중첩-속성)
  - [2.2. 변수](#22-변수)
    - [2.2.1. 변수 스코프](#221-변수-스코프)
    - [2.2.2. 변수 전역 설정(!global)](#222-변수-전역-설정global)
    - [2.2.3. 초깃값 설정(!default)](#223-초깃값-설정default)
    - [2.2.4. 변수 재할당](#224-변수-재할당)
    - [2.2.5. 문자 보간(#{})](#225-문자-보간)
  - [2.3. 가져오기](#23-가져오기)
  - [2.4. 데이터 타입](#24-데이터-타입)
  - [2.5. 연산](#25-연산)
    - [2.5.1. 산술 연산자](#251-산술-연산자)
    - [2.5.2. 비교 연산자](#252-비교-연산자)
    - [2.5.3. 논리 연산자](#253-논리-연산자)
  - [2.6. 조건과 반복](#26-조건과-반복)
    - [2.6.1. if(함수)](#261-if함수)
    - [2.6.2. @if](#262-if)
    - [2.6.3. @for](#263-for)
    - [2.6.4. @each](#264-each)
    - [2.6.5. @while](#265-while)
  - [2.7. 믹스인(Mixin)](#27-믹스인mixin)
    - [2.7.1. 선언(@mixin)과 사용(@include)](#271-선언mixin과-사용include)
    - [2.7.2. 인자(Argument)](#272-인자argument)
    - [2.7.3. 스타일 블록 전달(@content)](#273-스타일-블록-전달content)
  - [2.8. 확장(Extend)](#28-확장extend)
    - [2.8.1. placeholder($)](#281-placeholder)
  - [2.9. 함수](#29-함수)
- [3. Sass 설계 가이드](#3-sass-설계-가이드)

# 1. 개요

Sass는 CSS 전처리기 언어이다. Sass를 사용하면 조건문, 반복문, 상속 등의 기능을 활용하여 CSS 코드를 더 쉽고 체게적으로 설계할 수 있다. 이렇게 작성된 Sass 코드는 컴파일러를 통해 CSS 파일로 전환된다.

# 2. 문법

## 2.1. 중첩

Sass는 선택자의 중첩 기능을 제공한다.

- **Scss**
  ```scss
  .div {
    width: 100px;
    .list {
      width: 50px;
      li {
        width: 10px;
      }
    }
  }
  ```
- **CSS**
  ```css
  .div {
    width: 100px;
  }
  .div .list {
    width: 50px;
  }
  .div .list li {
    width: 10px;
  }
  ```

### 2.1.1. 부모 선택자(&)

`&`(Ampersand)선택자는 상위 선택자를 참조한다는 의미이다.

- **Scss**

  ```scss
  .div {
    width: 100px;
    .active {
      background-color: white;
    }
  }

  .font {
    &-sm {
      font-size: 12px;
    }
    &-md {
      font-size: 14px;
    }
    &-lg {
      font-size: 16px;
    }
  }
  ```

- **CSS**

  ```css
  .div {
    width: 100px;
  }
  .div.active {
    background-color: white;
  }

  .font-sm {
    font-size: 12px;
  }
  .font-md {
    font-size: 14px;
  }
  .font-lg {
    font-size: 16px;
  }
  ```

### 2.1.2. @at-root

`@at-root`키워드는 해당 선택자를 중첩을 벗어나 루트 위치에 컴파일 한다.

- **Scss**

  ```scss
  .list {
    $width: 100px;
    $height: 50px;
    li {
      width: $width;
      height: $height;
    }
    @at-root .box {
      width: $width;
      height: $height;
    }
  }
  ```

- **CSS**

  ```css
  .list li {
    width: 100px;
    height: 50px;
  }
  .box {
    width: 100px;
    height: 50px;
  }
  ```

### 2.1.3. 중첩 속성

css 속성의 이름이 동일한 네임스페이스를 가질 경우, 중첩 선택자를 이용해서 표현할 수 있다.

- **Scss**

  ```scss
  .box {
    margin: {
      top: 10px;
      left: 20px;
    }
    padding: {
      bottom: 40px;
      right: 30px;
    }
    font: {
      weight: bold;
      size: 10px;
      family: sans-serif;
    }
  }
  ```

- **CSS**

  ```css
  .box {
    margin-top: 10px;
    margin-left: 20px;
    padding-bottom: 40px;
    padding-right: 30px;
    font-weight: bold;
    font-size: 10px;
    font-family: sans-serif;
  }
  ```

## 2.2. 변수

변수는 `$`기호를 앞에 붙여서 선언할 수 있다.

- **Scss**

  ```scss
  $width: 400px;
  $height: 300px;
  $color-primary: #efefef;
  $url-images: 'https://source.unsplash.com/random/400×300';

  .box {
    width: $w;
    margin-left: $w;
    background: $color-primary url($url-images);
  }
  ```

- **CSS**

  ```css
  .box {
    width: 400px;
    height: 300px;
    background: #efefef url('https://source.unsplash.com/random/400×300');
  }
  ```

### 2.2.1. 변수 스코프

변수는 선언된 `{}`내에서만 유효하다.

- **Scss**

  ```scss
  .box1 {
    $color: #efefef;
    background: $color;
  }

  // Error
  .box2 {
    background: $color;
  }
  ```

### 2.2.2. 변수 전역 설정(!global)

`!global` 키워드를 사용하면 해당 변수의 스코프를 전역으로 설정할 수 있다.

- **Scss**

  ```scss
  .box1 {
    $color: #efefef !global;
    background: $color;
  }
  .box2 {
    background: $color;
  }
  ```

- **CSS**

  ```css
  .box1 {
    background: #efefef;
  }
  .box2 {
    background: #efefef;
  }
  ```

### 2.2.3. 초깃값 설정(!default)

`!default`플래그를 사용하면 해당 변수가 이전에 선언되지 않았을 경우에만 사용할 초깃값을 설정할 수 있다.

- **Scss**

  ```scss
  $color-primary: red;

  .box {
    $color-primary: blue !default;
    background: $color-primary;
  }
  ```

- **CSS**

  ```css
  .box {
    background: red;
  }
  ```

### 2.2.4. 변수 재할당

변수를 변수에 재할당 하는 것은 가능하다.

- **Scss**

  ```scss
  $red: #ff0000;
  $blue: #0000ff;

  $color-primary: $blue;
  $color-danger: $red;

  .box {
    color: $color-primary;
    background: $color-danger;
  }
  ```

- **CSS**

  ```css
  .box {
    color: #0000ff;
    background: #ff0000;
  }
  ```

### 2.2.5. 문자 보간(#{})

`#{}`를 사용하면 해당 변수를 문자열화 한다.

- **Scss**

  ```scss
  $topic: unquote('cat');

  .box {
    background: #efefef url('https://source.unsplash.com/random/?#{$topic}');
  }
  ```

- **CSS**

  ```css
  .box {
    background: #efefef url('https://source.unsplash.com/random/?cat');
  }
  ```

## 2.3. 가져오기

[Sass 공식문서](https://sass-lang.com/documentation/at-rules/import)에 따르면 `@import`문을 사용할 경우, 해당 파일을 전역에서 접근할 수 있도록 가져오기 때문에 충돌원인을 찾기 어렵게 만든다고 한다. 따라서 `@import`대신 `@use`문의 사용을 권장한다.

- **Scss**

  ```scss
  @use 'src/corners';

  .button {
    @include corners.rounded;
    padding: 5px + corners.$radius;
  }
  ```

  ```scss
  @use 'src/corners' as *;

  .button {
    @include rounded;
    padding: 5px + $radius;
  }
  ```

## 2.4. 데이터 타입

Sass의 데이터 타입은 아래와 같고, 각 데이터 타입은 내장함수를 가지고 있다. 내장함수에 대해서는 [Sass 공식문서](https://sass-lang.com/documentation/modules)를 참고할 수 있다.

| 데이터  | 설명                          | 예시                                                       |
| ------- | ----------------------------- | ---------------------------------------------------------- |
| math    | 숫자                          | `1`, `0.82`, `20px`, `2em`                                 |
| string  | 문자                          | `bold`, `"/images/a.png"`                                  |
| color   | 색상                          | `#efefef`, `rgba(255, 255, 255, 0.5)`, `hsl(0, 100%, 50%)` |
| boolean | 논리                          | `true`, `false`                                            |
| null    | 없음                          | `null`                                                     |
| list    | 공백이나 ,로 구분된 값의 목록 | `(apple, orange, banana)`                                  |
| map     | key: value                    | `(apple: a, orange: o, banana: b) `                        |

## 2.5. 연산

### 2.5.1. 산술 연산자

| 종류 | 설명   | 주의사항              |
| ---- | ------ | --------------------- |
| +    | 더하기 |                       |
| -    | 빼기   |                       |
| \*   | 곱하기 | 하나 이상의 값이 숫자 |
| /    | 나누기 | 오른쪽 값이 숫자      |
| %    | 나머지 |                       |

### 2.5.2. 비교 연산자

| 종류 | 설명        |
| ---- | ----------- |
| ==   | 같다        |
| !=   | 다르다      |
| <    | 보다 작다   |
| >    | 보다 크다   |
| <=   | 작거나 같다 |
| >=   | 크거나 같다 |

### 2.5.3. 논리 연산자

| 종류 | 설명   |
| ---- | ------ |
| and  | 그리고 |
| or   | 또는   |
| not  | 부정   |

## 2.6. 조건과 반복

### 2.6.1. if(함수)

**삼항 연산자와 비슷하게** 조건의 값(true, false)에 따라 두 개의 표현식 중 하나만 반환합니다.

- **Scss**

  ```scss
  $width: 555px;
  div {
    width: if($width > 300px, $width, null);
  }
  ```

- **CSS**

  ```css
  div {
    width: 555px;
  }
  ```

### 2.6.2. @if

**if문**과 유사하게 조건에 따라 분기처리가 가능하다.

- **Scss**

  ```scss
  $color: orange;
  div {
    @if $color == strawberry {
      color: #fe2e2e;
    } @else if $color == orange {
      color: #fe9a2e;
    } @else if $color == banana {
      color: #ffff00;
    } @else {
      color: #2a1b0a;
    }
  }
  ```

- **CSS**

  ```scss
  div {
    color: #fe9a2e;
  }
  ```

### 2.6.3. @for

**for 문**과 유사하게 스타일을 반복적으로 출력하는데 사용된다. `through`를 사용하면 종료조건까지, `to`를 사용하면 종료조건 전에 반복문이 종료된다.

- **Scss**

  ```scss
  // 1부터 3번 반복
  @for $i from 1 through 3 {
    .through:nth-child(#{$i}) {
      width: 20px * $i;
    }
  }

  // 1부터 3 직전까지만 반복(2번 반복)
  @for $i from 1 to 3 {
    .to:nth-child(#{$i}) {
      width: 20px * $i;
    }
  }
  ```

- **CSS**

  ```css
  .through:nth-child(1) {
    width: 20px;
  }
  .through:nth-child(2) {
    width: 40px;
  }
  .through:nth-child(3) {
    width: 60px;
  }

  .to:nth-child(1) {
    width: 20px;
  }
  .to:nth-child(2) {
    width: 40px;
  }
  ```

### 2.6.4. @each

List와 Map 데이터를 반복할 때 사용한다.
**for of 문**과 **for in 문**과 유사하다.

- **Scss**

  ```scss
  $fruits: (apple, orange, banana, mango);
  .fruits {
    @each $fruit in $fruits {
      li.#{$fruit} {
        background: url('https://source.unsplash.com/random/?#{$fruit}');
      }
    }
  }

  $apple: (apple, korea);
  $orange: (orange, china);
  $banana: (banana, japan);
  @each $fruit, $country in $apple, $orange, $banana {
    .box-#{$fruit} {
      background: url('https://source.unsplash.com/random/?#{$country}');
    }
  }
  ```

- **CSS**

  ```css
  .fruits li.apple {
    background: url('https://source.unsplash.com/random/?apple');
  }
  .fruits li.orange {
    background: url('https://source.unsplash.com/random/?orange');
  }
  .fruits li.banana {
    background: url('https://source.unsplash.com/random/?banana');
  }
  .fruits li.mango {
    background: url('https://source.unsplash.com/random/?mango');
  }

  .box-apple {
    background: url('https://source.unsplash.com/random/?korea');
  }
  .box-orange {
    background: url('https://source.unsplash.com/random/?china');
  }
  .box-banana {
    background: url('https://source.unsplash.com/random/?japan');
  }
  ```

### 2.6.5. @while

**while 문**과 유사하게 조건이 false로 평가될 때까지 내용을 반복한다.

- **Scss**

  ```scss
  $i: 6;

  @while $i > 0 {
    .item-#{$i} {
      width: 2px * $i;
    }
    $i: $i - 2;
  }
  ```

- **CSS**

  ```css
  .item-6 {
    width: 12px;
  }
  .item-4 {
    width: 8px;
  }
  .item-2 {
    width: 4px;
  }
  ```

## 2.7. 믹스인(Mixin)

Mixin(믹스인)은 스타일시트에서 재사용 할 CSS 선언 그룹 을 정의하는 기능이다.

### 2.7.1. 선언(@mixin)과 사용(@include)

`@mixin`를 이용해서 선언하고, `@include`를 이용해서 포함한다.

- **Scss**

  ```scss
  @mixin large-text {
    font-size: 22px;
    font-weight: bold;
    font-family: sans-serif;
    color: orange;
  }

  div {
    @include large-text;
  }
  ```

- **CSS**

  ```css
  h1 {
    font-size: 22px;
    font-weight: bold;
    font-family: sans-serif;
    color: orange;
  }
  ```

### 2.7.2. 인자(Argument)

Mixin에는 함수처럼 인자를 넘겨줄 수 있다. 다른 프로그래밍 함수처럼 Keyword Arugment를 사용할 수도, Variable Argument를 사용할 수도 있다.

- **Scss**

  ```scss
  @mixin dash-line($width, $color: black) {
    border: $width dashed $color;
  }
  @mixin absolute($t: null, $b: null, $l: null, $r: null) {
    position: absolute;
    top: $t;
    bottom: $b;
    left: $l;
    right: $r;
  }
  @mixin bg($width, $height, $bg-values...) {
    width: $width;
    height: $height;
    background: $bg-values;
  }

  .box1 {
    @include dash-line(1px, red);
  }
  .box2 {
    @include dash-line(4px);
  }
  .keyword-box {
    @include position($t: 30px, $r: 40px);
  }
  .variable-box {
    @include bg(
      100px,
      200px,
      url('/images/a.png') no-repeat 10px 20px,
      url('/images/b.png') no-repeat,
      url('/images/c.png')
    );
  }
  ```

- **CSS**

  ```scss
  .box1 {
    border: 1px dashed red;
  }
  .box2 {
    border: 4px dashed black;
  }
  .keyword-box {
    position: fixed;
    top: 30px;
    right: 40px;
  }
  .variable-box {
    width: 100px;
    height: 200px;
    background: url('/images/a.png') no-repeat 10px 20px, url('/images/b.png')
        no-repeat, url('/images/c.png');
  }
  ```

### 2.7.3. 스타일 블록 전달(@content)

선언된 Mixin이 `@content`를 내부에 포함하고 있다면, 해당 부분에 스타일 블록을 전달할 수 있다.

- **Scss**

  ```scss
  @mixin icon($url) {
    &::after {
      content: $url;
      @content;
    }
  }
  .icon1 {
    // icon Mixin의 기존 기능만 사용
    @include icon('/images/icon.png');
  }
  .icon2 {
    // icon Mixin에 스타일 블록을 추가하여 사용
    @include icon('/images/icon.png') {
      position: absolute;
    }
  }
  ```

- **CSS**

  ```css
  .icon1::after {
    content: '/images/icon.png';
  }
  .icon2::after {
    content: '/images/icon.png';
    position: absolute;
  }
  ```

## 2.8. 확장(Extend)

Mixin이 아닌 다른 선택자의 스타일을 포함해서 사용해야 하는 경우 `@include`대신 `@extend`를 사용한다.
하지만 컴파일된 결과를 보면 `@extend`는 ','로 구분되는 **다중 선택자**를 생성한다. 따라서 스타일 속성의 예상치 못한 충돌을 막기 위해 **Mixin사용을 권장**한다.

- **Scss**

  ```scss
  .btn {
    padding: 10px;
    margin: 10px;
    background: blue;
  }
  .btn-danger {
    @extend .btn;
    background: red;
  }
  ```

- **CSS**

  ```css
  .btn,
  .btn-danger {
    padding: 10px;
    margin: 10px;
    background: blue;
  }
  .btn-danger {
    background: red;
  }
  ```

### 2.8.1. placeholder($)

`$`(placeholder) 불필요한 선택자 생성을 방지하기 위해 extend와 함깨 쓰인다. 자세한 내용은 다음 [블로그 글](https://13akstjq.github.io/sass/2020/02/22/mixin%EA%B3%BC-extend-%EC%95%8C%EB%A7%9E%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0.html)참조할 수 있다.

- **Scss**

  ```scss
  %btn {
    width: 100px;
    height: 80px;
  }

  .btn_success {
    @extend %btn;
    color: green;
  }

  .btn_danger {
    @extend %btn;
    color: red;
  }

  .btn_warning {
    @extend %btn;
    color: orange;
  }
  ```

- **CSS**

  ```css
  .btn_success,
  .btn_danger,
  .btn_warning {
    width: 100px;
    height: 80px;
  }

  .btn_success {
    color: green;
  }

  .btn_danger {
    color: red;
  }

  .btn_warning {
    color: orange;
  }
  ```

## 2.9. 함수

Sass에서는 자신의 함수를 정의해서 사용할 수 있다. Mixin과 유사하지만, Mixin은 스타일 코드만을 반환하는 반면, 함수는 `@return`문을 이용해서 **원하는 값을 데이터타입을 반환**할 수 있다. 또한 함수는 지시어 없이 바로 **함수이름으로 바로 사용**한다.  
또한 함수는 다른 내장함수와 이름이 충동할 수 있기 때문에 접두어를 붙여서 사용하는 것을 추천한다.

- **Scss**

  ```scss
  $max-width: 980px;

  @function columns($number: 1, $columns: 12) {
    @return $max-width * ($number / $columns);
  }

  .box_group {
    width: $max-width;

    .box1 {
      width: columns(); // 1
    }
    .box2 {
      width: columns(8);
    }
    .box3 {
      width: columns(3);
    }
  }
  ```

- **CSS**

  ```CSS
  .box_group {
  /* 총 너비 */
  width: 980px;
  }
  .box_group .box1 {
  /* 총 너비의 약 8.3% */
  width: 81.66667px;
  }
  .box_group .box2 {
  /* 총 너비의 약 66.7% */
  width: 653.33333px;
  }
  .box_group .box3 {
  /* 총 너비의 25% */
  width: 245px;
  }
  ```

# 3. Sass 설계 가이드

[Sass Guidlines - Kitty Giraudel](https://sass-guidelin.es/ko/)
[kevinpowell.co](https://www.kevinpowell.co/article/using-my-colors/)
