# Tree
## 1. Definition
### 1-1. Characteristic
* **Non-linear Data Structure**
    * one data -> N data
* **Hierarchical Structure**
### 1-2. terms
* node
    * elements of the tree
* edge
    * line that links the parent node and the child node
* root node
    * the start node of the tree
* sibling node
    * nodes that have the same node as the parent node
* ancestor node
    * nodes from the parent node to the root node
* subtree
    * tree which is made when the edge to the parent node is removed
* descendant node
    * nodes in the subtree
* leaf node
    * node that doesn't have the child node
* degree
    * degree of a node
        * the number of child nodes
    * degree of a tree
        * the biggest degree of nodes in the tree
* height
    * height of a node
        * the number of edges between the current node and the root node
    * hegiht of a tree
        * the biggest height of nodes in the tree
---

## 2. Binary Tree
### 2-1. Definition
* **every node can have 2 child nodes at maximum**
### 2-2. Characteristics
* maximum numbor of ndes at level i == 2**i
    * 1 : 2**0
    * 1 1 : 2**1
    * 1 1 1 1 : 2**2
* (i + 1) < number of nodes of the tree which height is i < (2**(h+1) -1)
### 2-3. Types
* Full Binary Tree(포화이진트리)
    * 구글에 치면, 이건 Perfect Binary Tree이고, Full Binary Tree는 모든 노드의 자식노드가 0개 혹은 2개인 것
    * when the height is h, number of nodes is (2**(h+1) -1)
* Complete Binary Tree(완전이진트리)
    * when there're n nodes in the tree, there's no empty seat from the root node to the nth node
* Skewed Binary Tree(편향이진트리)
    * all the nodes have the only one node in the same direction
![types of trees](./images/Types_of_tree.jpg)
### 2-4. Traversal(basically dfs)
* **Preorder traversal**
    * parent -> left -> right
* **Inorder traversal**
    * left -> parent -> right
* **Postorder traversal**
    * left -> right -> pare
* tips
    * the number of nodes in subtee
        1. global cnt += 1 at every visit
        2. return 1 if leaf_node else (L + R + 1)
### 2-5. Expression of compelete binary tree with array
* root node = 1
* numbering from left to right
![expression of binary tree](./images/expression_binarytree.jpg)
* parent node = i // 2
* left child node = 2 * i
* right child node = 2 * i + 1
* the start node of level i = 2**i
* the size of the array = 2**(h + 1)
    * array[0] is empty
### 2-6. Expression of binary tree with array
* save child node using parent node as index
    * for traversal
    * left_child = []
    * right_child = []
    ```python
    # There's no relation between leftchild and rightchild
    # input(number of edges, parent node - child node)
    # 4
    # 1 2 1 3 3 4 3 5
    E = int(input())
    arr = list(map(int, input().split()))
    V = E + 1
    ch1 = [0] * (V + 1)
    ch2 = [0] * (V + 1)
    for i in range(E):
        p, c = arr[i*2], arr[i*2 + 1]
        if ch1[p] == 0:
            ch1[p] = c
        else:
            ch2[p] = c

    def preorder(n):
        if n:
            print(n)    # visit(n)
            preorder(ch1[n])
            preorder(ch2[n])

    preorder(root) # 1, 2, 3, 4, 5
    ```
* save parent node using child node as index
    * for finding the root or parents
    * parent = []
    ```python
    # There's no relation between leftchild and rightchild
    # input(number of edges, parent node - child node)
    # 4
    # 1 2 1 3 3 4 3 5
    E = int(input())
    arr = list(map(int, input().split()))
    V = E + 1
    par = [0] * (V + 1)
    for i in range(E):
        p, c = arr[i*2], arr[i*2 + 1]
        par[c] = p 

    def find_root(V):
        for i in range(1, V+1):
            if par[i] == 0:
                return i
    
    root = find_root(V)
    print(root) # 1
    ```

### 2-7. Expression Binary Tree(수식 트리)
* definition
    * leaf nodes: operand
    * non leaf nodes: operator
* traversal
    * inorder traversal -> infix notation
    * postorder traversal -> postfix notation
    * preorder traversal -> prefix notation

### 2-8. Binary Search Tree(이진탐색트리)
* characteristics
    * left subtrees < root node < right subtree
    * inorder traversal -> sorted
* search
    * if key == root; end
    * elif key < root; search the left subtree
    * elif key > root; search the right subree
* Time complexity for insert, delete, access
    * O(h) 
        * average: O(log N)
        * worst: O(log N)
