## 1. Merge Sort
```python
def merge(left, right):
    result = []
    L = len(left)
    R = len(right)
    l, r = 0,  0 
    while l < L or r < R:
        if l < L and r < R:
            if left[l] <= right[r]:
                result.append(left[l])
                l += 1
            else:
                result.append(right[r])
                r += 1
        elif l < L:
            result.append(left[l])
            l += 1
        elif r < R:
            result.append(right[r])
            r += 1
    return result

def merge_sort(lst):
    L = len(lst)

    if L == 1:
        return lst

    m = L // 2
    left = merge_sort(:m)
    right = merge_sort(m:)

    return merge(left, right)
```
```python
def merge_sort(lst):
    L = len(lst)

    if L == 1:
        return lst

    m = L // 2
    left = merge_sort(:m)
    right = merge_sort(m:)

    result = []
    l = r = 0
    while l < len(left) and r < len(right):
        if left[l] < right[r]:
            result.append(left[l])
            l += 1
        else:
            result.append(right[r])
            r += 1
    result += left[l:] + right[r:]  # lst[index:]이면, index out of range가 아니라 그냥 빈 리스트 반환!!

    return result
```
## 2. Quick Sort
* Hoare-Partition
```python
def partition(l, r):
    pivot = lst[l]
    i = l
    j = r
    while i <= j:
        while i <= j and lst[i] <= pivot:
            i += 1
        while i <= j and lst[j] >= pivot:
            j -= 1
        if i < j:
            lst[i], lst[j] = lst[j], lst[i]
    lst[l], lst[j] = lst[j], lst[l]
    return j

def quick_sort(l, r):
    if l < r:
        s = partition(l, r)
        quick_sort(l, s-1)
        quick_sort(s+1, r)
```
* Lomuto partition
```python
def quick_sort(l, r):
    if l >= r:
        return
    
    p = lst[r]
    i = l
    for j in range(l, r):
        if lst[j] < p:
            lst[i], lst[j] = lst[j], lst[i]
            i += 1
    lst[i], lst[r] = lst[r], lst[i]

    quick_sort(l, i-1)
    quick_sort(i+1, r)
```

## 3. Binary Search
```python
def binarysearch(l, r, key):
    while l <= r:
        m = (l + r) // 2
        if lst[m] == key:
            return m
        elif lst[m] > key:
            r = m - 1
        else:
            l = m + 1
    return -1
```
