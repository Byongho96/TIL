---
title: '옵저버(Observer) 패턴 (feat. React)'
updatedAt: '2024-03-06'
createdAt: '2024-03-06'
description: '옵저버 디자인 패턴을 알아보고, React 프로젝트의 토스트 메시지 구현에 활용해보자'
tags: ['Design Pattern', '디자인 패턴', 'Observer', '옵저버', '토스트 메시지']
isCompleted: false
reference:
---

# 1. 옵저버 패턴 구조

옵저버 패턴의 구조는 아래와 같다.

# 2. 옵저버 패턴 구현

```js
// 관찰 대상자 / 발행자
interface ISubject {
    void registerObserver(IObserver o);
    void removeObserver(IObserver o);
    void notifyObserver();
}

class ConcreteSubject implements ISubject {
    // 관찰자들을 등록하여 담는 리스트
    List<IObserver> observers = new ArrayList<>();

    // 관찰자를 리스트에 등록
    @Override
    public void registerObserver(IObserver o) {
        observers.add(o);
        System.out.println(o + " 구독 완료");
    }

    // 관찰자를 리스트에 제거
    @Override
    public void removeObserver(IObserver o) {
        observers.remove(o);
        System.out.println(o + " 구독 취소");
    }

    // 관찰자에게 이벤트 송신
    @Override
    public void notifyObserver() {
        for(IObserver o : observers) { // 관찰자 리스트를 순회하며
            o.update(); // 위임
        }
    }
}
```

```js
// 관찰자 / 구독자
interface IObserver {
    void update();
}

class ObserverA implements IObserver {
    public void update() {
        System.out.println("ObserverA 한테 이벤트 알림이 왔습니다.");
    }

    public String toString() { return "ObserverA"; }
}

class ObserverB implements IObserver {
    public void update() {
        System.out.println("ObserverB 한테 이벤트 알림이 왔습니다.");
    }

    public String toString() { return "ObserverB"; }
}
```

# 3. 옵저버 패턴 활용

팀원 중 한 명이 토스트 메시지를 옵저버 패턴을 구현했다. 내가 구현하는 방식과는 전혀 달랐는데, 옵저버 패턴을 적용할 경우, 비즈니스 로직이 UI와 완전히 구분되어서 아주 흥미로웠다.

## 3.1. 함수형 React

먼저 익숙한 함수형으로 살펴보겠다. 함수형 React로 볼 경우, 옵저버 패턴인 것이 바로 눈에 들어오지는 않는다.

```js
export function useToast() {
  const [_, forceUpdate] = useState({})

  useEffect(() => {
    const currentListener = () => forceUpdate({})

    listeners.push(currentListener)

    return () => {
      listeners = listeners.filter((listener) => listener !== currentListener)
    }
  }, [])

  return {
    toastMessages,
    addToast,
  }
}
```

## 3.2. 클래스형 React

클래스형으로 바꿀 경우 옵저버 패턴이 아주 명확하게 보인다.

# 첨부) 다른 토스트 메시지 구현

원래 나는 아래와 같은 방식으로 토스트 메시지를 구현했다. 특별한 디자인 패턴은 없고 (굳이 따지면 싱글톤 패턴...), 이렇게 되면 토스트 메시지의 로직이 UI(토스트 메시지 컴포넌트)와 강한 연관성을 가진다.

그런데 프로젝트에서 토스트 메시지의 로직이 토스트 메시지 컴포넌트와 분리된 적이 없기 때문에, 이로 인해 문제가 발생한 적은 없다.

# 참조

- [Inpa Dev : "옵저버(Observer) 패턴 - 완벽 마스터하기"](<https://inpa.tistory.com/entry/GOF-%F0%9F%92%A0-%EC%98%B5%EC%A0%80%EB%B2%84Observer-%ED%8C%A8%ED%84%B4-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90#:~:text=%EC%98%B5%EC%A0%80%EB%B2%84%20%ED%8C%A8%ED%84%B4(Observer%20Pattern)%EC%9D%80,%EB%A5%BC%20%EC%B7%A8%ED%95%98%EB%8A%94%20%ED%96%89%EB%8F%99%20%ED%8C%A8%ED%84%B4%EC%9D%B4%EB%8B%A4.>)
