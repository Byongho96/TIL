## 1. OOP
* **Object Oriented Programming**
* **Characteristics**
    * Abstraction
    * Polymorphism
    * Inheritance
    * Encapsulation
---
## 2. Class
**The blueprint of a collection of variables and functions which are relevant**
* **being assigned in **heap** memory**
    ```java
    // make 'variable random' in the 'stack' which is pointing Random datatype
    // assign 'object Random' in the 'heap' to the random
    Random random = new Random();
    randBool = random.nextBoolean();

    // make object Random for one-time usage
    // nothing points Random
    randBool = new Random().nextBoolean();    
    ```
### 2-1. **composition**
* Attribute: variables
* Behavior: methods
* Constructor
### 2-2. **Basic figure**
```java
//접근제한자: public / default
//활용제한자: final / abstact
[접근제한자][활용제한자] class 클래스명 {
    필드
    메소드
    생성자
}
```
## 3. Field (variables)
### 3-1. **Types**
* **Class variable**
    * ==**static** keyword==
        * being saved on the class memory
        * with methods
    * shared by all the instances
    * on the memory ~ program end
* **Instance variable**
    * without the keyword
        * being saved on the heap
    * belongs to one instance
    * the instance is created ~ the instance isn't referenced
* **Local variable**
    * declared in the methods(functions)
    * should be **initialized**

    ```java
    public class Person {
        // class memory
        static int personCount;
        // Instance variables
        String name;
        int age;
        String hobby;
    }
    public class Person {
        public static void main(String[] args) {
            //local varibale
            Person p1 = new Person();
            //instance variable should be called with an instacne
            p1.name = "Yang";
            p1.age = 45;
            p1.hobby = "Golf";
            // class variable can be called with the class
            System.out.println(Person.personCount);
        }
        
        void test() {
            //Error: p1 was an local variable in the different method
            println(p1.name);
        }
    }

    ```
---
## 4. Method(functions)
### 4-1. **Basic figure**
```java
//접근제한자: default / public / protected / private
//활용제한자: static / final / abstract / synchronized
// If there's static, it can be called by the class
[접근제한자] (static) [활용제한자] [반환값] 메소드이름(매개변수) {
    명령어
}
```
* **static**-> className.method()
    * Otherwise, objectName.method()
* **Parameter**
    * the passage to hand over data
    * implicit type casting
        * small -> bigger
* **retrun type**
    * only one data is possible
### 4-2. Overloading
**Re-define different type of parameters in the same name of method**
```java
println(): void
println(boolean x):void
println(char x): void
println(char[] x):void
println(double x): void
println(float x):void
print(int x): void
...
```
---
## 5. JVM Memory structure
![jvm memory structure](images/JVM%20memory.jpg)
![garbage collector](images/garbage%20collector.jpg)
* static area **can't** access non-static area
    ```java
    public class Main {
        String str = "문장";

        public static void main(String[] args) {
            System.out.println(Str);
        }
    }
* non- static area **can** access static area
    ```java
    public class Main {
        static String str = "문장";

        public static void main(String[] args) {
            System.out.println(Str);
        }
    }
---
## 6. Constructor
**being excuted only once when an object is constructed**
* called with **new** keyword
    * return the address of the object
* named as the same with the class
    * therefore, following PascalCase
### 6-1. Default Constructor
* when there's no constructor in the class, it's the one the JVM automatically protvide
```java
public class Dog {
        // no return type
        /*
        public Dog() {
            //I'm a default constructor.
        }
        */
    }
    ```
```
### 6-2. Constructor with parameters
* initialize the instance variables
* the defualt constructor is not defined
    * overloading
    ```java
    class Dog {
        String name;
        int age;

        Dog(String n, int a) {
            name = n;
            age = a;
        }
    }

    class Main {
        public static void main(String[] a) {
            //Error
            Dog d1 = new Dog();

            Dog de = new Dog("Bob", 3);
        }
    }
    ```
* making more than one constructor is possible
    ```java
    class Dog {
        Dog() {}
        Dog(String name) {}
        Dog(int age) {}
        Dog(String name, int age) {}
    }
    ```
### 6-3. this
* indicating the object itself
    * this.instanceArea
    ```java
    class Dog {
        String name;
        int age;
        Dog(String name, int age){
            this.name = name;
            this.age = age;
        }
    }
    ```
* can call another instuructor
    * this(parameter)
    * should be placed at the first line of an instructor
    ```java
    class Dog {
        String name;
        int age;
        // If the name is not handed over, the default name is "Bob"
        Dog() {
            // call Dog(String name)
            this("Bob");
        } 
        Dog(String name){
            this.name = name
        }
    }
    ```
---
## 7. Package
**Folder for managing classes**
```html
<src>
    <package>
        <.java>
            <class>
        <.java>
            <class>
    <pacakge2>
        <.java>
            <class>
        <.java>
            <class>
```
### 7-1. import
**process for using a class in another package**
```html
<src>
    <com.A.project1>
        <Person.java>
    <com.A.projcet2>
        <PersonService.java></PersonService.java>
```
```java
package com.A.procjet2;

//import [packageName].[className];
//import [packageName].*;
import com.A.projcet1.Person;

public class PersonService {
    Person p;
}
```
```java
package com.projcet1;

import java.util.*
//import java.util.Arrays;
//import java.util.Scanner;
//import java.util.function.Function;

public class Package {
    public static void main(String[] args) {
        Scanner sc // O
        Arrays arr; // O
        Function f; // X
    }
}
```
* **ctrl + shift + O**: automatically import packages that I need
    * PascalCase: only for the classes
* **java.lang.\***
    * initially imported
    * Ex. **System**.stdin.println()
---
## 8. Encapsulation (Access Modifier)
**For protecting data(field, method) in the class**
### 8-1. Types
* **public**
    * can be accessed **from everywhere**
* **protected**
    * can be accessed **from the same package**
    * or **from the inherited class**
* **(default)**
    * can be accessed **from the same package**
    * when an access modifier is not defined
* **private**
    * only can be accessed **in the same class**
### 8-2. Getter/Setter
**==public methods== that allows accessing the data from out of the class**
```java
package package01;

public class Car {
    String color;
    private int speed;

    // Setter
    public void setSpeed(int, speed) {
        if(0 <= speed && speed < = 250)
            this.speed = speed;
        else
            System.out.println("speed out of range");
    }
    // Getter
    public int getSpeed() {
        return this.speed;
    }
}
```
```java
package package01;

public class CarTest {
    public static void main(String[] args) {
        Car c = new Car();

        c.color = "Red";
        
        //c.speed = 100; Error
        c.setSpeed(100);
        //System.out.println(c.speed); Error
        System.out.println(c.getSpeed());
    }
}
```
* Mouse right click > source > generating getter and setter
* Boolean
    * getter name is a little bit different
        ```java
        package package01;

        public class GetSet {
            private boolean hungry;
            
            //setter
            public void setHungry(boolean hungry) {
                this.hungry = hungry;
            }
            //getter
            public boolean isHungry() {
                return this.hungry;
            }
        }
        ```
### 8-3. Singleton Pattern
**Even if the class is called several times, there's ==only one object==, and return this**
```java
public class Manager {
    private Student[] students = new Student[100];
    private int size = 0;

    // 2. make a private instance in the class by itself
    private static StudentManager manager = new StudentManager();

    // 1. private constructor
    private StudentManager() {
    }

    // 3. Getter
    public static StudentManager getManger() {
        return manager;
    }
}
```
---
## 9. Inheritance