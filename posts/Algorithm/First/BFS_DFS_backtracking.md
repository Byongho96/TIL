1. 모든 경로 탐색(가능 여부): DFS, BFS
2. 경로의 수: DFS, (BFS)
2. 최단거리 탐색: BFS, (DFS)
3. 출발이 여러개: BFS

* BFS와 DFS 모두 반복의 경우, while과 for사이에서 visit(v)
* DFS_재귀함수의 경우, 보통 넘기고 -> 종료조건이나 가지치기 체크 후 -> visit(v) 
* DFS_재귀함수의 경우 넘길 인자를 잘 선택하고, 넘기지 않고 reset할 경우 reset할 위치를 잘 선택! for문 혹은 for문 밖

## 1. SWEA_1219_길찾기
[SWEA_1219_길찾기](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV14geLqABQCFAYD)
* BFS < DFS_recursive < DFS_while
* **DFS_while**
```python
def dfs_while(v):
    visited = [0] * 100
    stk = []

    visited[v] = 1
    while True:
        # visit(v)
        if v == 99:
            return 1
        # 기본구조
        for w in adjLst[v]:
            if visited[w] == 0:
                stk.append(v)
                v = w
                visited[v] = 1
                break
        else:
            if stk:
                v = stk.pop()
            else:
                break
    return 0


while True:
    try:
        T, E = map(int, input().split())

        arr = list(map(int, input().split()))
        adjLst = [[] for _ in range(100)]
        for i in range(E):
            a, b = arr[i*2], arr[i*2 +1]
            adjLst[a].append(b)

        result = dfs_while(0)

        print(f'#{T} {result}')
    except:
        break
```
* **DFS_recursive**
```python
def dfs_recursive(v):
    global result
    # 종료조건 or visit(v)
    if v == 99:
        result = 1
        return
    # 기본구조
    else:
        visited[v] = 1
        for w in adjLst[v]:
            if visited[w] == 0:
                v = w
                dfs_recursive(v)

while True:
    try:
        T, E = map(int, input().split())

        arr = list(map(int, input().split()))
        adjLst = [[] for _ in range(100)]
        for i in range(E):
            a, b = arr[i*2], arr[i*2 +1]
            adjLst[a].append(b)

        visited = [0] * 100
        stk = []
        visited[0] =  1

        result = 0
        dfs_recursive(0)

        print(f'#{T} {result}')
    except:
        break
```
* **BFS**
```python
def bfs(v, N, t):   # v 시작 정점,(N 마지막 정점 번호, t 찾는 정점)
    visited = [0] * 100 # 100 == (N + 1)
    q = []

    q.append(v)
    visited[v] = 1
    while q:
        v = q.pop()
        # visit(v)
        if v == 99:     # 99 == t
            return 1
        for w in adjLst[v]:
            if visited[w] == 0:
                q.append(w)
                visited[w] = visited[v] + 1
    return 0

while True:
    try:
        T, E = map(int, input().split())

        arr = list(map(int, input().split()))
        adjLst = [[] for _ in range(100)]
        for i in range(E):
            a, b = arr[i*2], arr[i*2 +1]
            adjLst[a].append(b)

        result = bfs(0, 99, 99)

        print(f'#{T} {result}')
    except:
        break
```

## 2. miro
* BFS < DFS_while < DFS_recursive
Test Case 수
N = N*N 미로
13101
10101
10101
10101
10021
0: 통로, 1: 벽, 2: 출발점, 3: 도착점
-> 도착가능하면 1, 아니면 0
```python
'''input
3
5
13101
10101
10101
10101
10021
5
10031
10111
10101
10101
12001
5
00013
01110
21000
01111
00000
'''
'''output
#1 1
#2 1
#3 0
'''
```
* **DFS_while**
```python
def dfs_while(v):
    visited = [0] * 100
    stk = []

    visited[v] = 1
    while True:
        # visit(v)
        if v == 99:
            return 1
        # 기본구조
        for w in adjLst[v]:
            if visited[w] == 0:
                stk.append(v)
                v = w
                visited[v] = 1
                break
        else:
            if stk:
                v = stk.pop()
            else:
                break
    return 0


while True:
    try:
        T, E = map(int, input().split())

        arr = list(map(int, input().split()))
        adjLst = [[] for _ in range(100)]
        for i in range(E):
            a, b = arr[i*2], arr[i*2 +1]
            adjLst[a].append(b)

        result = dfs_while(0)

        print(f'#{T} {result}')
    except:
        break
```
* **DFS_recursive**
```python
def dfs_recursive(i, j, N):
    global result
    # 종료조건 or visit(v)
    if maze[i][j] == 3:
        result = 1
        return
    # 기본구조
    else:
        visited[i][j] = 1
        # 함수호출
        for di, dj in ((0, 1), (1, 0), (0, -1), (-1, 0)):
            ni, nj = i+di, j+dj
            if 0<=ni<N and 0<=nj<N and maze[ni][nj]!=1 and visited[ni][nj]==0:
                dfs_recursive(ni, nj, N)
        # visited[i][j] = 0 서로 다른 분기들의 경로가 겹치지 않게 할 때 추가!
        return

T = int(input())
for t in range(1, T+1):
    N = int(input())
    maze = [list(map(int, input())) for _ in range(N)]
    
    si, sj = -1, -1
    for i in range(N):
        for j in range(N):
            if maze[i][j] == 2:
                si, sj = i, j
                break
        if si != -1:
            break
    
    result = 0
    visited = [[0]*N for _ in range(N)]
    dfs_recursive(si, sj, N)

    print(f'#{t} {result}')
```
* **BFS**
```python
def bfs(i, j, N):
    visited = [[0]*N for _ in range(N)]
    q = []

    q.append((i, j))
    visited[i][j] = 1

    while q:
        i, j = q.pop(0)
        # visit(v)
        if maze[i][j] == 3:     # 99 == t
            return 1
        for di, dj in ((0, 1), (1, 0), (0, -1), (-1, 0)):
            ni, nj = i+di, j+dj
            if 0<=ni<N and 0<=nj<N and maze[ni][nj]!=1 and visited[ni][nj]==0:
                q.append((ni, nj))
                visited[ni][nj] = visited[i][j] + 1
    return 0

T = int(input())
for t in range(1, T+1):
    N = int(input())
    maze = [list(map(int, input())) for _ in range(N)]
    
    si, sj = -1, -1
    for i in range(N):
        for j in range(N):
            if maze[i][j] == 2:
                si, sj = i, j
                break
        if si != -1:
            break
    
    result = bfs(si, sj, N)
    print(f'#{t} {result}')
```