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

## 3 Sort
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
* O(n**2)
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
* O(n+k)
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
