# Dynamic Programming

# 1. 개요

상태공간이나 그래프의 노드를 모두 탐색하는 **완전탐색** 기반의 알고리즘이다.
다만 하위 집합의 최적해를 기억해 재활용함으로써, 상위 집합의 해를 구하는 과정의 복잡도를 줄인다는 특징을 가진다.

동적계획법은 접근방식에 따라 크게 두가지로 나눌 수 있다. 문제 조건에 따라 더 적절한 방식을 골라 사용할 수 있따.

- **동적 계획법(상향식 접근)**  
  보통 말하는 동적 계획법은 상향식 접근을 말한다. 원하는 집합의 해를 얻기 위해서 가장 작은 부분 집합부터 해를 계산해 나간다.
  반복문을 사용해 비교적 빠른 한 편, 모든 부분 집합의 해를 계산해야한다.
- **메모이제이션(하향식 접근)**  
  메모이제이션을 동적 계획법을 하향식 접근으로 구현한 것이다. 원하는 집합의 해를 얻기 위해 필요한 부분집합의 해를 계산해 나간다.
  필요한 부분 집합의 해만 구할 수 있지만, 재귀로 구현되어 반복문보다 속도가 느릴 수 있다.

# 2. 동작

1. 크기가 N인 집합과 (N - k)인 부분집합의 관계를 찾는다.  
   k는 1 이상의 정수이며, 한 개 이상의 값이 할당 될 수 있다.
2. 가장 작은 부분집합의 해를 구한다.
3. 1에서 찾은 규칙과 2의 값을 이용하여 크기가 N인 부분집합까지의 해를 구한다.

# 3. 시간 복잡도

- **O(N)**  
   보통 크기가 N인 집합의 해를 구하기 위해 크기가 1인 집합부터 반복문을 활용하여 탐색해나가므로, N번의 반복을 통해 해를 구할 수 있다.

# 4. 예시

DP의 대표 문제 중 하나인 배낭싸기 문제를 예로 든다.

배낭싸기 문제는 기본적으로 2차원의 DP배열을 만들어서 풀이할 수 있다. 아래에서 행은 배낭의 최대 무게가 w(< W)인 부분집함를 말하고, 열은 첫번째 물건부터 n(< N)개의 물건이 주어진 부분집합을 말한다. 그리고 DP배열 안에 들어가는 값은 해당 부분집합에서 배낭에 넣을 수 있는 최대 가치를 말한다.

<table>
<tr>
<td>
무게\물건 갯수
</td>
<td>
0
</td>
<td>
1
</td>
<td>
2
</td>
<td>
3
</td>
<td>
...
</td>
<td>
N-2
</td>
<td>
N-1
</td>
<td>
N
</td>
</tr>
<tr>
<td>
0
</td>
<td>
0
</td>
<td>
0
</td>
<td>
0
</td>
<td>
0
</td>
<td>
...
</td>
<td>
0
</td>
<td>
0
</td>
<td>
0
</td>
</tr>
<tr>
<td>
1
</td>
<td>
0
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
2
</td>
<td>
0
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
3
</td>
<td>
0
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
...
</td>
<td>
...
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
W-2
</td>
<td>
0
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
W-1
</td>
<td>
0
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
<tr>
<td>
W
</td>
<td>
0
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
<td>
</td>
</tr>
</table>

- **초깃값 셋팅하기**
  - 배낭의 최대 무게가 0일 경우, 배낭에 넣을 수 있는 최대 가치는 0이다.
  - 주어진 물건이 0개 일 경우, 배낭에 넣을 수 있는 최대 가치는 0이다.
