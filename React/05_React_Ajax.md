# 1. axios instance

## 1.1. 생성

axios.create([config])

```js
const instance = axios.create({
  // 모두 configuration이며 필수는 아니다.
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
})
```

## 1.2. 메소드

```js
axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])
axios.getUri([config])
```

## 1.3. Config

[axios 공식문서 configuration](https://axios-http.com/docs/req_config)

```js
{
  // `url` is the server URL that will be used for the request
  url: '/user',

  // `method` is the request method to be used when making the request
  method: 'get', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com/api',


  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  // NOTE: params that are null or undefined are not rendered in the URL.
  params: {
    ID: 12345
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', 'DELETE', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    firstName: 'Fred'
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default


  // `proxy` defines the hostname, port, and protocol of the proxy server.
  // You can also define your proxy using the conventional `http_proxy` and
  // `https_proxy` environment variables. If you are using environment variables
  // for your proxy configuration, you can also define a `no_proxy` environment
  // variable as a comma-separated list of domains that should not be proxied.
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  // If the proxy server uses HTTPS, then you must set the protocol to `https`.
  proxy: {
    protocol: 'https',
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },
}
```

# 2. axios intercepotor

## 2.1. 기본구조

```js
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
```

## 2.2. interceptor 추가 및 제거

```js
// 추가
const instance = axios.create()
instance.interceptors.request.use(function () {
  /*...*/
})

// 제거
const myInterceptor = axios.interceptors.request.use(function () {
  /*...*/
})
axios.interceptors.request.eject(myInterceptor)
```

# 3. 사용예시

[boostcamp-2020 github](https://github.com/boostcamp-2020/IssueTracker-36/blob/dev/frontend/utils/api-request.js)

```js
import axios from 'axios'

const DEBUG = process.env.NODE_ENV === 'development'

const apiRequest = axios.create({
  baseURL: DEBUG ? 'http://localhost:3000' : 'http://118.67.132.217:3000',
})

apiRequest.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: { Authorization: window.localStorage.getItem('userToken') },
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiRequest.interceptors.response.use(
  (response) => {
    if (response.status === 400) alert('잘못된 형식의 요청입니다')
    else if (response.status === 401) alert('로그인 후 진행해주세요')
    else if (response.status === 500) alert('서버에서 오류가 발생했습니다')
    else if (response.status !== 200) alert('알 수 없는 오류가 발생했습니다')

    return response
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error.message)
  }
)

export default apiRequest
```
