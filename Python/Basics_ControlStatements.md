## Conditional Statement
  * **if... elif... else**
    ```python
    if <conditional_statement>:     # if
      <code_block>
    elif <conditional_statement_2>: # else if
      <code_block>
    else:                           # else
      <code_block>
    ```
  * **Contional Expression**
      ```python
      true_value if <condtional_statement> else false_value
      ```
---
## Loop statement
  * **while**
    ```python
    while <conditional_statement>:
      <code_block>
    ```
  * **for**
    ```python
    for <temp_var> in <iterable_object>:
      <code_block>
    ```
    * List comprehension
      * ```python
        [<expression> for <temp_var> in <iterable_object>]
        ```
      * 
        ```python
        list(<expression> for <temp_var> in <iterable_object>)
        ```
    * Dict comprehension
      * ```python
        {<expression1>: <expression2> for <temp_var1>, <temp_var2> in <iterable_object>}
        ```
      * 
        ```python
        dict(expression1>: <expression2> for <temp_var1>, <temp_var2> in <iterable_object>)
        ```
  * **loop control**
    * break
      * end a loop
    * continue
      * back to the **beginning** of a loop with ==next elements==
    * pass
      * nothing
      * just for filling the space
    * else
      * if the loop is ended  without break