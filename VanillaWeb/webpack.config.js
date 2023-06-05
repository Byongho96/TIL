const path = require('path') // Node.js의 내장 모듈을 불러온다
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'none', //  웹팩으로 빌드할 때의 development, production, none 모드를 설정
  entry: './src/index.js', // 최초 진입점
  output: {
    path: path.resolve(__dirname, 'dist'), // './dist'의 절대 경로를 리턴합니다.
    filename: 'main.js',
  },
  devtool: 'eval-cheap-source-map', // 개발용 소스맵, 빌드된 파일과 원본 파일을 매핑시켜줌으로써 디버깅을 도와줌
  devServer: {
    port: 9000,
    hot: true, // 새로 고침없이 리로드
  },
  // loader는 webpack이 웹 애플리케이션을 해석할 때 자바스크립트 파일이 아닌 웹 자원(HTML, CSS, Images, 폰트 등)들을 변환할 수 있도록 도와준다
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
          'sass-loader',
        ], // style loader는 해석된 css를 inline태그로 추가해준다. 오른쪽에서 왼쪽 순으로 적용
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/images',
            },
          },
        ],
      },
    ],
  },
  // plugin은 번들된 결과물의 형태를 바꾸는 역할을 한다.
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }), // 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
    new webpack.ProgressPlugin(), // 웹팩의 빌드 진행율을 표시해주는 플러그인
    new CleanWebpackPlugin(), // 빌드 이전 결과물을 제거해주는 플러그인
    new MiniCssExtractPlugin(), // CSS 파일을 별도의 파일로 추출해주는 플러그인
  ],
}
