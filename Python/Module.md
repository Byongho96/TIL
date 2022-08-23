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
### 1. **import sys** (also could be used in cmd)
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
### 2. **import re**
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

### 3. **import collections**
* collections.ChainMap(dic1t, dict2) -> ChainMap
    * provide the ordered collection of dictionaries
    * the order is following the order of parameters
    ```python
    import collections

    dic1 = {'a': 1, 'b': 2}
    dic2 = {'b': 3, 'c': 4}

    chain = collections.ChainMap(dic1, dic2)
    print(chain)    # ChainMap({'a': 1, 'b': 2}, {'b': 3, 'c': 4})
    print(type(chain))  # <class 'collections.ChainMap'>

    print(chain.maps)   # [{'a': 1, 'b': 2}, {'b': 3, 'c': 4}]
    print(chain.keys()) # KeysView(ChainMap({'a': 1, 'b': 2}, {'b': 3, 'c': 4}))
    print(chain.values())   # ValuesView(ChainMap({'a': 1, 'b': 2}, {'b': 3, 'c': 4}))

    print(dict(chain))  # {'b': 2, 'c': 4, 'a': 1}
    print(list(chain))  # ['b', 'c', 'a']
    print(list(chain.keys()))   # ['b', 'c', 'a']
    print(list(chain.values())) # [2, 4, 1]
    print(chain['b'])   # 2
    ```
* collections.Counter(iterable-or-mapping) -> dict
    * return dict {element: number}
    * .update(iterable-or-mapping) -> None
    * .substract(iterable-or-mapping) -> None
    * .elements() -> itertool.chain
    * .most_common(int) -> tuple in list
        * int is omitted: all the elements
    * .total() -> int
        * ver 3.10
    ```python
    print(Counter('gallahad'))  # Counter({'a': 3, 'l': 2, 'g': 1, 'h': 1, 'd': 1})
    print(Counter({'red': 4, 'blue': 2}))   # Counter({'red': 4, 'blue': 2})
    print(Counter(cats=4, dogs=8))  # Counter({'dogs': 8, 'cats': 4})
    print(type(Counter(cats=4, dogs=8)))    # <class 'collections.Counter'>

    c = Counter(a=4, b=2, c=0, d=-2)
    print(list(c.elements()))
    # ['a', 'a', 'a', 'a', 'b', 'b']

    print(Counter('abracadabra').most_common(3))
    # [('a', 5), ('b', 2), ('r', 2)]

    c = Counter(a=4, b=2, c=0, d=-2)
    d = Counter(a=1, b=2, c=3, d=4)
    c.subtract(d)
    print(c)
    # Counter({'a': 3, 'b': 0, 'c': -3, 'd': -6})

    c = Counter(a=10, b=5, c=0)
    print(c.total())
    # 15
    ```

* collections.defaultdict(int or list or set or str or dict) -> defaultdict
    * subclass of dict, which overrides one method
    * when try to access the key which doesn't exist, automatically assgin the defalut value to the key
    ```python
    d = defaultdict(str)
    print(d['a']) # 0
    print(d)    # defaultdict(<class 'int'>, {'a': 0})

    s = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 1)]
    d = defaultdict(list)
    for k, v in s:
        d[k].append(v)

    print(sorted(d.items()))
    # [('blue', [2, 4]), ('red', [1]), ('yellow', [1, 3])]
    ```
* collections.deque(iterable[,maxlen]) -> deque
    * deque(double-ended queue): data structure which is specialized for processing data at the end
    * Especially better for processing **the first data**
        * O(1)
    * Indexing is impossible
        * Alternatively, provide `.rotate(int)`
        ```python
        d = deque('ghi')

        d.appendleft('f')
        print(d)    # deque(['f', 'g', 'h', 'i'])

        print(d.popleft())  # f
        print(d)    # deque(['g', 'h', 'i'])

        d.extendleft('abc')
        print(d)    # deque(['c', 'b', 'a', 'g', 'h', 'i'])

        d.rotate(3)
        print(d)    # deque(['h', 'i', 'c', 'b', 'a', 'g'])
        d.rotate(-1)
        print(d)    # deque(['i', 'c', 'b', 'a', 'g', 'h'])
        ```
