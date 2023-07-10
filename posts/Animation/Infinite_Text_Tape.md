---
title: '무한 텍스트 테이프 애니메이션 (React 컴포넌트)'
updatedAt: '2023-07-07'
createdAt: '2023-07-07'
description: '무한 텍스트 테이프 애니메이션을 리액트 컴포넌트로 만들어본다.'
tags: ['CSS', 'JavaScript', 'canvas', '애니메이션', '텍스트 테이프']
isCompleted: true
reference: 'https://www.youtube.com/watch?v=z9hN9PXhe-A'
---

# 1. 목표

["YouTube: 자바스크립트로 5분만에 텍스트 스크롤 애니메이션 효과(text marquee effect) 마스터하기, 맛있는 코딩"](https://www.youtube.com/watch?v=z9hN9PXhe-A) 를 따라잡고, 이를 커스텀할 수 있는 리액트 컴포넌트로 만드는게 목표다.

![infinite-text-tape.gif)](./assets/infinite-text-tape.gif)

다음과 같은 Prop을 받아 리액트 컴포넌트를 커스텀할 수 있도록 할 것이다.

```js
type Props = {
  text?: string     // 텍스트 문구
  fontColor?: string    // 텍스트 색깔
  tapeColor?: string    // 테이프 색깔
  isRight?: boolean     // 텍스트 흐름 방향
  rotationDeg?: number  // 테이프 회전 각도
}
```

# 2. 전체 코드

## 2.1. 리액트 코드

[Github 소스코드](https://github.com/Byongho96/TIL/tree/master/src/pages/demo/scroll-infinite-tape)

강의의 자바스크립트 코드를 리액트 컴포넌트를 만들었다.

Prop의 변화에 따라 속성을 변하게 하기 위해, `useEffect`문에 실행코드를 넣고 적절하게 클린업함수를 작성했다.

```js
import React, { useEffect, useRef } from 'react'
import './style.scss'

type Props = {
  text?: string
  fontColor?: string
  tapeColor?: string
  isRight?: boolean
  rotationDeg?: number
}

const ScrollInfiniteTape: React.FC = ({
  text = 'Lorem ipsum',
  fontColor = 'black',
  tapeColor = 'yellow',
  isRight = true,
  rotationDeg = 0,
}: Props) => {
  const tapeRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const position = useRef(0) // 중간에 Prop이 바뀌더라도, position 유지하기 위해 밖에 선언

  useEffect(() => {
    const tapeElement = tapeRef.current
    const textElement = textRef.current

    if (
      !(tapeElement instanceof HTMLDivElement) ||
      !(textElement instanceof HTMLParagraphElement)
    )
      return

    // 텍스트가 흐르는 방향을 설정
    let textDirection = 1
    if (isRight) {
      tapeElement.style.justifyContent = 'flex-end'
    } else {
      tapeElement.style.justifyContent = 'flex-start'
      textDirection = -1
    }

    // 텍스트를 이동 시키는 함수
    const moveText = function () {
      position.current += 1
      // 반만큼 이동 했을 때, 다시 원위치로 복귀하여 무한스크롤
      if (position.current > textElement.scrollWidth / 2) {
        textElement.style.transform = `translateX(0)`
        position.current = 0
      }
      textElement.style.transform = `translateX(${
        textDirection * position.current
      }px)`
    }

    // 애니메이션 실행 함수
    let animationId: number = null
    const animate = function () {
      moveText()
      animationId = window.requestAnimationFrame(animate) // 희한하게 정의되기 전에 쓰네?
    }

    // 애니메이션 실행
    animate()

    // 스크롤 함수
    const speedUp = function () {
      position.current += 10
    }
    window.addEventListener('scroll', speedUp)

    // 클린업
    return () => {
      window.cancelAnimationFrame(animationId)
      window.removeEventListener('scroll', speedUp)
    }
  }, [isRight])

  return (
    <div
      ref={tapeRef}
      className="scroll-infinite-tape__tape"
      style={{
        backgroundColor: tapeColor,
        transform: `rotate(${rotationDeg}deg) translateX(-10%)`,
      }}
    >
      <p
        ref={textRef}
        className="scroll-infinite-tape__text"
        style={{ color: fontColor }}
      >
        {(text + '\u00a0\u00a0\u00a0\u00a0').repeat(20)}
      </p>
    </div>
  )
}

```

## 2.2. CSS 코드

테이프가 회전했을 때, 여백이 보이지 않게 하기 위해 두 가지 처리를 했다.

- **width**  
  먼저 너비를 `120%`로 설정해, 화면 너비보다 여유를 두었고
- **translateX(-10%)**  
  위의 리액트 코드를 보면, 인라인 스타일로 `transform: translateX(-10%)` 를 두어, 확보된 여백을 포함하여 화면의 중앙에 오도록 했다.

한 가지 유의해야할 점은, 이 컴포넌트를 쓰는 부모 컴포넌트가 `overflow-x:hidden` 설정을 가져야 한다.

```css
.scroll-infinite-tape__tape {
  display: flex;
  width: 120%; // 회전했을 때, 약간의 여백 방지
  padding: 1vw 0 1.3vw;
}

.scroll-infinite-tape__text {
  min-width: fit-content; // grid 설정 때문에 p의 너비가 제한되었음
  font-size: 3vw;
  font-weight: 700;
  white-space: nowrap;
}
```

## 3. 사용 예시

[애니매이션 라이브 페이지로 이동!](https://byongho96.github.io/TIL/demo/scroll-infinite-tape/)

![infinite-text-tape.gif)](./assets/infinite-text-tape.gif)

```js
import * as React from 'react'
import './style.css'
import ScrollInfiniteTape from './ScrollInfiniteTape.tsx'

const App: React.FC = () => {
  return (
    <div className="scroll-infinite-tape-page">
      <ScrollInfiniteTape
        text="Orange is the New Black"
        fontColor="black"
        tapeColor="orange"
        isRight={false}
        rotationDeg={5}
      />
      <ScrollInfiniteTape
        text="Easy Peasy Lemon Squeezy"
        fontColor="ivory"
        tapeColor="gold"
        rotationDeg={10}
      />
      <ScrollInfiniteTape
        text="Have a good one"
        fontColor="white"
        tapeColor="skyblue"
        isRight={false}
        rotationDeg={-12}
      />
      <ScrollInfiniteTape
        text="Super Green"
        fontColor="beige"
        tapeColor="green"
        rotationDeg={5}
      />
      <ScrollInfiniteTape
        text="Friday Night"
        fontColor="pink"
        tapeColor="black"
        isRight={false}
        rotationDeg={-3}
      />
    </div>
  )
}

export default App
```

```css
.scroll-infinite-tape-page {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  gap: 10vh;
  height: 200vh;
}
```
