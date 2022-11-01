김연희, 『데이터베이스 개론』, 한빛아카데미(2022.07.20), Chpater 04

## Ch7. 데이터베이스 언어 SQL
관계 대수, 관계 해석을 바탕으로 일반 사용자가 데이터베이스를 조작하기 쉽게 개발된 언어 SQL에 대해 학습한다.

---
### 7.1. SQL의 소개
#### 7.1.1. SQL
SQL(Structured Query Language)는 관계 데이터베이스를 위한 표준 질의어이다. SQL로 데이터 베이스 관리 시스템에 직접 접근하여 대화식으로 질의를 작성할 수도, 응용프로그램에 삽입하여 사용할 수도 있다.
원래 질의어란 데이터 언어 중 검색 위주의 기능을 하는 비절차적 데이터 조작어를 의미하지만, SQL은 데이터 조작 기능과 함께 정의 및 제어 기능까지 제공하는 데이터 언어이다.
![고객 테이블](./images/%EA%B3%A0%EA%B0%9D%EB%A6%B4%EB%A0%88%EC%9D%B4%EC%85%98.jpg)
![제품 테이블](./images/%EC%A0%9C%ED%92%88%EB%A6%B4%EB%A0%88%EC%9D%B4%EC%85%98.jpg)
![주문 테이블](./images/%EC%A3%BC%EB%AC%B8%EB%A6%B4%EB%A0%88%EC%9D%B4%EC%85%98.jpg)

---
### 7.2. SQL을 이용한 데이터 정의
SQL의 데이터 정의 기능은 테이블과 관련되어 있다.
#### 7.2.1. 테이블의 생성
**속성의 정의**
* **데이터 타입**
  |데이터 타입|의미|
  |---|---|
  |INT or INTEGER|정수|
  |SMALLINT|INT보다 작은 정수|
  |CHAR(n) or CHARACTER(n)|길이가 N인 고정 길이의 문자열|
  |VARCHAR(n) or CHARACTER VARYING(n)|최대 길이가 n인 가변 길이의 문자열|
  |NUMERIC(p,s)|고정소수점 실수<br>p는 소숫점 제외한 전체 숫자 길이, s는 소숫점 이하 숫자 길이|
  |FLOAT(n)|길이가 n인 부동 소숫점 실수|
  |REAL|부동 소숫점 실수|
  |DATE|연,월,일로 표현되는 날짜|
  |TIME|시,분,초로 표현되는 시간|
  |DATETIME|날짜와 시간|**
* **NOT NULL**
  CREATE TABLE시 정의되는 속성들은 기본적으로 NULL값을 허용한다. NULL값을 허용하지 않으려면 NOT NULL키워드를 표현해야 한다.
* **DEFAULT**
  사용자가 기본 값을 입력하지 않아도 해당 속성에 NULL값 대신 DEFAULT로 지정한 기본값이 저장된다.

**키의 정의**
* **PRIMARY KEY (기본키)**
  테이블의 각 투플을 식별할 수 있는 키. 반드시 하나만 지정 가능하고, 여러 개의 속성으로 구성할 수도 있다.
* **UNIQUE (대체키)**
  유일성을 가져야하지만 PRIMARY KEY와 다르게 NULL값을 가질 수 있다. 또한 여러개를 지정할 수 있다.
* **FOREIGN KEY (외래키)**
  다른 테이블의 기본키, 혹은 대체키를 참조한다.<br>
  **데이터 무결성(참조 무결성) 정의**
  외래키로 참조되는 테이블이 수정 및 삭제 될 때, 이를 참조하는 테이블은 여전히 유효한 외래키값을 가지고 있어야 한다.
  * ON DELETE
    * ON DELETE NO ACTION
      참조되는 테이블의 투플을 삭제하지 못하게 한다.
    * ON DELETE CASCADE
      참조하는 테이블의 투플을 같이 삭제한다.
    * ON DELETE SET NULL
      외래키의 값을 NULL로 변경한다.
    * ON DELETE SET DEFAULT
      왜래키의 값을 미리 지정한 기본값으로 변경한다.
  * ON UPDATE
    * ON UPDATE NO ACTION
      참조되는 테이블의 투플을 삭제하지 못하게 한다.
    * ON UPDATE CASCADE
      참조하는 테이블의 투플을 같이 삭제한다.
    * ON UPDATE SET NULL
      외래키의 값을 NULL로 변경한다.
    * ON UPDATE SET DEFAULT
      왜래키의 값을 미리 지정한 기본값으로 변경한다.

