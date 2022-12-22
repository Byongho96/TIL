# Python Basics (Control Statements)

## Index

- [1. Conditional Statement](#1-conditional-statement)
  - [1.1. if... elif... else](#11-if-elif-else)
  - [1.2. Ternary Operators](#12-ternary-operators)
- [2. Loop Statement](#2-loop-statement)
  - [2.1. while](#21-while)
  - [2.2. for](#22-for)
    - [2.2.1. Comprehension Expression](#221-comprehension-expression)
  - [2.3. Loop Control Keyword](#23-loop-control-keyword)

---

# 1. Conditional Statement

## 1.1. if... elif... else

```python
if conditional_statement:     # if
  <code_block>
elif conditional_statement_2: # else if
  <code_block>
else:                           # else
  <code_block>
```

## 1.2. Ternary Operators

```python
true_value if condtional_statement else false_value
```

---

# 2. Loop Statement

## 2.1. while

```python
while conditional_statement:
  <code_block>
```

## 2.2. for

```python
for temp_var in iterable_object:
  <code_block>
```

### 2.2.1. Comprehension Expression

- **List Comprehension**
  ```python
   [<expression> for temp_var in iterable_object (if conditional_statement)]
  ```
  ```python
   list(<expression> for temp_var in iterable_object (if conditional_statement))
  ```
- **Dict comprehension**

  ```python
    {<expression1>: <expression2> for temp_var in iterable_object (if conditional_statement)}
  ```

  ```python
    dict(expression1>: <expression2> for temp_var in iterable_object (if conditional_statement))
  ```

- **Set comprehension**

  ```python
    {<expression> for temp_var in iterable_object (if conditional_statement)}
  ```

  ```python
    set(<expression> for temp_var in iterable_object (if conditional_statement))
  ```

## 2.3. Loop Control Keyword

- **break**
  - end a loop
- **continue**
  - back to the **beginning** of the loop with **the next element**
- **else:**
  - It runs when the loop is completed without break
  ```python
  while:
    ...
  else:
    <code_block>
  ```

---