* collections.namedtuple(typeName,fieldNames,defaults=None) -> subclass named typeNAme
    * make a specific type of subclass similar to tuple
    * fieldNames
        * ['x', 'y', 'z', ...]
        * 'x, y, z'
        * 'x y x'
    * ._make(iterable) -> namedtuple object
        * make a new instance
    * ._asdict() -> Orderedict
    * ._repalce(**kwargs)-> a new namedtuple object
    * ._fields -> tuple of strings listing the field names
    ```python
    Point = namedtuple('Point', 'x y z t', defaults=[0, '0sec'])
    print(type(Point))# <class 'type'>

    p = Point(11, y=22) 
    print(p)    # Point(x=11, y=22, z=0, t='0sec')
    print(type(p))  # <class '__main__.Point'>
    print(p[0], p[1], p[2]) # 11 22 0
    print(p.x, p.y, p.z)    # 11 22 0 

    p_dict = p._asdict()
    print(p_dict)   # {'x': 11, 'y': 22, 'z': 0, 't': '0sec'}

    p._replace(z=55)
    print(p)    # Point(x=11, y=22, z=0, t='0sec')

    print(p._fields)    # ('x', 'y', 'z', 't')
    ```

* collections.OrderedDict(dict) -> OrderedDict
    * dictionary with the order
    * .popitem(last=True)
    * .move_to_end(key, last = True)
        ```python
        d = 'abc'
        ordered_d = OrderedDict.fromkeys(d)
        print(ordered_d)    # OrderedDict([('a', None), ('b', None), ('c', None)])
        print(type(ordered_d))  # <class 'collections.OrderedDict'>

        d = {'first': 0, 'a':1, 'b':2, 'c':3, 'end': 4}
        ordered_d = OrderedDict(d)
        print(ordered_d)    # OrderedDict([('first', 0), ('a', 1), ('b', 2), ('c', 3), ('end', 4)])
        print(type(ordered_d))  # <class 'collections.OrderedDict'>

        print(ordered_d.popitem())  # ('end', 4)
        print(ordered_d.popitem(last = False))  # ('first', 0)

        ordered_d.move_to_end('a')
        print(ordered_d)    # OrderedDict([('b', 2), ('c', 3), ('a', 1)])
        ordered_d.move_to_end('c', last = False)
        print(ordered_d)    # OrderedDict([('c', 3), ('b', 2), ('a', 1)])
        ```
### 4. **import heapq**
* Module for implementing priority heap
    ```
    left_child: 2k+1
    right_child: 2k+2
    parent: (k-1)//2
              0
         1         2
      3   4     5     6
     7 8 9 10 11 12 13 14
    ```
* .heapify(list) -> None
    * O(N)
    * 1. append at the end
    * 2. compare with the parent
    * 3. if it's smaller, swap
    * 4. Repeat 2~3
* .push(heap, item) -> None
    * O(logN)
* .pop(heap[, item]) -> item
    * O(logN)
    ```python
    lst = [5,7, 4, 5, 6, 2, 1]

    heap = heapq.heapify(lst)
    print(heap) # None
    print(lst)  # [1, 5, 2, 7, 6, 5, 4]

    heapq.heappush(lst,76)
    print(lst)  # [1, 5, 2, 7, 6, 5, 4, 76]
    heapq.heappush(lst, 0)
    print(lst)  # [0, 1, 2, 5, 6, 5, 4, 76, 7]

    print(heapq.heappop(lst)) # None
    print(lst)  # [1, 5, 2, 7, 6, 5, 4, 76]
    ```
### 5. **import functools**
* .partial(func, para, *args, **kwargs) -> partial object(function)
    * return the function that combined the func with the parameters
    ```python
    from functools import partial

    basetwo = partial(int, base=2)
    print(basetwo)  # functools.partial(<class 'int'>, base=2)
    print(type(basetwo))    # <class 'functools.partial'>
    print(basetwo('10010')) # 18
    #print(basetwo('5')) # Error

    def xyzw(x, y, z, w = 10):
        print(f'x:{x}, y:{y}, z:{z}, w:{w}')
        
    xyzw1 = partial(xyzw, 1)    
    xyzw2 = partial(xyzw, 1, 2)    
    xyzw3 = partial(xyzw, 1, 2, 3)    
    xyzw4 = partial(xyzw, 1, 2, w = 3)  


    xyzw1(2,3) # x:1, y:2, z:3 w:10
    xyzw2(3)   # x:1, y:2, z:3 w:10
    xyzw3()    # x:1, y:2, z:3 w:10
    xyzw4(3)   # x:1, y:2, z:3 w:3
    ```