**데이터 무결성(도메인 무결성) 정의**
* **CHECK**
  CHECK키워드를 이용하여 속성마다 제약조건을 걸 수 있다.
* **CONSTRAINT**
  CONSTRAINT키워드를 이용하여 CHECK 키워드로 생성한 제약조건에 이름을 부여할 수 있다. 제약조건의 이름은 데이터베이스에서 유일해야한다.

**테이블 생성의 예**
1. 고객 테이블은 고객아이디, 고객이름, 나이, 등급, 직업, 적립금 속성으로 구성되고, 고객아이디 속성이 기본키다. 고객이름과 등급 속성은 값을 반드시 입력해야 하고, 적립금 속성은 값을 입력하지 않으면 0이 기본으로 입력되도록 고객 테이블을 생성해보자.
  ```SQL
  CREATE TABLE customer {
    id VARCHAR(20) NOT NULL,
    name VARCHAR(10) NOT NULL,
    age INT,
    grade VARCHAR(10) NOT NULL,
    job VARCHAR(20),
    reserves INT DEFAULT 0,
    PRIMARY KEY(id)
  };
  ```
2. 제품 테이블은 제품번호, 제품명, 재고량, 단가, 제조업체 속성으로 구성되고, 제품번호 속성이 기본키다. 재고량이 항상 0개 이상 10000개 이하를 유지하도록 제품 테이블을 생성해보자.
  ```SQL
  CREATE TABLE product {
    num CHAR(3) NOT NULL,
    name VARCHAR(20) NOT NULL,
    stock INT,
    price INT,
    manufacturer VARCHAR(20),
    PRIMARY KEY(num),
    CHECK (stock >= 0 AND stock <= 10000)
  };
  ```
3. 주문 테이블은 주문번호, 주문고객, 주문제품, 수량, 배송지, 주문이랒 속성으로 구성되고, 주문번호 속성이 기본키다. 주문고객 속성이 고객 테이블의 고객아이디 속성을 참조하는 외래키이고, 주문제품 속성이 제품 테이블의 제품번호 속성을 참조하는 외래키가 되도록 주문 테이블을 생성해보자.
  ```SQL
  CREATE TABLE orders {
    num CHAR(3) NOT NULL,
    customer VARCHAR(20),
    product CHAR(3),
    quantity INT,
    address VARCHAR(30),
    ordered_at DATE,
    PRIMARY KEY(num),
    FOREIGN KEY(customer) customer(id),
    FOREIGN KEY(product) product(num),
  };
  ```
4. 배송업체 테이블은 업체번호, 업체명, 주소, 전화번호 속성으로 구성되고 업체번호 속성이 기본키다. 배송업체 테이블을 생성해보자.
  ```SQL
  CREATE TABLE courier {
    num CHAR(3) NOT NULL,
    name VARCHAR(20),
    address CHAR(100),
    telephone VARCHAR(20),
    PRIMARY KEY(num),
  };
  ```
#### 7.2.2. 테이블의 변경
**새로운 속성의 추가**
* **ADD**
  * customer 테이블에 가입날짜 속성을 추가해보자
    ```sql
    ALTER TABLE cutomer ADD signedup_at DATE;
    ```
**새로운 속성의 삭제**
* **DROP COLUMN**
  * customer 테이블에 가입날짜 속성을 추가해보자
    ```sql
    ALTER TABLE cutomer DROP COLUMN signedup_at;
    ```
**새로운 제약조건의 추가**
* **ADD CONSTRAINT**
  * customer 테이블에 20세 이상의 고객만 가입할 수 있다는 제약조건을 추가해보자
    ```sql
    ALTER TABLE cutomer ADD CONSTRAINT CHK_AGE CHECK(age >= 20);
    ```
**기존 제약조건의 삭제**
* **DROP CONSTRAINT**
  * customer 테이블에 20세 이상의 고객만 가입할 수 있다는 제약조건을 삭제해보자
    ```sql
    ALTER TABLE cutomer DROP CONSTRAINT CHK_AGE;
    ```
#### 7.2.3. 테이블의 삭제
* **DROP TABLE**
  * courier 테이블을 삭제해보자
    ```sql
    DROP TABLE courier;
    ```

