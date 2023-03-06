# Heap

## 1. 개요

여러 개의 값 중에서 가장 크거나 작은 값을 빠르게 찾기 위해 만든 **완전 이진 트리.**

## 2. 동작

아래 동작 설명은 최대힙을 기준으로 설명한다.

### 2.1. 데이터 삽입

1. 힙의 가장 끝의 자리에 노드를 삽입한다.
2. 해당 노드와 부모 노드를 서로 비교한다.
3. 해당 노드가 부모 노드보다 클 경우, 두 노드의 위치를 바꾼다.
4. 해당 노드가 부모 노드보다 작아지거나, 루트 노드가 될 때까지 2~3의 과정을 반복한다.

### 2.2. 데이터 삭제

1. 루트 노드를 제거한다.
2. 루트 자리에 가장 마지막 노드를 삽입한다.
3. 해당 노드와 자식 노드(들)을 비교한다.
4. 해당 노드가 자식 노드(들)보다 작을 경우, 두 노드의 위치를 바꾼다.
5. 해당 노드가 자식 노드(들)보다 커지거나, 리프 노드가 될 때까지 3~4의 과정을 반복한다.

## 3. 시간 복잡도

데이터의 크기 N

### 3.1. 데이터 삽입

**O(logN)**
트리의 깊이가 logN이기 때문에 최대 logN 번의 비교와 치환 연산이 일어난다.

### 3.2. 데이터 삭제

**O(logN)**
트리의 깊이가 logN이기 때문에 최대 logN 번의 비교와 치환 연산이 일어난다.

## 4. 구현

- **Python 코드**

  ```python
  # 참고한 블로그 글: https://daimhada.tistory.com/108

  class MaxHeap:

      # 생성자 함수
      def __init__(self):
          self.queue = []

      # 삽입 함수
      def insert(self, n):
          self.queue.append(n)        # 힙의 마지막에 노드 추가
          current_index = len(self.queue) - 1
          while 0 < current_index:    # 루트 노드가 될때까지 반복
              parent_index = self.parent(current_index)
              if self.queue[parent_index] < self.queue[current_index]:    # 부모 노드보다 클 경우
                  self.swap(parent_index, current_index)                  # 치환
                  current_index = parent_index
              else:                   # 그렇지 않을 경우, 비교 연산 중지
                  break

      # 삭제 함수
      def delete(self):
          last_index = len(self.queue) - 1
          if last_index < 0:
              return -1
          self.swap(0, last_index)    # 루트 노드와 마지막 노드 치환
          max_value = self.queue.pop()
          self.maxHeapify(0)          # 루트 노드로부터 masHeapify 동작
          return max_value


      # heapify 정렬 함수
      def maxHeapify(self, i):
          left_index  = self.left_child(i)
          right_index = self.right_child(i)
          last_index = len(self.queue) - 1

          max_index = i
          if left_index <= last_index and self.queue[max_index] < self.queue[left_index]:
              max_index = left_index
          if right_index <= last_index and self.queue[max_index] < self.queue[right_index]:
              max_index = right_index

          if max_index != i:  # 현재 노드가 자식 노드(들)보다 작을 경우, 현재 노드를 자식 노드와 치환
              self.swap(i, max_index)
              self.maxHeapify(max_index)

      # 보조 함수
      def swap(self, i, j):
          self.queue[i], self.queue[j] = self.queue[j], self.queue[i]

      def parent(self, i):
          return (i - 1) // 2

      def left_child(self, i):
          return 2 * i + 1

      def right_child(self, i):
          return 2 * i + 2

      # special methods
      def __str__(self):              # 출력
          return str(self.queue)

      def __getitem__(self, index):   # 인덱싱
          return self.queue[index]

      def __iter__(self):             # iterable
          self.index = 0
          return self

      def __next__(self):             # iterable
          if len(self.queue) <= self.index:
              raise StopIteration

          self.index += 1
          return self.queue[self.index - 1]

      def __contains__(self, item):   # in 메소드
          return item in self.queue

      def __bool__(self):             # Boolean 판단
          return bool(self.queue)
  ```
