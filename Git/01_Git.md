## 1. 용어 정리

### 1.1. Git

**컴퓨터 파일의 변경 사항을 추적하고, 여러 명의 사용자 간의 파일 작업을 조율하기 위한 분산버전 관리 시스템.**
시스템 자체는 클라이언트-서버 시스템과 달리, 네트워크 접속이나 중앙 서버와 달리 독립적으로 동작한다. 따라서 사용자 개인의 작업환경(폴더)에서 파일의 변화를 추적하는 저장소를 생성할 수 있다.
Git은 가장 큰 특징 중 하나는 파일의 ==변경사항==을 추적한다는 것이다. commit이 이루어질 때 변경된 파일 자체가 아닌 변경된 사항만을 저장함으로써 가볍고 빠르게 버전을 관리할 수 있다.

### 1.2. Git Web Service

**Git 레포지토리를 클라이언트-서버 모델로 지원하는 웹 서비스.** 코드 공유 및 다른 사람과의 파일 작업 공유를 위해 Git은 많은 경우 인터넷상의 Git 서비스와 연동된다.

대표적으로 GitHub, GitLab, BitBucket 등이 있으며 각각의 특징은 다음과 같다.

- **GitHub**
  MS에서 제공하는 오픈 Git 서비스로써, 전세계의 많은 개발자들이 코드공유를 위해 활발하게 사용하고 있으며
- **GitLab**
  레포지토리의 접근 권한을 개인이 제어할 수 있어 기업에서 많이 쓰인다.

### 1.3. Repository

**git으로 버전 관리가 되는 폴더**를 말한다. 사용자 개인의 컴퓨터에 존재하는 repository를 **local repository**라고 부르고, Github과 같은 git 서비스 서버에 존재하는 repository를 **remote repository**라고 부른다. 많은 경우, 이 둘을 서로 연동시킨다.

local repository의 경우, 3가지의 작업영역으로 동작한다.

- **Working Directory**
  - 사용자가 작업하고 있는 실제 폴더를 말한다.
  - 한 번도 `add`되지 않은 파일은 'Untracked'로 분류하며, 현재 커밋상태에서 변경사항이 발생 했을 경우, 'modified'로 분류한다.
- **Staging Area**
  - 하나의 커밋으로 남기고 싶은 변경사항들이 모여있는 영역이다.
  - Working Directory의 변경사항들에 `add`명령어를 적용하였을 때, 해당 변경사항들이 올라가는 영역이다.
  - 이렇게 변경사항들이 staging area에 올라가는 것을 staged되었다고 표현하기도 한다.
- **Repository**
  - 커밋(버전)들이 저장되는 곳. '.git'폴더이다.
  - `commit`명령어를 사용하면 staging area에 있는 모든 변경사항들이 하나의 커밋으로 repository에 저장된다. 하나의 커밋이 곧 하나의 버전이다.

---

## 2. 기본 사용법

### 2.1. 명령어

| 명령어                                                | 의미                                                                             |
| ----------------------------------------------------- | -------------------------------------------------------------------------------- |
| git init                                              | 현재 폴더에 git 시스템을 적용 == local repository를 생성함                       |
| git status                                            | 현재 git의 상태                                                                  |
| git log                                               | 모든 커밋 내역을 출력                                                            |
| git log --oneline                                     | 모든 커밋 내역을 약식으로 출력                                                   |
| git log --oneline --graph                             | 모든 커밋 내역을 약식으로 그래프 형태로 출력                                     |
| git diff \<log A id> \<log B id>                      | 커밋 A -> 커밋 B의 차이점                                                        |
| git add \<file>                                       | 해당 파일의 변경사항을 add                                                       |
| git add .                                             | 모든 파일의 변경사항을 add                                                       |
| git commit -m "\{commit messagge}"                    | 간단한 메시지와 함께 현재 staged상태를 커밋                                      |
| git push origin \<local branch name>                  | remote repository의 동일한 로컬 브랜치와 동일한 이름의 브랜치를 생성 및 업데이트 |
| git clone <remote_repo_address>                       | remote repo를 local repo로 복사                                                  |
| git pull                                              | 로컬 repo의 커밋 내역을 업데이트 remote repo의 해당 branch의 커밋내역으로 동기화 |
| git status                                            | 현재 git의 상태                                                                  |
| git remote add \<remote_repo_alias> <remote_repo_url> | 현재 로컬 repo에 연동되는 remote repo를 추가                                     |

