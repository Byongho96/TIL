---
title: '03. Python Function'
updatedAt: '2022-12-22'
createdAt: '2022-11-08'
isCompleted: true
reference:
---

- [1. Function](#1-function)
  - [1.1. Type of Function](#11-type-of-function)
  - [1.2. Parameters and Arguments](#12-parameters-and-arguments)
    - [1.2.1. Default Parameter Value](#121-default-parameter-value)
    - [1.2.2. Arbitrary Arguments, \*args](#122-arbitrary-arguments-args)
    - [1.2.3. Keyword Arguments](#123-keyword-arguments)
    - [1.2.4. Arbitrary Keyword Arguments, \*\*kwargs](#124-arbitrary-keyword-arguments-kwargs)
    - [1.2.5. Mutable \& Immutable Parameter](#125-mutable--immutable-parameter)
- [2. Scope](#2-scope)
  - [2.1. LEGB Resolution Rule](#21-legb-resolution-rule)
  - [2.2. global keyword](#22-global-keyword)
  - [2.4. nonlocal keyword](#24-nonlocal-keyword)
- [3. First-Class Function](#3-first-class-function)

---

# 1. Function

**Code block that excutes the specific logic**

## 1.1. Type of Function

- **Built-in function**
  - functions bascially installed in Python
- **External function**
  - functions that can be used after being imported
- **User-defined function**
  - functions defined by the user

## 1.2. Parameters and Arguments

A **parameter** is the variable listed inside the parentheses in the function definition.
An **argument** is the value that is sent to the function when it is called.

### 1.2.1. Default Parameter Value

If the function is called without argument, it uses the default value

```python
def my_function(country = "Norway"):
    print("I am from " + country)

my_function("Sweden")   # I am from Sweden
my_function()           # I am from Norway
```

### 1.2.2. Arbitrary Arguments, \*args

The function will receive a tuple of arguments, and can access the items accordingly.

```python
def my_function(*kids):
    print(kids)
    print(type(kids))
    print('The youngest child is ' + kids[2])

my_function('Emil', 'Tobias', 'Linus')
# ('Emil', 'Tobias', 'Linus')
# <class 'tuple'>
# The youngest child is Linus
```

### 1.2.3. Keyword Arguments

If you send arguments with the key = value syntax, the order of the arguments does not matter.

```python
def my_function(child3, child2, child1):
    print("The youngest child is " + child3)

my_function(child1 = "Emil", child2 = "Tobias", child3 = "Linus")
# The youngest child is Linus
```

### 1.2.4. Arbitrary Keyword Arguments, \*\*kwargs

This way the function will receive a dictionary of arguments, and can access the items accordingly.

```python
def my_function(**kid):
    print("His last name is " + kid["lname"])

my_function(fname = "Tobias", lname = "Refsnes")
# His last name is Refsnes
```

### 1.2.5. Mutable & Immutable Parameter

- **Mutable Data**  
   **passed by value parameter.**  
   The operations in the function don't affect the original data.
- **Immutable Data**  
   **passed by reference parameter.**  
   The operations in the function <mark>affect the original data.</mark> To prevent this, the data should be deep copied

# 2. Scope

## 2.1. LEGB Resolution Rule

**The variables are searched in the following order.**

1. **Local Scope**  
   Inside of the cuurent function
2. **Enclosed Scope**
   Inside of the outer function, outside of the current function.
3. **Global Scope**
   Inside of the module(.py), outside of the enclosed scope.
4. **Built-in Scope**
   Python built-in varibles

## 2.2. global keyword

**Drives the varibale from the nearest outer function**  
If there is no corresponding variable, a global variable of that name is created.

```python
def myfunc():
    global x
    x = "fantastic"

myfunc()

print("Python is " + x)     # Python is fantastic
```

## 2.4. nonlocal keyword

**Drives the varibale from the nearest outer function**  
The variable must be defined in the enclosing function.

```python
def myfunc1():
    x = "John"
    def myfunc2():
        nonlocal x
        x = "hello"
    myfunc2()
    return x

print(myfunc1())    # hello
```

# 3. First-Class Function

- **Functions are objects**

  ```python
  def shout(text):
      return text.upper()

  yell = shout

  print (yell('Hello'))   # HELLO
  ```

- **Functions can be passed as arguments to other functions**

  ```python
  def shout(text):
      return text.upper()

  def whisper(text):
      return text.lower()

  def greet(func):
      # storing the function in a variable
      greeting = func("""Hi, I am created by a function
                      passed as an argument.""")
      print (greeting)

  greet(shout)
  # HI, I AM CREATED BY A FUNCTION PASSED AS AN ARGUMENT.
  greet(whisper)
  # hi, i am created by a function passed as an argument.
  ```

- **Functions can return another function**

  ```python
  def create_adder(x):
      def adder(y):
          return x+y

      return adder

  add_15 = create_adder(15)

  print (add_15(10))  # 25
  ```
