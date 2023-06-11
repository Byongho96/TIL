# 1. 구조

# 1.1. Cotroller

> 클라이언트를 요청을 받고 처리한 뒤, 응답을 반환한다.

사용자의 HTTP요청을 받아 Service로 전달하고, Service에서 반환된 결과를 사용자에게 반환한다. 요청의 유효성 검사, 데이터 변환 등의 역할을 수행하기도 한다.

# 1.2. Service

> Controller로 부터 전달받은 요청을 처리하는, 데이터의 가공, 검증, 상태 변경 등의 비즈니스 규칙을 담는다.

# 1.3. Data

## 1.3.1. DTO

> 사용자 요청과 Controller 사이에서 Data를 매핑하는 객체이다.

## 1.3.3. JPA

- **Repository**  
  DB의 데이터와 Java의 객체를 매핑해주는 함수를 가진다.  
  JPA로 구현되어 있으며, 실제 SQL 쿼리문으로 함수를 만들 수 있다.

- **Entity**

  > DB 테이블과 1:1로 대응되는 객체이다. Service 로직과 DB사이에서 Data를 매핑하는 객체이다.

## 1.3.4. MyBatis

- **DAO(Mapper)**

  > xml 파일로 정의된 SQL 쿼리문과 1:1 매핑되어있는 함수를 통해, DB 테이블을 자바 객체로 변환한다.

# 2. Annotation

## 2.1. Getter

클래스 내부의 변수들에 대해서 getter함수를 자동적으로 생성해준다.
get+변수이름

## 2.2. Setter

클래스 내부의 변수들에 대해서 setter함수를 자동적으로 생성해준다.
set+변수이름

## 2.3. Bean & Component

- **DI & IoC**  
  결국 자원을 효율적으로 이용하기 위한 기능들

Bean과 Component는 각각 메소드와 클래스를 Spring의 Bean(IoC 컨테이너)에 등록한다.

## 2.3.1 Component

@Component는 클래스 단위로 사용되며, 개발자가 직접 컨트롤이 가능한 내부 클래스에 사용한다.

@Service, @Repository, @Controller는 모두 @Component를 상속받는다.

## 2.3.2. Bean

@Bean은 메소드 단위로 사용되며, 외부 라이브러리 사용 시 사용한다.

## 2.3.3. RequiredArgsConstructor

스프링 IoC 컨테이너에서 필요한 인자를 가져와, 클래스 생성 시 필요한 인자를 자동으로 set해준다.

```java
@RequiredArgsConstructor
public class MemberController {

  private final MemberService memberService;
  private final JWTService jwtService;
  private final EncryptService encryptService;
  private final EmailService emailService;
  private final RedisService redisService;
  private final CookieService cookieService;
  private final AwsS3Service awsS3Service;
  ...
}
```

만일 @RequiredArgsConstructor 어노테이션이 없었다면, 위 객체들을 직접 생성해주거나 set하는 함수를 입력해야한다.

## 2.4. Builder

Builder Pattern을 통해 가독성 좋게 클래스에 대한 객체를 생성할 수 있다.

## 2.5. Generic

유연한 설계를 위해 타입을 인자로 전달해주는 용도
