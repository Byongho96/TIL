# ESLint와 Prettier

## Index

- [ESLint와 Prettier](#eslint와-prettier)
  - [Index](#index)
- [1.기능](#1기능)
- [2. 설치 및 설정](#2-설치-및-설정)
  - [2.1. ESLint](#21-eslint)
  - [2.2. Prettier](#22-prettier)
  - [2.3. ESlint와 Prettier](#23-eslint와-prettier)
- [3. Husky](#3-husky)
- [4. 참고자료](#4-참고자료)

---

# 1.기능

- **ESLint**

  - **코드 포맷팅**  
    코드의 가독성을 높인다. prettier와 겹치는 기능
  - **코드 품질**  
    코도의 일부 문법 상을 오류를 파악하고 이를 수정한다.

- **Prettier**
  - **코드 포맷팅**  
    코드의 가독성을 높인다

---

# 2. 설치 및 설정

## 2.1. ESLint

1. VScode에 ESLint 익스텐션 설치
2. VScode 설정에서 Eslint: Auto Fix On Save 체크
3. ESlint 설정 파일 루트 경로에 생성 [ESLint Rule](https://eslint.org/docs/latest/rules/)

   ```js
   // .eslintrc.js
   module.exports = {
     rules: {
       "no-unexpected-multiline":'error'
       "no-extra-":'error'
     }
   }
   ```

## 2.2. Prettier

1. VScode에 Prettier 익스텐션 설치
2. VScode 설정에서 Editor: Format On Save 체크
3. Prettier 설정파일 루트 경로에 생성 [Prettier Configuration](https://prettier.io/docs/en/configuration.html)

   ```js
   {
     "trailingComma": "all",
     "tabWidth": 2,
     "semi": true,
     "singleQuote": true
   }
   ```

## 2.3. ESlint와 Prettier

ESLint에서 Prettier와 충돌하는 규칙을 비활성화함으로써 Prettier의 규칙을 따름

1. `yarn add eslint-config-prettier`
2. ESLint 설정파일에 extends에 prettier 추가

```js
 "eslintConfig": {
   "extends": [
     "react-app",
     "prettier"
   ]
 },
```

3. ESLint 개별적으로 Rule 설정 가능

```js
  "eslintConfig": {
    ...
    "rules": {
      "react/jsx-filename-extension": 0,
      "no-unused-vars": 1
    }
  },
```

4. 파일 상단에 주석을 달아서 특정 Rule 비활성화 가능
   ```js
   // eslint-disable-next-line no-unsued-vars
   ```

---

# 3. Husky

깃 명령어가 실행되기 전에, 사용자가 지정한 특정 명령어가 실행되도록 설정할 수 있는 라이브러리. 만일 사용자가 지정한 명령어가 실패할 경우 이후 명령어가 실행되지 않는다.

1. `npm install husky`
2. `npm install lint-staged`  
   커밋 시 staged된 파일(변경된 파일)에 대해서만 ESLint 검사를 실행
3. package.json에 husky 등록
   ```js
   // pacakge.json
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

---

# 4. 참고자료

- [ESlint & prettier 설치 가이드](https://react.vlpt.us/basic/27-useful-tools.html)
- [ESlint & prettier 연동 참고자료](https://velog.io/@yrnana/prettier%EC%99%80-eslint%EB%A5%BC-%EA%B5%AC%EB%B6%84%ED%95%B4%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EC%9E%90)
- [ESlint수동 설치 및 셋팅 Youtube](https://www.youtube.com/watch?v=Y3kjHM7d3Zo)
