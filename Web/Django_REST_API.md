## 0. HTTP
### 0.1. 정의
웸 상에서 HTML 문서와 같은  리소스를 주고받을 수 있도록 하는 프로토콜
클라이언트와 서버는 다음과 같은 개별 메시지 교환에 의해 통신한다
  * 요청(request)
    * 클라이언트에 의해 전송되는 메시지
  * 응답(response)
    * 서버에서 응답으로 전송되는 메시지

### 0.2. HTTP의 특징
Stateless(무상태)
: 동일한 연결에서 연속적으로 수행되는 두 요청 사이에 링크가 없음

쿠키와 세션
: 쿠키와 세션을 사용해 서버 상태를 요청에 함께 보냄

### 0.3. HTTP Request Methods
클라이언트 요청 시, 리소스(데이터)에 대한 행위를 정의
* **GET**
  * 서버에 리소스의 표현을 요청
* **POST**
  * 데이터를 지정된 리소스에 제출
* **PUT**
  * 요청한 주소의 리소스를 수정
* **POST**
  * 지정된 리소스를 삭제

### 0.3. HTTP Response Status Code
[HTTP Response Status Code Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
특정 HTTP 요청에 대한 서버의 처리결과를 나타냄
응답은 5개의 그룹으로 나뉨
* Informational Responses (100~199)
* Successful Responses (200~299)
* Redirection Responses (300~399)
* Client Error Responses (400~499)
* Server Error Responses (500~599)

### 0.4. URI(Uniform Resource Indentifier)
URI(Uniform Resource Indentifier)
: 인터넷에서 하나의 리소스를 가리키는 문자열
* URN
  * 고유한 이름
* URL(Uniform Resource Locator)
  * 리소스의 주소(위치)

### 0.5. URL 구조
`https://www.example.com:80/path/to/myfile.html/?key=value#quick-start`
* Schema
  * 브라우저가 리소스를 이용하는 데 사용해야할 프로토콜
  * Ex: https, mailto:, ftp:
* Authority
  * Domain Name(IP 주소)
    * 요청중인 웹 서버를 나타냄
    * Domain Name 대신 IP주소를 사용해도 됨
  * Port
    * 웹 서버의 리소스에 접근하는데 사용되는 기술적인 문
    * HTTP 프로토콜의 표준 포트는 생략가능
      * HTTP - 80
      * HTTPS - 443
    * Django의 경우 8000이 기본 포트로 설정되어 있음
* Path
  * 웹 서버의 리소스 경로, 물리적 주소가 아닌 설계자에 의해 추상화된 경로
* Parameters
  * 웹 서버에 제공하는 추가적인 데이터
  * '&'기호로 구분되는 key-value 쌍 목록
* Anchor
  * 리소스 내부 일정의 북마크를 나타내며, 브라우저의 해당 북마크 지점에서 콘텐츠를 표시
  * '#'(부분 식별자)이후 부분은 서버에 전송되지 않고, 브라우저가 사용
---
## 1. REST API
### 1.1. API
API(Application Programming Interface)
: 애플리케이션과 프로그래밍으로 소통하는 방법. 복잡한 코드를 추상화하여 사용할 수 있는 쉬운 구문을 제공
* Web API
  * 웹 서버 또는 웹 브라우저를 위한 API
  * 주로 JSON 타입의 데이터를 응답
* Open API
  * 개발자라면 누구나 사용할 수 있도록 공개된 API

### 1.2. REST(Restpresentational State Trasfer)
REST
: API Server를 개발하기 위한 일종의 소프트웨어 설계 방법론
* **자원의 식별**
  * URI(URL)
* **자원의 행위**
  * HTTP Method
* **자원의 표현**
  * JSON

### 1.3. JSON
JSON
: JavaScript의 표기법을 다른 단순 문자열로, 파이썬의 Dictionary 자바스크립트의 object처럼 C계열의 언어가 갖고 있는 자료구조로 쉽게 변환할 수 있는 key-value 형태의 구조를 가지고 있다.

**'Content-Type'entity header**
* 리소스의 type을 나타내기 위해 사용되며, 컨텐츠의 유형을 클라이언트에게 알려준다.
* 개발자 도구 > Network > Name(data) > Headers > Response Headers > Content-Type

---
## 2. Response JSON
Django는 현업에서 주로 백엔드 Framework로 쓰인다. 따라서 프론트엔드와 소통할 때 html 문서가 아닌 json파일로 응답한다.

### 2.1. Django의 HTML 응답
* urls.py
  ```python
  from django.urls import path
  from . import views

  urlpatterns = [
      path('html/', views.article_html),
  ]
  ```
* views.py
  ```python
  from django.shortcuts import render
  from .models import Article

  def article_html(request):
      articles = Article.objects.all()
      context = {
        'articles': articles,
      }
      return render(request, 'articles/article.html', context)
  ```
* article.html
  ```html
  ...
  <body>
    <h1>Article List</h1>
    <hr>
    <p>
      {% for article in articles %}
        <h2>{{ article.pk }}번 글. {{ article.title }}</h2>
        <p>{{ article.content }}</p>
        <hr>
      {% endfor %}
    </p>
  </body>
  ```

### 2.2. Django의 JsonResponse()를 사용한 JSON 응답
serilaize
: Queryset 및 Model Instance와 같은 복잡한 데이터를 JSON, XML과 같은 쉽게 변환 할 수 있는 데이터타입으로 변환시키는 것

* urls.py
  ```python
  from django.urls import path
  from . import views

  urlpatterns = [
      path('json1/', views.jsonresponse),
  ]
  ```
* views.py
  ```python
  from django.http.response import JsonResponse
  from .models import Article

  def jsonresponse(request):
      articles = Article.objects.all()
      articles_json = []

      for article in articles:
          # 리스트[딕셔너리] 형태로 데이터를 형성
          articles_json.append(
              {
                  'id': article.pk,
                  'title': article.title,
                  'content': article.content,
                  'created_at': article.created_at,
                  'updated_at': article.updated_at,
              }
          )
      return JsonResponse(articles_json, safe=False)
  ```
  * **JsonREsponse()**
    * JSON-encoded response를 만드는 클래스
    * =='safe'== parameter
      * Default: True
      * False로 설정 시 모든 타입의 객체를 serialization할 수 있음, True일 경우 dictionary만 가능

### 2.3. Django의 Django Serializer를 사용한 JSON 응답
* urls.py
```python
from django.urls import path
from . import views

urlpatterns = [
    path('json2/', views.django_serializer),
]
```
* views.py
```python
from django.http.response import JsonResponse, HttpResponse
from django.core import serializers
from .models import Article

def django_serializer(request):
    articles = Article.objects.all()
    data = serializers.serialize('json', articles)
    return HttpResponse(data, content_type='application/json')
```
  * **serializers.serialize(format, object)**
    * object를 format으로 변환해줌
    * format
      * 'xml', 'json', 'jsonl', 'yaml'

### 2.4. Django의 REST framework를 사용한 JSON 응답
#### 2.4.1. Django REST framework
Django REST framework(DRF)
: Django에서 RESTful API서버를 쉽게 구축할 수 있도록 도와주는 오픈소스 라이브러리

**특징**
Django의 Form, ModelForm과 유사하게 사용 가능하다.

**설치 과정**
1. `pip install djangorestframework`
2. `INSTALLED_APPS = [ 'rest_framework' ]`

#### 2.4.2. Example
* serializers.py
  ```python
  from rest_framework import serializers
  from .models import Article


  class ArticleSerializer(serializers.ModelSerializer):

      class Meta:
          model = Article
          fields = '__all__'
  ```
* urls.py
  ```python
  from django.urls import path
  from . import views

  urlpatterns = [
      path('json3/', views.RESTserializer),
  ]
  ```
* views.py
  ```python
  from rest_framework.decorators import api_view
  from rest_framework.response import Response

  from .serializers import ArticleSerializer
  from .models import Article
 
  @api_view()
  def RESTserializer(request):
      articles = Article.objects.all()
      serializer = ArticleSerializer(articles, many=True)
      return Response(serializer.data)
  ```
  * ModelSerializer()
    * is_valid()
  * Response()

#### 2.4.3. Client의 JSON 수신
위의 example을 브라우저 상에서 요청하면, Content-Type이 html로 나온다. 이것은 rest_framework가 브라우저와 소통할 때 지원하는 기능

아래와 같이 request요청을 보내면 그 결과를 json으로 받을 수 있다.
```python
# pip install requests
import requests
from pprint import pprint

# 요청을 보냄
response = requests.get('http://127.0.0.1:8000/api/v1/json3/')
# json(): requests.Response -> dict
result = response.json()

pprint(result)
```
  * `requests.get(url: str, params={key: value}, args)`
    * return: requests.Response object

---
## 3. Django REST Framework, Single Model
* serializers.py
  app/serializers.py 구조로 보통 쓰지만, 강제는 아님
  ```python
  from rest_framework import serializers
  from .models import Article

  # 데이터의 어떠한 filed를 read할 것이냐에 따라 Serializer를 만듦, T 개념을 대체하는 것을 염두

  # id, title, field를 return
  class ArticleListSerializer(serializers.ModelSerializer):

      class Meta:
          model = Article
          fields = ('id', 'title', 'contnet', )
  ```
## 4. Django REST Framework, N:1 Relation