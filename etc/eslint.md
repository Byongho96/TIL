# 1. eslint와 Prettier

## 1.1. 역할

- **eslint**

  - **코드 포맷팅**
    - 코드의 가독성을 높인다. prettier와 겹치는 기능
  - **코드 품질**
    - 코도의 일부 문법 상을 오류를 파악하고 이를 수정한다.

- **prettier**
  - **코드 포맷팅**
    - 코드의 가독성을 높인다

## 1.2. eslint 수동 설치 및 셋팅

[수동 설치 및 셋팅 Youtube](https://www.youtube.com/watch?v=Y3kjHM7d3Zo)

1. eslint 설치  
   `npm install eslint`
2. eslint 설정 파일 생성  
   `touch .eslintrc.js`
3. eslint 적용 룰 설정

   ```js
   // .eslintrc.js
   module.exports = {
     rules: {
       "no-unexpected-multiline":'error'
       "no-extra-":'error'
     }
   }
   ```

   [eslint 규칙](https://eslint.org/docs/latest/rules/)

   - 체크박스 : 추천 규칙
   - 렌치 : --fix 옵션 적용 시 자동 수정

4. package.json에 eslint 적용 및 수정 기능 추가
   ```js
   {'scripts': {'lint': 'eslint src --fix'}}
   ```
5. 코드 검사  
   `npm run eslint`

## 1.3. 코드 검사 자동화

### 1.3.1. ㅇ

eslint-config-prettier : eslint에서 prettier와 충돌할 수 있는 rule을 꺼버림 ✅
코드 오류를 잡는데는 eslint, 코드 포맷팅에는 prettier를 사용하는 방법이다.
eslint-plugin-prettier : prettier를 eslint의 rules로 동작하게 함
포맷팅 문제도 오류로 출력되어서 오류 메시지가 지나치게 많아지며 느리다.
prettier-eslint : prettier를 실행하고 나서 eslint --fix를 실행함
prettier를 단독으로 실행하는 것 보다 훨씬 느리다.
렌치가 있으면 수정이 가능--fix로, 체크박스가 있는 것은 추천

prettier는 정말 가독성을 위해
프리티어는 eslint와 통합. 프리티어의 포맷팅 규칙을 eslint로 추가하고
충돌하는 규칙이 있으면 프리티어

`npm install eslint-config-prettier eslint-plugin-prettier`

```js
module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
}
```

자동화로 코드 검사

깃 훅: 깃 명령어를 사용하기 전에, 특정 명렁어 실행. 실패할 경우 이후 명령어가 실행이 안됨

`npm install husky`

package.json

```js
'husky': {
  'hooks': {
    // 'pre-commit': 'echo \'커밋 전에 이 메시지를 출력\''
    'pre-commit': 'npm run lint'
  }
}
```

커밋할때 변경된 파일 만 린트를 수행
`npm install lint-staged`

```js
'husky': {
  'hooks': {
    // 'pre-commit': 'echo \'커밋 전에 이 메시지를 출력\''
    'pre-commit': 'lint-staged'
  }
}
'lint-staged': {
  '*.js': 'npm run lint'
}
```

마지막으로 그냥 vscode에서 검사하는 방법

익스텐션으로 eslint설치

설정파일에
setttings.json

```js
{
  // 검사
  'eslint.enable':true,
  // 수정
  'editor.codeActionsOnSave' :{
    'source.fixAll.eslint': true
  }
}
```

설정에서 format on save 를 클릭해서 할 수도 있음

////
질문에 다ㅐ한 답에 대해 하여 eslint를 설치하고 파일을 만듬
`npm init @eslint/config`

아래와 같은 주석 아닌 주석을 상단에 달아서 특정 설정을 비활성화 할 수 있음

```js
// eslint-disable-next-line no-unsued-vars
```

[eslint & prttier 연동 참고자료](https://velog.io/@yrnana/prettier%EC%99%80-eslint%EB%A5%BC-%EA%B5%AC%EB%B6%84%ED%95%B4%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EC%9E%90)
[eslint & prettier 설치 가이드](https://react.vlpt.us/basic/27-useful-tools.html)
