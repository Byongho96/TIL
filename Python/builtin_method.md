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

# Keyword
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