---
title: 'Django와 Vue 프로젝트 Github SSH Actions로 자동 배포하기'
updatedAt: '2023-05-20'
createdAt: '2023-07-21'
description: 'Django와 Vue 프로젝트를 AWS EC2상에 배포하고, Github SSH Actions를 이용하여 자동 빌드 및 배포 환경을 구축한다'
tags: ['DevOps', 'Django', 'Vue', '배포', 'AWS', 'EC2', 'Github Actions']
isCompleted: true
reference:
---

# 시작하기 전에...<!-- omit in toc -->

> Django와 Vue를 이용해서 만든 [Boogie 프로젝트](https://github.com/Byongho96/boogie-project)의 **기초적인** 배포 과정을 정리한 문서입니다.  
> [Boogie 웹사이트 링크](https://boogie-movie.site/)

- .pem 키를 이용해 원격 EC2에 SSH(Secure Shell)로 접속해 쉘커맨드를 실행시키는 방식으로 배포를 진행했다.
- 이 방식은 간단하지만, 어떤 보안 상의 이슈가 있을지 확신할 수 없다. Github Action을 활용한 보다 정형화 된 배포 방법으로는 **AWS의 CodeDeploy**를 알아보는 걸 추천한다.

## Index<!-- omit in toc -->

- [1. Django 배포 준비](#1-django-배포-준비)
  - [1.1. Django .env 파일 생성](#11-django-env-파일-생성)
    - [1.1.1. .env 파일 작성](#111-env-파일-작성)
    - [1.1.2. django-environ](#112-django-environ)
    - [1.1.3. .gitignore 수정](#113-gitignore-수정)
  - [2. DEBUG 모드 변환](#2-debug-모드-변환)
    - [2.1. ALLOWED_HOSTS 제한](#21-allowed_hosts-제한)
    - [2.2. 정적파일 제공 못함](#22-정적파일-제공-못함)
- [2. Vue 배포 준비](#2-vue-배포-준비)
  - [2.1. .env 파일 작성](#21-env-파일-작성)
- [3. EC2 설정](#3-ec2-설정)
  - [3.1. python 설치](#31-python-설치)
  - [3.2. node.js 설치](#32-nodejs-설치)
  - [3.3. Django 프로젝트 실행](#33-django-프로젝트-실행)
  - [3.4. gunicorn 실행](#34-gunicorn-실행)
  - [3.5. Vue 프로젝트 빌드](#35-vue-프로젝트-빌드)
  - [3.6. nginx](#36-nginx)
- [4. Github Actions](#4-github-actions)

---

# 1. Django 배포 준비

Django 코드를 짜는 것과, Django를 배포하는 것의 전혀 다른 부분이다.

개발한 Django 프로젝트를 실제 배포하기 전에, **보안을 위해 <mark>최소한 다음의 절차</mark>는 밟아야 한다.**

## 1.1. Django .env 파일 생성

**.env 파일은 프로젝트의 환경변수를 저장하기 위한 단순 문자열 파일이다.**
보통 <mark>API_KEY와 같이 외부에 공개되면 안되는 값</mark>을, 프로젝트에 하드코딩하지 않고 따로 .env 파일에서 관리한다.

그렇게 작성한 .env 파일은 .gitignore에 추가해서 github과 같이 온라인의 공개된 장소에 공유되지 않게 하고,  
이후에 서버에 직접 추가하는 등의 추가 작업이 필요하다.

### 1.1.1. .env 파일 작성

API_KEY처럼 외부에 공개되지 않아야 할 파일을 모아 .env 파일을 작성한다.

**특히 SECRET_KEY는 Django 프로젝트 생성 시, 자동 생성되는 중요한 KEY값이므로 반드시 .env에 추가해야한다.**

```
SECRET_KEY=your-django-secret-key
API_KEY=your-api-key
```

- **변수 이름**과 **값**은 '='로 연결되며, 사이에 공백은 들어가지 않는다.
- **변수 이름**은 영어 대문자와 '\_'의 조합으로 이뤄져야 한다.

### 1.1.2. django-environ

[django-environ](https://django-environ.readthedocs.io/en/latest/)은 Django 프로젝트에서 작성한 .env을 읽어오기 위한 Python 라이브러리이다.

아래 절차는 공식문서의 내용을 따라 작성했다.

1. **django-environ 설치**  
   django-envrion은 가상환경 내에 설치하는 것을 권장한다.

   ```bash
   python -m pip install django-environ
   ```

2. **.env 파일 위치 확인**  
   작성한 .env 파일을 **프로젝트의 루트 경로**(manage.py가 위치한 곳)에 위치시킨다.

3. **settings.py 수정**

   ```python
   import environ
   import os

   # env 기본 설정
   env = environ.Env(
       # env파일에 있는 DEBUG 환경변수를 Boolean으로 타입변환한다.
       # 만일 DEBUG 환경변수가 없을 경우, default값은 False이다.
       # 배포환경에서는 반드시 False여야 한다.
       DEBUG=(bool, False)
   )

   # 공식문서에서는 아래와 같이 BASE_DIR을 지정하지만, 그럴 경우 settings.py파일 내에서 BASE_DIR / 'subdir' 형식으로 파일경로를 지정할 수 없다.
   # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
   BASE_DIR = Path(__file__).resolve().parent.parent

   # BASE_DIR 위치를 기준으로 .env 파일을 읽어온다.
   environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

   # .env 파일로부터 값 참조
   DEBUG = env('DEBUG')
   SECRET_KEY = env('SECRET_KEY')
   ```

### 1.1.3. .gitignore 수정

.gitignore파일에 .env를 추가해서 커밋되지 않도록 한다.  
이후 따로 서버에서 .env 파일을 직접 생성해준다. 이따 해당 내용도 다룬다.

```
# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/
```

## 2. DEBUG 모드 변환

배포 환경에서 `DEBUG`값은 반드시 False여야 한다.

[Django 공식문서](https://docs.djangoproject.com/en/4.2/ref/settings/#debug)를 보면, DEBUG가 True일 경우 다음과 같은 문제가 있다.

- 에러에 대한 구체적인 이유를 표시한다.(보안 이슈)
- 손쉬운 디버깅을 위해 실행된 SQL를 모두 기억한다.(메모리 자원 낭비)

따라서 배포 환경에서는 반드시 `DEBUG`를 `False`로 설정해야 한다. 이는 .env 파일에서 `DEBUG=False`로 하던가, 아니면 아예 값을 집어 넣지 않으면 된다.

```python
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')
```

### 2.1. ALLOWED_HOSTS 제한

`DEBUG`가 `False`일 때는, 프로젝트를 호스팅 할 IP 주소를 `settings.py`에 다음과 명시해줘야 한다.

```python
# settings.py

ALLOWED_HOSTS = [
    '127.0.0.1',  # 로컬 IP 주소
    {EC2 IP 주소}, # EC2 IP 주소
]
```

### 2.2. 정적파일 제공 못함

**`DEBUG`가 `False`일 때는, Django는 정적 파일을 제공하지 못한다.**

이 문제 때문에 한동안 골머리를 앓았다...
배포하니까 갑자기 api로 사용자 프로필을 받아오지 못하는 것이다!!

[구글링 해보니](https://forum.djangoproject.com/t/django-static-files-in-deployment-debug-false/16675/2) Django는 DEBUG=False일 때 정적파일을 제공하지 못한다고 한다. ~~그럼 애초에 그런 기능을 넣지 말던가...~~

따라서 Nginx와 같은 웹서버를 이요해서 정적파일을 제공해야 한다.  
이에 대해서는 아래 [nginx항목](#36-nginx)에서 확인할 수 있다.
즉, 다음과 같은 미디어 파일 설정들이 배포 환경에서는 딱히 무용해지는 것이다.

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    ...
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

```

# 2. Vue 배포 준비

## 2.1. .env 파일 작성

Vue도 Django와 마찬가지로 .env 파일을 통해 프로젝트의 환경변수를 설정할 수 있다.  
그런데 몇가지 다른 점이 있다.

- **보안 취약**  
  아무리 .env파일을 만들다고 한 들, **프론트엔드 프로젝트가 빌드될 때 .env 파일도 함께 빌드된다.**  
  따라서 최종적으로 **클라이언트 측에 환경 변수 값이 그대로 전달되어, 크롬 개발자 도구 등으로 확인**할 수 있다.  
  <mark>정말 중요한 데이터라면, 아예 해당 값을 백서버에 두어 API등으로 전달받아야 한다.</mark>

- **.env 파일 우선순위**  
   프론트엔드는 여러 종류의 .env파일이 있고, 이들 간의 우선순위가 있다.  
   Vue 프로젝트가 `npm run serve` 명령어로 실행되면 개발 모드(Development)의 환경변수 파일들이 참조되고, `npm run build`명령어로 실행되면 배포 모드(production)의 환경변수 파일들이 참조된다.
  - **Development**: .env.development.local > .env.local > .env.development > .env
  - **Production**: .env.production.local > .env.local > .env.production > .env

나는 앞서 말한 프론트엔드 프로젝트 환경변수 파일의 **보안 취약점**때문에 API_KEY처럼 보안상으로 문제되는 환경변수는 Django가 관리하도록 했다.

그리고 .env 파일 종류를 활용해서, 다음과 같이 로컬환경과 배포환경에서의 API 서버 URL을 나눴다.

```env
# .env
VUE_APP_SERVER_URL=http://127.0.0.1:8000
```

```env
# .env.production
VUE_APP_SERVER_URL=http://boogie-movie.site
```

# 3. EC2 설정

아래 내용은 AWS EC2가 있음을 가정한다.

AWS EC2가 없거나, .pem키가 무엇이니 모르면 [AWS EC2 기초 가이드](https://byongho96.github.io/TIL/posts/Tools/AWS/)를 참고하길 바란다. 시간을 갈아 넣어 친절하게 작성한 문서이다.

## 3.1. python 설치

**Django를 실행하기 위해서 당연히 python을 설치해야한다.**

그 중 [pyenv](https://github.com/pyenv/pyenv)는 여러 개의 Python버전을 쉽게 관리할 수 있도록 한다. (Node.js로 치면 nvm같은 존재)

아래 내용은 [pyenv 공식 문서](https://github.com/pyenv/pyenv)를 따라 정리했다.

1. **pyenv github repo 클론**

   ```bash
   git clone https://github.com/pyenv/pyenv.git ~/.pyenv
   ```

2. **환경변수와 PATH 등록**

   ```bash
   # 현재 사용자(.bashrc)에 대해 PYENV_ROOT 환경변수를 지정한다.
   echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc

   # pyenv가 설치되어 있는지 확인하고, 설치되어있지 않으면 PATH 환경 변수에 pyenv 경로(~/.pyenv/bin)을 추가한다.
   # PATH는 : 를 기준으로 참조하는 디렉토리를 구분해서 저장한다.
   # bin폴더에 실행 가능한 파일지 저장된다.
   echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc

   # (pyenv init -)는 pyenv 초기화 쉘코드를 출력하고, 이를 .bashrc에 추가해서 로그인시마다 pyenv를 초기화시킨다.
   echo 'eval "$(pyenv init -)"' >> ~/.bashrc
   ```

   ```bash
   # 로그인 환경변수(.profile)에도 적용한다.
   echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.profile
   echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.profile
   echo 'eval "$(pyenv init -)"' >> ~/.profile
   ```

3. **shell 재시작**  
   PATH 변경사항을 반영하기 위해 shell을 재시작한다.

   ```bash
    exec "$SHELL"
   ```

4. **Python build dependcies 설치**
   ```bash
   sudo apt update; sudo apt install build-essential libssl-dev zlib1g-dev \
   libbz2-dev libreadline-dev libsqlite3-dev curl \
   libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
   ```
5. **pyenv 설치 확인**

   ```bash
   pyenv -v

   # 출력 확인 => pyenv VERSION_INFO
   ```

6. **python 설치**

   자신의 프로젝트에 맞는 python 버전을 설치한다

   ```bash
   pyenv install 3.9.X
   pyenv global 3.9.X
   python -V
   ```

## 3.2. node.js 설치

**역시 Vue를 빌드하기 위해서는 당연히 node.js를 설치해야한다.**

[Ubuntu 20.04 Node.js 설치 문서](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-20-04/)를 따라 아래 내용을 작성했다.

1. **node.js 설치**

   node.js 설치 및 버전 확인

   ```bash
   sudo apt update
   sudo apt install nodejs npm
   nodejs --version
   ```

   Vue 2.0 프로젝트를 빌드하기 위해서는 nodejs의 버전이 v12.x 이상이어야 한다.  
   위 명령어에서 확인한 버전이 12.x 미만일 경우, 아래 명령어를 따라한다.

   ```bash
   # node 설치관련 스크립트를 다운받고, bash 쉘을 root권한으로 재시작한다.
   curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
   sudo apt install nodejs
   node --version
   ```

2. **build-essential 설치**  
   노드 패키지(모듈)에서 C/C++로 작성된 부분을 natvie addons라고 말하고, 이러한 패키지를 설치하기 위해서는 해당 운영 체제에서 빌드(컴파일) 도구를 설치해야 한다.
   ```bash
   sudo apt install build-essential
   ```

## 3.3. Django 프로젝트 실행

1. **프로젝트 클론**  
   먼저 자신의 Django git 프로젝트를 클론한다.

   ```bash
   cd ~
   git clone {project_remote_url}
   ```

2. **Django .env 생성**

   vi 등의 문서 편집기로 .env파일을 작성한다.

   ```bash
   cd {장고_프로젝트_폴더}
   sudo vi .env
   # vi 에디터 사용법을 모를 경우, 구글링해보자
   ```

   vi가 없을 시에는, 아래 명령어로 설치로 설치할 수 있다.

   ```bash
   sudo apt-get update
   sudo apt-get install vim
   ```

3. **Python 가상환경 실행**

   Python 가상환경을 실행한다.

   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **Django DB 생성**

   Django 데이터베이스 생성

   ```bash
   python manage.py migrate

   # fixture가 있는 경우
   python manage.py loaddata {fixture 파일}
   ```

5. **Django static파일 수집**

   제공할 static파일이 있을 경우, 아래 명령어로 static파일을 모은다.

   ```bash
   python manage.py collectstatic
   ```

   수집되는 위치는 settings.py 설정을 따른다.

   ```python
   # settings.py

   # 수집할 위치 확인
   STATIC_ROOT = BASE_DIR / 'staticfiles'
   ```

## 3.4. gunicorn 실행

개발할 때 사용하던, `runserver`명령어를 배포환경에서 사용하면 안된다.  
[Django 공식문서](https://docs.djangoproject.com/en/4.2/ref/django-admin/#runserver)에 따르면, 이는 개발 서버로써 보안과 성능이 떨어지기 때문이다.

따라서 다른 미들웨어를 사용해야 하는데,
Python프레임워크의 대표적인 WSGI(Web Server Gateway Interface)인 [gunicorn](https://docs.gunicorn.org/en/stable/install.html)을 사용할 것이다.(2023년 상반기 기준)

1. **gunicorn 설치**  
   django 프로젝트 가상환경 내에서 설치한다.
   ```bash
   pip install gunicorn
   ```
2. **ALLOWED_HOSTS 확인**  
   Django를 gunicorn으로 서비스하기 위해서는 ALLOWED_HOSTS를 지정해줘야 한다.

   ```python
   # settings.py

   ALLOWED_HOSTS = [
       '127.0.0.1',  # 로컬 IP 주소
       {EC2 IP 주소}, # EC2 IP 주소
   ]
   ```

3. **gunicorn 시스템 서비스 등록**  
    gunicorn을 시스템 서비스에 등록하면, 운영체제의 백그라운드에서 돌아간다.  
    좀더 직관적으로 표현하자면, 서버 컴퓨터가 켜져있는 한 계속 실행되고 있도록 등록하는 것이다.

   **어떤 프로그램을 시스템 서비스에 등록하기 위해서는 `/etc/systemd/system/`경로에 .service파일을 작성**해야한다.

   ```bash
   sudo vi /etc/systemd/system/gunicorn.service
   ```

   unit 설정 파일 작성법은 [Linux.md](https://byongho96.github.io/TIL/posts/Tools/Linux/#32-service)에 정리해두었다. ~~근데 나도 잘 모름~~
   아래 예시 파일을 그대로 가져다가 써도 된다.  
   workers란 gunicorn의 프로세스 갯수를 의미하며, 직관저거으로 workers를 높게 설정할수록 많은 요청을 처리할 수 있지만, 메모리 점유율과 성능을 고려하여 CPU 코어 수와 동일하게 설정하는 것이 가장 무난하다.

   ```c
   [Unit]
   Description=gunicorn daemon
   After=network.target

   [Service]
   User=ubuntu
   Group=www-data
   WorkingDirectory=/home/ubuntu/{장고 프로젝트 폴더}
   ExecStart=/home/ubuntu/{장고 프로젝트 폴더}/venv/bin/gunicorn \
           --workers 3 \
           --bind 127.0.0.1:8000 \
           {장고 마스터 앱}.wsgi:application

   [Install]
   WantedBy=multi-user.target
   ```

4. **시스템 데몬을 재시작**

   unit파일을 작성했으면, 시스템 데몬을 재시작 하여 gunicorn 서비스를 실행시킨다.

   ```bash
   sudo systemctl daemon-reload

   sudo systemctl start gunicorn
   sudo systemctl enable gunicorn
   sudo systemctl status gunicorn.service

   # 중지
   # sudo systemctl stop gunicorn

   # 재시작
   # sudo systemctl restart gunicorn
   ```

## 3.5. Vue 프로젝트 빌드

1. **프로젝트 클론**  
   자신의 Vue git 프로젝트를 클론한다.  
   Django랑 동일한 레포에 있다면, 굳이 또 해줄 필요 없다.

   ```bash
   cd ~
   git clone {project_remote_url}
   ```

2. **Vue .env 생성**

   vi 등의 문서 편집기로 .env파일을 작성한다.

   ```bash
   cd {Vue_프로젝트_폴더}
   sudo vi .env
   ```

3. **npm module 설치**

   ```bash
   cd {Vue_프로젝트_폴더}
   npm install
   ```

4. **Vue 프로젝트 빌드**  
   Vue 프로젝트를 빌드할 경우, 프로젝트 루트경로 dist폴더 내에 index.html파일이 생성된다.
   ```bash
   npm run buld
   ```

## 3.6. nginx

Nginx를 웹서버로 사용해서 정적 파일을 제공하고 api요청을 reverse proxy할 수 있다.

Nginx에 대한 더 자세한 설명은 [Nginx.md](https://byongho96.github.io/TIL/posts/Tools/Nginx/)에 정리되어 있다.

1. **nginx 설치**

   ```
   sudo apt-get update
   sudo apt-get install -y nginx
   ```

2. **nginx 설정파일 작성**  
   `/etc/nginx/sites-available` 경로에 nginx 설정파일을 원하는 이름으로 작성한다.

   ```
   sudo vi /etc/nginx/sites-available/{프로젝트 이름}
   ```

   **nginx 설정파일의 구체적인 내용은 프로젝트에 따라서 달라진다.**

   - Django로 가는 API 요청의 url엔드포인트가 모두 `/api`임을 가정하고, 아래 설정파일을 작성했다.
   - Django가 자체적으로 정적파일을 제공하고 있다면, STATIC_ROOT와 MEDIA_ROOT를 settings.py에서 확인해야 한다. 보통 STATIC_ROOT는 'staticfiles'로 설정하고, MEDIA_ROOT는 'media'로 설정된다.
   - Vue 프로젝트의 빌드된 index.html이 `dist/`에 있음을 가정하고, 아래 설정파일을 작성했다.

   ```nginx
   server {
        listen 80;
        server_name {서버IP주소};

        # Django static 파일 제공
        location /static/ {
                alias {장고 프로젝트 루트 경로}/{STATIC_ROOT}/;
        }

        # Django media 파일 제공
        location /media/ {
                alias {장고 프로젝트 루트 경로}/{MEDIA_ROOT}/;
        }

        # Django API proxy
        location /api {
                include proxy_params;
                proxy_pass http://127.0.0.1:8000;
        }

        # Vue 빌드 파일 제공
        location / {
                root {Vue 프로젝트 루트 경로}/dist/;
                index index.html;
                try_files $uri $uri/ /index.html;
        }
    }
   ```

3. **nginx 설정파일 활성화**  
   `sites-availables/`에 작성한 설정파일을 실제로 활성화 하기 위해서는 `sites-enabled/`폴더에 등록해야 한다.  
   소프트 링크를 통해 이를 구현할 수 있는데, 간단히 말해 포인터를 만든다고 생각하면 된다.

   ```bash
   sudo ln -s /etc/nginx/sites-available/{설정파일 이름} /etc/nginx/sites-enabled
   ```

4. **nginx 재시작**  
   작성한 설정파일을 활성화 하기 위해 nginx를 재시작한다.

   ```bash
   # 80번 포트의 프로세서 종료
   sudo lsof -t -i tcp:80 -s tcp:listen | sudo xargs kill

   # nginx 재시작
   sudo systemctl restart nginx
   ```

# 4. Github Actions

지금까지 위의 모든 절차를 따라했다면 배포가 완료되었다. EC2 IP주소로 접속하면 확인해볼 수 있을 것이다.

이제는 github actions를 이용해서 github 레포지토리에 수정한 코드를 push하였을 경우, <mark>자동 빌드/배포가 되는 환경을 구축</mark>해볼 것이다.

SSH를 통해 원격의 EC2에서 직접 쉘명령어를 실행시키는 간단한 방법을 사용할 것이다.
참고로 핵심이 되는 action은 [appleboy/ssh-action](https://github.com/appleboy/ssh-action)이다.

1. **Github 레포지토리 접속**

   <img src="./assets/github_repository.jpg" alt ="github_repository.jpg" width=700 />

   Github 레포지토리에 접속해 Actions 항목을 클릭한다.

2. **workflow 작성**

   <img src="./assets/github_actions.jpg" alt ="github_actions.jpg" width=700 />

   실행시킬 workflow를 **yml파일** 양식으로 작성해야 한다.

   <img src="./assets/github_yml.jpg" alt="github_yml.jpg" width=700 />

   ```yml
   # workflow의 이름
   name: AWS Deploy

   # main 브랜치에 push가 일어났을 때, 현재 workflow를 발동시킨다.
   on:
      push:
         branches:
            - main

   # workflow는 하나 이상의 job으로 구성되고, 각 job을 서로 다른 실행환경에서 진행시킬 수 있다.
   jobs:
      Deploy:  # job_id라고 하며 job의 id로 작용한다. 문자열을 이용해서 unique하게 작명하면 된다.
         name: Deploy to EC2  # name은 github UI상에 표시되는 job 이름이다.
         runs-on: ubuntu-latest  # job의 실행환경을 정의하며, 공식문서를 참고해서 정해진 label을 사용해야 한다.

         # 하단의 uses는 작업단계를 자동화하기 위해 사용되는 패키지 혹은 코드를 말하며 이는 특정 github 레포지토리일수도, 도커 이미지일수도 있다.
         steps:
            - uses: actions/checkout@v3
            - name: SSH
            uses: appleboy/ssh-action@v0.1.10
            # with는 key-value형식으로 정의되는 환경변수이다. 하단의 양식은 appleboy/ssh-action에서 정의된 것이다.
            with:
               # github secrets에 저장해둔 값을 가져와 사용한다.
               key: ${{ secrets.SSH_KEY }}
               host: ${{ secrets.HOST }}
               username: ${{ secrets.USER }}
               # 실제로 실행시키고 싶은 쉘명령어를 작성한다.
               script: |
                  cd ~/boogie-project
                  git pull
                  git switch main
                  cd frontend
                  npm install
                  npm run build
                  cd ../backend
                  source venv/bin/activate
                  pip install -r requirements.txt
                  sudo systemctl restart gunicorn
   ```

   각 명령어에 대한 더 자세한 내용을 알고 싶으면, [Github 공식문서](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)를 참고하길 바란다.

3. **secrets 등록**

   앞 서 `key: ${{ secrets.SSH_KEY }}`처럼 작성한 행들은, 마치 환경변수처럼 레포지토리에 설정된 값을 불러오겠다는 의미이다.

   이 또한 중요한 값들을 하드코딩하지 않음으로써, 보안을 유지하기 위함이다. 아래 내용은 레포지토리에 secrets를 등록하는 방법이다.

   <img src="./assets/github_settings.jpg" width=700>

   레포지토리의 settings를 클릭한다.

   <img src="./assets/github_secrets_actions.jpg" width=700>

   왼쪽 사이드바에서 Secrets and variables > Actions 로 들어간다.

   <img src="./assets/github_secrets.jpg" width=700>

   New repository secret을 눌러서 이전에 yml파일에서 작성했던 secrets값들을 등록한다.

   - **SSH_KEY**  
     EC2에 등록된 .pem key
     ```
      -----BEGIN RSA PRIVATE KEY-----
      위 아래 저 문구들도 같이 복사해줘야 한다!
      -----END RSA PRIVATE KEY-----
     ```
   - **HOST**  
     EC2 IP주소
   - **USER**  
     EC2 사용자 이름으로 AWS 페이지에서 확인할 수 있다.
     ubuntu 서버이고, 따로 사용자를 생성해주지 않았다면 십중팔구 `ubuntu`이다.

4. **로그 확인**

   <img src="./assets/github_workflows.jpg" width=700>

   이 후 지정한 브랜치에서 push 이벤트가 발생하면, 자동으로 workflow가 실행된다.

   <img src="./assets/github_logs.jpg" width=700>

   클릭하면 자세한 로그 기록도 확인할 수 있으니, 혹시라도 에러가 발생하면 참고하자
