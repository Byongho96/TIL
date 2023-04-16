# Minimum Spanning Tree

# 1. 개요

# 2. 동작

# 3. 시간 복잡도

# 4 구현

## 4.1. Prim

- Basic

```python
'''
N     : 노드 갯수
start : 시작 노드
adjLst: 특정 노드의 인접 노드들과 가중치를 알 수 있는 컨테이너 자료
'''
def prim(N, start, adjLst):
    # 초깃값 셋팅
    weight = [INF] * N
    visited = [0] * N

    # 시작점 지정
    weight[start] = 0

    for _ in range(N):
        mn = INF
        nearest = -1
        for node in range(N):
            if not visited[node] and weight[node] < mn:
                mn = weight[node]
                nearest = node

        visited[nearest] = True # 해당 노드 MST에 포함

        # 새로 확정된 노드의 인접 노드들 거리 갱신
        for adj, adj_w in adjLst[nearest]:
            if not visited[adj]:
                weight[adj] = min(weight[adj], adj_w)

    return sum(weight)
```

- heap

```python
def prim_with_heap(N, start, adjLst):
    # 초깃값 셋팅
    weight = [INF] * N
    visited = [0] * N

    # 시작점 셋팅
    heap = []
    heapq.heappush(heap, (0, start))
    weight[start] = 0

    while heap:
        w, nearest = heapq.heappop(heap)

        if weight[nearest] < w: # 새로 거리가 갱신된 노드는 무시
            continue

        visited[nearest] = 1    # MST에 해당 노드 포함

        for adj, adj_w in adjLst[nearest]:
            if not visited[adj] and adj_w < weight[adj]:
                weight[adj] = adj_w
                heapq.heappush(heap, (adj_w, adj))

    return sum(weight)
```

## 4.2. Kruskal

- Kruskal

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
