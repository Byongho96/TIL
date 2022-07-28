## Object_Oriented_Programming
: see programming as a collection of objects which can handle data and communicate with each others.
* Abstracition: provide interfaces to hadle the object
* Encapsulation: block access to certain infromation
**Pros**
    * Modularization is suitable for a big project
    * Easy to be maintained
**Cons**
    * Hard to be designed at first
    * relatively slower than Procedure-Oriented-Programming
* **Character**
    1. Abstraction
    2. Inheritance
    3. Polymorphism
    4. Encapsulation

---
## Class
: the blueprint of the object

## Object
: Data uploaded on memory based on the definition of the class
: Attributes(variables) and Behaviors(functions)
* how's it different from instance?
    * Class == Type
    * Object == Instance of the class

```python
class Person:
    pass

print(type(Person))  # <class 'type'>

person1 = Person()

print(isinstance(person1, Person)) # True
print(type(person1))    # <class '__main__.Person'>
                        # __main__: indicates that class Person is defined in the current module(.py)
```
---

## Basic Grammer
* Define class: `class MyClass:`
* Make instance: `my_instance = MyClass()`
* Call mehthod: `my_instance.my_method()`
* Attribute: `my_instance.my_attribute`

---
## Attributes(variables)
* Class variables
    * shared by all the objects
    * `<class>.<variable>`
    * not recommended >>> <instance>.<variable>
* Instance variable
    * hogged by a object
    * ==defined in the constructor==
    * `<instance>.<variable>`

```python
class Person:
    name = 'lee'

person1 = Person()
person1.age = 23

print(dir(person1.__class__)) # 클래스 속성 검색
print(vars(person1)) # 인스턴스 변수 검색
```

---
## Methods(functions)
* **Instance method**
    * default method used by instances
    * can use bot class variables and instance variables
    * ==first arguments must be self==
    * magic methods
        * mehtods with Double underscore(__)
        * made for special behaviors
* **Class method**
    * used by the class
    * only can use class variables
    * ==first arguments must be `cls`==
    * `@classmethod` is used before def
        ```python
        class  Person:
            count=0

            @classmethod
            def number_of_population(cls):
                print(f'the num of population is {clas.count}')
        ```
    * Decorator
    : made for using **decorating function** easily
        * Deocraitin function
        : function that ==gets a function as a parameter==, and ==retrun a function==
        ```python
        def hello():
            print("hello")

        def add_print(original):    # if add_print(original()) : meaning 'I'm gonna use return vale of original function
            def wrapper():
                print("function starts")
                original()
                print("function ends")
            return wrapper
        ###################################
        add_print(hello)()
        # function starts
        # hello
        # function ends
        ###################################
        @add_print
        def print_hello():
            print('hello')
        
        print_hello()
        # function starts
        # hello
        # function ends
        ```
* **Static mehtod**
    * not using any variables
    * `@staticmethod` is used before `def`
        ```python
        class  Person:
            count=0
            def __init__(self, name):
                self.name = name
                Person.count += 1

            @staticmehtod
            def check_rich(money):
                return money > 10000
        
        person1 = Person('Kim')
        print(Person.check_rich(100000)) # True
        print(person1.check_rich(100000)) # True
        ```
* Sample Codes
```python
obj = MyCalss()
print(obj.mehtod()) # O
print(MyClass.method(obj)) # O

print(MyClass.classmethod()) # O
print(MyClass.staticmethod()) # O
MyClass.method() # Eror: there's no object

print(obj.classmethod()) # O
print(obj.staticmethod()) # O
```
---
## Some magic methods
: built-in functions could use return value of some magic methods
* **Construtor(__init__)**
: the method used for making objects
* 
    ```python
    class Person:
        def __init__(self, name):
            self.name = name
    
    person1 = Person('Kim')
    ```
* **Destructor(__del__)**
: the method use for deleting objects
* 
    ```python
    class Person:
        def __del__(self):
            print('인스턴스가 사라졌습니다.')
    person1 = Person()
    del person1 # 인스턴스가 사라졌습니다.
    ```
---
## Namespace
**Instance -> Class**

