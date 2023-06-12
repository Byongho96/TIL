---
title: 'Gunicorn Basics'
updatedAt: '2023-03-14'
createdAt: '2023-03-13'
isCompleted: true
reference:
---

# 1. 개요

Gunicorn 은 파이썬 웹 어플리케이션을 위한 WSGI(Web Server Gateway Interface) HTTP 서버이다.

Gunicorn은 클라이언트의 요청을 받아 WSGI 인터페이스를 통해 웹 어플리케이션과 연결한다. 또한 Gunicorn은 워커 프로세스를 사용하여 병렬로 요청을 처리함으로써, 서버의 처리 능력을 향상 시켜 다수의 요청을 대한 응답 시간을 줄인다.

# 2. Django 프로젝트 연결 예시

- **gunicorn 설치**

  - [https://docs.gunicorn.org/en/stable/install.html](https://docs.gunicorn.org/en/stable/install.html)

  ```bash
  pip install gunicorn
  ```

- **파이썬 프로젝트 연결**

  ```bash
  gunicorn --bind 0.0.0.0:8000 {Django 마스터 앱}.wsgi:application
  ```

  ```python
  # settings.py

  ALLOWED_HOSTS = [
      # 할당된 EC2 인스턴스의 IP주소 입력. 현재 예시의 경우 아래와 같이 입력
  		'13.209.9.14',
  ]
  ```

- **gnicorn service 파일 작성**

  ```bash
  sudo vi /etc/systemd/system/gunicorn.service
  ```

  ```
  [Unit]
  Description=gunicorn daemon
  After=network.target

  [Service]
  User=ubuntu
  Group=www-data
  WorkingDirectory=/home/ubuntu/{프로젝트 폴더}
  ExecStart=/home/ubuntu/{프로젝트 폴더}/venv/bin/gunicorn \
          --workers 3 \
          --bind 127.0.0.1:8000 \
          {마스터 앱}.wsgi:application

  [Install]
  WantedBy=multi-user.target
  ```

- **시스템 데몬 재시작(설정 파일 반영)**

  ```bash
  sudo systemctl daemon-reload
  ```

- **gunicorn 서비스 실행 및 등록**

  ```bash
  sudo systemctl start gunicorn
  sudo systemctl enable gunicorn
  sudo systemctl status gunicorn.service

  # 중지
  # sudo systemctl stop gunicorn

  # 재시작
  # sudo systemctl restart gunicorn
  ```
