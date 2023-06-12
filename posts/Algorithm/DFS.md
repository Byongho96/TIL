---
title: '깊이 우선 탐색(Depth-First Search) 알고리즘'
updatedAt: '2023-04-17'
createdAt: '2023-03-14'
isCompleted: true
reference:
---

# 1. 개요

상태공간이나 그래프를 출발점에서 시작하여 모든 리프노드까지 순서대로 탐색하는 **완전탐색** 기반의 알고리즘이다.

## 1.1. 특징

- 루트 노드(상태)로부터 리프 노드(상태)까지 길이가 유한할 때만 사용가능하다.
- 노드 탐색 순서가 재귀적으로 표현될 때 적합하다.

# 2. 동작

아래는 DFS가 동작하는 하나의 예시일 뿐이다.

1. 시작 노드를 선정한다.
2. 인접 노드 중 방문하지 않은 노드를 스택에 추가한다.
3. 스택에서 노드를 꺼낸다.
4. 목적 노드에 도착할 때까지 2~3의 과정을 반복한다.

# 3. 시간 복잡도

V: 노드의 갯수
E: 간선의 갯수

- **O(N + E)**  
   최대 V개의 노드를 다 탐색하거나, 또는 모든 간선의 연결관계를 탐색해야 한다.
  - 인접 행렬의 경우, 노드의 갯수가 N^2 이고 간선의 갯수가 4\*N^2이므로 **O(N^2)**

# 4. 구현

- **Python 코드**  
  단순히 모든 노드를 완전탐색하는 DFS 알고리즘이다.

  ```python
  '''
  N     : 노드 갯수
  start : 시작 노드
  end   : 끝 노드
  adjLst: 특정 노드의 인접 노드를 알 수 있는 컨테이너 자료
  '''

  def dfs(N, start, end, adjLst):
      visited = [0] * N     # 방문 여부를 체크할 visited 배열
      stack = []            # 시작점부터 거리 순으로 노드를 저장할 큐

      # 시작점 셋팅
      stack.append(start)
      visited[start] = 1

      while stack:
          node = stack.pop()

          # 종료 조건
          if node == end:       # 목적 노드를 도달 시
            return True

          # 인접 노드 탐색
          for adj in adjLst[node]:
              if not visited[adj]:  # 방문하지 않은 노드 만 탐색
                  visited[adj] = True
                  stack.append(adj)

      return False # 목적 노드를 도달할 수 없음
  ```

  지나온 경로를 기억할 수 있는 DFS 알고리즘이다

  ```python
  '''
  N     : 노드 갯수
  start : 시작 노드
  end   : 끝 노드
  adjLst: 특정 노드의 인접 노드를 알 수 있는 컨테이너 자료
  '''
  def dfs_while(N, start, end, adjLst):
    visited = [False] * 100
    stack = []

    node = start
    visited[node] = True

    while True:
        # 종료 조건
        if node == end:
            path = stack + [node]
            return path

        # 인접 노드 탐색
        for adj in adjLst[node]:
            if not visited[adj]:
                stack.append(node)
                node = adj
                visited[node] = True
                break

        # 인접 노드 없을 시, 부모 상태 노드로 후퇴
        else:
            if stack:
                node = stack.pop()
            else: # 모든 노드 탐색 완료 시, 반복문 break
                break
    return False
  ```