### 2.2. git commit message

`git commit -m "commit_message"`는 커밋 메시지를 한 줄로 간단히 작성할 때 쓰이는 반면, `git commit -m`명령어를 작성 할 경우 vi 에디터에서 더 자세한 커밋 메시지를 입력할 수 있다.
![vi 에디어 모드](./assets/vi.PNG)

#### 2.2.1. commit message 작성법

1. vi 에디터 창이 command 모드로 열리면, `i`키를 눌러서 edit모드로 진입이 가능하다.
2. editt 모드에서 commit 메시지를 작성한다.

   ```
   <제목>
   # 빈 행으로 분리. 주석은 커밋 메시지에 포함되지 않는다.
   <본문>
   ```

   2-1. commit 유형 지정

   - FEAT: 새로운 기능 추가
   - FIX: 버그 수정
   - DOCS: 문서 수정
   - STYLE: 스타일 관련 수정
   - REFACOTR: 리팩토링(기능 변화 없이, 가독성 및 유지보수를 위한 수정)
   - TEST: 테스트 코드 추가
   - CHORE: 빌드 업무, 패키지 매니저 등 자잘한 수정

   2-2. 제목과 본문은 빈 행으로 분리
   2-3. 제목 행은 50자로 제한
   2-4. 제목 행의 첫 글자는 대문자로 시작
   2-5. 제목 행 끝에 마침표는 넣지 않는다
   2-6. 제목 행은 명령문으로 입력
   2-7. 본문은 72자마다 끊어서 입력
   2-8. 본문에는 어떻게 보다는 무엇과 왜를 설명

3. commit 메시지를 입력하면 `esc`를 눌러 edit 모드에서 빠져나온다.
4. `:wq`를 입력하고 엔터키를 눌러 커밋을 올린다.
   - w는 저장을 의미하고, q는 에디터 종료를 의미한다.

### 2.3. .gitignore

