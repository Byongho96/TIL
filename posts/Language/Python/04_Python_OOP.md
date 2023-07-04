---
title: '04. Python OOP'
updatedAt: '2022-12-24'
createdAt: '2022-11-08'
isCompleted: true
reference:
---

- [1. Overview](#1-overview)
  - [1.1. Object Oriented Programming](#11-object-oriented-programming)
  - [1.2. Class](#12-class)
  - [1.3. Object](#13-object)
  - [1.4. Basic Grammer](#14-basic-grammer)
  - [1.5. Namespace](#15-namespace)
- [2. Attributes](#2-attributes)
  - [2.1. Class Attributes](#21-class-attributes)
  - [2.2. Instance Attributes](#22-instance-attributes)
- [3. Methods](#3-methods)
  - [3.1. Class Methods](#31-class-methods)
  - [3.2. Instance Methods](#32-instance-methods)
  - [3.3. Static methods](#33-static-methods)
  - [3.4. Decorator](#34-decorator)
  - [3.5. Magic Methods (Dunder Methods)](#35-magic-methods-dunder-methods)
- [4. Inheritence](#4-inheritence)
  - [4.1. Simple Inheritance](#41-simple-inheritance)
  - [4.2. super().\_\_init\_\_()](#42-super__init__)
  - [4.3. super().method](#43-supermethod)
  - [4.4. super(Class, self)](#44-superclass-self)
  - [4.5. Multiple Inheritence](#45-multiple-inheritence)
    - [4.6.1. Class.mro (Method Resolution Order)\*\*](#461-classmro-method-resolution-order)
- [5. Polymorphism](#5-polymorphism)
  - [5.1. Override](#51-override)
  - [5.2. Overloading](#52-overloading)
- [6. Encapsulation](#6-encapsulation)
  - [6.1. Public member](#61-public-member)
  - [6.2. Protected Member](#62-protected-member)
  - [6.3. Private Member](#63-private-member)

---

# 1. Overview

## 1.1. Object Oriented Programming

**Consider programming as a collection of objects which can handle data and communicate with each others**

- **Pros and Cons**

  - **Pros**
    - Modularization is suitable for a big project
    - Easy to be maintained

  * **Cons**
    - Hard to be designed at first
    - relatively slower than Procedure Oriented Programming

* **Characteristics**
  1. Abstraction
  2. Inheritance
  3. Polymorphism
  4. Encapsulation

## 1.2. Class

As a blueprint for an object, a class provides a way to bind attrubutes(data) and methods(functions) together

## 1.3. Object

Data uploaded on memory based on the definition of the class

## 1.4. Basic Grammer

- **Define a Class**

  ```python
  class Person:
      num = 0
      name ='human'

      @classmethod
      def class_greeting(cls):
          print('hello,', cls.name)

      def __init__(self, name = 'Kim'):
          Person.num += 1
          self.name = name

      def greeting(self):
          print('hello,', self.name)

  print(type(Person)) # <class 'type'>
  ```

- **Make an Instance**

  ```python
  person1 = Person()
  print(isinstance(person1, Person))  # True
  print(type(person1))    # <class '__main__.Person'>
                          # __main__: describes that class Person is defined in the current module(.py)
  ```

- **Use attributes**

  ```python
  # class attribute
  print(Person.name)    # human
  # instance attribute
  print(person1.name)   # Kim
  ```

- **Call methods**

  ```python
  # class method
  Person.class_greeting()     # Hello, human
  # instance method
  person1.greeting()          # Hello, Kim
  ```

## 1.5. Namespace

Python finds the names in the following order

1. instance
2. Child Class
3. Parent Class

# 2. Attributes

## 2.1. Class Attributes

Class attributes are class variables that are inherited by every object of a class.

- Class attributes are defined outside the \_\_init\_\_() function.
- Class attributes can be added by `Class.attribute = initial value`

## 2.2. Instance Attributes

Instance instance attributes arevariables that allow us to define different values for each object(instance) of a class.

- Instance attributes are defined in the \_\_init\_\_() function.
- Instance attributes can be added by `instance.attribute = initial value`

```python
class Person:
    name = 'lee'

    def __init__(self, name):
        self.name =name

Person.age = 21     # Class attributes can be added
print(Person.name)
print(Person.age)

person1 = Person('Kim')
person1.age = 23    # Instance attributes can be added
print(person1.name)
print(person1.age)

# 클래스 이름공간(변수, 메소드) 검색
print(dir(Person))
# 클래스 이름공간(변수, 메소드) 검색
print(dir(person1.__class__))
# 인스턴스 변수 검색
print(vars(person1))
```

# 3. Methods

## 3.1. Class Methods

**Methods that only uses class variables**

- The first parameter should be `cls` which indciates the class
- `@classmethod` should be used before defining the function, otherwise the `cls` parameter can't get the class as the argument.

```python
class  Person:
    count=0
    @classmethod
    def number_of_population(cls):
        print(f'the num of population is {cls.count}')

Person.number_of_population() # the num of population is 0
```

## 3.2. Instance Methods

**Methods that can use both class variables and instance variables**

- The first parameter must be `self`

## 3.3. Static methods

**Methods that don't use both class variables and instance variables**

- `@staticmethod` should be used before defining the function.

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
print(Person.check_rich(100000))    # True
print(person1.check_rich(100000))   # True
```

## 3.4. Decorator

**The decorator receives the function as an argument, and returns it by adding a specific code to the function.**

```python
def hello(name):
    print("hello,", name)

def add_print(original):
        print("function starts")
        original(*args)
        print("function ends")
    return wrapper

add_print(hello)('James')   # add_print(original()) : means tht add_print is gonna use the return vale of original function
# function starts
# hello
# function ends


@add_print
def print_hello(name):
    print("hello,", name)

print_hello('Anna')
# function starts
# hello, Anna
# function ends
```

## 3.5. Magic Methods (Dunder Methods)

**Magic methods (dunder methods) in Python are the special methods that start and end with the double underscores.**  
Magic methods are not meant to be invoked directly by you, but the invocation happens internally from the class on a certain action.

- **Construtor(\_\_init\_\_)**  
  called when making objects

  ```python
  class Person:
      def __init__(self, name):
          self.name = name

  person1 = Person('Kim')
  print(person1.name)   # Kim
  ```

- **Destructor(\_\_del\_\_)**
  called when deleting objects

  ```python
  class Person:
      def __del__(self):
          print('인스턴스가 사라졌습니다.')

  person1 = Person()
  del person1           # 인스턴스가 사라졌습니다.
  ```

- **\_\_add\_\_**  
  To get called on add operation using + operator

  ```python
  class Person:

      def __init__(self, name):
          self.name = name

      def __add__(self, another):
          return self.name + ' married ' + another.name

  person1 = Person('Kim')
  person2 = Person('Lee')

  print(person1 + person2)    # Kim married Lee
  ```

# 4. Inheritence

[상속과 super()에 대해 정리된 블로그 글](https://supermemi.tistory.com/entry/Python-3-super%ED%81%B4%EB%9E%98%EC%8A%A4-selfinit-%EC%97%90-%EB%8C%80%ED%95%B4-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90)

Inheritance allows us to define a class that inherits all the methods and properties from another(parent) class.

**Parent class** is the class being inherited from, also called base class.  
**Child class** is the class that inherits from another class, also called derived class.
**Object** is an ancestor of all classes.

```python
class ChildClass(ParentClass):

child = ChildClass()
print(issubclass(ChildClass, ParentClass))  # True
print(issubclass(ChildClass, Object))       # True
```

## 4.1. Simple Inheritance

Child class can use Parent class's <mark>class instances</mark> and <mark>methods</mark>.

```python
class Human:
    name = 'name'
    age = 'age'

    def __init__(self):
        self.city = 'city'

    def show(self):
        print('This is a method of Human class')

class Student(Human):

    def __init__(self, name):
        self.name = name

    def show_name(self):
        print(self.name)

    def show_age(self):
        print(self.age)

    def show_city(self):
        print(self.city)

a = Student('James')
a.show()        # This is a method of Human class
a.show_name()   # James
a.show_age()    # age
a.show_city()   # Attrubute Error!
```

## 4.2. super().\_\_init\_\_()

To use parent class's <mark>instance attributes</mark> in child class, you need to excute parent class's constructor by using `super().__init__()`.

```python
class Human:

    def __init__(self):
        self.name = 'name'
        self.city = 'city'

    def show(self):
        print('This is a method of Human class')

class Student(Human):

    def __init__(self, name):
        super().__init__()
        self.name = name

    def show_name(self):
        print(self.name)

    def show_city(self):
        print(self.city)

a = Student('James')
a.show()        # This is a method of Human class
a.show_name()   # James
a.show_city()   # city
```

`super().__init()__` simply means that you're using parent class's `__init__()` method.

```python
class Human:

    def __init__(self):
        self.name = 'name'
        self.city = 'city'

    def show(self):
        print('This is a method of Human class')

class Student(Human):

    def __init__(self, name):
        self.name = name
        super().__init__()

    def show_name(self):
        print(self.name)

a = Student('James')
a.show_name()   # name
```

## 4.3. super().method

In the same manner as `super().__init__()`, **you can call parent's method in the child class's method.**

```python
class Human:

    def __init__(self):
        self.name = 'name'
        self.age = 'age'
        self.city = 'city'

    def show_everything(self):
        print(self.name, self.age, self.city)

class Student(Human):

    def __init__(self):
        super().__init__()

    def introduce(self):
        print('Let me introduce myself')
        super.show_everything()

a = Student()
a.introduce()   # Let me introduce myself
                # name age city
```

## 4.4. super(Class, self)

By using `super(Class, self)`, you can <mark>specify which class of parent's method</mark> to use.

```python
class A:
    def __init__(self):
        self.a = 10

    def get_a(self):
        return self.a

class B(A):
    def __init__(self):
        super(B, self).__init__()
        self.b = 20

    def get_b(self):
        return self.b

class C(B):
    def __init__(self):
        super(B, self).__init__()
        self.c = 30

    def get_c(self):
        return self.c

new_c = C()
print(new_c.get_a())    # 10
print(new_c.get_c())    # 30
print(new_c.get_b())    # AttributeError
                        # B.__init__() has not excuted!
```

## 4.5. Multiple Inheritence

Python supports multiple inheritance.  
If there are multiple parents, Pyhton searches **the namespace in the order in which the class are received.**

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

class Child(Mom, Dad):
    def swim(self):
        return 'A child\'s swimming'
    def cry(self):
        return 'A child\'s crying'

baby1 = FirstChild('Lee')
print(baby1.cry())  # A child's crying
print(baby1.swim()) # A child's swimming
print(baby1.walk()) # Dad's walking
print(baby1.gene()) # XX    <<<     since (Mom, Dad)
```

### 4.6.1. Class.mro (Method Resolution Order)\*\*

mro method shows all the parent classes(including self) in method resolution order.

```python
print(FirstChild.mro())
#[<class '__main__.FirstChild'>, <class '__main__.Mom'>, <class '__main__.Dad'>, <class '__main__.Person'>, <class 'Object'>]
```

# 5. Polymorphism

The same name of method can work differently according to classes.

## 5.1. Override

**Redefine a inherited mehtod in child class.**

```python
class Person:
    def __init__(self, name):
        self.name = name

    def talk(self):
        print(f'Hi, I\'m {self.name}')

class Professor(Person):
    def talk(self):
        print(f'Hi, I\'m professor {self.name}')

class Student(Person):
    def talk(self):
        super().talk()
        print(f'Hi, I\'m a student')


p1 = Professor('Kim')
p1.talk()   # Hi, I'm professor Kim

s1 = Student('Lee')
s1.talk()   # Hi, I'm Lee
            # Hi, I'm a student
```

## 5.2. Overloading

Overloading refers to the ability to use a single identifier to define multiple methods of a class that differ in their input and output parameters.

Python does not support overloading officially because **Python can transfer multiple variables as one object(tuple)**

# 6. Encapsulation

Encapsulation refers to **limiting access to certain class attributes.**

## 6.1. Public member

- Public memebers can be accessed from everywhere
- All members of a class are by default public in Python.

## 6.2. Protected Member

- Protected members of a class can be accessed from **the class and its subclasses.**
- In fact, protected memebers <mark>still can be accessed and modified outside of the classes.</mark> It's just a protocol between developers.
- Can be declared by adding a prefix '\_'

  ```python
  class Student:
      _schoolName = 'XYZ School'

      def __init__(self, name, age):
          self._name=name
          self._age=age

  std = Student('Kim', 25)
  print(std._name)    # Kim

  std._name = 'Lee'
  print(std._name)    # Lee
  ```

- You can use decorators to protected members.
- However, it is still accessible in Python.

  ```python
  class Student:
      def __init__(self,name):
          self._name = name

      @property
      def name(self):
          return self._name

      @name.setter
      def name(self,name):
          if isinstance(name, str):
              raise TypeError
          self._name = name

  std = Student('Kim')
  print(std.name)     # Kim

  std.name = 'Lee'
  print(std.name)     # Lee

  print(std._name)    # Lee / still accessible

  std.name = 1        # TypeError
  print(std.name)
  ```

## 6.3. Private Member

- Private members of a class can only be accessed from **the class.** Any attempt to do so will result in an **AttributeError**.
- Can be declared by adding a prefix '\_\_'

```python
class Student:
    __schoolName = 'XYZ School'

    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    def __show(self):
	    print('This is private method.')

std = Student("Kim", 25)
print(std.__schoolName)     # AttributeError
print(std.__name)           # AttributeError
print(std.__show())         # AttributeError
```

- Private memebers be changed to `object._class__variable`.
- But the practice should be refrained.

```python
std = Student("Bill", 25)
print(std._Student__name)   # Bill

std._Student__name = 'Steve'
print(std._Student__name)   # Steve

std._Student__display()     # This is private method.
```

- For accessing and modifying the private members, using decorators is reocmmended.

```python
class Student:

    def __init__(self, name, age):
        self.__name = name
        self.__age = age

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, new_age):
        if new_age < 0:
            raise ValueError("invaild range")
        self.__age = new_age

std = Student("Bill", 25)
print(std.age)              # 25

std.age = 11
print(std.age)              # 11

std.age = -1                # ValueError
print(std.age)
```
