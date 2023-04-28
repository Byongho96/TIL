# Redis <!-- omit from toc -->

## Index <!-- omit from toc -->

- [1. 개요](#1-개요)
- [2. 설치](#2-설치)
  - [2.1. Linux](#21-linux)
- [3. 사용자 설정](#3-사용자-설정)
  - [3.1. Linux](#31-linux)
    - [3.1.1. ACL 조회](#311-acl-조회)
    - [3.1.2. ACL 수정](#312-acl-수정)
- [4. Django](#4-django)
  - [4.1. Django 4.0 이상](#41-django-40-이상)
  - [4.2. Django 4.0 미만](#42-django-40-미만)

# 1. 개요

> [Redis](https://redis.io/docs/about/)는 in-memory 데이터 구조 저장소를 지원하는 오픈 소스이다. 메모리를 데이터 저장소로 활용하기 때문에 데이터의 읽기/쓰기가 기존 디스크 기반 DBMS보다 빠르게 동작한다.

- **Redis 기능**
  - 문자열, 해쉬, 리스트, 집합 등 과 같은 다양한 데이터 구조와 그에 따른 연산을 지원한다.
  - 쿼리, 비트맵, HyperLogLog, 지리정보, 스트림과 같은 복합적인 데이터 구조 또한 지원한다.
  - 복제, LRU 알고리즘, 트랜잭션, 구독 등의 기능을 제공한다.
  - 디스크와 연동함으로써 데이터를 영구 보관할 수 있다.

# 2. 설치

## 2.1. Linux

```bash
# https://packages.redis.io/gpg 로 부터 GPG 공개키를 가져온다.
# 가져온 GPG 공개 키를 디코딩하고, /usr/share/keyrings/ 경로에 저장한다.
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

# Redis 패키지 저장소를 추가한다.
# $(lsb_release -cs)는 현재 사용 중인 Ubuntu 배포판의 코드네임이 들어간다
# 명령어 출력을 etc/apt/sources.list.d/ 경로에 저장함으로써 apt 패키지 관리자가 Redis 패키지 저장소를 사용할 수 있도록 한다.
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis
```

# 3. 사용자 설정

## 3.1. Linux

Linux 상에서 사용자 설정은 [ACL(Redis Access Control List)](https://redis.io/docs/management/security/acl/)를 통해 이루어진다.

### 3.1.1. ACL 조회

```bash
redis-cli ACL LIST

> 1) "user default on nopass ~* &* +@all"
```

- **default(username)**  
  원래 사용자의 username에 해당하는 부분으로, redis 설치 시에 default 유저는 기본으로 생성되고, redis 명령을 실행하는 default 유저로 동작한다.
- **on**  
  해당 유저가 활성화 되어 있다.
- **nopass**  
  해당 유저에 할당된 비밀번호가 없다.
- **~\***  
  해당 유저는 모든 정규식 패턴의 키에 접근할 수 있다.
- **&\***
  해당 유저는 모든 정규식 패턴의 채널을 [PUB/SUB](https://redis.io/docs/manual/pubsub/) 하고 있다.
- **@all**
  해당 유저가 모든 명령어를 실행할 권한을 가지고 있다.

### 3.1.2. ACL 수정

- **사용자 추가**

  ```bash
  redis-cli ACL SETUSER {username}
  ```

- **사용자 설정**

  ```bash
  redis-cli AACL SETUSER {사용자 이름} {활성화 여부} {비밀번호 설정} {접근 가능 key 설정} {채널 설정} {명령어 설정}
  ```

  - **활성화 여부**
    - **on**
      해당 유저를 활성화한다.
    - **off**  
      해당 유저를 비활성화한다.
      원래 사용자의 username에 해당하는 부분으로, redis 설치 시에 default 유저는 기본으로 생성되고, redis 명령을 실행하는 default 유저로 동작한다.
  - **비밀번호 설정**
    - **>{password}**  
      비밀번호 목록에 password를 추가한다. 하나의 유저는 여러 비밀번호를 가질 수 잇다.
    - **<{password}**  
      비밀번호 목록에서 password를 제거한다.
    - **resetpass**  
      해당 유저의 모든 비밀번호를 제거한다.
  - **접근 가능 key 설정**
    - **~{reg}**  
      해당 유저가 접근할 수 있는 key를 정규식 패턴으로 추가한다.
    - **%R~{reg}** (Redis 7.0 >=)  
      해당 유저가 읽을 수 있는 key를 정규식 패턴을 추가한다.
    - **%W~{reg}** (Redis 7.0 >=)  
      해당 유저가 쓸 수 있는 key를 정규식 패턴으로 추가한다.
    - **resetkeys**  
      해당 유저의 모든 키 패턴을 제거한다.
  - **Pub/Sub 설정**
    - **&{reg}**  
      해당 유저가 접근할 채널을 key를 정규식 패턴으로 추가한다.
    - **resetchannels** (Redis 6.2 >=)  
      해당 유저가 접근 가능한 모든 채널을 삭제한다.
  - **명령어 설정**
    - **+{command}**  
      해당 유저가 사용할 수 있는 명렁어를 추가한다.
    - **-{command}**  
      해당 유저가 사용할 수 있는 명렁어를 제거한다.
    - **+@{category}**  
      해당 유저가 사용할 수 있는 명렁어를 카테고리 단위로 추가한다.
    - **-@{category}**  
      해당 유저가 사용할 수 있는 명렁어를 카테고리 단위로 제거한다.

- **사용자 인증**

  ```bash
  redis-cli AAUTH {username} {password}

  > OK
  ```

# 4. Django

## 4.1. Django 4.0 이상

1. **Django 설정**  
    Django 4.0 이상의 버전부터는 Django 자체적으로 Redis를 캐시 서버를 이용할 수 있도록 지원한다. [공식문서](https://docs.djangoproject.com/en/4.2/topics/cache/#redis)를 따라서 아래와 같이 설정할 수 있다.

   ```python
   CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.redis.RedisCache",
        "LOCATION": "redis://{IP 주소}:{포트 번호}",
        # 유저네임과 비밀번호 지정할 경우
        # "LOCATION": "redis://{redis 유저네임}:{redis 비밀번호}}@{IP 주소}:{포트 번호}",
    }
   }
   ```

2. **redis-py 설치**  
   [공식문서](https://pypi.org/project/redis/)에 따라 설치한다.

   ```bash
   $ pip install "redis[hiredis]"
   ```

3. **python 파일 내 사용**
   [공식문서](https://redis.readthedocs.io/en/stable/commands.html)의 명령어를 참고해 사용한다.
   ```python
   import redis
   r = redis.Redis(decode_responses=True)
   r.set('mykey', 'thevalueofmykey')
   r.get('mykey')
   ```

## 4.2. Django 4.0 미만

Django 4.0미만의 버전에서는 [django-redis](https://github.com/jazzband/django-redis)를 설치해 사용한다.

1. **django-redis 설치**
   ```python
   CACHES = {
       "default": {
           "BACKEND": "django_redis.cache.RedisCache",
           "LOCATION": "redis://{IP 주소}:{포트 번호}/0",
           # 유저네임과 비밀번호 지정할 경우
           # "LOCATION": "redis://{redis 유저네임}:{redis 비밀번호}}@{IP 주소}:{포트 번호}/0",
           "OPTIONS": {
               "CLIENT_CLASS": "django_redis.client.DefaultClient",
           }
       }
   }
   ```
2. **python 파일 내 사용**
   ```python
   from django.core.cache import cache
   cache.set("foo", "value", timeout=25)
   cache.get("foo")
   ```