==이 .gitignore에 기입된 파일들은 git에 반영되지 않는다==. [gitignore.io](https://www.toptal.com/developers/gitignore/)에 접속하여 운영체제, 개발환경, 프로그래밍 언어 등을 입력하여 기본적인 .gitignore 파일을 작성할 수 있다.

- \<파일이름>.확장자
  - '\*'와 같은 와일드카드 사용이 가능하다
- <폴더이름>/
  - 폴더 단위로 git 반영을 무시한다.

### 2.4. .gitkeep

git은 폴더가 비었을 경우, 해당 폴더를 commit시 제외한다. 하지만 ==.gitkeep파일이 폴더 내에 있을 경우 해당 폳더가 비어있더라도 빈 폴더를 커밋에 포함시킨다.==

---

## 3. 브랜치

![git_branch](/assets/git-branch.png)
깃은 커밋 내역을 트리구조처럼 쌓을 수 있다. 즉 하나의 커밋이 여러개의 커밋을 자식(다음)커밋을 가질 수 있다. 이는 여러 명의 개발자가 하나의 프로젝트에 대해 각기 다른 기능 개발을 가능하게 하며, 그 과정에서 적절히 동작하는 메인코드를 안전하게 보호한다.

**하지만 엄밀히 말해 브랜치는 뻗어 나온 가지 자체가 아닌, ==특정 커밋 상태를 가리키는 포인터==를 의미한다.**
이 포인터는 명령어를 통해 한 커밋에서 다른 커밋으로 옮길 수 있기 때문에, 브랜치란 특정 가지에 한정되지 않고 유동적으로 변한다.

HEAD는 현재 자신이 위치한 커밋을 가리킨다. 보통 사용자는 브랜치 포인터를 기점으로 움직이므로 HEAD는 항상 특정 브랜치에 붙어있는 것처럼 보이지만, 사용자가 브랜치가 가리키지 않는 특정 커밋으로 이동하면 브랜치에서 떨어질 수도 있다.

### 3.1. 브랜치 조회

| 명령어        | 의미                           |
| ------------- | ------------------------------ |
| git branch    | local repo의 브랜치 목록 확인  |
| git branch -r | remote repo의 브랜치 목록 확인 |

### 3.2. 브랜치 생성

| 명령어                                 | 의미                                    |
| -------------------------------------- | --------------------------------------- |
| git branch \<branch_name>              | 새로운 이름의 브랜치 생성               |
| git branch \<branch_name> \<commit ID> | 특정 커밋을 기준으로 새로운 브랜치 생성 |

### 3.3. 브랜치 변경

브랜치를 변경시킨다는 의미는, **해당 브랜치가 가리키는 커밋 상태로 working directory를 옮긴다는 의미**이다. 따라서 브랜치를 변경시키면 작업환경이 해당 커밋을 제출했을 때로 바뀌는 것을 확인 할 수 있다.
==또한 switch하기 전에는 현재 브랜치의 변경 사항을 반드시 먼저 커밋해야한다.== 만일 특정 파일을 커밋하지 않은 상태에서 switch하게 되면 브랜치를 이동했음에도 해당 파일이 그대로 남아있게 된다.
|명령어|의미|
|---|---|
|git switch \<branch_name>|해당 브랜치로 이동|
|git switch -c \<branch_name>|브랜치를 새로 생성함과 동시에 해당 브랜치로 이동|
|git switch -c \<branch_name> \<commit ID>|특정 커밋을 기준으로 새로운 브랜치를 새로 생성함과 동시에 해당 브랜치로 이동|

### 3.4. 브랜치 삭제

브랜치 삭제 명령어는 해당 브랜치가 아닌 **다른 브랜치 상에서만 실행 가능**하다.
|명령어|의미|
|---|---|
|git branch -d \<branch_name>|병합된 브랜치를 삭제|
|git branch -D \<branch_name>|병합 여부와 관계없이 브랜치 강제 삭제|

### 3.5. 브랜치 병합

| 명령어                   | 의미                                                    |
| ------------------------ | ------------------------------------------------------- |
| git merge \<branch_name> | 현재 브랜치의 포인터를 해당 브랜치의 포인터 위치로 이동 |

브랜치에서의 기능개발이 끝났을 경우, 이를 메인코드를 가리키는 master 브랜치와 병합해서 실제로 해당 기능을 추가해야한다. 브랜치 병합에는 충돌 발생 유무에 따라 크게 2가지 방식으로 나뉜다.

- **fast-forward**
  병합하려는 브랜치의 커밋 히스토리가 현재 브랜치의 커밋 히스토리를 포함하는 겨우이다.**현재 브랜치의 포인터를 변합하려는 브랜치 포인터 위치로 움직인다.**

- **3-way**
  충돌이 발생하는 경우로써, 개발자가 직접 개입하여 코드를 조율하고 새로운 commit을 생성해야한다.
  1. `git merge <branch_name>`
     충돌이 발생한 파일에서 **직접 개발자가 코드를 수정하고 저장**한다.
  2. `git add` `git commit`
     두 개의 브랜치를 병합할 새로운 커밋을 형성하고, 현재 브랜치의 포인터가 해당 커밋으로 이동한다.
  3. `git swtich <branch_name>`
     병합을 진행한 브랜치로 이동한다.
  4. `git merge <master>`
     병합을 진행한 브랜치의 포인터 또한 새로 생성된(master브랜치가 가리키는) 커밋으로 이동시킨다.

---

## 4. Git Undoing

- working Directory
  - 수정한 파일 내용을 이전 커밋 상태로 되돌리기
  - git restore
- Stage area
- stage area에 반영된 파일을 workin gdirectory로 되돌리기
  - git rm --cached
  - git restore --staged
- repository
  - 커밋을 완료한 파일을 staging area로 되돌리기
  - git commit --amend

### 4.1. Working Directory

| 명령어                      | 의미                                                    |
| --------------------------- | ------------------------------------------------------- |
| git restore \<file_name>    | 현재 브랜치의 포인터를 해당 브랜치의 포인터 위치로 이동 |
| git checkout --\<file_name> | git 2.23.0 이전 version                                 |

수정한 파일을 현재 위치한 커밋 상태로 되돌린다. 단 버전관리가 되고 있는 파일만 되돌릴 수 있다. 또한 ==git restore를 통해 되돌리면, 해당 내용을 복원할 수 없으니 주의해야한다.==

### 4.2. Staging Area

| 명령어                            | 의미                    |
| --------------------------------- | ----------------------- |
| git restore --staged \<file_name> | root-commit이 있는 경우 |
| git rm --cahced \<file_name>      | root-commit이 없는 경우 |
| git reset HEAD \<file_name>       | git 2.23.0 이전 version |

staging area에 반영된 파일을 되돌리기

### 4.3. Repository

| 명령어             | 의미                              |
| ------------------ | --------------------------------- |
| git commit --amend | 최근 커밋을 staging area로 되돌림 |

커밋은 깔끔하고 의미있는 내용만 남기도록 노력해야하기 때문에 commit을 완료한 파일을 staging area로 되돌리는 작업은 팀프로젝트시 필요한 경우가 많다.

- staging area에 새로 올라온 내용이 없을 경우, **직전 커밋의 메시지만 수정**

  - vi 에디터 창에서 커밋 메시지를 수정
    ![0](./assets/vim_cli.PNG)

    - `i`를 입력하여 edit mode로 진입
    - 커밋 메시지 수정
    - `esc`를 누르면 edit mode에서 탈출
    - `:wq` 저장하고(w) 에디터 종료하기(q)

    ![1](./assets/git_amend.PNG)

- staging area에 새로 올라온 내용이 있을 경우, **직전 커밋에 덮어 쓰기**
  - 최근 커밋을 이번 커밋에 통합하여 대체시킨다.

---

## 5. Git Reset / Revert

### 5.1. git reset

reset은 지정한 커밋내역 상태로 되돌아간다. untracked 상태의 파일들에는 적용되지 않는다. commit_id는 앞에 4개정도만 적어줘도 보통 식별이 가능하다.
|명령어|의미|
|---|---|
|git reset [옵션] \<commit_id>|해당 커밋 상태로 되돌린다|

- **옵션**
  취소되는 커밋 기록들을 어떻게 남길지를 설정
  **--soft**

  - 파일들을 working directory와 staging area로 돌려 놓음. (add)

  **--mixed**

  - DEFAULT옵션으로 파일들을 working directory로 돌려 놓음. (untracked / modified)

  **--hard**

  - 되돌아간 커밋 이후의 파일들을 working directory에 삭제 함.
  - `git reflog` 명령어를 이용하면 rese하기 전의 과거 커밋 내역을 조회하고, 해당 커밋들로 다시 reset도 가능하다. 하지만 그런 일이 발생하지 않도록 주의해야 한다.

### 5.2. git revert

| 명령어                                   | 의미                             |
| ---------------------------------------- | -------------------------------- |
| git reset \<commit_A_id>                 | commit A를 취소한다              |
| git reset \<commit_A_id>..\<commit_B_id> | commit A붙 commit B까지 취소한다 |

커밋 단위로 취소가 가능하며, 해당 커밋을 취소한다는 내용의 새로운 커밋을 생성한다. 다만 뒤에서부터 순차적으로 커밋을 취소하지 않는 이상, 충돌이 발생할 확률이 높기 때문에 직접 파일을 수정해줘야한다.

새로운 커밋을 생성해야하기 때문에 vi 에디터 창이 뜬다.

- `i`를 입력하여 edit mode로 진입
- 커밋 메시지 수정
- `esc`를 누르면 edit mode에서 탈출
- `:wq` 저장하고(w) 에디터 종료하기(q)

---

## 6. Remote Repository(GitHub)

| 명령어                                                             | 의미                                                                                                |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| git remote add \<remote_repo_alias> \<remote_repo_url>             | 현재 로컬 repo에 연동되는 remote repo를 추가                                                        |
| git push \<remote_repo_alias> \<branch_name>                       | remote repo에 branch를 생성하고 해당 브랜치에 커밋함                                                |
| git push --set-upstream \<remote_repo_alias> \<remote_branch_name> | remote repo에 branch를 생성하고 해당 브랜치에 커밋하고 해당 브랜치를 기본 remote repo branch로 설정 |
| git checkout -t \<remote_branch_name>                              | remote repo에서 해당 브랜치를 동일한 이름으로 가져옴                                                |
| git checkout -b \<local_branch_name> \<remote_branch_name>         | remote repo에서 해당 브랜치를 수정한 이름으로 가져옴                                                |

### 6.1. remote repository의 merge 과정

1. remote repo에 새로운 브랜치로 내가 작성한 커밋들을 push
2. merge pull requests > new pull reqeust
3. base:master / compare:branch_to_be_merged

   - Able to merge나오면 fast forward가 가능

4. create pull reqeust 선택 후, merge에 대한 정보 입력
5. Reviewrs: 코드 리뷰어 / Assignee: 코드 개발자
   - Settings에 들어가서 review이후에 merge되도록 설정 가능
6. conversation에서 대화 형식 리뷰, files changed에서 코드에 직접 리뷰
7. Merge pull request
8. commit 내역에는 commit과 merge 두가지 내역이 생성

### 6.2. Open Source 기여 과정

Github은 기본적으로 open source이기 때문에 코드 열람이 자유롭지만, 타인의 코드를 함부로 수정할 수는 없다. 따라서 pull reqeust를 하면 해당 repo의 관리자들이 리뷰 후 merge 여부를 결정한다.

**fork & pull model**

1. 상대 remote repo --fork--> 나의 remote repo
2. 나의 remote repo --clone--> 나의 local repo
3. 나의 local master --branch--> 나의 local branch
4. 나의 local branch --push--> 나의 remote branch
5. 나의 remote branch --merge--> 상대 remote master

---

## 7. Work Flow

### 7.1. Git Flow

git flow는 주로 기업의 대형 프로젝트에서 사용된다.
![git flow](./assets/git_flow.jpg)

- **master**
  - 상용화된 코드가 있는 브랜치
- **develop**
  - 개발 단계의 브랜치
- **feature**
  - develop에서 세부 기능 개발을 위한 파생된 브랜치
  - 기능 개발 후 develop으로 merge
- **relaease**
  - develop에서 테스트를 위해 파생된 브랜치
  - 테스트 통과 시 master 브랜치로 merge
  - 테스트 불통과 시 develop 브랜치로 다시 merge
- **hotfix**
  - master가 브랜치에서 오류가 발생한 경우, 빠른 대처를 위해 파생된 브랜치
  - 오류 수정이 오래 걸릴 경우, master는 롤백 시키고 해당 버그 를 develop브랜치에서 수정

### 7.2. Github Flow

github flow는 소규모 프로젝트 개발해서 사용된다.
![github flow](./assets/github_flow.jpg)

- **master**
  - 메인 코드가 존재하는 브랜치
- **feature**
  - master에서 세부 기능 개발을 위한 파생된 브랜치
  - 기능 개발 후 master로 merge

---

## 8. CRLF

[OS별 crlf 설정에 관한 블로그](https://parkgaebung.tistory.com/70)
OS별로 줄바꿈을 위한 이스케이프 명령어 수가 다르다.

- **Windows**: '/r'(캐리지 리턴, CR) + '/n'(줄 바꿈, LF)
- **Linux, Mac**: '/n'(줄바꿈, LF)

따라서 운영체제를 달리하며 프로젝트를 개발할 때, 개행문자를 처리하는 방법에 대한 설정이 필요하다. 그렇지 않을 경우 코드 변화가 없음에도 파일들이 commit될 수 있다.

- Windows
  `git config -global core.autocrlf true`
  커밋 시 CRLF를 LF로 변환하고, 저장소에서 가져올 때는 LF를 CRLF로 변환한다.
- Linux, Mac
  `git config -global core.autocrlf true`
  커밋 시 CRLF를 LF로 변환한다.