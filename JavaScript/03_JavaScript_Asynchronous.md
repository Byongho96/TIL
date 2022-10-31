## 1. Synchronous and Asynchronous
**Synchornous**
* Do things in order
* Wait for the response to a request.
**ASynchornous**
* Process in parallel
* Don't Wait for the response -> Better user experience

### 1.1. Asynchronous JavaScript
JavaScript is a single-thread language, but it can handle asynchronously.
```javascript
function slowRequest(callBack) {
  console.log('1. A long time process started')
  setTimeout(function () {  
    callBack()
  }, 3000)
}

function myCallBack() {
  console.log('2. The long time process ended')
}

slowRequest(myCallBack)
console.log('3. Another short process')
// 1. A long time process started
// 3. Another short process
// 2. The long time process ended
```

### 1.2. JavaScript Runtime
The environment that help JavaScript being asynchronous
1. All tasks are processed after entering the **Call Stack**.
2. If a long-lasting task enters the stack, it is sent to the **Web API** and processed separately.
3. Tasks that have been processed in Web API are sequentially entered into the **Task Queue**.
4. When the **Event Loop** detects that the stack is empty, it sends the oldest task in the queue to the stack.

## 2. Axios
Axios
: The library for asynchrnous HTTP communciation. Can be installed with npm in node.js, and can be used with CDN in browser.

### 2.1. The Structure of Axios
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    axios.get('URL')
      .then(callback in case of success)
      .catch(callback in case of failure)
```
```html
<button>Cat</button></button>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script>
    const catImageSearchURL = 'https://api.thecatapi.com/v1/images/search'
    const btn = document.querySelector('button')

    btn.addEventListener('click', function () {
    //   axios.get(catImageSearchURL)
      axios({
        method: 'get',
        url: catImageSearchURL
      })
        .then((response) => {
          imgElem = document.createElement('img')
          imgElem.setAttribute('src', response.data[0].url)
          document.body.appendChild(imgElem)
        })
        .catch((error) => { 
          console.log('Fail!')
        })
        console.log('Success!') 
    })
    // Success!
    // response object

    // axios library works asynchronously
  </script>
```

## 3. Callback and Promise
The disadvantages of asynchronous processing is that ==the processing order of the code is unclear.==

### 3.1. Asynchronous Callback
Callback Function
: Function which is passed as an argunemnt for other functions
Aysnchronous Callback Function

Asynchronous Callback Function
: Callback function that specifies the function to run after the asynchronous operation completes

### 3.2. Promise
Promise
: The object for giving order to asynchronous processing (chaining)

**methods**
* then(callback)
    * Runs the callback function if the requested operation succeeds
    * Receives return values from previous operations as a parameter for the callback
    * Returns a promise object
* catch(callback)
    * Runs the callback function if any of the requested operations fail
    * Receives a failed object from previous operations as a parameter for the callback
    * Returns a promise object

```javascript
work1()
    .then((result1) => {
        // work 2
        return result2
    })
    .then((result2) => {
        // work 3
        return result3
    })
    .catch((error) => {
        // error handling
    })
```

## 4. AJAX