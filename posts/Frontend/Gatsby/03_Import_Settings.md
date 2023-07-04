---
title: '03. Gatsby 프로젝트(TypeScript) import 경로 설정'
updatedAt: '2023-06-24'
createdAt: '2023-06-24'
description: 'Gatsby 타입스크립트(TypeScript) 프로젝트의 절대경로 설정법을 알아본다'
tags: ['gatsby', '절대경로', 'import', '설정', 'TypeScript', '타입스크립트']
isCompleted: true
reference: 'https://levelup.gitconnected.com/how-to-set-up-import-aliases-for-gatsby-32398ae67e7f'
---

# 1. import 경로

프로젝트를 진행하다 보면, import 절대경로를 설정하지 않을 수 없다.
심지어 어쩌다가 한 번, IDE에서 자동 import가 되지 않으면 `../`의 지옥을 맛볼 수 있다.

우리가 바라는 건 이랬던 코드가

```js
import Article from '../../../article.tsx'
import * as styles from '../../../../styles/markdown.scss'
```

이렇게 바뀌는 것이다.

```js
import * as init from '@components/article.tsx'
import * as styles from '@styles/global.scss'
```

프로젝트를 시작할 때, 딱 한 번 구글링해서 설정하면 끝이기 때문에, 매번 설정하면서도 매번 까먹게 된다. 그래서 설정법을 설정을 정리함과 동시에 원리에 대해서 간략히 정리해보려고 한다.

# 2. tsconfig / jsconfig

먼저 타입스크립트 프로젝트라면 tsconfig.json 파일에서, 자바스크립트 프로젝트라면 jsconfig.json 파일에서 절대경로를 설정해줘야 한다. 해당 파일들은 프로젝트 루트경로에 위치해야 한다.

해당 파일들에서 import 경로를 설정하는 이유는 **코드 편집기에 알려주기 위해서다.**(tsconfig의 경우 TypeScript Compiler도 포함)

이를 <mark>**IntellSene**</mark>라고 하는데, 코드 편집기(IDE)가 코드의 컨텍스트를 분석하여 변수, 속성, 메서드 등을 자동 완성해주는 기능을 말한다. 당연히 우리가 모듈을 import할 때 경로를 자동 완성해주는 기능도 포함된다.

```json
{
    "compilerOptions": {
        "baseUrl": "src",  /* 모듈 참조의 절대경로 설정 */
        "paths": {
            "@assets/*": ["assets/*"],
            "@components/*": ["components/*"],
            "@contexts/*": ["contexts/*"],
            "@hooks/*": ["hooks/*"],
            "@layouts": ["layouts/*"],
            "@pages/*": ["pages/*"],
            "@queries/*": ["queries/*"],
            "@styles/*": ["styles/*"],
            "@templates/*": ["templates/*"],
            "@utils/*": ["utils/*"]
        }
        ...
    }
}
```

- **baseUrl**  
  모듈이 비상대적인 경로를 참조되었을 경우, 탐색 기준을 설정한다.
- **paths**  
  baseUrl을 기준으로 각각의 절대경로에 대한 별칭(alias)를 설정한다.
  예를 들어, 위 예시에서 `@components/`는 실제 `src/components/`를 의미한다.

# 3. webpack

이제 실제 빌드를 수행하는 webpack에도 모듈 import 참조 경로를 알려줘야 한다. 앞의 설정은 말한 것처럼 코드 편집기(or tsc)에 알려주는 설정이었기 때문에, 실제 빌드가 성공적으로 이뤄지기 위해서는 webpack에도 같은 내용을 알려줘야 한다.

관련된 플러그인이나 라이브러리도 있지만, Gatsby의 **node API를 이용해서 직접 설정**해줄 수도 있다.

Gatsby 프로젝트를 생성해보면 알겠지만, 따로 webpack.config.js 파일이 자동 생성되지 않는다. 대신 Gatsby는 node API를 통해 webpack 설정할 수 있도록 지원한다.

**Node API는 Gatsby 프로젝트가 빌드될 때 호출된다.** [Gatsby 공식문서](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onCreateWebpackConfig)를 보면 다양한 api가 있는데, 그 중 우리가 사용할 것은 `onCreateWebpackConfig`이다. 아래와 같은 방식으로 tsconfig파일에서 설정한 내용과 대응되게 설정하면 된다.

```js
// commonJS 방식으로 path 모듈 import
const path = require('path')

// __dirname은 node.js가 제공하는 변수로써 현재 모듈의 경로를 반환한다.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@queries': path.resolve(__dirname, 'src/queries'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  })
}
```

# 4. 참조

- [How to Set Up Import Aliases for Gatsby](https://levelup.gitconnected.com/how-to-set-up-import-aliases-for-gatsby-32398ae67e7f)
- [Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onCreateWebpackConfig)
