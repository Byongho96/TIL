## 1. Algorithm
* The procedure to solve the problem
* **Pseudo code** or **Flow chart**
* **Good Algorithm**
    * accuracy
    * time(the amount of operations)
    * memory usage
    * simplicity(easy to be recognized)
    * opimization
* **Indicator of Performance**
    * Time complexity == O
        * the order of the highest order term
        * O(3\*n*\*2 + 2*n + 3) == O(n**2) 

## 2. Array
* ==in python == List==
* The Data structure arraying several data in a list
* control several data by only one variable
### 2-1. 1-Dimensional Array
* **Declaration**
    * Arr = list()
    * Arr = []
    * Arr = [0] * 10
* **Access**
    * by using index of a list

## 3. Sort
* Arraging more than one data according to certain criteria
* Types
    * Bubble
    * Counting
    * Selection
    * Quick
    * Insertion
    * Merge
### 3-1. Bubble Sort
* exchaing positions by comparing two adjacent elements
* **O(n\*\*2)**
```python
def BubbleSort(arr):
    N = len(arr)
    # for i: N-1 -> 1
    for i in range(N-1, 0, -1):
        # for j: 0 -> i-1
        for j in range(0, i):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
```

### 3-2. Counting Sort
* Counting how many times each element appears in the array
* limitation
    * **the elements could be expressed by int**
* **O(n+k)**
    * n = len(arr)
    * k = the biggest integer
```python
def CountingSort(arr, k):
    result = [0] * len(arr)
    # 0 ~ k
    # counts array starts with 0
    # check the last for-loop
    counts = [0] * (k + 1)
    # make counts array
    for i in range(0, len(arr)):
        counts[arr[i]] += 1
    # accumulate counts array
    for i in range(1, len(counts)):
        counts[i] += counts[i-1]
    # make results from behind of arr
    # stable sort
    for i in range (len(result)-1, -1, -1):
        counts[arr[i]] -= 1
        results[counts[arr[i]]] = arr[i]
```
### 3-3. Baby-Gin Game(Ex. Exaustive Search)**

#### 3-3-1. Exaustive Search
* a.k.a **Brute-force** or **generate-and-test**
* Check the number of all cases and return the result
* useful when the cases is not big
* Permutation
    * pick several elements and arrange them
    * nPr = n * (n-1) * (n-2) * ... * (n-r+1) = n! / (n-r)!
    * nPn = n!
    * Ex. making permutation for {1, 2, 3}
        ```python
        for i1 in range(1, 4):
            for i2 in range(1, 4):
                if i2 != i1:
                    for i3 in range(1, 4):
                        if i3 != i1 and i3 != i2:
                            print(i1, i2, i3)
        ```
#### 3-3-2. Greedy Algorithm
* **the solution for a local range** == ==**user design**==
* alternative of exaustive search
* **Procedure**
    1. Selecting solution
        * select the best solution
            * Ex. select the largest coin
    2. Feasiblity check
        * check whether the selected solution is feasible
            * Ex. check whether the coin is smaller than the change
    3. Solution check
        * check whether the problem is solved
            * Ex. check wheter all the change is returned
* Ex. 444345
    * counts = [0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0]
    * tri -> run
        * check tri repeatedly until there's none
        * check run repeatedly until there's none
        ```python
        num = 444345
        # adding two more space to complete tri-run check in one loop
        # depend on wheter you choose between using more memory or spending more time
        counts = [0] * 12
        # making counts array
        while num > 0:
            counts[num % 10] += 1
            num //= 10 

        i = 0
        tri  = run = 0
        while i < 10:
            # to check triplet
            if counts[i] >= 3:
                c[i] -= 3
                tri += 1
                continue
            # to check run
            if counts[i] >= 1 and c[i+1] >= 1 and c[i+2] >= 3=2:
                c[i] -= 1
                c[i+1] -= 1
                c[i+2] -= 1
                continue
            i += 1
        if run + tri == 2 : print('Baby Gin') 
        ```
### 3-4. Selection Sort
* **O(n\*\*2)**
    ```python
        def selectionSort(a, N):
            for i in range(N-1):
                minIdx = i
                for j in range(i+1, N):
                    if a[minIdx] > a[j]:
                        minIdx = j
                a[i], a[minIdx] = a[minIdx], a[i]
    ```
