## 1. Brute-Force
* Permutation
* Combination
* Powerset
* Backtracking
* Dynamic Programming(memoization, tabulation)
* BFS, DFS
### 1-1. Perumutation
* iteration
```python
# {1, 2, 3}
for i1 in range(1, 4):
    for i2 in range(1, 4):
        if i2 != i1:
            for i3 in range(1, 4):
                if i3 != i2 and i3 != i1:
                    print(i1, i2, i3)
```
* recursive(Johnson-Trotter, Minimum-change)
```python
# array p[] with N elements
def perm(n, N):
    if n == N:
        print(p)
        return
    for i in range(n, N):
        p[n], p[i] = p[i], p[n]
        perm(n+1, N)
        p[n], p[i] = p[i], p[n]
```
* recursive sorted
```python
# array p[] with N elements
used = [0] * N
arr = [0] * N
def perm(n, N):
    if n == N:
        print(arr)
        return
    for i in range(N):
        if not used[i]:
            arr[n] = p[i]
            used[i] = 1
            pern(n+1, N)
            used[i] = 0
```
### 1-2. Combinations
* recursive
```python
# arr : len(arr) == N
# comb : len(comb) == R
def comb(n, r):
    if r == 0:
        print(comb)
        return
    elif n < r:
        return
    else
        comb[r-1] = arr[n-1]
        comb(n-1, r-1)
        comb(n-1, r)
comb(N, R)
```
### 1-3. Powerset
* iteration
```python
# a set of 4 elements
bit = [0] * 4
for i1 in range(2):
    bit[0] = 1
    for i2 in range(2):
        bit[1] = i2
        for i3 in range(2):
            bit[2] = i3
            for i4 in range(2):
                bit[3] = i4
                print(bit)
```
* binary counting iteration
```python
arr = [3, 6, 7, 1, 5, 4]
n = len(arr)

for i in range(1<<n): # 2**n == 부분집합의 갯수
    for j in range(n):
        if i & (1<<j):
            print(arr[j], end=' ')
    print()
```
* recursive
```python
arr = [0] * N
def powerset(n):
    if n == N:
        print(arr)
        return
    arr[n] = 0
    powerset(n+1)
    arr[n] = 1
    powerset(n+1)
```
### 1-4. Backtracking
* Brute-force with prunning
* N-Queen
```python
def N_Queen(n):
    if n == N:
        ans += 1
        return
    for j in range(N):
        if j not in q1 and (n+j) not in q2 and (n-j) not in q2:
            q1.append(j)
            q2.append(n+j)
            q3.append(n-j)
            N_Queen(n+1)
            q1.pop()
            q2.pop()
            q3.pop()
```
### 1-5. DFS
* recursive
```python
def DFS_recursive(v)
    visited[v] = 1
    for w in adjLst[v]:
        if not visited[w]:
            DFS_recursive[w]
```
* iteration(path)
```python
def DFS_iteration(v):
    visited = [0] * N
    stk = []

    visited[v] = 1
    while True:
        for w in adjLst[v]:
            if not visited[w]:
                stk.append(v)
                v = w
                visited[v] = 1
                break
        else:
            if stk:
                v= stk.pop()
            else:
                break
```
* iteration(selection)
* Not technically DFS, but for brute force
```python
def DFS_iteration2(v):
    visited = [0] * N
    stk = []
    
    stk.append(v)
    visited[v] = 1
    while stk:
        v = stk.pop()
        for w in adjLst[v]:
            if not visited[w]:
                stk.append(w)
                visited[w] = 1
```
```python
def DFS_iteration2(v):
    visited = [0] * N
    stk = []
    
    stk.append(v)
    while stk:
        v = stk.pop()
        if not visited[v]:
            visited[v] = 1
            # visit(V)
            for w in adjLst[v]:
                if not visited[w]:
                    stk.append(w)
```
### 1-6. BFS
* iteration
```python
def bfs(v):
    visited = [0] * N
    q = deque()
    
    q.append(v)
    visited[v] = 1
    
    while q:
        v = q.popleft()
        for w in adjLst[v]:
            if not visited[w]:
                visited[w] = visited[v] + 1
                q.append(w)
```
* shortest path
```python
def bfs(v):
    distance = [INF] * (N)
    q =deque()

    q.append(v)
    distance[v] = 0

    while q:
        v = q.popleft()
        for w, d in adjLst[v]:
            if distance[w] > distance[v] + w:
                distance[w] = distance[v] + w
                q.append(w)

    return distance[-1]
```
## 2. Greedy(Proved)
### 2-1. Prim
* Basic
```python
def prim(s):
    weight = [INF] * (V + 1)
    MST = [0] * (V + 1)

    weight = 0
    MST[s] = 1

    for _ in range(V):
        mn = INF
        i_min = -1
        for i in range(V+1):
            if not MST[i] and weight[i] < mn:
                mn = weight[i]
                i_min = i
        MST[i_min] = 1
        for adj, w in adjLst[i_min]:
            if not MST[adj]:
                weight[adj] = min(weight[adj], w)
    
    print(sum(weight))
```
* heap
```python
def prim(start, edges):
    mst = []
    adjLst = [[] for _ in range(V+1)]
    for w, n1, n2 in edges:
        adjLst[n1].append((w, n1, n2))
        adjLst[n2].append((w, n2, n1))
    
    connected = set(start)
    edges_heap = adjLst[s]
    heapify(edges_heap)

    while edges_heap:
        w, n1, n2 = heappop(edges_heap)
        if n2 not in connected:
            connected.add(n2)
            mst.append((w, n1, n2))

            for edge in adjLst[n2]:
                if edge[2] not in connected:
                    heappush(edges_heap, edge)
```
### 2-2. Kruskal
* Kruskal
```python
V, E = map(int, input().split())
par = [i for i in range(V + 1)]
rank = [0] * (V + 1)

def find_set(x):
    while x != par[x]:
        x = par[x]
    return x

# union by rank
def union(x, y):
    X = find_set(x)
    Y = find_set(y)
    if rank[X] == rank[Y]:
        par[Y] = X
        rank[X] += 1
    elif rank[X] < rank[Y]:
        par[X] = Y
    else:
        par[Y] = X

cnt = 0
weight = 0
edges.sort(key=weight)
for a, b, w in edges:
    if find_set(a) != find_set(b):
        union(a, b)
        weight += w
        cnt += 1
        if cnt == V:
            break

print(weight)
```
### 2-3. Dijkstra
* Basic
```python
def dijkstra(s):
    distance = [INF] * (V+1)
    visited = [0] * (V+1)

    distance[s] = 0
    visited[s] = 1
    for _ in range(V):
        mn = INF
        i_min = -1
        for i in range(V+1):
            if not visited[i] and distance[i] < mn:
                mn = distance[i]
                i_min = i
        visited[i_min] = 1
        for w, d in adjLst[i_min]:
            # if not visited[w]:
            distance[w] = min(distance[w], distance[i_min] + d)
            
    return distance[-1]
```
* heap
```python
def dijkstra(s):
    distance = [INF] * (V+1)
    heap = []
    heapq.heappush(heap, (0, s))
    distance[s] = 0

    while heap:
        d, v = heapq.heappop(heap)
        if distance[now] < dist:    # 현재 노드가 처리된적 있다면 무시 
            continue
        for next in adjLst[now]:   # 현재 노드의 주변 노드를 탐색
            cost = dist + next[1]
            if cost < distance[next[0]]:    # 현재 노드를 거치는 것이 더 빠를 경우
                distance[next[0]] = cost
                heapq.heappush(q, (cost, i[0]))
```
### 2-4. Bellman-Ford
* minus edge, and minus cycle
    * 방문하지 않은 노드 뿐만 아니라, 모든 간선에 대해서 최단거리를 확인
    * N개의 정점에 대해서 N번째 갱신 시, 테이블의 변화가 있다면 음수 사이클이 존재
