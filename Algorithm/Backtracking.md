## Backtracking
: similar to ==DFS but reduce the number of cases== with appropriate condtion(pruning)
* Recursive function: when the depth is not deep
* Iteration with stack: when the dpeth is deep
* Review of DFS with recursive
    ```python
    # recursive
    def DFS(v, N):
        visited = [0] * 7
        visited[v] = 1  # strat point
        # print(v)
        for w in adjList[v]:
            if visited[w] == 0:
                DFS(w)
    ```
* Sturcture
    ```python
    def DFS(n, ...):    # n은 시작 위치. 보통 0으로 시작
        # 가지치기
        if :
            return
        # 종료조건
        if n >= N:  # if n == N이지만, 노이즈 고려로 현업에서는 >= 사용.
                    # N은 전달 받거나, 아니면 상위함수의 변수
            Process for the answer
            return

        # 하부함수 호출
        dfs(n+1, ...)   # 경우의 수 1
        dfs(n+1, ...)   # 경위의 수 2
    ```
**Powerset**
```python
## arr를 0부터 채워넣음
def backtrack(arr, n, N):
    global MAX_CANDIDATES
    c = [0] * MAX_CANDIDATES

    # 종료조건
    if n == N:
        process_solution(arr, n)

    # 하부함수 호출
    else:
        ncandidates = construct_candidates(arr, n, N, c)
        for i in range(ncandidates):    # ncanddiates는 2로 반환될 것
            arr[n] = c[i]                     # a[n]이 0 또는 1
            backtrack(arr, n + 1, N)

def process_solution(arr, n):
    global ans_lst
    lst = []
    for i in range(len(arr)):
        if arr[i]:
            lst.append(nums[i])
    ans_lst.append(lst)

def construct_candidates(arr, n, N, c):
    c[0] = True
    c[1] = False
    return 2

nums = list(map(int, input().split()))
NMAX = len(nums)
MAX_CANDIDATES = 2      # 트리가 나눠지는 경우의 수
bit_arr = [0] * NMAX    # bit 배열로 부분집합의 포함여부 결정
ans_lst = []

backtrack(bit_arr, 0, NMAX)
for ele in ans_lst:
    print(ele)          
# input = 1, 2, 3
# [1, 2, 3] [1, 2] [1, 3] [1] [2, 3] [2] [3] []      
```
**Permutation**
```python
## arr를 1부터 채워넣음
def backtrack(arr, n, N):
    global MAX_CANDIDATES
    c = [0] * MAX_CANDIDATES
    # 종료조건
    if n == N:
        for i in range(1, N + 1):
            print(arr[i], end=' ')
        print()
    # 후보군 가지 실행
    else:
        n += 1  # 0부터 시작되었으므로, 먼저 1을 증가시키고 시작
        ncandidates = construct_candidates(arr, n, N, c)
        for i in range(ncandidates):
            arr[n] = c[i]
            backtrack(arr, n, N)

def construct_candidates(arr, n, N, c):
    used_check = [False] * (NMAX + 1)

    for i in range(1, n):           # 해당 숫자가 이미 쓰였는지 판단하는 check_list 업데이트
        used_check[arr[i]] = True       # arr에 있는 숫자가, 곧 used_check의 인덱스

    ncandidates = 0                 # 후보군의 인덱스를 만드는 용도
    for i in range(1, N+1):
        if used_check[i] ==  False:      # 안쓰여진 숫자들을 다음 후보군, 가지들로 선택
            c[ncandidates] = i
            ncandidates += 1
    return ncandidates

NMAX = int(input())
MAX_CANDIDATES = NMAX                           # 트리가 나눠지는 경우의 수: 최대는 첫번재 수 고를 때, 숫자의 갯수 만큼
arr = [0] * (NMAX + 1)                          # bit 배열로 부분집합의 포함여부 결정
ans_lst = []

backtrack(arr, 0, NMAX)
```
* 1~5 개 중 3개를 골라 순열 만들기
```python
def permu_backtracking(n,r):
    if n == r:
        print(permu)
    else:
        for i in range(N):
            if not used[i]:
                used[i] = 1
                permu[n] = arr[i]
                permu_backtracking(n+1, r):
                used[i] = 0

N = 5
r =3
arr = [i for i in range(1, N + 1)]
used= [0] * N
permu= [0] * N
permu_backtracking(0, r):
```
```python
def backtrack(n, N):
    if n == N:
        print(P)
    else:
        for j in range(n, N):       # 본인을 포함한 뒤에 숫자들과 바꿔가며 N - n 개의 후보군 형성
            P[n], P[j] = P[j], P[n]
            backtrack(n+1, N)
            P[n], P[j] = P[j], P[n]     # 다음 for문을 위해 원상복구

P = [1, 3, 4]
backtrack(0, len(P))
# [1, 3, 4] [1, 4, 3] [3, 1, 4] [3, 4, 1] [4, 3, 1] [4, 1, 3]
```

**Subset Sum**
```python
# target을 만족하는 부분집합의 갯수만을 구하는 백트래킹 예시 
def subset_sum(n, N, sm, target):
    global answer
    # 종료조건
    if sm == target:
        answer += 1
        return
    elif n == N:
        return
    # 가지치기
    elif sm > target:
        return
    # 후보군 실행
    else:
        subset_sum(n+1, N, sm + A[n], target)    # A[i]가 포함된 경우
        subset_sum(n+1, N, sm, target)           # A[i]가 포함되지 않은 경우

A = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
answer = 0
subset_sum(0, len(A), 0, 10)
print(answer)   # 10
```
* Pascal

**n-Queen**
[BaekJoon_9663_N-Queen](../../Baekjoon/9663_N_Queen.py)
