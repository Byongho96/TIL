## !important
### 1. pass by reference parameter: mutable data
### 2. pass by value parameter: immutable data
### 3. for, while, if: is not the function.(not-local area)
## function
: a code block that can excute specific function(literally)
* Built-in function
    * bascially installe in Python
* External function
    * functions that can be used after imported
* User-defined function
    * something defined by a user
---
## Input
* **parameter**
: when define a function (below lists are semantically divided)
    * Default argument
    : argutment that has a default value
    : ==doesn't have to be expressed essentially==
    * Arbitrary argument(*arg)
    : transfer the undefined number of arguments as a tuple
        * Unpakcing (usin asterisk *)
        ```python
        numbers = (1, 2, 3, 4, 5)

        a, b *rest = numbers
        print(a, b, rest)   # 1, 2, [3, 4, 5]

        a, *rest, b = numbers
        print(a, b, rest)   # 1, [2, 3, 4], 5
        ```
    * Arbitrary keyword argument(**kawargs)
    : transfer the undefined number of arguments as a dictionary
* **argument**
: when call a function
    * Positional argument
    : basically arguments are transferred according to its position
    * Keyword argument
    : argument that nominates a parameter
    : ==must be used after positional argument==
---
## Scope
 * LEGB resolution rule
    * Local scope
    * Enclosed scope
    * Global scope
    * Built-in scope
* global
: drive a global variable
    * error: parameter(function) can't be defined by global
* nonlocal
: drive a varibale which is in the nearest outer function(except global varibale)
    * error: must be used on variable which is already defined
---
## Recursive function
: function that calls itself
* can use less vairables
* but also there is a possibility of stack overflow