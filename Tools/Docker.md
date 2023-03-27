# Docker <!-- omit from toc -->

## Index <!-- omit from toc -->

- [0. Docker](#0-docker)
- [1. Docker Image](#1-docker-image)
  - [1.1. 개요](#11-개요)
  - [1.2. Dockerfile](#12-dockerfile)
  - [1.3. 명령어](#13-명령어)
- [2. 컨테이너](#2-컨테이너)
  - [2.1. 개요](#21-개요)
  - [2.2. 명령어](#22-명령어)
- [3. DockerHub](#3-dockerhub)
  - [3.1. 개요](#31-개요)
  - [3.2. 명령어](#32-명령어)
- [4. Volume](#4-volume)
  - [4.1. 개요](#41-개요)
  - [4.2. 명령어](#42-명령어)
- [5. Docker Compose](#5-docker-compose)
  - [5.1. 개요](#51-개요)
  - [5.2. YAML 파일](#52-yaml-파일)
  - [5.3. 명령어](#53-명령어)

# 0. Docker

Docker는 어플리케이션 소프트웨어를 컨테이너라 부르는 독립된 환경에서 실행시킬 수 있도록 한다. 컨테이너 내부에는 운영체제를 제외하고, 어플리케이션을 구동하기 위한 모든 정보를 담고 있다.

Docker를 이용하면 환경에 구애받지 않고, 정형화된 방식으로 어플리케이션 배포를 진행할 수 있다. 또한 가상환경과 다르게 여러개에 컨테이너가 하나의 운영체제의 자원을 공유해서 사용할 수 있기 때문에, 보다 효율적으로 컴퓨터 자원을 사용할 수 있다.

# 1. Docker Image

## 1.1. 개요

도커 이미지는 어플리케이션을 실행하기 위한 코드, 라이브러리, 런타임 환경 등의 모든 정보에 더해, 컨테이너를 실행시켰을 때 수행할 명령어 정보도 담고 있다.

다르게 설명하자면 도커 이미지는 실행하고자 하는 어플리케이션 프로젝트의 특정 시점을 담아 파일화 한것이며, 해당 이미지를 컨테이너로 실행시킴으로써 동일한 형태의 프로젝트를 여러 개 실행시킬 수 있다.

도커 이미지는 DockeFile을 빌드함으로써 생성할 수 있다.

## 1.2. Dockerfile

도커 파일은 Docker Image를 만드는 명령문을 가지는 문서이다. 모든 도커 파일은 base 이미지를 바탕으로 생성되며, 이미 생성된 이미지를 확장하여 사용할 수도 있다.

```c
// base 이미지 지정
FROM <이미지>:<태그>

// 컨테이너 내부 작업 디렉토리 지정
// 이후 명령문들의 기준
WORKDIR <내부 디렉토리>

// shell 커맨드
RUN ["<커맨드>", "<파라미터1>", "<파라미터2>"]
RUN <전체 커맨드>

// 파일 및 폴더 복사
COPY <src> <dest>

// 빌드 및 컨테이너 동작 시 유효한 환경변수 지정
ENV <키> <값>
ENV <키>=<값>

// docker build 커맨드에서 --build-arg 옵션을 통해 넘길 수 있는 인자를 정의
ARG <이름>
ARG <이름>=<기본값>

// 컨테이너로 들어오는 트래픽을 리스닝할 포트 지정
// 프로토콜 TCP(default) / UDP
EXPOSE <포트>
EXPOSE <포트>/<프로토콜>

// 컨테이너를 실행시킬 때 default로 실행시킬 shell 커맨드
// docker run과 함께 커맨드 인자를 입력하면, 실행되지 않음
CMD ["<커맨드>","<파라미터1>","<파라미터2>"]
CMD <전체 커맨드>

// 컨테이너를 실행시킬 때 항상 실행되어야 하는 shell 커맨드
ENTRYPOINT ["<커맨드>", "<파라미터1>", "<파라미터2>"]
ENTRYPOINT <전체 커맨드>

// CMD와 ENTRYPOINT 혼합
// docker run docker_image -> index.js 실행
// docker run docker_image main.js -> main.js 실행
ENTRYPOINT ["node"]
CMD ["index.js"]
```

## 1.3. 명령어

| 명령어                                   | 설명                             |
| ---------------------------------------- | -------------------------------- |
| docker build -t [이미지명] [이미지 경로] | Dockerfile로 이미지 빌드         |
| docker image inspect [이미지명]          | Docker이미지 상세 정보 조회      |
| docker image ls [옵션]                   | Docker 이미지 목록 출력          |
| docker image pull [이미지명]             | Docker 이미지 다운로드           |
| docker image push [사용자명/이미지명]    | Docker 이미지 푸시               |
| docker image rm [이미지명]               | Docker 이미지 삭제               |
| docker image prune [옵션]                | 사용하지 않는 docker 이미지 삭제 |

# 2. 컨테이너

## 2.1. 개요

도커 컨테이너는 하나의 독립적인 어플리케이션 구동 환경이다. 하나의 이미지를 통해 여러 개의 컨테이너를 실행시킬 수 있다.

## 2.2. 명령어

| 명령어                                    | 설명                                      |
| ----------------------------------------- | ----------------------------------------- |
| docker run [옵션] [이미지명]              | Docker 임지로 컨테이너 실행               |
| docker ps                                 | 실행중인 Docker 컨테이너 목록 출력        |
| docker ps -a                              | 모든 Docker 컨테이너 목록 출력            |
| docker start [컨테이너명/ID]              | Docker 컨테이너 실행                      |
| docker stop [컨테이너명/ID]               | Docker 컨테이너 멈춤                      |
| docker restart [컨테이너명/ID]            | Docker 컨테이너 재시작                    |
| docker attach [컨테이너명/ID]             | Docker 컨테이너 접속                      |
| docker exec -it [컨테이너명/ID] /bin/bash | bash 언어를 사용하여 Docker 컨테이너 접속 |
| docker image pull [이미지명]              | Docker 이미지 다운로드                    |
| docker image push [사용자명/이미지명]     | Docker 이미지 푸시                        |
| docker rm [컨테이너명/ID]                 | Docker 컨테이너 삭제                      |
| docker prune [컨테이너명/ID]              | 사용되지 않는 Docker 컨테이너 삭제        |
| docker logs [컨테이너명/ID]               | 실행중인 Docker 로그 기록 조회            |
| docker logs -f [컨테이너명/ID]            | Docker 로그 기록 강제 조회                |

- docker run 옵션
  - **-i, --interactive**  
    표준 입력(stdin)을 활성화
  - **--name**  
     컨테이너 이름 설정
  * **-d, --detach**  
    Detached 모드. 컨테이너를 백그라운드로 실행
  * **-p, --publish**  
    호스트와 컨테이너의 포트를 연결
    [호스트 포트]:[컨테이너 포트]
  * **-v, --volume**  
    컨테이너 마운트 설정
    [호스트 경로/볼륨]:[컨테이너 경로]
  * **-u, --user**  
    컨테이너의 리눅스 사용자 계정 설정
  * **-e, --env**  
    컨테이너 내 환경 변수를 설정
  * **--restart**  
    프로세스 종료시 재시작 정책 설정

# 3. DockerHub

## 3.1. 개요

대표적인 도커 이미지 서버로써 도커 이미지를 서버에 저장하고, 필요 시에 다운받아 사용할 수 있따.

## 3.2. 명령어

| 명령어                                      | 설명                          |
| ------------------------------------------- | ----------------------------- |
| docker login -u [ID]                        | DockerHub 로그인              |
| docker search [이미지명]                    | DockerHub에서 이미지 검색     |
| docker push [도커 허브 ID/이미지 명]:[태그] | DockerHub에 이미지 업로드     |
| docker pull [이미지명]                      | DockerHub에서 이미지 다운로드 |
| docker loguout                              | DockerHub 로그아웃            |

# 4. Volume

## 4.1. 개요

바인드 마운트와 도커 볼륨은 거의 유사하다. 두 방식 모드 호스트의 경로(디렉토리)를 도커 컨테이너 내부에서 공유해서 사용할 수 있다는 공통점이 있따. 다만 바인드 마운트는 호스트의 특정 경로를 설정해서 매핑해줄수 있는 한편, 볼륨은 지정된 경로 `/var/lib/docker/volumes/[볼륨이름]/_data` 에만 매핑이 가능하다. 볼륨은 장점은 도커 명령어를 통해 더 간편하게 관리가 가능하다.

## 4.2. 명령어

| 명령어                                     | 설명                           |
| ------------------------------------------ | ------------------------------ |
| docker volume create --name [볼륨 이름]    | 도커 볼륨 생성                 |
| docker volume ls                           | 도커 볼륨 조회                 |
| docker volume inspect [볼륨 이름]          | 도커 볼륨 정보 조회            |
| docker run -v [볼륨이름:컨테이너 경로] ... | 도커 볼륨 마운트               |
| docker container inspect [컨테이너 이름]   | 도커 컨테이너의 볼륨 정보 조회 |
| ddocker volume rm [볼륨 이름]              | 도커 볼륨 삭제                 |
| docker volume prune                        | 사용하지 않는 도커 볼륨 삭제   |

- **도커 볼륨 정보 조회 결과**

  ```bash
  [
  	{
  		"CreatedAt": "",
  		"Driver": "",
  		"Labels": {},
  		"Mountpoint": [볼륨의 호스트 소스 경로],
  		"Name": [볼륨 이름],
  		"Options": {},
  		"Scope": "",
  	}
  ]
  ```

- **도커 컨테이너의 볼륨 정보 조회 결과**
  ```bash
  "Mounts": [
  	{
  		"Type": "volume",
  		"Name": [볼륨 이름],
  		"Source": [볼륨 호스트 경로],
  		"Destination": [볼륨 컨테이너 마운트 경로],
  		...
  	},
    {
      "Type": "bind",
      "Source": [호스트 경로],
      "Destination": [컨테이너 내부 경로],
      ...
    }
  ]
  ```

# 5. Docker Compose

## 5.1. 개요

Docker Compose는 여러 개의 도커 컨테이너를 관리할 수 있는 명령어를 제공한다.
YAML 파일을 작성함으로써 여러 개의 도커 컨테이너를 묶고, 컨테이너 간의 관계를 정의할 수 있고, Docker Compose는 이 yaml 파일을 인자로 받는 명령어를 제공한다.

## 5.2. YAML 파일

```yaml
# 사용하는 도커 버전에 따라 yaml 파일 포맷의 버전을 설정한다.
version: '3.2'

# 어플리 케이션에 사용할 service 목록을 정의한다
services:
  # 기본 컨테이너 이름 (container_name 옵션이 없을 경우)
  back:
    # 의존 관계 설정, 컨테이너 이름
    depends_on:
      - mysql

    # 빌드 옵션
    build:
      context: . # 빌드할 파일들이 존재하는 경로를 지정
      dockerfile: ./dir # dockerfile이 여러개거나 context의 위치와 다를 경우

    # 컨테이너를 실행할 이미지 이름 설정
    # 빌드 옵션이 있을 경우, 빌드한 결과 이미지 이름으로 사용
    image: imfine-back

    # 컨테이너 이름 지정
    container_name: imfine-back

    # 포트 매핑
    ports:
      - 8000:8000

    # 볼륨 마운팅
    volumes:
      - /etc/localtime:/etc/localtime

    # 환경변수 설정
    environment:
      - WORDPRESS_DB_HOST:db:3306
      - WORDPRESS_DB_NAME:db:word
      - WORDPRESS_DB_USER:word_user
      - WORDPRESS_DB_PASSWORD=123456

  mysql:
    image: mysql:5.7
    volumes:
      - ./db_data:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWROD=123456
      - MYSQL_DATABASE=word
      - MYSQL_USER=word_user
      - MYSQL_PASSWORD=123456
```

## 5.3. 명령어

docker-compose 명령어는 참조할 수 있는 docker-compose.yaml 파일이 존재해야 한다. 특정 yaml파일에 대한 결과를 보고 싶으면 인자로 넘겨준다.

| 명령어                    | 설명                                                                   |
| ------------------------- | ---------------------------------------------------------------------- |
| docker-compose build      | docker-compose 파일에 정의된 이미지를 빌드                             |
| docker-compose up         | docker-compose 파일에 정의된 서비스를 실행                             |
| docker-compose down       | docker-compose 파일에 정의된 서비스를 종료 (컨테이너 제거)             |
| docker-compose down --rmi | docker-compose 파일에 정의된 서비스를 종료하고 이미지까지 제거         |
| docker-compose start      | docker-compose 파일에 정의된 서비스를 시작 (컨테이너 시작)             |
| docker-compose stop       | docker-compose 파일에 정의된 서비스를 정지 (컨테이너 정지)             |
| docker-compose restart    | docker-compose 파일에 정의된 서비스를 재시작 (컨테이너 재시작)         |
| docker-compose ps         | docker-compose 파일에 정의된 실행중인 서비스 상태 확인 (컨테이너 목록) |
| docker-compose ps -a      | docker-compose 파일에 정의된 모든 서비스 상태 확인 (컨테이너 목록)     |
| docker-compose logs       | docker-compose 파일에 정의된 서비스들의 로그를 확인                    |

**docker-compose ps 출력 예시**

```bash

docker compose ps
NAME            IMAGE     COMMAND           SERVICE    CREATED         STATUS          PORTS
example-foo-1   alpine    "/entrypoint.…"   foo        4 seconds ago   Up 2 seconds    0.0.0.0:8080->80/tcp


docker compose ps --all
NAME            IMAGE     COMMAND           SERVICE    CREATED         STATUS          PORTS
example-foo-1   alpine    "/entrypoint.…"   foo        4 seconds ago   Up 2 seconds    0.0.0.0:8080->80/tcp
example-bar-1   alpine    "/entrypoint.…"   bar        4 seconds ago   exited (0)
```