### 7.3. SQL의 데이터 조작 기능
SQL의 데이터 조작 기능 테이블의 투플을 조작한다.
#### 7.3.1. 데이터의 검색
**기본 검색**
```sql
SELECT [ALL | DISTINCT] 속성_리스트
FROM 테이블_리스트;
```
검색하고 싶은 속성 리스트는 ','로 구분하여 차례로 나열한다. 그리고 FROM 키워드와 함께 검색하고 싶은 테이블 리스트를 ','로 구분하여 나열한다.
* customer 테이블에서 고객아이디, 고객이름, 등급 속성을 검색해보자
  ```sql
  SELECT id, name, grade FROM customer;
  ```
* customer 테이블에 존재하는 모든 속성을 검색해보자.
  ```sql
  SELECT * FROM customer;
  ```
* product 테이블에서 제조업체를 검색해보자.
  ```sql
  SELECT manufacturer FROM customer;
  ```
* **ALL**
  SELECT문 사용 시 default값으로, 동일 투플의 중복을 허용한다.
  * product에서 제조업체를 검색하되, ALL 키워드를 사용해보자
    ```sql
    SELECT ALL manufacturer FROM product
    ```
* **DISTINCT**
  SELECT문 사용으로 검색한 결과에서 동일 투플의 중복을 제거한다.
  * product에서 제조업체를 중복없이 검색해보자
    ```sql
    SELECT DISTINCT manufacturer FROM product
    ```
* **AS**
  SELECT문으로 검색한 속성의 이름을 바꿔서 출력한다. 실제 속성의 이름이 변경되는 것은 아니다. 별칭에 공백이 포함되어있을 경우 따옴표로 묶어준다.
  * product테이블에서 제품명과 단가를 검색하되, 단가(price)를 cost라는 새 이름으로 출력해보자 
    ```sql
    SELECT name, price AS cost FROM product;
    ```
**산술식을 이용한 검색**
SELECT 키워드와 함게 산술식을 제시할 수 있다.
* product테이블에서 제품명과 단가 속성을 검색하되, 단가(price)에 500원을 더해 retail_price라는 새이름으로 출력해보자 
  ```sql
  SELECT name, price + 500 AS retail_price FROM product;
  ```
**조건 검색**
```sql
SELECT [ ALL | DISTINCT ] 속성_리스트
FROM 테이블_리스트
[ WHERE 조건 ];
```
WHERE 키워드와 함께 비교 연산자와 논리 연산자를 이요하여 검색 조건을 설정할 수 있다. 특히 비교 연산자의 경우 문자나 날자 값을 비교할 수도 있다. 'A' < 'C'. '2022-12-01' < '2022-12-02'
* product 테이블에서 한빛제과가 제조한 제품의 제품명, 재고량, 단가를 검색해보자
  ```sql
  SELECT name, stock, price
  FROM product
  WHERE manufacturer = '한빛제과';
  ```
* orders 테이블에서 apple고객이 15개 이상 주문한 주문제품, 수량, 주문일자를 검색해보자
  ```sql
  SELECT name, quantity, ordered_at
  FROM orders
  WHERE customer = 'apple' AND quantity >= 15;
  ``` 
* orders 테이블에서 apple고객이 주문했거나 15개 이상 주문된 제품의 주문제품, 수량, 주문일자, 주문고객을 검색해보자
  ```sql
  SELECT name, quantity, ordered_at, customer
  FROM orders
  WHERE customer = 'apple' OR quantity >= 15;
  ``` 
* product 테이블에서 단가가 2000원 이상이면서 3000원 이하인 제품의 제품명, 단가, 제조업체를 검색해보자
  ```sql
  SELECT name, price, manufacturer
  FROM product
  WHERE price >= 2000 AND price <=> 3000;
  ``` 
**LIKE를 이용한 검색**
문자열의 검색 조건을 부분적으로만 알고 있다면 LIKE 키워드를 이요해 검색할 수 있다.
|기호|의미|
|:---:|---|
|%|0개 이상의 임의의 문자|
|_|1개 임의의 문자|
* customer테이블에서 성이 김 씨인 고객의 고객이름, 나이, 등급, 적립금을 검색해보자
  ```sql
  SELECT name, age, grade, reserves
  FROM customer
  WHERE name LIKE '김%';
  ```
