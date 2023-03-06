# Breadth First Search

## 1. 개요

상태공간이나 그래프를 출발점으로부터 가까운 순으로 탐색해가는 **완전탐색** 기반의 알고리즘이다.

## 2. 동작

1. 시작 노드를 선정한다.
2. 인접 노드 중 방문하지 않은 노드를 큐에 추가한다.
3. 큐에서 노드를 꺼낸다.
4. 목적 노드에 도착할 때까지 2~3의 과정을 반복한다.

또한 가중치가 있는 경우에도 완전탐색을 기반으로 하여 최단거리를 구해낼 수 있다.

## 3. 시간 복잡도

N: 노드의 갯수
E: 간선의 갯수

### 3.1. Basic

- **O(N + E)**  
   최대 N개의 노드를 다 탐색하거나, 또는 모든 간선의 연결관계를 탐색해야 한다.
  - 인접 행렬의 경우, 노드의 갯수가 N^2 이므로 **O(N^2)**

### 3.2. Shortest Path

- **O(N + E)**  
   최대 N개의 노드를 다 탐색하거나, 또는 모든 간선의 연결관계를 탐색해야 한다.
  - 인접 행렬의 경우, 노드의 갯수가 N^2 이므로 **O(N^2)**

## 4. 구현

### 4.1. Basic

- **Python 코드**

  ```python
  '''
  N     : 노드 갯수
  start : 시작 노드
  end   : 끝 노드
  adjLst: 특정 노드의 인접 노드를 알 수 있는 컨테이너 자료
  '''
  from collections import deque

  def bfs(N, start, end, adjLst):
      visited = [0] * N     # 방문 여부를 체크할 visited 배열
      queue = deque()       # 시작점부터 거리 순으로 노드를 저장할 큐

      # 시작점 셋팅
      queue.append(start)
      visited[start] = 1

      while queue:
          node = queue.popleft()    # 시작점으로 가까운 순으로 탐색

          # 종료 조건
          if node == end:
            return visited[end] - 1

          # 인접 노드 탐색
          for adj in adjLst[node]:
              if not visited[adj]:  # 방문하지 않은 노드만 탐색
                  visited[adj] = visited[node] + 1
                  q.append(adj)

      return -1 # 목적 노드를 도달할 수 없음
  ```

### 4.2. Shortest Path

- **Python 코드**

  ```python
  '''
  N     : 노드 갯수
  start : 시작 노드
  end   : 끝 노드
  adjLst: 특정 노드의 인접 노드와 가중치를 알 수 있는 컨테이너 자료
  '''
  def bfs(N, start, end, adjLst):
      distance = [INF] * (N)    # 시작점으로부터 거리를 기록할 distance 배열
      queue =deque()            # 시작점부터 거리 순으로 노드를 저장할 큐

      # 시작점 셋팅
      queue.append(start)
      distance[start] = 0

      while queue:
          node = q.popleft()    # 시작점으로 부터 가중치를 고려하지 않은 가까운 순으로 탐색

          # 인접 노드 탐색
          for weight, adj in adjLst[node]:
              new_cost = distance[node] + weight    # 거리가 더 짧을 경우에만 탐색
              if distance[adj] > new_cost:
                  distance[adj] = new_cost
                  queue.append(adj)

      if distance[end] != INF:  # 목적지에 도착하는 경우
        return distance[end]
      return  # 목적 노드를 도달할 수 없음
  ```
