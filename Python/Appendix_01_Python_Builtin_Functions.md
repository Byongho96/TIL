# Python Built-in Functions

## Index

- [1. Built-in functions](#1-built-in-functions)
- [2. Built-in functions2](#2-built-in-functions2)
  - [2.1. del](#21-del)
  - [2.2. print](#22-print)
  - [2.3. enumerate(iterable, start=0)](#23-enumerate-iterable--start-0-)
  - [2.4. map(function, iterable)](#24-map-function--iterable-)
  - [2.5. filter(function, iterable)](#25-filter-function--iterable-)
  - [2.6. zip(\*iterable)](#26-zip---iterable-)
  - [2.7. lambda \*paramter: function](#27-lambda---paramter--function)

---

# 1. Built-in functions

| Function | description                                                 | input     | output                        | change |
| -------- | ----------------------------------------------------------- | --------- | ----------------------------- | ------ |
| dir()    | show all the varibales and functions(mehtods) in the object | object    | list;['variables', fucntions] | X      |
| id()     | return the memory address                                   | object    | int                           | X      |
| len()    | return the number of imtes in container                     | container | int                           | X      |
| min()    | return the minimum of an iterable data                      | iterable  | object                        | X      |
| max()    | return the maximum of an iterable data                      | iterable  | object                        | X      |
| ord()    | return the unicode poinit                                   | chr       | int                           | X      |
| sum()    | return the sum of an iterable data                          | iterable  | int                           | X      |
| type()   | return the type of object                                   | object    | type                          | X      |

# 2. Built-in functions2

## 2.1. del

- delete object
  ```python
  del obj_name
  ```
- delete (items in list) or (key in dict)

  ```python
  del my_list[0]
  del my_dict['name']
  ```

## 2.2. print

- formating

  ```python
  print('%d %f', %(200, 3.4))
  print('{:d} {:f}' .format(200, 3.4))
  print(f'{200:d} {3.4:f}')
  ```

- conversion specifier
  |specifier|conversion|
  |---|---|
  |%d, :d|decimal|
  |%o, :o|octal|
  |%x, :x|hexadecimal_lower|
  |%X, :X|hexadecimal_upper|
  |%f, :f|float|
  |%c, ~~:c~~|character|
  |%s, :s|string|
- conversion specifier applications
  |specifier|conversion|
  |---|---|
  |%10d, %5f, %20s</br>%>10d, %>5f, %>20s|width of the field</br>right aligned|
  |%010d, %05f, %020s|width of the field</br>right aligned</br>fill left with 0|
  |%-10d, %-5f, %-20s</br>%<10d, %<5f, %<20s|width of the field</br>left aligned|
  |%^10d, %^5f, %^20s|width of the field</br>center aligned|
  |%.2f, %5.2f|width of the field</br>decimal place of the float|
  |%.3s, %10.2s|width of the field</br>num of printed chr from the left|

## 2.3. enumerate(iterable, start=0)

return iterable elements paired with int that start with 'start' parameter

- return **enumerbate object**
- **tuples** are in the object

## 2.4. map(function, iterable)

apply the function to all the elements of iterable object \* return **map object**

## 2.5. filter(function, iterable)

apply the function to all the elments of iterable object, and remain elemetns which are ture \* return **filter object**

## 2.6. zip(\*iterable)

pair elements in different iterable object according to its index number

- when the len of iterable objects are different >> take short as a standard
- return **zip object**

## 2.7. lambda \*paramter: function

use for define a simple function \* only a simple conditinal statement can be used
