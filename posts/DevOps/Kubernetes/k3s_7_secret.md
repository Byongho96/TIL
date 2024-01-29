---
title: 'k3s 배포하기 (7) : Secret 등록'
updatedAt: '2024-01-28'
createdAt: '2024-01-28'
description: 'AWS 인스턴스에 k3s 단일 노드 클러스터를 구축해본다. Secret을 이용하여 클러스터에서 쓰이는 민감 정보를 관리해보자'
tags: ['kubernetes', 'k3s', 'AWS', 'lightsail', 'DevOps', 'Secret']
isCompleted: true
reference:
---

# 1. Secret 이란?

<mark>Secret은 쿠버네티스 클러스터에서 비밀번호와 같은 민감한 데이터를 관리하기 위한 객체이다.</mark> 쿠버네티스 클러스터 내에서 마치 환경변수처럼 동작하기 때문에, 여러 Pod에서 독립적으로 값을 참조할 수 있다. 값을 yml 파일 등에 하드코딩 하지 않기 때문에 보안상의 이점이 있으며, Secret값을 하나의 공급원에서 관리할 수 있다는 편의성이 있다.

ConfigMap도 환경변수를 포함한 다양한 설정파일을 관리할 수 있는 쿠버네티스 객체이다. 다만 Secret은 몇가지 보안기능을 추가 제공하며, 데이터를 Base64 인코딩하여 관리한다. 이때 Base64 인코딩은 암호화가 아니기 때문에 누구나 해독해서 값을 파악할 수 있다. 하지만 애초에 외부인이 쿠버네티스 클러스터에 접근할 수 있는 시나리오라면, 그때는 Secret이 문제가 아니라 그냥 총체적 난국일 것이다.

다만 내부 사용자 중에서도 권한에 따라 Secret에 대한 접근을 제한하고 싶을 수 있다. 기본 설정대로라면 etcd에 Secret값이 저장되기 때문에 API 서버에 요청 권한이 있는 누구나 Secret값을 조회할 수 있고, 특정 namespace에 Pod 생성권한이 있는 사람도 속한 namespace의 Secret값을 조회할 수 있다. 따라서 Secret에 대한 내부 접근을 제한하기 위해서는 [추가 보안 절차](https://kubernetes.io/docs/concepts/configuration/secret/)가 필요하다.

# 2. Secret 등록

쿠버네티스는 주요 사용 시나리오에 대해 몇 가지 내장 타입을 제공한다. 각 타입마다 쿠버네티스가 내부적으로 유효성 검사 및 제약 조건을 부여한다. <mark>이번 포스팅에서는 DB 패스워드와 같은 일반 인증데이터를 Secret으로 등록할 것이기 때문에 [Basic Auth](https://kubernetes.io/docs/concepts/configuration/secret/#basic-authentication-secret)을 사용했다.</mark>

```yml
apiVersion: v1
kind: Secret
metadata:
  name: { 시크릿 이름 }
type: kubernetes.io/basic-auth
stringData:
  { MySQL 비밀번호 키 }: { MySQL 비밀번호 값 } # key는 이후 값을 참조하기 위한 용도로 자유롭게 지정
```

# 3. Secret 사용

위에 생성한 Secret의 값을 `시크릿 이름`과 `키`로 참조할 수 있다. 아래 예시 코드에서 `secretKeyRef`항목이 이에 해당한다.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mysql-dp
spec:
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
        - image: mysql
          name: mysql
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: { 시크릿 이름 } # 생성한 Secret의 이름
                  key: { MySQL 비밀번호 키 } # 참조하려는 값의 키
          volumeMounts:
            - name: mysql-persistent-storage
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-persistent-storage
          persistentVolumeClaim:
            claimName: mysql-pvc

---
apiVersion: v1
kind: Service
metadata:
  name: mysql-svc
spec:
  type: NodePort
  ports:
    - port: 3306
      nodePort: { 오픈할 노드포트 }
  selector:
    app: mysql
```

# 참고자료

- [Kubernetes : "Secrets"](https://kubernetes.io/docs/concepts/configuration/secret/)