- **부분집합의 최적해와 상위집합의 최적해 관계 찾기**
  - DP[w][n] (1 <= w <= W, 1 <= n <= N) 의 경우를 생각해보자.  
    즉 가방의 최대 무게가 w이고, 첫번째 물건부터 n번째 물건이 주어졌을 때 가방에 최대로 넣을 수 있는 가치를 부분집합의 관계를 이용해 설명하면 다음과 같다.
  - DP[w][n] = max(DP[w][n-1], DP[w-k][n-1] + v) (k는 n번째 물건의 무게이고, v는 n번째 물건의 가치이다.)  
    n번째 까지의 물건이 주어졌을 때 모든 가짓 수는, n번째 물건을 넣지 못한 경우와 n번째 물건을 넣은 두 가지로 분리할 수 있다. 따라서 각각의 경우에 대한 최적해를 비교함으로써 n번째 까지의 물건이 주어졌을 때의 최적해를 얻을 수 있다.

## 4.1. DP

```python
def DP(N, MAX_WEIGHT, weight, value):
    # 행 : 가방의 최대 무게/ 열: i번째 물건
    # DP[i][j] : 무게가 i인 가방에 j번째 물건가지 고려했을 때, 최대로 넣을 수 있는 가치
    DP = [[0] * (N + 1) for _ in range(MAX_WEIGHT + 1)]

    for bag_weight in range(1, MAX_WEIGHT + 1):
        for obj_idx in range(1, N + 1):
            obj_weight = weight[obj_idx]  # n번째 물건의 무게
            obj_value = value[obj_idx]    # n번째 물건의 가치

            include_case = 0              # n번째 물건의 무게가 가방의 무게를 초과할 경우, default 값으로 0을 설정
            if bag_weight >= obj_weight:
                include_case = DP[bag_weight-obj_weight][obj_idx - 1] + obj_value
            exclude_case = DP[bag_weight][obj_idx - 1]
            DP[bag_weight][obj_idx] = max(include_case, exclude_case)  # max(n번째 물건을 넣는 경우, n번째 물건을 넣지 않는 경우)

    return DP[-1][-1]

if __name__ == "__main__":
    N, MAX_WEIGHT = map(int, input().split())

    weight = [0] * (N + 1)
    value = [0] * (N + 1)
    for i in range(1, N + 1):
        weight[i], value[i] = map(int, input().split())

    answer = DP_top_down(N, MAX_WEIGHT, weight, value)
    print(answer)

```

## 4.2. Memoization

```python
def DP_top_down(N, MAX_WEIGHT, weight, value):
    # 행 : 가방의 최대 무게/ 열: i번째 물건
    # DP[i][j] : 무게가 i인 가방에 j번째 물건가지 고려했을 때, 최대로 넣을 수 있는 가치
    DP = [[0] * (N + 1) for _ in range(MAX_WEIGHT + 1)]

    def memoization(bag_weight, obj_idx):
        # 베이스 조건
        if bag_weight <= 0 or obj_idx <= 0:
            return 0

        # memoization한 값이 있을 경우, 해당 값을 반환
        if DP[bag_weight][obj_idx]:
            return DP[bag_weight][obj_idx]

        # memoization한 값이 없을 경우, DP와 같은 방식으로 계산
        obj_weight = weight[obj_idx]
        obj_value = value[obj_idx]

        include_case = 0              # n번째 물건의 무게가 가방의 무게를 초과할 경우, default 값으로 0을 설정
        if bag_weight >= obj_weight:
            include_case = memoization(bag_weight-obj_weight, obj_idx - 1) + obj_value  # n번째 물건을 넣는 경우
        exclude_case = memoization(bag_weight, obj_idx - 1)                         # n번째 물건을 넣지 않는 경우
        DP[bag_weight][obj_idx] = max(include_case, exclude_case)                   # 결괏값 memoization

        return DP[bag_weight][obj_idx]  # 결괏값 반환

    return memoization(MAX_WEIGHT, N)  # 목표값부터 top-down방식으로 재귀호출

if __name__ == "__main__":
    N, MAX_WEIGHT = map(int, input().split())

    weight = [0] * (N + 1)
    value = [0] * (N + 1)
    for i in range(1, N + 1):
        weight[i], value[i] = map(int, input().split())

    answer = DP_top_down(N, MAX_WEIGHT, weight, value)
    print(answer)
```
