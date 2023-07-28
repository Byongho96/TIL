---
title: 'SpringBoot 프로젝트 구조 정리'
updatedAt: '2023-07-12'
createdAt: '2023-07-12'
description: 'SpringBoot가 어떻게 동작하는지 이해하기 위해, 프로젝트 구조 및 각 파일의 역할을 알아본다.'
tags: ['SpringBoot', '폴더 구조', '개요']
isCompleted: true
reference:
---

> 프론트엔드 개발자로써 SpringBoot가 어떻게 돌아가는지 알고 싶어서 정리해보았다.  
> 지난 프로젝트를 참고하고, 친구 Java 개발자의 도움을 받았다.  
> Thanks to. [췐쓰희](https://velog.io/@chancehee)

# 1. 개요

SpringBoot는 객체지향적인 Java를 기반으로 한 프레임워크이다.  
"객체지향"을 한 마디로 정의하기는 어렵겠지만, 나는 **클래스를 바탕으로 한 설계**라고 생각하는 것도 직관적인 이해에 도움이 될 것 같다.  
SpringBoot의 각 요소(Controller, Service, Repository)는 Class로 설계되며, 싱글톤 패턴에 따라 각각의 클래스는 하나의 인스턴스를 만들어 재사용된다.

이러한 내부적인 동작은 SpringBoot가 담당하기 때문에, 모른다고해서 코드를 못짜는 것은 아니다.  
오늘은 그보다 <mark> Controller, Service, Repository 각 파일의 실질적인 역할에 대해서 알아볼 것이다.</mark>

## 1.1. SpringBoot 기본 구조

SpringBoot의 기본 구조는 아래와 같다.

깊은 디렉토리 중첩에 지레 겁 먹을 필요는 없다(~~내가 그랬다~~).  
내 자바코드 경로에 유일성을 부여해서, 다른 자바 패키지와 구분하기 위한 용도일 뿐이다.  
한마디로 `java/net/guides/springboot2/`를 그냥 `java_net_uides_springboot2/`라는 하나의 폴더라고 생각해도 무방하다.

<img src="./assets/springboot-project-structure.png" alt="springboot-project-structure.png" width="400" >

- **src/**  
  빌드 설정 등을 제외하고는, 거의 대부분의 개발이 `src`폴더 내에서 이뤄진다.

- **src/main/**  
  프로젝트를 빌드 했을 때, `.jar` 파일에 포함되는 코드이다. (`.jar`파일은 그냥 빌드 결과물이다.)
  쉽게 말해 어플리케이션을 서버로 실행했을 때, 실제로 사용되는 소스코드와 리소스가 있는 곳이다.
  대응되는 디렉토리로 `src/test/`가 있다.

- **src/main/java/**  
  자바 소스코드가 저장되는 곳이다.

  - **Application.java 파일**  
    정확히 말하면 `{프로젝트명}Application.java` 로 자동 생성된다.  
    <mark>프로젝트의 엔트리 포인트(시작점)을 담당한다.</mark>
    대충 아래처럼 생겼는데, 저 `@SpringBootApplication` 어노테이션이 SpringBoot 어플리케이션의 기본 설정을 자동 제공한다.

    ```java
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;

    @SpringBootApplication
    public class Application {

        public static void main(String[] args) {
            SpringApplication.run(Application.class, args);
        }
    }
    ```

- **src/main/resources/**  
  자바 소스코드가 아닌 파일들이 저장되는 곳이다.  
  설정파일(`.xml`, `.properties`)이나 정적파일( `.html` ,`.css`, `.js`)이 그 예이다.  
  (원래 SpringBoot는 풀스택을 지원하는 프레임워크이다.)

- **src/test**  
  테스트 코드 및 테스트를 위한 추가 리소스가 저장되는 곳이다.  
  따라서 빌드 시에, 최종적으로 `.jar` 파일에 포함되지 않는다.

## 1.2. SpringBoot 요청 처리 과정

<img src="./assets/springboot-request-flow.png" alt="springboot-request-flow.png" width=600 />

SpringBoot가 클라이언트 요청을 받으면, 위와 같은 순서로 파일을 거쳐 처리한다.

- **Controller**  
  요청의 유효성을 검증하고 적절한 Service를 호출한다. 그리고 결과를 다시 응답 형태로 클라이언트에게 반환한다.

- **Service**  
  **핵심 로직이 구현되는 부분이다.**  
  Controller로부터 받은 데이터를 적절하게 가공한 뒤, Repository를 호출하여 데이터베이스를 조작한다.

- **Repository**  
  데이터베이스에 접근하여 데이터를 조작한다.

<img src="./assets/spring-web-layer.png" alt="spring-web-layer.png" width=600 />

Spring은 사용자 요청을 처리하는 데 있어, 3 개의 레이어를 두고 각가의 역할을 분리함으로써 유지보수성을 높였다.
`Controller`, `Service`, `Repository`가 각각의 레이어를 대표하는 파일이다.

## 1.3. 계층형 구조 & 도메인형 구조

`src/main/java/` 내부 폴더구조를 구성하는 방법은 크게 2가지가 있다. 바로 계층형 구조와 도메인형 구조이다.

- **계층형 구조**
  Spring의 <mark>레이어 관점</mark>에서 디렉토리를 구분한다.

  ```
    controller
      ⎿ ProductController
      ⎿ MemberController
      ⎿ CartController

    service
      ⎿ ProductService
      ⎿ MemberService
      ⎿ CartService

    repository
      ⎿ ProductRespository
      ⎿ MemberRespository
      ⎿ CartRespository

    dao
      ⎿ Product
      ⎿ Member
      ⎿ Cart
  ```

- **도메인형 구조**

  <mark>엔터티(Entity) 관점</mark>에서 디렉토리를 구분한다.

  ```
  product
    ⎿ controller
    ⎿ service
    ⎿ dao
    ⎿ dto

  member
    ⎿ controller
    ⎿ service
    ⎿ dao
    ⎿ dto

  cart
    ⎿ controller
    ⎿ service
    ⎿ dao
    ⎿ dto
  ```

# 2. DTO

**Controller에서 클랑이언트의 요청을 Java 객체 형태로 받기 위해서 DTO를 사용한다.**
DTO가 없다고 해서 Controller가 사용자 요청을 못받는 것은 아니다. 하지만 서버 단에서 미리 필요한 필드값을 지정할 수 있고, 손쉽게 Java 객체로 변환할 수 있는 등의 장점이 많이 있기 때문에 보통 DTO를 사용한다.

- DTO로 지정한 필드 외의 추가 필드가 있을 경우, 해당 필드는 무시되고
- 반대로 지정한 필드의 값이 들어오지 않는 경우, 해당 필드는 초깃값 혹은 null로 들어온다.
- 필요에 따라서 데이터 형식이 맞지 않을 시, 예외를 발생시킬 수도 있다.

아래는 `username`과 `password`필드를 가진 간단한 `MemberDTO` 예시이다.

```java
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDto {
  String username;
  String password;
}
```

# 3. Controller

아래는 회원가입 Controller 예시이다.  
당연히 구체적인 로직은 프로젝트마다 다르다. 예를 들어, 아래와 같이 예외처리도 직접 명시하지 않고, `@RestControllerAdvice`와 `@ExceptionHandler`를 활용해서 전역적인 예외처리 클래스를 만들 수도 있다.

```java
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;

  @PostMapping("/signup")
  public ResponseEntity<String> signUp(@RequestBody MemberDto memberDto) {
    try {
      memberService.signUp(memberDto);
      return ResponseEntity.ok("회원가입이 완료되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입에 실패했습니다.");
    }
  }
}
```

- **@RestController**  
  @RestController는 @Controller와 @ResponseBody 어노테이션을 결합한 것이다.  
  이 어노테이션을 적용하면, Spring이 해당 클래스를 컨트롤러로 인식하여 HTTP 요청에 대한 처리를 수행하고, HTTP 응답을 자동으로 JSON 식으로 변환하여 반환한다.
- **@RequestMapping**  
  @RequestMapping 어노테이션은 요청 URL 경로와 컨트롤러의 메서드를 매핑하는 역할을 한다.
- **@PostMapping**  
  이름에서 짐작할 수 있는 것처럼, URL 경로와 HTTP메소드를 결합하여 메서드를 매핑하는 역할을 한다.
  이 외에도 @GetMapping, @PutMapping, @DeleteMapping 이 있다.
- **MemberDto**  
  앞서 만든 Dto를 이용해서 클라이언트의 요청을 Java 객체 형태로 받아 처리한다.
- **MemberService**  
  컨트롤러는 사용자 요청을 받은 뒤, 실제 비즈니스 로직을 처리하기 위해 Service를 호출한다. 그리고 그 결과에 따라 응답을 생성하여 반환한다.

# 4. Service

Service의 경우 보통 `Service.java`와 `ServiceImpl.java`이 한 쌍으로 존재한다.

- `Service.java`은 **인터페이스**로써, Service 클래스의 추상화된 메소드를 선언하고
- `ServiceImpl.java`는 `Service.java`를 실제 구현한 **클래스**이다.

이렇게 역할을 분리함으로써, 하나의 인터페이스를 바탕으로 여러 개의 구현체를 확장할 수 있다.

## 4.1. Service

다음은 회원가입 기능을 가진 `MemberService`에 대한 인터페이스이다.

```java
public interface MemberService {

  public String signUp(MemberDto memberDto);

}
```

## 4.2. ServiceImpl

다음은 앞 서 선언한 `MemberService`를 구현한 클래스이다.

```java
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

  private final MemberRepository memberRepository;

  // MyBatis
  @Transactional
  public void signUp(MemberDto memberDto) {
    memberRepository.insertMember(memberDto);
  }

  // JPA
  @Transactional
  public void signUp(MemberDto memberDto) {
    // MemberDto -> MemberEntity 변환
    MemberEntity member = new MemberEntity();
    member.setUsername(memberDto.getUsername());
    member.setPassword(memberDto.getPassword())

    // JPA 내장 메소드를 통한 레코드 저장
    memberRepository.save(member);
  }
}
```

위의 코드를 **MyBatis**와 **JPA**를 사용하는 경우를 구분해서 코드를 작성했다. 왜냐하면 어떤 데이터베이스 접근 프레임워크를 사용하느냐에 따라 `Repository`가 다르게 구현되기 때문이다.

- **MyBatis**는 `Repository`에 `DTO`를 그대로 전달할 수 있다. 최종적으로 데이터를 받는 `Mapper.xml`이 `DTO`를 해석할 수 있기 때문이다.

- **JPA**는 DB의 테이블과 1:1 관계로 설계된 `Entity` 형태로 바꿔줘야 한다. JPA가 `Entity`를 기반으로 동작하기 때문이다.

# 5. Repository

Repository는 어떤 데이터베이스 프레임워크를 사용하느냐에 따라 다르게 설계된다. 대표적으로 MyBatis와 JPA 프레임워크가 있다.

- **MyBatis**

  - 개발자가 직접 SQL 쿼리를 작성하고 이를 메소드와 매핑한다.
  - 직접 SQL을 작성하므로 세밀한 제어가 가능하며, 복잡한 쿼리와 성능 최적화에 유리하다.
  - 하지만 같은 이유로 보다 많은 개발 작업과 유지보수 비용이 필요하다.

- **JPA (Java Persistence API)**
  - 정해진 작명법에 맞춰 메소드를 작성하면, JPA가 SQL을 대신 생성한다.
  - 객체 지향적인 개발에 용이하며, 생산성을 향상시킬 수 있다.
  - 하지만 SQL의 세부적인 제어가 어렵다.

## 5.1. MyBatis

- **Mapper.xml**

  실제 SQL 쿼리문이 xml 형식으로 작성된다.

  ```xml
  <?xml version="1.0" encoding="UTF-8" ?>
  <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
  <mapper namespace="{패키지 명}.MemberMapper">

    <insert id="insertUser" parameterType="{패키지 명}.MemberDto">
        INSERT INTO users (username, password)
        VALUES (#{username}, #{password})
    </insert>

  </mapper>
  ```

  - `namespace`에는, 해당 xml파일을 Java메소드로 매핑시킬 인터페이스를 입력해준다.
  - `parameterType`에는, 해당 xml 파일이 전달받는 인자의 타입을 입력해준다. 위에까지의 예시에 따르면 DTO클래스이다.

- **Mapper.java**

  앞 서 작성한 sql 쿼리문을 Java 메소드와 매핑해준다. <mark>메소드의 이름은 xml파일의 `id`와 동일해야 한다.</mark>

  ```java
  @Mapper
  public interface MemberMapper {

    public void insertUser(MemberDto memberDto);

  }
  ```

- **Repository.java**

  MyBatis에서 Repository는 `Mapper.java`가 대체할 수 있지만, 전체적인 레이어 통일성을 위해 추가해봤다.

  ```java
  @Repository
  @RequiredArgsConstructor
  public class MemberRepository {

      private final MemberMapper memberMapper;

      public void insertUser(MemberDto memberDto) {
          MemberMapper.insertUser(memberDto);
      }
  }
  ```

## 5.2. JPA

JPA는 데이터베이스 테이블과 1:1로 대응되는 `Entity` 객체를 바탕으로 동작한다.

- **Entity.java**  
  <mark>데이터베이스의 테이블과 1:1로 대응된다.</mark> JPA는 Entity를 바탕으로 DB에 테이블을 자동생성하는 기능 또한 제공한다.

  ```java
  @Entity
  @Table(name = "members")  // 테이블 이름을 명시적으로 지정. 없을 경우 클래스 이름을 따름
  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public class MemberEntity {
      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;
      @Column(nullable = false)
      private String username;
      @Column(nullable = false)
      private String password;
  }
  ```

- **Repository.java**  
  JPA는 내재된 기능이 많기 때문에, 별도의 학습 후 <mark>정해진 규칙에 따라 메소드를 선언</mark>해야 한다.  
  다음은 username을 기반으로 레코드를 조회하는 메소드의 예시이다.

  ```java
  import org.springframework.data.jpa.repository.JpaRepository;

  @Repository
  public interface UserRepository extends JpaRepository<User, Long> {
      Optional<User> findByUsername(String username);
  }
  ```

# 6. 주요 어노테이션

## 6.1. @Getter / @Setter

`@Getter`와 `@Setter`는 Lombok 어노테이션으로, 필드에 대한 Getter와 Setter 메소드를 자동 생성해준다

```java
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Person {
    private String name;
    private int age;
    private String address;
}

public class Main {
    public static void main(String[] args) {
        Person person = new Person();

        person.setName("John Doe");
        person.setAge(25);
        person.setAddress("123 Main St");

        System.out.println("Name: " + person.getName());  // Name: John Doe
        System.out.println("Age: " + person.getAge());  // Age: 25
        System.out.println("Address: " + person.getAddress()); // Address: 123 Main St
    }
}
```

## 6.2. @Builder

`@Builder`는 Lombok 어노테이션으로, 빌더 패턴으로 객체를 생성할 수 있도록 한다.  
빌더 패턴이란, 가독성 높은 방식으로 객체를 생성하는 방식이다.(아래 예시코드 참고)

```java
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Person {
    private String name;
    private int age;
    private String address;
}

public class Main {
    public static void main(String[] args) {
        // 빌더 패턴
        Person person = Person.builder()
                .name("John Doe")
                .age(25)
                .address("123 Main St")
                .build();

        System.out.println(person.toString()); // Person(name=John Doe, age=25, address=123 Main St)
    }
}
```

## 6.3. @NoArgsConstructor / @AllArgsConstructor

`@NoArgsConstructor`는 매개변수가 없는 기본 생성자를 자동 생성한다.  
`@AllArgsConstructor`는 모든 필드를 인자로 받는 생성자를 자동 생성한다.

```java
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class Person {
    private String name;
    private int age;
    private String address;
}

public class Main {
    public static void main(String[] args) {
        // 기본 생성자로 객체 생성
        Person person1 = new Person();

        // 모든 필드를 인자로 받는 생성자로 객체 생성
        Person person2 = new Person("John Doe", 25, "123 Main St");
    }
}
```

## 6.4. @RequiredArgsConstructor

`@RequiredArgsConstructor`는 `final`로 선언된 필드에 대한 생성자를 자동 선언한다.

SpringBoot의 관점에서 `@RequiredArgsConstructor`를 통한 생성자 주입은 곧 <mark>의존성 주입</mark>으로 이어진다. SpringBoot는 생성자에 대응하는 빈(객체)을 자동으로 주입하기 때문이다.

위의 Controller, Service, Repository 에서 모두 `@RequiredArgsConstructor`어노테이션을 사용한 이유가 바로 이 때문이다.

```java
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;

  ...
}
```

## 6.5. @Data

`@Data`는 Lombok 어노테이션으로, `@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@RequiredArgsConstructor` 등을 한 번에 포함한다.

@Data를 사용하면 `get()`, `set()`, `toString()`, `equals()`, `hashCode()` 등의 메소드를 사용할 수 있다.

```java
import lombok.Data;

@Data
public class Person {
    private String name;
    private int age;
    private String address;
}

public class Main {
    public static void main(String[] args) {
        Person person1 = new Person();
        person1.setName("John Doe");
        person1.setAge(25);
        person1.setAddress("123 Main St");

        Person person2 = new Person();
        person2.setName("John Doe");
        person2.setAge(25);
        person2.setAddress("123 Main St");

        // toString() 메소드 호출
        System.out.println(person1.toString()); // 출력: Person(name=John Doe, age=25, address=123 Main St)

        // equals() 메소드 호출. 객체의 필드값 비교
        System.out.println(person1.equals(person2)); // 출력: true

        // hashCode() 메소드 호출
        System.out.println(person1.hashCode()); // 출력: 객체의 해시 코드(식별자) 값
    }
}
```

# 7. 참조

- [Standard Project Structure for Spring Boot Projects](https://www.javaguides.net/2019/01/standard-project-structure-for-spring-boot-projects.html)
- [[Spring] 스프링 MVC 프로젝트 기본구조와 동작 순서](https://hpark3.tistory.com/28)
- [Spring Guide - Directory 패키지 구조 가이드](https://cheese10yun.github.io/spring-guide-directory/)
- [Spring boot 패키지 구조](https://velog.io/@sunil1369/Spring-boot-%ED%8C%A8%ED%82%A4%EC%A7%80-%EA%B5%AC%EC%A1%B0)
