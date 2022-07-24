# Built-in functions

|Function|description|input|output|change|
|---|---|---|---|---|
|id()|return the memory address|object|int|X|
|len()|return the number of imtes in container|container|int|X|
|min()|return the minimum of an iterable data|iterable|object|X|
|max()|return the maximum of an iterable data|iterable|object|X|
|ord()|return the unicode poinit|chr|int|X|
|sum()|return the sum of an iterable data|iterable|int|X|
|type()|return the type of object|object|type|X|

# Key functions
* **dir(object)**
    * show all the varibales and functions(mehtods) in the object
    * return **list**
    * ['variables', fucntions]
* **del**
    * delete object
        ```python
        del obj_name
        ```
    * delete (items in list) or (key in dict)
        ```python
        del my_list[0]
        del my_dict['name']
        ```

* **print**
    * formating
        ```python
        print('%d %f', %(200, 3.4))
        print('{:d} {:f}' .format(200, 3.4))
        print(f'{200:d} {3.4:f}')
        ```
    * conversion specifier
        |specifier|conversion|
        |---|---|
        |%d, :d|decimal|
        |%o, :o|octal|
        |%x, :x|hexadecimal_lower|
        |%X, :X|hexadecimal_upper|
        |%f, :f|float|
        |%c, ~~:c~~|character|
        |%s, :s|string|
    * conversion specifier application
        |specifier|conversion|
        |---|---|
        |%10d, %5f, %20s</br>%>10d, %>5f, %>20s|width of the field</br>right aligned|
        |%010d, %05f, %020s|width of the field</br>right aligned</br>fill left with 0|
        |%-10d, %-5f, %-20s</br>%<10d, %<5f, %<20s|width of the field</br>left aligned|
        |%^10d, %^5f, %^20s|width of the field</br>center aligned|
        |%.2f, %5.2f|width of the field</br>decimal place of the float|
        |%.3s, %10.2s|width of the field</br>num of printed chr from the left|

* **enumerate(iterable, start=0)**
: return iterable elements paired with int that start with 'start' parameter
    * return **enumerbate object**
    * **tuples** are in the object
* **map(function, iterable)**
: apply the function to all the elements of iterable object
    * return **map objcet** 

* **filter(function, iterable)**
: apply the function to all the elments of iterable object, and remain elemetns which are ture
    * return **filter object**
* **zip(\*iterable)**
: pair elements in different iterable object according to its index number
    * when the len of iterable objects are different >> take short as a standard
    * return **zip object**

* **lambda \*paramter: function**
: use for define a simple function
    * only a simple conditinal statement can be used

//generator (수식 for in iterable if) or def ... yield