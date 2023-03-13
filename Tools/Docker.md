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

```
FROM <이미지>:<태그>

MAINTAINER 이미지를 생성한 개발자 정보를 나타냅니다.
WORKDIR <이동할 경로>

RUN ["<커맨드>", "<파라미터1>", "<파라미터2>"]
RUN <전체 커맨드>


ADD

COPY

EXPOSE

CMD ["<커맨드>","<파라미터1>","<파라미터2>"]

ENTRYPOINT
```

## 1.3. 명령어

| 명령어                         | 설명                       |
| ------------------------------ | -------------------------- |
| docker build -t [이미지 이름]  | Dockerfile에서 이미지 빌드 |
| docker image history           | Dockerfile에서 이미지 빌드 |
| docker image ls                | Dockerfile에서 이미지 빌드 |
| docker image prune             | Dockerfile에서 이미지 빌드 |
| docker image pull              | Dockerfile에서 이미지 빌드 |
| docker image push              | Dockerfile에서 이미지 빌드 |
| docker image rm                | Dockerfile에서 이미지 빌드 |
| docker image tag               | Dockerfile에서 이미지 빌드 |
| docker build -t mybuild:0.0 ./ | Dockerfile에서 이미지 빌드 |

# 2. 컨테이너

## 2.1. 개요

Docker container is a lightweight, standalone, executable package that includes everything needed to run an application, including the code, system tools, libraries, and runtime. Containers are isolated from one another and bundle their own application, tools, libraries and configuration files, but share the underlying operating system kernel. Containers allow applications to run reliably in different computing environments.

## 2.2. 명령어

# 3. DockerHub

## 3.1. 개요

## 3.2. 명령어

| 명령어                                      | 설명                       |
| ------------------------------------------- | -------------------------- |
| docker login -u [ID]                        | Dockerfile에서 이미지 빌드 |
| ocker search [이미지명]                     | Dockerfile에서 이미지 빌드 |
| docker push [도커 허브 ID/이미지 명]:[태그] | Dockerfile에서 이미지 빌드 |

# 4. Volume

## 4.1. 개요

위의 절차에서는 바인드 마운트를 사용하여 시스템 경로와 컨테이너 내부 경로를 연결하였다. 바인드 마운트와 도커 볼륨은 거의 유사하다.

하지만 바인드 마운트는 호스트의 특정 경로를 설정해서 매핑해줄수 있는 한편, 볼륨은 지정된 경로 `/var/lib/docker/volumes/[볼륨이름]/_data` 에만 매핑이 가능하다. 볼륨은 장점은 도커 명령어를 통해 더 간편하게 관리가 가능하다.

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