---
## Inheritence
: the child class get all the attributes and methods of the parent class
```python
class ChildClass(ParentClass):

child = ChildClass()
print(issubclass(ChildClass, ParentClass)) # True
print(issubclass(ChildClass, Object)) # True
```
* super()
    ```python
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age

    class Student(Person):
        def __init__(self, name, age, number):
            super().__init__(name, age)
            self.number = number
    ```
## Multiple Inheritence
```python
class Person:
    def __init__(self, name):
        self.name = name
    def greeting(self):
        return f'Hi, {self.name}'

class Mom(Person):
    gene = 'XX'

    def swim(self):
        return 'Mom\'s Swimming'

class Dad(Person):
    gene = 'XY'

    def walk(self):
        return 'Dad\'s walking'
##################################
class FirstChild(Mom, Dad):
    def swim(self):
        return 'first\'s swimming'
    def cry(self):
        return 'first\'s crying'

baby1 = FirstChild('Lee')
print(baby1.cry()) # first's crying
print(baby1.swim()) # first's swimming
print(baby1.walk()) # Dad's walking
print(baby1.gene()) # XX >>> since (Mom, Dad)
```
* **mro method(Method Resolution Order)**
: show all the parent classes(including self) in order
```python
print(FirstChild.mro())
#[<class '__main__.FirstChild'>, <class '__main__.Mom'>, <class '__main__.Dad'>, <class '__main__.Person'>, <class 'object'>]
```
## Namespace
**Instance -> ChildClass -> ParentClass**

---
## Polymorphism
: the same methods can be different according to classes
* **Override**
    : change the inherited mehtods in the child class
    ```python
    class Person:
        def __init__(self, name):
            self.name = name
        def talk(self):
            print(f'Hi, I\'m {self.name}')

    class Professor(Person):
        ef talk(self):
            print(f'Hi, I\'m professor {self.name}')

    class Student(Person):
        ef talk(self):
            super().talk()
            print(f'Hi, I\'m a student')
    ##################################
    p1 = Professor('Kim')
    p1.talk()   # Hi, I'm professor Kim
    
    s1 = Student('Lee')
    s1.talk()   # Hi, I'm Lee
                # Hi, I'm a student
    ```
* **Overloading**
    * Python does not have overloadin officially
    * Cause Python can transfer multiple variables as one object(tuple)
---
## Encapsulation
: Block access to certain information -> protection
* **Public member**
    * can be called by everywhere
    * can be overrided from the child classes
* **Protected Member**
    * starts with '_'
    * can be called by self class or the child calsses
    * can be overrided from the child classes
    * it's ==not mandatory==
    ```python
    class Person:
        def __init__(self, name, age):
            self.name = name
            self._age = age

        def get_age(self):
            return self._age
        
        def set_age(slef, age):
            if age < 0:
                raise ValueError
            self._age = age
        
        p1 = Person('김사피', 30)
        print(p1.get_age())     # 30

        ## It can be reached and also modified. Just recommendation
        print(p1._age)          # 30
        p1._age = 40
        print(p1._age)          # 40
    ```
* **Private Member**
    * starts with '__'
    * can only be called by self class
    * can't be overrided from the child classes
    * Really makes Error

* **getter and setter** : something like API
[reference link](https://www.daleseo.com/python-property/)
    * **getter method**
        * for reading the variable
        * use `@property`
    * **setter method**
        * for writing the variable
        * use `@<variable>.setter`
    ```python
    class Person:
        
        def __init__(self, age):
            self._age = age

        @property
        def age(self):
            return self._age
        
        @age.setter
        def age(self, new_age):
            if new_age <= 19:
                raise ValueError('Too Young')
                return

            self._age = new_age

    # Even if the instance variable is defined with '_'
    # Cause getter method named as age
    p1 = Person(20)
    print(p1.age) # 20

    # Automatically call setter
    p1.age = 19
    print(p1.age) # ValueError('Too Young')
    ```
//클래스나 객체에 없는 변수도 외부에서 새로 선언 가능??

//86페이지
//protected는 강제가 아닌데, private은 강제?
//설명이 이상...

//104P, 오버로딩?? getter와 setter의 약간 특별한 기능? API
//setter 데코레이터에 언더바 안들어가는 이유!!!?