* customer테이블에서 고객아이디가 5자인 고객의 고객아이디, 고객이름, 등급을 검색해보자
  ```sql
  SELECT id, name, grade
  FROM customer
  WHERE name LIKE '_____';
  ```
**NULL을 이용한 검색**
검색 조건에서 특정 속성의 값이 NULL인지 아닌지를 바교하기 위해 IS NULL과 IS NOT NULL 키워드를 사용한다. NULL값에 비교연산을 적용할 경우 모든 결과가 false로 나오기 때문이다.
* customer 테이블에서 나이가 아직 입력되지 않은 고객의 고객이름을 검색해보자
  ```sql
  SELECT name
  FROM customer
  WHERE age IS NULL;
  ```
* customer 테이블에서 나이가 이미 입력된 고객의 고객이름을 검색해보자
  ```sql
  SELECT name
  FROM customer
  WHERE age IS NOT NULL;
  ```
**정렬 검색**
```sql
SELECT [ ALL | DISTINCT ] 속성_리스트
FROM 테이블_리스트
[ WHERE 조건 ]
[ ORDER BY 속성_리스트 [ ASC | DESC ] ];
```
ORDER BY 키워드를 사용하여 결과 테이블의 투플을 원하는 기준에 따라 정렬할 수 있다.
ORDER BY 키워드 뒤에 정렬 기준이 되는 속성을 지정하고, 오름차순 정렬이면 ASC(기본값), 내림차순 정렬이면 DESC로 표현한다. 여러개이 속성이 지정될 경우 앞선 속성에 중요도를 두어 정렬한다.
* customer 테이블에서 고객이름, 등급, 나이를 검색하되, 나이를 기준으로 내림차순 정렬해보자.
  ```sql
  SELECT name, grade, age
  FROM customer
  ORDER BY age DESC;
  ```
* orders 테이블에서 수량이 10개 이상인 주문의 주문고객, 주문제품, 수량, 주문일자를 검색해보자. 단, 주문 제품을 기준으로 오름차순 정렬하고, 동일 제품은 수량을 기준으로 내림차순 정렬해보자.
  ```sql
  SELECT customer, product, qunatity, ordered_at
  FROM orders
  WHERE quantity >= 10
  ORDER BY product ASC, quantity DESC;
  ```
**집계 함수를 이용한 검색**
특정 속성 값을 통계적으로 계산한 결과를 검색하기 위해 집계 함수(aggregate function)을 이용할 수 있다. 집계함수는 ==NULL인 속성 값은 제외==하고 계산한다. 따라서 **기본키 속성이나 \*를 이용해 계산한다.**
AS를 이용해 보통 속성값에 이름을 별도로 부여해준다.
<table>
  <tr>
    <td>함수</td>
    <td>의미</td>
    <td>적용 가능한 데이터 타입</td>
  </tr>
  <tr>
    <td>COUNT</td>
    <td>갯수</td>
    <td rowspan="3">모든 데이터</td>
  </tr>
  <tr>
    <td>MAX</td>
    <td>최댓값</td>
  </tr>
  <tr>
    <td>MIN</td>
    <td>최솟값</td>
  </tr>
  <tr>
    <td>SUM</td>
    <td>합계</td>
    <td rowspan="2">숫자 데이터</td>
  </tr>
  <tr>
    <td>AVG</td>
    <td>평균</td>
  </tr>
</table>

* 제품 테이블에서 모든 제품의 단가 평균을 검색해보자
  ```sql
  SELECT AVG(price) AS 'average_price'
  FROM product;
  ```
* 제품 테이블에서 제조업체의 수를 검색해보자
  ```sql
  SELECT COUNT(DISTINCT manufacturer) AS 'num_manufacturers'
  FROM product;
  ```
**그룹별 검색**
```sql
SELECT [ ALL | DISTINCT ] 속성_리스트 
FROM 테이블_리스트
[ WHERE 조건 ]
[ GROUP BY 속성_리스트 [ HAVING 조건 ] ]
[ ORDER BY 속성_리스트 [ ASC | DESC ] ]
```
ORDER BY 키워드와 함게 그룹짓는 속성 리스트를 지정하고, HAVING 키워드를 이용하여 그룹에 대한 조건을 걸 수 있다.
보통 그룹을 나누는 기준이 되는 속성을 SELECT절에도 작성하여 결과테이블에서 확인이 용이하도록 한다.
* 주문 테이블에서 주문제품별 수량의 합계를 검색해보자.
  ```sql
  SELECT product, SUM(quantity) AS total_quantity
  FROM orders
  GROUP BY product;
  ```
