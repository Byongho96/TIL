## 1. String
**Even strings are stored as 0 abd 1**
 * .jpg/.mp4/.doc ...: all the file has its own encoding rule (binary data) <-> (desirable data)
### 1-1. Standoard Code
**the encoding character rule for information interchagne**
* ASCII(American Standard Code for Information interchange)
  * 1st bit: Parity Bit
    * for detecting error by checksum
  * 7bit character encoding standard
    ![ASCII](images/%EC%BA%A1%EC%B2%98.PNG)
* Extended ASCII
  * using all the 8bit
* UTF-8 (Unicdoe)
  * MIN: 8bit, MAX: 32bit
  * default encoding rule in python
---
## 2. Matching Pattern
### 2-1. Bruce-Force
* **O(MN)**
  ```python
  p  =  'is'
  t  = 'This is a book'

  def BruteForce(p, t):
    M = len(p)
    N = len(t)
    i  = 0 # an index for t
    j  = 0 # an index for t
    while j < M and i < N:
      if t[i] != p[j]:
        i = i - j 
        j = -1 # consdier the following expressions
      i += 1
      j += 1
    if j == M: return i - M # Success: the start index
    else: return -1
  print(BruteForce(p,t)) # 2
  ```
### 2-2. KMP Alogrithm
* **O(N)~O(MN)**
  ```python
### 2-3. Boyer-Moore Algorithm
---
## 3. Encryption
### 3-1. Caesar cipher
### 3-1. 단일 치환 복호화
* 빈도분석
### 3-3. bit array - xor
## 4. Compression
### 4-1. Run-length Encoding
### 4-2. BMP
### 4-2. 허프만 코딩