---
title: '백트래킹(Backtracking) 알고리즘'
updatedAt: '2023-04-17'
createdAt: '2022-08-23'
isCompleted: true
reference:
---

# 1. 개요

상태공간이나 그래프의 노드를 모두 탐색하는 **완전탐색** 기반의 알고리즘이다.

다만, **가지 치기**를 통해 탐색할 필요성이 없는 노드(상태)들을 탐색 대상에서 제외함으로써 효율을 높인다.

# 2. 동작

1. 모든 상태를 트리 형태로 구조화한다.
2. 루트 노드부터 탐색을 시작한다.
3. 자식 노드 중 탐색하지 않은 노드를 깊이 우선 탐색한다.
4. 노드가 유망하지 않다고 판단 되면, 이전 분기점(부모 노드)로 돌아간다.
5. 완전 탐색하거나 해를 구할 때까지 3 ~ 4의 과정을 반복한다.

# 3. 시간 복잡도

- **O(V + E)**  
   최대 V개의 노드를 다 탐색하거나, 또는 모든 간선의 연결관계를 탐색해야 한다.
  - 인접 행렬의 경우, 노드의 갯수가 N^2 이고 간선의 갯수가 4\*N^2이므로 **O(N^2)**

# 4. 예시

백트래킹의 경우, 크게 **종료조건, 가지치기(가능할 경우), 자식 상태 탐색**에 대응하는 로직을 가진다.
문제 상황에 따라 다양하게 수정 및 적용이 가능하다. 아래는 백트래킹의 예시 중 하나인 백준의 알파 틱택토 문제에 대한 정답 로직을 첨부한다.

[백준 16571번 알파 틱택토](https://www.acmicpc.net/problem/16571)
백트래킹이 완전탐색 기반 알고리즘이라는 것을 잘 활용한 문제이다. 다음 자식 상태의 모든 값을 비교하여 최선의 결과를 반환함으로써 최종 결과 또한 최선의 결과를 도출한다.

- **Python**

  ```python
  '''
  <input>
  N: 최대 단계
  step: 현재 단계
  board: 틱택토 현재 상황

  <output>
  0: 현재 플레이어의 패배
  1: 비김
  2: 현재 플레이어의 승리
  '''
  def backtracking(N, step, board, player1, player2):

    current = player1
    previous = player2
    if step % 2:
        current = player2
        previous = player1

    # 종료조건1: 승패 판정
    if isWin(board, previous):
        return 0

    # 종료조건2: 게임이 더 진행될 수 없는 경우
    if N == step:
        return 1

    # 내가 둘 수 있는 경우의 수 중 최선을 반납
    best_result = 0
    for n in range(9):
        i, j = divmod(n, 3)
        if not board[i][j]:
            board[i][j] = current
            result = 2 - backtracking(N, step + 1, board, player1, player2)
            board[i][j] = 0
            best_result = max(best_result, result)
            if best_result == 2:
                break

    return best_result
  ```