```python
def Bellman_Ford(s):
    dist[s] = 0
    for i in range(V):
        for j in range(E):      # 간선기준으로 업데이트 실행
            cur = edges[j][0]
            next = edges[j][1]
            cost = edges[j][2]
            if dist[cur] != INF and dist[next] > dist[cur] + cost:  # 연결된 간선 중 업데이트 요소가 있는 경우
                dist[next] = dist[cur] + cost
                if i == V - 1:
                    return True # V번째 반복에도 업데이트가 있으면 음의 사이클 존재
    return False

dist = [INF] * (V + 1)
edges = []
for _ in range(E):
    n1, n2, w = map(int, input().split())
    edges.append((n1, n2, w))

if Bellman_Ford(1): # 음의 순환
    print(-1)
else:
    print(destination)
```
### 2-5. Floyd-Warshall
* 모든 정점에서 모든 정점으로의 최단 경로
```python
graph = [[INF] * (n + 1) for _ in range(n + 1)]

for i in range(1, n + 1):
    graph[i][i] = 0

for _ in range(E):
    n1, n2, w = map(int, input().split())
    graph[n1][n2] = w

for k in range(1, n+1):
    for n1 in range(1, n+1):
        for n2 in range(1, n+1):
            graph[n1][n2] = min(graph[n1][n2], graph[n1][k] + graph[k][n2])

print[s][e]
```
### 2-7. Huffman tree

## 3. Topological Sorting
* 사이클이 없는 방향 그래프에서 모든 노드를 방향성에 거스르지 않도록 순차나열
* 진입차수(Indegree): 들어오는 간선 갯수
* 진출차수(Outdegree): 나가는 간선 갯수
```python
indgegree = [0] * (V+1)
adjLSt = [[] for _ in range(V+1)]

for _ in range(E):
    a, b = map(int, input().split())
    adjLst[a].apkpend(b)
    indegree[b] += 1

def topology_sort():
    result = []
    q = deque()

    for i in range(1, V+1):
        if indegree[i] == 0:
            q.append(i)

    while q:
        now = q.popleft()
        result.append(now)
        for i in adjLst[now]:
            indegree[i] -= 1
            if indegree[i] == 0:
                q.append(i)
    
    return result

topology_sort()
```