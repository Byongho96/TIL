# Dijsktra

# 1. 개요

음의 가중치가 없는 그래프의 한 노드에서 다른 모드 노드까지의 최단거리를 각각 구하는 알고리즘. 대표적으로 사용되는 **그리디 알고리즘**이다.

# 2. 동작

1. 시작 노드를 선정한다.
2. 방문하지 않은 노드 중 가장 가까운 노드를 선택한다.
3. 선택된 노드를 방문하고, 인접 노드들의 거리를 갱신한다.
4. 모든 노드를 방문할 때까지 2~3의 과정을 반복한다.

# 3. 시간 복잡도

V: 노드의 갯수
E: 간선의 갯수

## 3.1. Basic

동작 과정 2번에 의해 시간복잡도가 결정된다.

- **O(V^2)**  
   V개의 노드 중 가장 가까운 노드를 선형탐색하는 과정이 V번 수행 된다.

## 3.2. with Heap

heap을 사용할 경우, 시간복잡도 결정인자가 노드 갯수(V)에서 간선 갯수(E)로 바뀐다. 하지만 고전된 노드 갯수에 대해 가장 많은 간선을 가진 완전그래프를 고려하더라도 V와 E는 다음과 관계가 성립한다.
`V <= E(E-1)/2`
`V < E^2`

- **O(E\*logV)**  
   E개의 간선을 힙에 넣고 빼는 과정이 E번 이루어진다.
  `O(E*logE)`
  `O(E*log(V^2))`
  `O(2*E*logV)`
  `O(E*logV)`

# 4. 구현

## 4.1. Basic

- **Python 코드**

  ```python
  '''
  V     : 노드 갯수
  start : 시작 노드
  adjLst: 특정 노드의 인접 노드들과 가중치를 알 수 있는 컨테이너 자료
  '''
  def dijkstra(V, start, adjLst):
    # 초깃값 셋팅
    distance = [INF] * (V)      # 시작점부터 다른 노드까지의 거리
    visited = [False] * (V)     # 거리 계산 완료 여부

    # 시작점 지정
    distance[start] = 0

    # 메인 코드
    for _ in range(V):
        # 거리 계산이 완료되지 않은 노드 중 가장 가까운 노드 선정
        mn = INF
        nearest = -1
        for node in range(V):
            if not visited[node] and distance[node] < mn:
                mn = distance[node]
                nearest = node

        visited[nearest] = True    # 해당 노드 거리 확정

        # 새로 거리 확정된 노드의 인접 노드들 거리 갱신
        for adj, weight in adjLst[nearest]:
            # if not visited[adj]:
            distance[adj] = min(distance[adj], distance[nearest] + weight)

    return distance
  ```

## 4.2. with Heap

- **Python 코드**

  ```python
  '''
  V     : 노드 갯수
  start : 시작 노드
  adjLst: 특정 노드의 인접 노드들과 가중치를 알 수 있는 컨테이너 자료
  '''
  def dijkstra(V, start, adjLst):
  # 초깃값 셋팅
  distance = [INF] * (V+1)    # 시작점부터 다른 노드까지의 거리

  # 시작점 지정
  heap = []
  heapq.heappush(heap, (0, start))
  distance[start] = 0

  while heap:
      # 힙에서 가장 낮은 가중치를 가진 노드를 heap에서 pop
      dist, nearest = heapq.heappop(heap)

      # 이미 거리 계산이 완료된 노드 무시하기: Basic Dijkstra에서 visited 배열을 기능을 담당
      if distance[nearest] < dist:
          continue

      # 해당 노드 거리가 확정되는 시점

      # 인접 노드들의 거리 재계산하여 heap에 push
      for adj, weight in adjLst[nearest]:
          new_dist = dist + weight
          if new_dist < distance[adj]:
              distance[adj] = new_dist
              heapq.heappush(heap, (new_dist, adj))

  return distance
  ```