* 주문 테이블에서 제조업체별로 제조한 제품의 갯수와 제품 중 가장 비싼 단가를 검색하되, 제품의 갯수는 제품수(num_products)라는 이름으로 출력하고 가장 비싼 단가는 최고가(max_price)라는 이름으로 출력해보자.
  ```sql
  SELECT manufacturer, COUNT(*) AS num_products, MAX(price) AS max_price
  FROM product
  GROUP BY manufacturer;
  ```
* 제품 테이블에서 제품을 3개 이상 제조한 제조업체별로 제품의 갯수와, 제품 중 가장 비싼 단가를 검색해보자.
  ```sql
  SELECT manufacturer, COUNT(*) AS num_products, MAX(price) AS max_price
  FROM product
  GROUP BY manufacturer HAVING COUNT(*) >= 3;
  ```
* 고객 테이블에서 적립금 평균이 1000원 이상인 등급에 대해 등급별 고객수와 적립급 평균을 검색해보자.
  ```sql
  SELECT grade, COUNT(*) AS num_customers, AVG(reserves) AS avg_reserves
  FROM customer
  GROUP BY grade HAVING AVG(reserves) >= 1000;
  ```
그룹 별로 검색할 때 집계함수나 GROUP BY 절에 있는 속성 외의 속성을 SELECT 절에 사용할 수 없다. 생각해보니 안그러면 결과 테이블만 보았을 때, 무엇을 기준으로 그룹지어졌는지 알 수가 없다.
```sql
-- Error
SELECT product, customer, SUM(quantity) AS total_quantity
FROM orders
GROUP BY product;
```
```sql
SELECT product, customer, SUM(quantity) AS total_quantity
FROM orders
GROUP BY product, customer;
```
**여러 테이블에 대한 조인 검색**
==조인 속성의 이름은 달라도 되지만 도메인은 반드시 같아야 한다.== 따라서 일반적으로 테이블의 관계를 나타내는 외래키를 조인 속성으로 이용한다.

* WHERE 테이블1.속성1 = 테이블2.속성2
  속성명이 테이블간에 겹치지 않을 경우 테이블 명은 생략할 수 있다.
  * banana 고객이 주문한 제품의 이름을 검색해보자.
  ```sql
  SELECT product.name
  FROM product, orders
  WHERE orders.customer = 'banana' AND product.num = orders.product;
  ```
  * 고명석 고객이 주문한 제품의 제품명을 검색해보자.
    ```sql
    SELECT product.name
    FROM customer, product, orders
    WHERE customer.name = '고명석' AND customer.id = orders.customer AND product.num = orders.product;
    ```
* WHERE 별칭1.속성1 = 별칭2.속성2
  * 나이가 30세 이상인 고객이 주문한 제품 번호와 주문일자를 검색해보자.
  ```sql
  SELECT orders.product, orders.ordered_at
  FROM customer c, orders o
  WHERE c.age >= 30 AND c.id = o.customer;
  ```
* FROM 테이블1 INNER JOIN 테이블2 ON 조인조건
  * 나이가 30세 이상인 고객이 주문한 제품 번호와 주문일자를 검색해보자.
  ```sql
  SELECT orders.product, orders.ordered_at
  FROM customer INNER JOIN orders ON customer.id = orders.customer
  WHERE c.age >= 30;
  ```
* FROM 테이블1 LEFT | RIGHT | FULL OUTER JOIN 테이블2 ON 조인조건
  * 모든 고객들의 고객이름과 주문제품, 주문일자를 검색해보자.
  ```sql
  SELECT customer.name, orders.product, orders.ordered_at
  FROM customer LEFT OUTER JOIN orders ON customer.id = orders.customer
  ```
**부속 질의문을 이용한 검색**
SELECT문의 WHERE절 안에 또 다른 SELECT 문을 포함할 수 있다. 이를 부속 질의문(sub query)라고 한다. 
부속 질의문은 괄호로 묶어 작성하고 ORDER BY 절을 사용할 수 없으며, 상의 질의문보다 먼저 수행된다.
결과를 하나 혹은 하나 이상의 행으로 반환하느냐에 따라서 상의 질의문과 연결하는 사용가능 연산자의 종류가 달라진다.
|단일 행 부속 질의문 연산자|
|---|
|=, <>, <, >, <=, =>|