* .reduce(func, iterable[, initializer])
    * repeat func with the data in the iterable
    * if there's initailizer, use it for the first data
        ```python
        reduce(lambda x, y: x+y, [1, 2, 3, 4, 5])
        # ((((1+2)+3)+4)+5)
        ```
* @cache
    * Caching: save the data to re-use it with higher speed
    * if you use `@cahce`above a functon, a dictionary is made which has elements in the shape of {input: output}
    * Therefore, the program doesn't repeat the same operation
    ```python
    @cache
    def factorial(n):
        return n * factorial(n-1) if n else 1

    >>> factorial(10)      # no previously cached result, makes 11 recursive calls
    3628800
    >>> factorial(5)       # just looks up cached value result
    120
    >>> factorial(12)      # makes two new recursive calls, the other 10 are cached
    479001600
    ```
* @lru_cache
    * similar to the @cache, but the maxsizie is limtied to 128, so the data in excess will be removed based on lru rule
    ```python
    @lru_cache(maxsize=None)
    def fib(n):
        if n < 2:
            return n
        return fib(n-1) + fib(n-2)

    [fib(n) for n in range(16)]
    # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610]

    fib.cache_info()
    # CacheInfo(hits=28, misses=16, maxsize=None, currsize=16)
    # hits: how many times have you looked up the dict
    # misses: how many tiems have you operated the function
    ```
* .cmp_to_key
    * make key for sorted or sort function
    * +int: latter one goes to the front
    * 0: no change
    * -int: former one goes to the front
    ```python
    def comp(x, y):
        if x < y:
            return 1
        elif x == y:
            return 0
        else:
            return -1

    l = [1, 4, 5, 3, 1]

    sorted_list = sorted(l, key=cmp_to_key(comp))
    print(sorted_list)# [5, 4, 3, 1, 1]
    ```
### 6. **import itertools**
* **Infinite iterator**
    * count(start[,end]) -> itertools.count
        * generate an infinite iterator
        * start, end can be float
            ```python
            # start, start+step, start+2*step, …
            # count(10) --> 10 11 12 13 14 ...
            # count(2.5, 0.5) -> 2.5 3.0 3.5 .
            ```
    * cycle(iterable)
        * infinite iterator that yield an elements in the iterable cycling
            ```python
            # cycle('ABCD') --> A B C D A B C D A B C D ...
            ```

    * repeat(obj[,times])
        * generate obj for 'times' times
        * if 'times' is not defined, generate infinitely
            ```python
            for i in repeat([1, 2, 3], 5):
                print(i)
                # [1, 2, 3]
                # [1, 2, 3]
                # [1, 2, 3]
                # [1, 2, 3]
                # [1, 2, 3]
            ```