* find k_th minimum
    * O(n*k)
        ```python
        def selectionSort(a, k):
            for i in range(k):
                minIdx = i
                for j in range(i+1, len(a)):
                    if a[minIdx] > a[j]:
                        minIdx = j
                a[i], a[minIdx] = a[minIdx], a[i]
            return a[k-1] # k_th min
        ```
---
## 4. 2-dimensional Array
**list that has lists as elements**
### 4-1. traversal
* row-first
    ```python
    for i in range(N):
        for j in range(M):
            arr[i][j]
    ```
* column-first
    ```python
    for j in range(N):
        for i in range(M):
            arr[i][j]
    ```
* zig-zag
    ```python
    for i in range(N):
        for j in range(M):
            arr[i][j + (M - 1 - 2*j) * (i % 2)]
    ```
* using **delta**
    ```python
    # N * M
    di[] = [0, 1, 0, -1] # 우, 하, 좌, 상
    dj[] = [1, 0, -1, 0]
    for i in range(N):
        for j in range(M):
            for k in range(4):
                ni = i + di[k]
                nj = j + dj[k]
                if  0 <= ni < N and 0 <= nj < M
                    test(arr[ni][nj])
    ```
    ```python
    # N * M
    di[] = [0, 1, 0, -1] # (우, 하, 좌, 상) * 2
    dj[] = [1, 0, -1, 0]
    for i in range(N):
        for j in range(M):
            for d in range(1, 3):
                for k in range(4):
                    ni = i + di[k] * d
                    nj = j + dj[k] * d
                    if  0 <= ni < N and 0 <= nj < M
                        test(arr[ni][nj])
    ```
### 4-2. Transpose matrix
```python
arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for i in range(N):
    for j in range(N):
        if i < j:
            arr[i][j], arr[j][i] = arr[j][i], arr[i][j]
```
---
## 5. Subset
* the num of subset of n-array == 2**n
```python
# len(arr) == 4
bit = [0] * 4
for i in range(2):
    bit[0] = i
    for j in range(2):
        bit[1] = j
        for k in range(2):
            bit[2] = k
            for j in range(2):
                bit[3] = l
                print(bit)
```
* bit operator
    * **&**: bit AND
    * **|**: bit OR
    * **<<**: bit left(==*2)
    * **\>>**: bit right(//*2)
```python
# len(arr) == 4
arr = [1, 2, 3, 4, 5, 6]

n = len(arr)
for i in range(1<<n): #2**n bit
    subset = [0]
    for j in range(n):
        if i & (1<<j): # i's jth == 0? 
            subset.append[arr[j]]
    subsets.append(subset)
```
---
## 6. Search
**Types**
* Sequential search
* Binary search
* hash
### 6-1. Suequential Search
* **un-sorted**
    * **O(n)**: (n+1)/2
        ```python
        def SequentialSearch(a, n, key)
        i = 0
        while i < n and a[i] != key:
            i +=1
        if i < n: return i # serched
        else: return -1
        ```
* **sorted**
    * **O(n)**
        ```python
        def SequentialSearch2(a, n, key)
        i = 0
        while i < n and a[i] < key:
            i +=1
        if i < n and a[i] == key:
            return i # serched
        else: return -1
        ```
### 6-2. Binary Search
* **only for the sorted**
    * if data is inserted or deleted, the set has to be sorted again
    * **O(n)**
        ```python
        def BinarySearch(a, N, key):
            start = 0
            end = N-1
            while start <= end: # `<=`should be used!
                middle = (start + end) // 2
                if a[middle] = key:
                    return True
                elif a[middle] > key:
                    end = middle - 1
                else:
                    start = middle + 1
            return False
        ```
    * **O(log(n))**
        ```python
        def BinarySearch2(a, start, end, key):
            if start > end:
                return False
            else:
                middle = (start + end) // 2
                if a[middle] = key:
                    return True
                elif a[middle] > key:
                    return BinarySearch2(a, start, middle-1, key)
                else:
                    return BinarySearch2(a, middle+1,end, key)
        ```

.