|다중 행 부속 질의문 연산자|의미|
|---|---|
|IN|일치하는 것이 있으면 참|
|NOT IN|일치하는 것이 하나도 없으면 참|
|EXISTS|결과값이 하나라도 존재하면 참|
|NOT EXISTS|결과값이 존재하지 않으면 참|
|ALL(비교연산자와 함께 사용)|결과값이 모두 연산자를 만족하면 참|
|ANY or SOME(비교연산자와 함게 사용)|결과값 중 하나라도 연산자를 만족하면 참|
* 달콤비스킷을 생산한 제조업체가 만든 제품들의 제품명과 단가를 검색해보자
  ```sql
  SELECT name, price
  FROM product
  WHERE manufacturer = (
    SELECT manufacturer
    FROM product
    WHERE product.name = "달콤비스킷"
  );
  ```
* 적립금이 가장 많은 고객의 고객이름과 적립금을 검색해보자
  ```sql
  SELECT name, reserves
  FROM customer
  WHERE reserves = (
    SELECT MAX(reserves)
    FROM customer
  );
  ```
* banana고객이 주문한 제품의 제품명과 제조업체를 검색해보자
  ```sql
  SELECT name, manufacturer
  FROM product
  WHERE num = (
    SELECT product
    FROM orders
    WHERE customer = 'banana'
  );
* 대한식품이 제조한 모든 제품의 단가보다 비싼 제품의 제품명, 단가, 제조업체를 검색해보자.
  ```sql
  SELECT name, price, manufacturer
  FROM product
  WHERE price > ALL (
    SELECT price
    FROM product
    WHERE manufacturer = '대한식품'
  );
  ```
* 2022년 3월 15일에 제품을 주문한 고객의 고객이름을 검색해보자.
  레코드를 EXISTS에 넣어 반환값이 있을 때에만 해당 레코드의 속성값을 출력한다.
  따라써 sub query에서 SELECT 속성은 *를 이용하여 모두 선택한다.
  ```sql
  SELECT name
  FROM customer
  WHERE EXISTS (
    SELECT *
    FROM orders
    WHERE ordered_at = '2022-03-15' AND orders.customer = custmoer.id
  );
  ```
* 2022년 3월 15일에 제품을 주문하지 않은 고객의 고객의 고객이름을 검색해보자.
  ```sql
  SELECT name
  FROM customer
  WHERE NOT EXISTS (
    SELECT *
    FROM orders
    WHERE ordered_at = '2022-03-15' AND orders.customer = custmoer.id
  );
  ```
#### 7.3.2. 데이터의 삽입
**데이터 직접 삽입**
```sql
INSERT
INTO 테이블_이름[(속성_리스트)]
VALUES 속성값_리스트;
```
INTO 키워드와 함께 삽입할 테이블 이름을 제시한 이후, 속성의 이름을 나열하는데 이 나열 순서대로 VALUES 키워드 다음의 속성 값들이 차례대로 삽입된다. 따라서 ==INTO절의 속성 이름과 VALUES 절의 속성 값은 순서대로 일대일 대응되야한다.== INTO절의 속성 리스트가 생략된 경우, 테이블의 정의된 모든 속성들에 대한 값을 순서대로 속성 값에 삽입해야한다.
* 고객 테이블에 고객아이디가 strawberry, 고객 이름이 최유경, 나이가 30세, 등급이 vip, 직업이 공무원, 적립금이 100원인 새로운 고객의 정보를 삽입해보자.
  ```sql
  INSERT
  INTO customer
  VALUES ('strawberry', '최유경', 30, 'vip', '공무원', 100);
  ```
* 고객 테이블에 고객아이디가 tomato, 고객 이름이 정은심, 나이가 36세, 등급이 gold, 적립금은 4000원, 직업은 아직 모르는 새로운 고객의 정보를 삽입해보자.
  ```sql
  INSERT
  INTO customer(id, name, age, grade, reserves);
  VALUES ('tomato', '정은심', 36, 'gold', 4000);
  ```
**부속 질의문을 이요한 데이터 삽입**
다른 어떤 테이블에서 SELECT문으로 검색한 데이터를 데입한다. 이 때, 속성 리스트와 속성값 리스트는 역시 일대일 대응관계이다.
```sql
INSERT
INTO 테이블_이름[(속성_리스트)]
SELECT 문;
```

#### 7.3.3. 데이터의 수정
```sql
UPDATE 테이블_이름
SET 속성_이름1 = 값1, 속성_이름=값2, ...
[ WHERE 조건 ];
```
특정 속성의 값을 수정한다. 어떤 투플에 대해 수정을 진행할 지는 WHERE문으로 제한한다. WHERE문이 없을 경우, 모든 투플에 대해 수정이 이뤄진다.
* 제품 테이블에서 제품번호가 p03인 제품의 제품명을 통큰파이로 수정해보자.
  ```sql
  UPDATE customer
  SET name = '통큰파이'
  WHERE num = 'p02';
  ```
* 제품 테이블에 있는 모든 제품의 단가를 10% 인상해보자.
  ```sql
  UPDATE product
  SET price = price * 1.1;
  ```
* 정소화 고객이 주문한 제품의 주문수량을 5개로 수정해보자.
  ```sql
  UPDATE orders
  SET quantity = 5
  WHERE customer IN (
    SELECT id
    FROM customer
    WHERE name = "정소화"
  );
  ```
#### 7.3.4. 데이터의 삭제
```sql
DELETE
FROM 테이블_이름
[WHERE 조건];
```
WHERE절에서 제시한 조건을 만족하는 투플을 삭제한다. WHERE 절이 없을 경우, 모든 투플을 삭제하여 빈 테이블로 만든다.
* 주문일자가 2022년 5월 22일인 주문 내역을 삭제해보자.
  ```sql
  DELETE
  FROM orders
  WHERE ordered_at = '2022-05-22';
  ```
* 정소화 고객이 주문한 내역을 주문 테이블에서 삭제해보자.
  ```sql
  DELETE
  FROM orders
  WHERE customer IN (
    SELECT id
    FROM customer
    WHERE name = '정소화'
  );
  ```
* 주문 테이블에 있는 모든 내용을 삭제해보자.
  ```sql
  DELETE
  FROM orders;
  ```
---
### 7.4. 뷰
#### 7.4.1. 뷰의 개념
뷰(view)
: 다른 테이블을 기반으로 만들어진 가상 테이블이다. 즉 물리적으로 저장된 테이블이 아닌, 기존의 테이블을 가공하여 논리적으로 만든 테이블이다. 그러면서도 일반 테이블처럼 조작할 수 있다.
#### 7.4.2. 뷰의 생성
```sql
CREATE VIEW 뷰_이름[(속성_리스트)]
AS SELECT 문
[WITH CHECK OPTION];
```
CREATE VIEW 키워드와 함께 생성할 뷰의 이름을 제시한 후, 뷰를 구성하는 속성의 **이름**을 괄호 안에 나열한다. 이름 리스트를 생략할 시, SELECT 절에 나열된 속성의 이름을 그대로 사용한다.
AS 키워드와 함께 SELECT 구문을 제시한다.
WITH CHECK OPTION을 삽입하면, 뷰에 삽입이나 수정 연산 시, AS SELECT 구문에 걸었던 뷰의 제약조건을 적용한다.
* customer 테이블에서 등급이 vip인 고객의 고객아이디, 고객이름, 나이, 등급으로 구성된 뷰를 excellent_customer이라는 이름으로 생성해보자.
  ```sql
  CREATE VIEW excellent_customer
  AS  SELECT id, name, age, grade
      FROM customer
      WHERE grade = "vip"
  WITH CHECK OPTION;
  ```
* product 테이블에서 제조업체별 제품수로 구성된 뷰를 업체별제품수라는 이름으로 생성해보자.
  ```sql
  CREATE num_products_company(manufacturer, num_products)
  AS  SELECT manufacturer, COUNT(*)
      FROM product
      GROUP BY manufacturer
  WITH CHECK OPTION;
  ```
#### 7.4.3. 뷰의 활용
**데이터 검색**
뷰도 일반 테이블처럼 검색할 수 있다.
* 우수고객 뷰에서 나이가 20세 이상인 고객에 대한 모든 내용을 검색해보자.
  ```sql
  SELECT *
  FROM excellent_customer
  WHERE age >= 20;
  ```
**데이터 삽입, 수정, 삭제**
뷰도 일반 테이블처럼 데이터를 삽입/수정/삭제할 수 있지만, ==기존 테이블도 같이 수정되기 때문에, 기존 테이블의 투플을 어떻게 수정할지 알 수 없다면 연산을 수행할 수 없다.==
1. 기존 테이블의 기본키와 NOT NULL필드로 지정된 속성을 포함하지 않으면 삽입/수정이 불가능하다.
2. 집계함수로 새로 계산된 내용을 포함하고 있는 뷰는 변경할 수 없다.
3. DISTINCT 키워드를 포함하여 정의한 뷰는 변경할 수 없다.
4. GROUP BY 절을 포함하여 정의한 뷰는 변경할 수 없다.
4. 여러개의 테이블을 조인하여 정의한 뷰는 변경할 수 없는 경우가 많다.

**뷰의 장점**
* 자주 사용하는 특정 제약조건의 투플들을 SELECT와 FROM 절만으로 쉽게 접근할 수 있다.
* 사용자 요구에 맞는 다양한 뷰를 정의하고 해당 뷰에만 접근을 허락함으로써, 데이터의 보안을 강화할 수 있다.

#### 7.4.4. 뷰의 삭제
```sql
DROP VIEW 뷰_이름;
```
뷰는 삭제하더라도 기본 테이블에 영향을 끼치지 않는다. 다만 뷰를 참조하는 테이블의 제약조건이 있다면, 삭제가 되지 않을 수도 있다.

---
### 7.5. 삽입 SQL
#### 7.5.1. 삽입 SQL의 개념과 특징
삽입 SQL(Embedded SQL)
: C, C++, JAVA와 같은 프로그래밍 언어의 코드안에 삽입하여 사용하는 SQL문

**삽입 SQL 특징**
* 코드에서 일반 명령문이 위치할 수 있는 곳이면 어디든지 삽입할 수 있다.
* 일반 명령문과 구별하기 위해 삽입 SQL문 앞에 EXEC SQL을 붙인다.
* 프로그램에 선언되 일반 변수를 SQL문에서 사용할 수 있다. 단 SQL의 테이블/속성 이름과 구분하기 위해 ':'을 앞에 붙인다.

#### 7.4.2. 커서가 필요 없는 삽입 SQL
한 개의 행만을 반환하는 SELECT 문이나 CREATE / INSERT / DELETE / UPDATE 문이 해당한다.
```c
int main() {

  // 1. SQL구문 안에서 사용할 변수를 EXEC SQL BEBIN/END DECLARE SECTION 문장 사이에서 선언한다.
  EXEC SQL BEBIN DECLARE SECTION;
    char p_no[4], p_name[21];   // 변수는 대입할 속성의 데이터 타입과 동일하게 선언한다. 지금은 null문자를 포함하는 C언어의 특징상 문자열의 길이가 +1 증가했다.
    int price;
  EXEC SQL END DECLARE SECTION;

  printf("제품번호를 입력하세요: ");
  scanf("%s", p_no);

  EXEC SQL SELECT name, price INTO :p_name, :price  // 2. INTO 키워드를 사용하여 검색 결과를 변수에 대입한다. 
    FROM product
    WHERE num = :p_no;

  printf("\n 제품명 = %s", p_name);
  printf("\n 단가 = %d", price);

  return 0;
}
```
#### 7.4.3. 커서가 필요한 삽입 SQL
한 개 이상의 행을 반환하는 SELECT 문의 경우, 커서를 사용하여 한 행씩 차례로 접근할 수 있다.

1. DELCARE 명령어를 사용하여 SELECT문에 커서를 할당한다.
  ```sql
  EXEC SQL DECLARE 커서_이름 CURSOR FOR SELECT 문;

  EXEC SQL DECLARE product_cursor CURSOR FOR SELECT name, price FROM product;
  ```
2. OPEN 명령어를 사용하여 커서에 연결된 SELECT문을 실행한다.
  ```sql
  EXEC SQL OPEN 커서_이름;
  
  EXEC SQL OPEN product_cursor;
  ```
3. FETCH 명령어를 사용하여 커서를 한 행씩 옮긴다.
  ```sql
  EXEC SQL OPEN 커서_이름 INTO 변수_리스트;
  
  EXEC SQL OPEN product_cursor INTO :p_name, :price;
  ```
4. CLOSE 명령어를 사용하여 커서를 닫느다.
  ```sql
  EXEC SQL CLOSE 커서_이름;
  
  EXEC SQL CLOSE product_cursor;
  ```