* Python implementation
```python
class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    # 생성자
    def __init__(self, root):
        self.root = root
    # 추가
    def insert(self, value):
        self.cur = self.root
        while True:
            if value < self.cur.value:
                if self.cur.left:
                    self.cur = self.cur.left
                else:
                    self.cur.left = Node(value)
                    break
            else:
                if self.cur.right:
                    self.cur = self.cur.right
                else:
                    self.cur.right = Node(value)
                    break
    # 검색
    def search(self. value):
        self.cur = self.root
        while self.cur:
            if value == self.cur.value:
                return True
            elif value < self.cur.value:
                self.cur = self.cur.left
            else:
                self.cur = self.cur.right
        return False

    # 삭제
    def delete(self, value):
        # 노드 검색
        is_exist = False
        self.cur = self.root
        self.par = None
        while self.cur:
            if value == self.cur.value:
                is_exist = True
                break
            elif value < self.cur.value:
                self.par = self.cur
                self.cur = self.cur.left
            else:
                self.par = self.cur
                self.cur = self.cur.right
        if is_search == False:
            return False

        # 자식 노드가 없을 때
        if self.cur.left == None and self.cur.right == None
            # 부모의 왼쪽 자식일 때
            if value < self.par.value:
                self.par.left = None
            # 부모의 오른쪽 자식일 때
            else:
                self.par.right = None

        # 왼쪽 자식 노드만 있을 때
        elif self.cur.left and self.cur.right == None
             # 부모의 왼쪽 자식일 때
            if value < self.par.value:
                self.par.left = self.cur.left
            # 부모의 오른쪽 자식일 때
            else:
                self.par.right = self.cur.left

        # 오른쪽 자식 노드만 있을 때
        elif self.cur.left == None and self.cur.right
             # 부모의 왼쪽 자식일 때
            if value < self.par.value:
                self.par.left = self.cur.right
            # 부모의 오른쪽 자식일 때
            else:
                self.par.right = self.cur.left

        # 자식 노드 2개
        else:
            # 왼쪽 서브트리 중 가장 오른쪽
            # 오른쪽 서브트리 중 가장 왼쪽
            self.change = self.cur.right
            self.change_par = self.cur
            while change.left:
                self.change_par = self.cur
                self.change = self.cur.left

            if self.change.right:
                self.change_par.left = self.change.right
            else:
                self.change_par.left = self.None
            
             # 부모의 왼쪽 자식일 때
            if value < self.par.value:
                self.par.left = self.change
                self.change.left = self.change.left
                self.change.right = self.change.right
            # 부모의 오른쪽 자식일 때
            else:
                self.par.right = self.cur.left
                self.change.left = self.change.left
                self.change.right = self.change.right
        return True





    # 출력
    def dump(self):
        def inorder(node):
            if node:
                inorder(node.left)
                print(node.value)
                inorder(node.right)
        root = self.root
        inorder(root)

```

## 3. heap
### 3-1. definitoin
**complete binary tree structure for finding the maximum of minimum node**
* max heap
    * parent node > child node
* min heap
    * parent node < child node
* Python implementation
```python
class Heap:
    def __init__(self):
        self.heap = [None]
    
    def insert(self, value):
        self.append(value)
        index = len(self.heap) - 1
        while index != 1:
            par_index = self.parent(index)
            if self.heap[par_index] < self.heap[index]:
                self.swqp(par_index, index)
                index = par_index
            else:
                break
    
    def delete(self):
        index = len(self.heap) - 1
        if len(heap) == 0:
            return False
        self.swap(1, index)
        max_value = self.heap.pop()
        self.maxHeapify(0)
        return max_value

    def maxHeapify(self, i):
        left = self.left(i)
        right = self.right(i)
        mx_idx = i

        if left < len(self.heap) and self.heap[mx_idx] < self.heap[left]:
            mx_idx = left
        if right < len(self.heap) and self.heap[mx_idx] < self.heap[right]:
            mx_idx = right
        
        if mx_idx != i:
            self.swap(i, mx_idx)
            self.maxHeapify(mx_idx)

    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def parent(self, i):
        return i // 2
    
    def left(self.i):
        return 2 * i
    
    def right(self.i):
        return 2 * i + 1

```
### 3-2. Djkstra with heapq
```python
import heapq
import sys

def dijkstra(start):
    distance = [sys.maxsize for _ in range(N)]
    distance[start] = 0
    q = []
    heapq.heappush(q, (0, start))
    while q:
        # 힙의 데이터 최단거리 추출
        dist, now = heapq.heappop(q)
        # 업데이트 되기 전 정보이면 무시
        if dinstance[now] < dist:
            continue
        for w in adjLst[now]:
            cost = dist + w[1]
            if cost < distance[w[0]]:
                distance[w[0]] = cost
                heapq.heappush(q, (cost, w[0]))
```