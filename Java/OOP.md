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
            <class>
        <.java>
            <class>
    <pacakge2>
        <.java>
            <class>
        <.java>
            <class>
//public class should be on in the .java
// but class can be more than one
// eclipse makes multiple class file after compiling
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
**Making a new class which contains all the attributes of another class**
* Java doesn't support multiple inheritance
    * but by using 'interface' and 'abstract class', it can be supported
* Child class can use the Parent class's fields and mehtods except private
* Object class is the parent class of all the class
    * java.lang.Object
    ```java
    public class Person {
        String name;
        int age;

        public void eat() {
            System.out.println("Eating food");
        }
    }

    public class Student extends Person { 
        String major;
        
        public void study() {
            System.out.println("Studying");
        }
    }
    ```
### 9-1. super()
**call the parent class's constructor**
* it's automatically excuted in the constructor
    * object -> parent1 object -> parent2 object -> child object 
```java
public class Person {
        String name;
        int age;

        public Person() {
            //super()
            System.out.println("Person.constructor is excuted")
        }
    }

public class Student extends Person { 
        String major;
        
        public Student() {
            //super()
            System.out.println("Student.constructor is excuted")
        }
    }
```
```java
public class MainTest {
    public static void main(String[] args) {
        student st = new Student();
        // Person.constructor is excuted
        // Student.constructor is excuted
    }
}
```
### 9-2. super
**Indicating parent class**
```java
public class Person {
        String name;
        int age;

        public void eat() {
            System.out.println("Eating food");
        }
    }

public class Student extends Person { 
        String major;
        
        public void study() {
            super.eat() //Person.eat()
            System.out.println("Studying");
        }
    }
```
```java
public class MainTest {
    public static void main(String[] args) {
        student st = new Student();
        
        st.study();
        // Eating food
        // Studying
    }
}
```
### 9-3. Overriding
**Re-define parent class's method**
* name of the method, data type, and parameters all should be the same
* `@Override`: comments for compiler
* the range of child's access modifier should bigger than parents'
    * vice versa is possible
```java
public class Person {
        String name;
        int age;

        public void eat() {
            System.out.println("Eating food");
        }
    }

public class Student extends Person { 
        String major;
        
        @Override // highly recommended
        public void eat() {
            System.out.println("Eating knowledge");
        }
    }
```
```java
public class MainTest {
    public static void main(String[] args) {
        student st = new Student();
        
        st.eat();
        // Eating knowledge
    }
}
```
### 9-4. final
* **final class**: can't be inherited
* **final method**: can't be overrided
* **final variable**: can't be changed
    * UPPER_AND_UNDRBAR
