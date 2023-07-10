module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'react-app',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  root: true,
  ignorePatterns: ['personal/**', 'posts/**', 'public/**'],
  rules: {
    '@typescript-eslint/no-var-requires': 0, // require 사용 허용
    'import/no-unresolved': [2, { commonjs: true, amd: true }], //CommonJS, AMD 형식의 import 허용
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'type'],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{./*scss, @styles/**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@layouts/**',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: [],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
      },
    ],
    'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: true, // tsconfig.json 파일에 설정된 경로 매핑(alias)
      node: true, // Node.js의 내장 모듈 및 node_modules 모듈 해석
    },
  },
}