* **Finite iterator**
    * accumulate(iterable[, func, inital=None])
        * generate an iterator which yields the accumulated value of the iterable
        * if the functions is given, apply the function instead of add(x, y )
        * iniitial is used for the first value
            ```python
            # accumulate([1,2,3,4,5]) --> 1 3 6 10 15
            # accumulate([1,2,3,4,5], initial=100) --> 100 101 103 106 110 115
            # accumulate([1,2,3,4,5], operator.mul) --> 1 2 6 24 120
            ```
    * chain(*iterables)
        * yields an element in the iterables
        * if the first iterables is thoroughly detected, go to the second one
            ```python
            # chain.from_iterable(['ABC', 'DEF']) --> A B C D E F
            ```
    * compress(iterable, boolean_list)
        * map the iterable with boolean_list, and yied the daty only when the elements in the boolean_list is Truthy
        * yield the data, until the shorter one ends
            ```python
            # compress('ABCDEF', [1,0,True,[],'hahaha',1]) --> A C E F
            ```
    * dropwhile(func, iterable)
        * yield from the data that is False for the func
            ```python
            lst =[5, 6, -8, -4, 2, 100]

            for i in dropwhile(lambda x: x > 0, lst):
                print(i) # -8, -4, 2, 100
            ```
    * filterflase(func, iterable)
        * the oppsite of filter(func, iterable)
            ```python
            # filterfalse(lambda x: x%2, range(10)) --> 0 2 4 6 8
            ```
    * islice(iterable, stop) / islice(iterable, start, stop[, step])
        * generator with slicing
            ```python
            # islice('ABCDEFG', 2) --> A B
            # islice('ABCDEFG', 2, 4) --> C D
            # islice('ABCDEFG', 2, None) --> C D E F G
            # islice('ABCDEFG', 0, None, 2) --> A C E G
            ```
    * starmap(func, iterable)
        * similar to map, but can get *args as paramter
            ```python
            # starmap(pow, [(2,5), (3,2), (10,3)]) --> 32 9 1000
            ```
    * takewhile(func, )
        * yield before the data that is False for the func
        * the opposite fo dropwhile()
            ```python
            # takewhile(lambda x: x<5, [1,4,6,4,1]) --> 1 4
            ```
    * zip_logest(*iterables, fillvalue=None) -> tuple
        * yield zipped tuple, when the shorter one is exhausted, fill with 'fillvalue'
            ```python
            for i in zip_longest('ABCD', 'xy', fillvalue='-'):
                print(i) 
                # ('A', 'x')
                # ('B', 'y')
                # ('C', '-')
                # ('D', '-')
            ```

* **combinational iterator**
    * product(*iterables, repeat=1) -> tuple
        * generate the combinations of iter1, iter2, iter3
        * repeat = n: do it for *([iter1, iter2, iter3] * n)
            ```python
            _list = ["012", "abc", "!@#"]
            for i in product(*_list):
                print(i)    # ('0', 'a', '!') > ('0', 'a', '@') > ('0', 'a', '#') > ('0', 'b', '!') >>> ('2', 'c', '#')
                # 3**3 combinations

            for i in product(*_list, repeat=2): 
                print(i)    # ('0', 'a', '!', '0', 'a', '!') > ('0', 'a', '!', '0', 'a', '@') >>> ('2', 'c', '#', '2', 'c', '#')
                # 3**(3*2) combinations

            for i in product(_list):
                print(i)    # ('012',) > ('abc',) >('!@#',)
                # 3**1 combinations

            for i in product(_list, repeat=3):
                print(i)    # ('012', '012', '012') > ('012', '012', 'abc') >>> ('!@#', '!@#', '!@#')
                # 3**(1*3) combinations
            ```
    * permuations(iterable, r=None) -> tuple
        * nCr * r!
        * pick and arrange
        * when r=None, r==len(iterable)
            ```python
            # permutations('ABCD', 2) --> ('A','B') AC AD BA BC BD CA CB CD DA DB DC
            # permutations(range(3)) --> (0, 1, 2) 021 102 120 201 210
            ```

    * combinatons(iterable, r) -> tuple
        * nCr
        * pick
            ```python
            # combinations('ABCD', 2) --> ('A','B') AC AD BC BD CD
            # combinations(range(4), 3) --> (0, 1, 2) 013 023 123
            ```
    * combinations_with_replacement(iterable, r) -> tuple
        * combinations allowing n-time duplication
            ```python
            # combinations_with_replacement('ABC', 2) --> ('A', 'A') AB AC BB BC CC
            ```

### 7. **import math**
* .ceil
* .floor
* .copysign
* .fabs
* .factorial
* .frexp
* .ldexp
* .gcd
* .modf
*.isclaos(
* .pow
* .sqrt

* .log
* .log1p
* .log2
* .log10

* .cos
* .sin
* .tan
* .acos
* .asin
* .atan

* .degrees
* .radians

* .pi
* .e
* .tau

### 9. **import bisect**
* .bisect
* .bisect_left

* .insort
* .insort_left

### 10. **import copy**
* .copy()
* .deepcopy()

### 11. **import os**
* .chdir()
* .environ
* .getcwd()
* .listdir
* .mkdir
* .path
    *..exists()
    *isdir()
    *isfile
* .renmae
* .remove
* .removedirs
* .walk

### 12. **import pickle**
* .dump
* .load

### 13. **import json**
* .dump
* .load
* .dumps
* .loads
