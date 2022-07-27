OOP(Object Oriented Programming)

* Class : Data type that contains viarables and functions
    * frame that makes objects (instance = new Class)
```java
public class Person{
    // 속성(Attributes) = 필드 = 멤버변수
    String name;
    ing age;
    String hobby;
    // 동작(Behavior) = 메소드
    public void info() {
        System.out.println("나의 이름은" + name + "입니다.")
    }
}
/*
[접근제한자(public/default)][활용제한자(final/abstract)] class Class_Name{
    Attributes
    Behaviors
    Constructor
}
```

## Variables
* class variable -> Stack
    * ==static==
    * automatically initialized
    * when class is on memory ~ program ended
    * ==shared by all the instances==
        * Class.class_variabe
* instance variable -> Heap
    * automatically initialized
    * when instance is made ~ instance is ended(GC)
    * ==not shared by other instances==
        * Instance.instance_variable
* local variable
    * need to be initialized
    * in a function(method){}
    * can be reached from the outside
```java
public class Person{
    // class variable
    static int personCount;
    // instance variables
    String name;
    ing age;
    String hobby;
    // 동작(Behavior) = 메소드
    public void info() {
        System.out.println("나의 이름은" + name + "입니다.")
    }
}
/*
[접근제한자(public/default)][활용제한자(final/abstract)] class Class_Name{
    Attributes
    Behaviors
    Constructor
}
```

##
