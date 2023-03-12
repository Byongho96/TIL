# Docker

# 1. 이미지

## 1.1. 개요

## 1.2. 명령어

# 2. 컨테이너

## 2.1. 개요

## 2.2. 명령어

# 3. DockerFile

## 3.1. 개요

## 3.2. 다이렉티브

## 3.3. 예시

# 4. Volume

## 4.1. 개요

## 4.2. 명령어

- **도커 볼륨 생성**
  이름을 설정하지 않을 시, 랜덤한 이름 자동 배
  ```bash
  docker volume create --name [볼륨 이름]
  ```
- **도커 볼륨 조회**
  ```bash
  docker volume ls
  ```
- **도커 볼륨 정보 조회**
  ```bash
  docker volume inspect [볼륨 이름]
  ```
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
- **도커 볼륨 마운트**
  ```bash
  docker run -v[볼륨이름:컨테이너 마운트 경로] ...기타 옵션
  ```
- **도커 컨테이너의 볼륨 정보 조회**
  ```bash
  docker container inspect [컨테이너 이름]
  ```
  ```bash
  "Mounts": [
  	{
  		"Type": "volume",
  		"Name": [볼륨 이름],
  		"Source": [볼륨 호스트 경로],
  		"Destination": [볼륨 컨테이너 마운트 경로],
  		...
  	}
  ]
  ```
- **도커 볼륨 삭제**
  ```bash
  docker volume rm [볼륨 이]
  ```
- **사용하지 않는 볼륨 삭제**
