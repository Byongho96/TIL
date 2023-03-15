# Linux <!-- omit from toc -->

- [1. ps](#1-ps)
  - [1.1. 용어](#11-용어)
  - [1.2. 명령어](#12-명령어)
- [2. systemctl](#2-systemctl)
  - [2.1. systemd](#21-systemd)
    - [2.1.1. systemd components](#211-systemd-components)
    - [2.1.2. systemd directories](#212-systemd-directories)
  - [2.2. daemon](#22-daemon)
  - [2.2 .service](#22-service)
  - [2.3. 명령어](#23-명령어)
- [3. ln](#3-ln)
  - [3.1. 용어](#31-용어)
  - [3.2. 명령어](#32-명령어)
  - [3.2. 명령어](#32-명령어-1)

# 1. ps

## 1.1. 용어

- **UID**  
  User ID. 사용자 ID
- **PID**  
  Process ID. 운영체제에서 프로세스를 식별하기 위한 ID
- **PPID**  
  Parent Process ID. 부모 프로세스의 PID
- **PGID**  
  Process Group ID. 1개 이상의 프로세스의 그룹을 식별하기 위한 ID
- **SID**  
  Session ID. 1개 이상의 프로세스의 그룹의 묶음을 식별하기 위한 ID

## 1.2. 명령어

ps 명령어 입력 시 나오는 테이블의 항목에 대한 세부내용은 다음과 같다

| 칼럼  | 설명                                   |
| ----- | -------------------------------------- |
| C     | CPU 사용량(%)                          |
| TTY   | 프로세스를 시작한 터미널               |
| RSS   | 메모리 사용량                          |
| TIME  | 프로세스 총 가동시간                   |
| STIME | 프로세스 시작시간                      |
| CMD   | 해당 프로세스를 시작하는데 쓰인 명령어 |

| 명령어                                          | 설명                                                               |
| ----------------------------------------------- | ------------------------------------------------------------------ |
| ps                                              | 현재 사용자가 실행 중인 프로세스                                   |
| ps -e                                           | 모든 사용자가 실행 중인 프로세스                                   |
| ps -f                                           | 프로세스 상세정보 출력                                             |
| ps -p [PID]                                     | 특정 프로세스 정보 출력                                            |
| ps -u [UID]                                     | 특정 사용자가 실행 중인 프로세스 정보 출력                         |
| ps -H                                           | 인덴트로 부모 자식 관계 시각화                                     |
| ps -ef \| grep [keyword1] \| grep -v [keyword2] | CMD에 keyword1을 포함하고 keyword2를 포함하지 않은 프로세스 필터링 |

# 2. systemctl

## 2.1. systemd

systemd는 Linux 운영체제의 시스템 서비스(데몬)를 동작 원리와 관계없이 일관된 인터페이스를 제공한다. systemd는 여러개의 서비스를 병렬적으로 수행할 수 있기 때문에 시스템 서비스 확장성에 용이하고, 여러 사용자의 요구에 따라 커스터마이징할 수 있다. 또한 서비스 간 의존성 추적, 로그 기록 관리 등의 기능 등도 제공하기 때문에 이를 통해 트러블 쉽게 해결할 수 있다.

### 2.1.1. systemd components

systemd는 여러 컴포넌트로 이루어져 있으며, 다음과 같은 구조를 가지고 있다.

<img alt="systemd components" src="./assets/systemd_components.JPG" width="600">

- **systemd init system**  
  서비스 및 프로세스 관리를 담당합니다. 기존의 SysV init 시스템을 대체하고 시스템 서비스를 보다 현대적이고 유연하게 관리할 수 있는 방법을 제공합니다. 선언적 구성 형식을 사용하여 서비스, 대상 및 기타 시스템 구성 요소를 정의합니다.
- **systemd service manager**  
  서비스 관리자는 시스템 서비스를 시작, 중지 및 관리할 책임이 있습니다. 서비스를 관리하기 위한 표준 인터페이스를 제공하고 소켓 활성화, 프로세스 추적 및 서비스 종속성과 같은 고급 기능을 지원합니다.
- **systemd journal**  
  저널은 시스템 로그 및 기타 진단 정보를 저장하는 중앙 로그 저장소입니다. 이진 형식을 사용하여 로그를 저장하고 구조화된 로깅, 로그 순환 및 로그 필터링과 같은 고급 기능을 제공합니다.제공합니다. 선언적 구성 형식을 사용하여 서비스, 대상 및 기타 시스템 구성 요소를 정의합니다.
- **systemd units**  
  단위는 systemd의 구성 요소이며 서비스, 장치 및 소켓과 같은 시스템 리소스를 나타냅니다. 각 장치에는 속성 및 종속성을 정의하는 고유한 이름과 구성 파일이 있습니다.
- **systemd targets**  
  대상은 다중 사용자 또는 그래픽 사용자 인터페이스(GUI) 모드와 같이 시스템의 작동 모드를 정의하는 미리 정의된 상태입니다. 이들은 단위를 함께 그룹화하고 시작 또는 중지할 순서를 정의합니다.
- **systemd libraries**  
  Systemd는 systemd 인프라와 통합하는 데 사용할 수 있는 라이브러리 세트를 제공합니다. 이러한 라이브러리는 서비스 시작 및 중지, 네트워크 소켓 관리 및 기타 시스템 관련 작업을 위한 표준화된 인터페이스를 제공합니다.

### 2.1.2. systemd directories

/etc/systemd/system/: This directory contains system-wide unit files and configuration files that define system services and other resources. These files are typically customized by the system administrator to configure system behavior.

/run/systemd/system/: This directory contains runtime unit files and other resources that are created and managed by systemd at runtime. These files are typically created when the system boots up and are removed when the system shuts down.

/usr/lib/systemd/: This directory contains system libraries and other resources that are used by systemd and its components.

/usr/share/systemd/: This directory contains documentation files and other resources that provide information about systemd and its components.

/var/lib/systemd/: This directory contains state files and other resources that are used by systemd to track system state and configuration changes.

## 2.2. daemon

데몬이란 시스템 서비스라고도 불리며, 사용자와의 상화작용 없이 컴퓨터 백그라운드에서 돌아가는 프로글메을 말한다. 보통 시스템(컴퓨터)가 켜짐과 동시에 자동으로 시작된다.

데몬은 사용자 레벨에서 접근할 수 없는 기능들을 동작시키는데 유용하다. 예를 들어 웹 서버, 데이터 서버 등의 다른 프로그램을 동작시키거나 하드웨어 디바이스와 상호작용할 때 쓰인다.

리눅스 운영체제에서 데몬은 systemd에 의해서 관리된다.

## 2.2 .service

기본적으로 systemd 서비스의 이름은 /etc/systemd/system 디렉토리에 있는 장치 파일의 이름으로 결정됩니다. 장치 파일 이름의 확장자는 ".service"여야 하며 서비스 이름은 ".service" 확장자 없이 장치 파일 이름과 동일합니다. 예를 들어 /etc/systemd/system/example.service 파일에 정의된 서비스의 이름에는 예제가 있습니다.

```
[UNIT]
Description : 서비스 설명
After : 본 서비스 이전에 시작할 서비스
Before : 본 서비스 이후에 시작할 서비스
Requires : 본 서비스와 의존관계의 서비스로 반드시 실행되어야 본서비스가 실행
Wants : Requires보다 약한 의존관계로 설령 서비스가 실행되지 않더라도 본서비스가 실행됨

[SERVICE]
Type : Type 에는 simple, forking, oneshot, dbus, notify, idle 중에 1개를 입력
simple : deafult값. 유닛이 시작된 경우 즉시 systemd는 유닛의 시작이 완료 되었다고 판단함. 다른 유닛과 통신하기 위해 소켓을 사용하는 경우 이 설정을 하면안됌
forking : 자식 프로세스가 생성완료 되는 단계까지를 systemd가 시작완료 되었다고 판단하며 부모 프로세스를 추적할 수 있도록 PIDFile 필드에 PID파일을 선언해주어야함
oneshot : 메인 프로세스가 시작되면 상태를 activating 으로 바꾸고 끝날때까지 기다리며 해당 메인 프로세스가 끝나야지만 다음 systemd unit으로 넘어간다. 또한 해당 실행이 종료되더라도 RemainAfterExit=yes 옵션을 통해 유닛이 활성화 상태로 간주할 수 있다.
dbus : simple과 유사, DBUS에 지정된 BusName이 준비될 때까지 대기하며 DBUS 준비가 완료된 이후에 프로세스 시작
notify : simple과 유사, systemd에 시그널을 보내고 시그널에 대한 내용은  libsystemd-daemon.so 에 선언 되어있음
idle : simple과 유사, 모든 서비스가 실행된 후에 실행됨
EnvironmentFile : 서비스의 환경설정을 파일을 지정
ExecStartPre : 서비스 시작하기 전에 실행할 명령을 설정
ExecStart : 서비스를 시작하기 위한 full path 및 실행 인자를 설정
ExecStartPost : 서비스를 시작한 이후에 실행할 명령을 설정
ExecStop : 서비스를 종료할 때 실행할 명령을 설정
ExecStopPost : 서비스 종료 명령 이후에 실행할 명령을 설정
ExecReload : 서비스가 reload 될때 필요한 명령어나 스크립트를 지정
KillMode : 프로세스가 어떻게 중지 되는지 결정함
Restart : on-failure는 어떤 문제로 인해 0이아닌 Exit코드를 보여주고 중지될 경우 서비스를 다시시작, 반대로 on-success는 프로세스가 아무런 문제없이 Exit코드가 0인 경우 다시 그 서비스를 시작하라는 의미
RestartSec : 서비스를 다시 시작하기전에 이 시간동안 서비스를 Sleep상태로 두라는 의미
RemainAfterExit : (yes|no) 유닛이 종료 이후에도 유닛이 활성화 상태로 판단함
TimeoutSec : 서비스 종료시 대기하는 시간

[INSTALL]
WantedBy : 어떻게 Unit이 활성화(enable)되는지 명세합니다.

Also : service가 enable, disable될때 집합 단위로 같이 enable, disable할 serivce들을 의미합니다.

Alias : 이 service의 별칭을 줍니다.
```

## 2.3. 명령어

| 명령어                              | 설명                         |
| ----------------------------------- | ---------------------------- |
| systemctl start [service-name]      | 서비스 시작                  |
| systemctl stop [service-name]       | 서비스 중지                  |
| systemctl restart [service-name]    | 서비스 재시작                |
| systemctl enable [service-name]     | 부팅 시 서비스 자동시작      |
| systemctl disable [service-name]    | 부팅 시 서비스 자동시작 해제 |
| systemctl list-units --type=service | 서비스 목록 확인             |
| journalctl -u [service-name]        | 서비스 로그 기록 확인        |

# 3. ln

## 3.1. 용어

<img alt="softlink hardlink" src="./assets/soft_link_hard_link.jpg" width="500">

- **i-node**
  파일을 식별하는 고유번호
  ls명령어 사용 시 -i 옵션으로 확인 가능하다.

* **Hard Link**  
  동일한 i-node를 가리키는 파일을 하나 복사한다. 동일한 i-node를 가리키기 때문에 어느 파일을 수정하든지 모든 파일에 대해 동일하게 수정이 일어난다.
  하지만 하나의 파일을 삭제 하더라도 다른 파일에 영향을 끼치지는 않는다.
* **Soft Link**  
  다른 i-node를 가리키는 파일을 복사한다. 그러나 생성된 복사본의 i-node가 원본의 i-node를 가리킨다.
  하드 링크와 마찬가지로 어느 파일을 수정하든지 모든 파일에 대해 동일하게 수정이 일어난다. 그러나 원본 파일이 삭제될 경우 소프트링크는 더 이상 이용할 수 없다.

## 3.2. 명령어

## 3.2. 명령어

| 명령어                                     | 설명             |
| ------------------------------------------ | ---------------- |
| ln [soure-path(name)] [dest-path(name)]    | 하드 링크 생성   |
| ln -s [soure-path(name)] [dest-path(name)] | 소프트 링크 생성 |
| rm [dest-path(name)]                       | 링크 삭제        |
| 명령어                                     | 설명             |
| ------------------------------------------ | ---------------- |
| ln [soure-path(name)] [dest-path(name)]    | 하드 링크 생성   |
| ln -s [soure-path(name)] [dest-path(name)] | 소프트 링크 생성 |
| rm [dest-path(name)]                       | 링크 삭제        |
