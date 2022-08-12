1. **module**
: ==python file== that contains functionas and vairiables
2. **package**
: ==directory== that contains moudules
3. **library**
: ==directory== that contains packages
```python
my_package/
    __init__.py # indicate that the current directory is a python package
                # It also has information about what kinds of package should be imported with the current directory
                # from . import <sub_pacakge_name>
    math/
        __init__.py
        tools.py  
```
---
## (from 'package.module') import 'data' (as 'nickname')
* name after 'import' must be expressed
* if you use '*' after import >> that means that importing all the functions form the module
---
## How to use package
|cmd|meaning|
|---|---|
|pip install somepackage;(==specific version);(>=minimum version)|install a package|
|pip uninstall somepackage|uninstall a package|
|pip list|show the packages that installed|
|pip show somepackage|show information of a pacakge|
|pip freeze > requirements.txt|save the list of current packages into requirements.txt|
|pip install -r requirements.txt|에 install packages in requirements.txt;'-r' have recursive characteristic|

---
## Key modules
### **import sys** (also could be used in cmd)
* sys.argv
    * return string list that has the parameters handed over by cmd
        `C:/User/home>python test.py here you are`
        ```python
        # test.py
        import sys
        print(sys.argv)
        print(type(sys.argv))
        # ['test.py', 'here', 'you', 'are']
        # <class 'list'>
        ```
* sys.modules
    * give the dictionry {'module on loading': module class of the directory}
        ```python
        import sys
        import sys
        m = sys.modules
        print(m['heapq'])
        print(type(m))
        print(type(m['heapq']))
        # <module 'heapq' from 'C:\\Users\\multicampus\\AppData\\Local\\Programs\\Python\\Python39\\lib\\heapq.py'>
        # <class 'dict'>
        # <class 'module'>
        ```
* sys.exit()
    * end the prgram == ctrl + z
    * arguement is defaulted as 0
        ```python
        import sys
        print("hello")
        sys.exit("program ended")
        # hello
        # program ended
        ```

* sys.path
    * give the list of directories of the initially setted modules
        ``` python
        import sys
        p1 = sys.path
        print(p1)
        print(type(p1))
        # ['c:\\Users\\multicampus\\Desktop\\test', 'C:\\Users\\multicampus\\AppData\\Local\\Programs\\Python\\Python39\\python39.zip',...]
        #<class 'list'> 
        ```
* sys.platform
    * give the string about the platform
        ``` python
        import sys
        print(sys.platform)
        print(type(sys.platform))
        # win32
        # <class 'str'>
        ```
* sys.ps(1)
    * USELESS
    * only can be used **in python console**
        ```
        >>> import sys
        >>> sys.ps1
        '>>>'
        >>> sys.ps1 = 'WWWWHAT'
        WWWHAT print('hello')
        hello
        WWWHAT
        ```
* sys.stdin
    * file object
        * the buffer waiting for input
        * get data including \n
        * end with '^Z' in cmd 
            ```python
            nums = []
            for line in sys.stdin:
                nums.append(line)
            print(nums)
            ```
            ```
            >>> 1
            >>> 2
            >>> 3
            >>> 4
            >>> 5
            >>> ^Z
            ['1\n', '2\n', '3\n', '4\n', '5\n']
            ```
    * sys.stdin.readline()
        * get the input until `'/n'`
        * including `'/n'`
            ```python
            import sys
            string = sys.stdin.readline()
            print(f'<{string}>')
            ```
            ```
            >>> input
            <input
            >
            ```
    * sys.stdin.readlines()
        * similar as sys.stdin

* sys.stdout()
    * file object which is used to display output to the screen console
    * Text is default data type
    * sys.stdout.write(str)
        * doesn't including `'/n'`
            ```python
            import sys
            sys.stdout.write('Hello')
            sys.stdout.write('Bello\n')
            sys.stdout.write('Hola')
            ```
            ```
            HelloBello
            Hola
            ```
* sys.version
    * give the string about the version fo python  
        ``` python
        import sys
        print(sys.version)
        print(type(sys.version))
        # 3.9.13 (tags/v3.9.13:6de2ca5, May 17 2022, 16:36:42) [MSC v.1929 64 bit (AMD64)]
        # <class 'str'>
        ```
