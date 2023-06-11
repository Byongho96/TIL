# Minimum Spanning Tree

# 1. 개요

신장 트리(Spanning Tree)는 그래프 내의 모든 노드를 포함하는 트리를 의미하며, **최소 신장 트리(Minimum Spanning Tree)**란 간선의 가중치 합이 최소가 되는 신장 트리를 말한다.

최소 신장 트리는 Greedy 기법을 이용하여 구할 수 있으며, 대표적으로 프림 알고리즘(Prim's algorithm)과 크루스칼 알고리즘(Kruskal's algorithm)이 있다.

# 2. 동작

## 2.1. 프림 알고리즘

1. 임의의 정점을 선택하여 하나의 정점을 갖는 최초의 트리를 구성한다.
2. 트리에 포함된 정점과 트리에 포함되지 않은 정점 간의 간선 중 가장 작은 가중치를 가지는 간선을 선택하여 트리에 추가한다.
3. 모든 정점이 트리에 포함될 때 까지 2를 반복한다.

## 2.2. 크루스칼 알고리즘

1. 그래프의 모든 간선의 집합 E을 만든다.
2. E의 간선들 중 가중치가 최소인 간선을 지운다.
3. 삭제된 간선이 가리키는 두 정점 x,y를 연결하여도 사이클이 발생하지 않는다면 연결한다.
4. 모든 정점이 연결되거나 E가 비워질 때까지 2~3을 반복한다.

# 3. 시간 복잡도

V: 노드의 갯수  
E: 간선이 갯수

간선이 많을수록 그래프의 경우 prim알고리즘이 유리하고, 간선이 적을수록 Kruskal 알고리즘이 유리하다.

## 3.1. 프림 알고리즘

O((V+E)logV)

- V개의 노드를 heap에서 V번 탐색하는 알고리즘 O(VlogV)
- E개의 간선을 탐색하는 과정 O(E)
- E개의 간선을 heap에 push하는 과정 O(ElogV)

## 3.2. 크루스칼 알고리즘

O(ElogE)

- E개의 간선을 정렬하는 과정 O(ElogE)
- E개의 간선을 탐색하는 과정 O(E)

# 4 구현

## 4.1. Prim

- **Python**

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
          # MST 인접 노드 중 최소 가중치의 노드를 탐색
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

## 4.2. Prim with heap

- **Python**

  ```python
  '''
  N     : 노드 갯수
  start : 시작 노드
  adjLst: 특정 노드의 인접 노드들과 가중치를 알 수 있는 컨테이너 자료
  '''
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

          # 새로 확정된 노드의 인접 노드들 거리 갱신
          for adj, adj_w in adjLst[nearest]:
              if not visited[adj] and adj_w < weight[adj]:
                  weight[adj] = adj_w
                  heapq.heappush(heap, (adj_w, adj))

      return sum(weight)
  ```

## 4.3. Kruskal

- **Python**

  ```python
  '''
  N     : 노드 갯수
  adjLst: 특정 노드의 인접 노드들과 가중치를 알 수 있는 컨테이너 자료
  '''
  # 트리의 루트 노드를 찾는 함수
  def find_set(par, x):
    while x != par[x]:
        x = par[x]
    return x

  # 두 트리를 병합하는 함수
  def union_by_rank(par, rank, x, y):
      X = find_set(par, x)
      Y = find_set(par, y)

      X_rank = rank[X]
      Y_rank = rank[Y]

      # 트리의 rank(depth)를 기준으로, 작은 것을 큰 것에 병합
      if X_rank == Y_rank:
          par[Y] = X
          rank[X] += 1
      elif rank[X] > rank[Y]:
          par[Y] = X
      else:
          par[X] = Y

  def kruskal(N, adjLst):
    par = [node for node in range(N)]   # 부모 노두 정보를 담는 리스트
    rank = [1] * N                      # 루트 노드의 depth

    # 간선 리스트를 만드는 과정. input에 따라 적절하게 설계
    edges = []
    for node1 in adjLst:
        for node2, weight in adjLst[node1]:
            edges.append((weight, node1, node2))
    edges.sort() # 간선정보를 가중치를 기준으로 오름차순 정렬

    mst_size = 0    # MST로 연결된 노드의 갯수
    sum_weight = 0  # MST를 연결하기 위한 총 비용

    for n1, ne, weight in edges:
        if find_set(par, n1) != find_set(par, n2):  # n1, n2가 다른 집합에 속해있을 경우
            union_by_rank(par, rank, n1, n2)  # par, rank모두 참조형 타입으로 넘겨줌
            sum_weight += weight
            mst_size += 1
            if mst_size == N:   # 모든 노드를 연결했다면 종료
                break

    return sum_weight
  ```