---
## 10. Polymorphism
**can refer to child class' object with parent class**
* becuase every child object is constructed on the parent classes' objects
    ```java
    // Object -> Person -> Student
    Student st = new Student("kim", 25);
    Person p = new Student("kim", 25);
    Object ob = new Student("kim", 25);

    //Error: PErson() object doesn't generate Student object
    Student st = new Person("kim", 25);
## 10-1. Usage
* **Array containing different data types**
    ```java
    Person[] persons = new Person[3];

    persons[0] = new Person();
    persons[1] = new Student();
    persons[2] = new Student();
    // [Person(), Student(), Student()]
    ```
* **Arguments can be any data type**
* If the paramter is declared as Object, it can get any kind of data types
    ```java
    public void println(Object x) {
        String s = String.valueOf(X);
        synchronized (this) {
            print(S);
            newLine();
        }
    }

    public void main(String[] args) {
        public void println(Person p);
        public void println(Student st);
    }
    ```
### 10-2. Type Casting
* **smaller -> bigger**
    * implicit type casting
    * but some data cannot'be referenced even if it's on the memory
    ```java
    // Object -> Person -> Student
    public void main(String[] args) {
        Person person = new Person();
        Object obj = person;
    }
    ```
* **bigger -> smaller**
    * explicit type casting
    * data which is not on the memory can't be used
    ```java
    // Object -> Person -> Student
    public void main(String[] args) {
        Person p = new Student();
        Student st = (Student)p;

        Person p2 = new Person();
        Student st2 = (Student)p;
    }
    ```
* **Dynamic Binding**
    * Overrided mehtod is excuted, even if the method is referenced by the bigger class
        ```java
        class SuperClass {
            String x = "super";

            public void method() {
                System.out.println("super class method")
            }
        }

        class SubClass extends SuperClass {
            String x = "sub";

            @Override
            public void method() {
                System.out.println("sub class method")
            }
        }

        public class PrintObject { 
            public static void main(String[] args) {
                SubClass subClass = new SubClass();

                SuperClass superClass = subClass;
                System.out.println(superClass.x);
                superClass.method();
                //super
                //sub class method
            }
        }
        ```
        ```java
        class UserInfo {
            String name = "Kim";

            @Override
            public String toString() { 
                return "Name: " + this.name;
            }
        }

        class MemeberInfo extends UserInfo {
            String grade = "A";

            @Override
            public String toString() { 
                return super.toString() + ", grade: " + grade;
            }
        }

        public class PrintObject { 
            public static void main(String[] args) {
                Object member = new MemberInfo();
                System.out.print("Info: " + member);
                //Info: name: Kim, grade: A
            }
        }
        ```

### 10-3. [objectName] instanceof [ClassName]
**Check the object is the instance of the class**
```java
// Object -> Person -> Student
public void main(String[] args) {
    Person p = new Student();
    // True
    if (p instnace of Student) {
        Student st = (Student)p;
    }

    Person p2 = new Person();
    // False
    if (p2 instnace of Student) {
        Student st2 = (Student)p;
    }
}
```
---
## 11. Abstract class
**There is a method that should be always overrided**
* You can't just erase the method, because then you can't use dynamic biding at all
* Make a bluprint of an object which is partially made
    * specialized for inheritance
    * the child class has two options
        * override
        * be abstract class too
```java
// Can't generate object with abstract class without overriding
public abstract class Chef {
    String nae;
    int age;
    String speciality;
    
    public void eat() {
        System.out.println("Eating food");
    }
    // abstract method
    public abstract void cook();
}

public class KFoodChef extends Chef {
    @Override
    public void cook() {
        System.out.println("Cooking K-food");
    }
}

public class JFoodChef extends Chef {
    @Override
    public void cook() {
        System.out.println("Cooking J-food");
    }
}
```
```java
public class ChefTest {
    // Dynamic binding is available
    // Stabilize the class and objects by coercing
    public static void main(String[] args) {
        Chef c = new KFoodChef();
        c.cook();

        // Chef c2 = new Chef(); : Error
        // anonymous class
        Chef ce = new Chef() {
            @Override
            public void cook() {
                System.out.println("Cooking food");
            }
        }
    }
}
```
---
## 12. Interface
**All the methods are abstract**
* All the variables are **final and constant**
* All the methods are **abstract**
* declared with `interface`
* **interface -> class**: inherited with `implements`
* **interface -> interface**: Multiple-inheritance is possible
    * All the methods have to be overrided
```java
public interface MyInterface1 {
    public static final int MEMBER1 =10;
    //public static final: automatically
    //static cause it's constant -> be on the class area memory
    int MEMBER2 =10;

    public abstract void method1(int param);
    //public abstract: automatically
    void method2(int param);
}

public interface MyInterface2 {
}
```
```java
// Multiple Inhertiance: Interface -> Interface
interface MyInterface3 extends MyInterface1, MyInterface2 {

}
// Multiple Inhertiance: Interface -> class
// Override
class MyClass implements MyInterface1, MyInteface2, MyInterface3 {
    @Override
    public void method1(int para){}
    @Override
    public void method2(int para){}
}
```
```java
public class MainTest {
    public static void main(String[] args) {
        //Interface can't make objcets
        //MyInterface2 m = new MyInterface2(); Error
    }
}

```
---

## 13. Generic