### **import re**
* **meta charachters**
    * `'.'`: any one chr except \n 
    * `'c*'`: c can be repeated 0 ~ times
    * `'c+'`: c can be repeated 1 ~ times
    * `'c{n}'`: c can be repeated n times
    * `'c{m, n}'`: c can be repeated m ~ n times
    * `'c?'`: c can exist, also not
    * `'|'`: or
    * `'^abc'`: the line should start with abc
    * `'abc&'`: the line should end with abc
    * []: character class
        * combined with `or`
        * can be kinked with `-`
            ```python
            '[abc]' = 'a' or 'b' or 'c'
            '[a-z]' = 'a' ~ 'z'
            '[0-9]' = 0 ~ 9
            ```
        |original|shorten|explanantion|
        |---|---|---|
        |[0-9]|\d|nums|
        |[^0-9]|\D|not nums|
        |[\t\n\r\f\v]|\s|whitespace|
        |[^\t\n\r\f\v]|\S|not whitespace|
        |[a-zA-Z0-9]|\w|words+nums|
        |[^a-zA-Z0-9]|\W|not words+nums|
    * (): grouping
        * make groups that have index starting from 1
        ```python
        p = re.compile(r"(\w+)\s+(\d+[-]\d+[-]\d+)")
        m = p.search("park 010-1234-1234")
        print(m.group(1)) # park
        print(m.group(2)) # 010-1234-1234
        ```
    * `r''`: raw-string
        * remain \ as \
        * otherwise, \ have to be repeated twice

* re.compile(re) -> pattern object (p)
    * make pattern object by using the regular expression
    * re.findall(p, str) -> p.findall(str)

* re.findall(p, str) -> list
    * find all the substrings in the str that matches with p
    * return the list
        ```python
        string = 'The Regular Expresion'
        pattern = re.compile('[a-z]+')
        print(pattern.findall(string))
        # ['he', 'egular', 'xpresion']
        ```
* re.finditer(p, str) -> callable-iterator
    * find all the substrings in the str that matches with p
    * return the callable-iterator
        ```python
        string = 'The Regular Expresion'
        pattern = re.compile('[a-z]+')
        iter = pattern.finditer(string)
        print(iter) # <callable_iterator object at 0x00000274BD7FB640>

        for _ in range(2):
            for ele in iter:
                print(ele)
        # <re.Match object; span=(1, 3), match='he'>
        # <re.Match object; span=(5, 11), match='egular'>
        # <re.Match object; span=(13, 21), match='xpresion'>
        ```
* re.fullmatch(p, str) -> re.Match
    * return re.match object, when p == str
        ```python
        print(type(re.fullmatch('a', 'a')))
        print(re.fullmatch('a', 'a'))
        print(re.fullmatch('a', 'aaa'))
        ```
        ```
        <class 're.Match'>
        <re.Match object; span=(0, 1), match='a'>
        None
        ```
* re.search(p, str) -> re.Match
    * return re.match object about the first one in the str
        ```python
        print(type(re.search('a', 'ab aaa ca')))
        print(re.search('a', 'ab aaa ca'))
        print(re.search('a', 'db lkkh'))
        ```
        ```
        <class 're.Match'>
        <re.Match object; span=(0, 1), match='a'>
        None
        ```

* re.split(p, str, int) -> list
    * p is the breakpoint for splitting the str
        ```python
        print(re.split('a', 'abaabca')) # ['', 'b', '', 'bc', '']
        print(re.split('a', 'abaabca', 2)) # ['', 'b', 'abba']
        print(re.split('a', 'abaabca', 3)) # ['', 'b', '', 'bca']
        print(re.split('a', 'abaabca', 4)) # ['', 'b', '', 'bc', '']
        ```
* re.sub(p, s, str, int) -> str
    * change p in the string into the s for int times
        ```python
        print(re.split('a', 'z', 'aaab')) # zzzb
        print(re.split('a', 'z', 'aaab', 1)) # zaab
        ```
* re.subn(p, str, int) -> tuple(str, int)
    * change p in the string into the s for int times
        ```python
        print(re.split('a', 'z', 'aaab')) # ('zzzb', 3)
        print(re.split('a', 'z', 'aaab', 1)) # ('zaab', 1)
        ```
* re.match(p, str) -> re.Match
    * find p at the string's start
        ```python
        print(re.match('a','abaabca')) # <re.Match object; span=(0, 1), match='a'>
        print(re.match('a','baabca')) # None
        ```

### **import collections**
* collections.ChainMap
* collections.Counter
* collections.defaultdict
* collections.deque
* collections.namedtuple
* collections.OrderedDict
### **import heapq**
### **import functools**
### **import itertools**
### **import math**
### **import decimal**
### **import bisect**
### **import copy**
### **import os**
### **import pickle**