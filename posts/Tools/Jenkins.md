---
title: 'Jenkins Basics'
updatedAt: '2023-03-27'
createdAt: '2023-03-19'
isCompleted: false
reference:
---

# 1. 개요

Jenkins는 빌드, 테스트 및 배포를 자동화할 수 있는 오픈 소스 도구이다. 또한 Jenkins는 다양한 플러그인을 지원하여 다양한 방식으로 빌드/배포를 할 수 있음은 물론이고, 다른 프로그램들과 연동되는 부가기능을 활용할 수 있다.

# 2. PipeLine

Jenkins Pipeline은 Jenkins에서 지속적인 통합 및 배포 과정을 설계하는 방법 중 하나입니다. Pipeline은 Pipeline Syntax에 따라 짜여진 일련의 지시문으로 구성되어 있으며, 코드 기반으로 파이프라인을 작성할 수 있습니다.

Pipeline Scripts는 크게 Declarative Pipeline과 Scripted Pipeline 두 가지 유형이 있으며, 세부 문법은 [공식문서](https://www.jenkins.io/doc/book/pipeline/syntax/)에서 확인할 수 있다.
그 중 Scripted Pipeline의 경우 Groovy 스크립트 언어를 사용해, 조건문이나 반복문을 프로그래밍 언어와 유사하게 구현할 수 있다.

## 2.1. Pipeline script

```pipeline
pipeline {

agent none

    tools {
        maven 'apache-maven-3.0.1'
    }

    triggers {
            cron('H */4 * * 1-5')
    }

    parameters {
        string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')

    }
    options {
        timeout(time: 1, unit: 'HOURS')
    }
    stages {
        stage('Example Build') {

            input {
                message "Should we continue?"
                ok "Yes, we should."
                submitter "alice,bob"
                parameters {
                    string(name: 'PERSON', defaultValue: 'Mr Jenkins', description: 'Who should I say hello to?')
                }
            }

            agent { docker 'maven:3.9.0-eclipse-temurin-11' }

            options {
                timeout(time: 1, unit: 'HOURS')
            }

            environment {
                AN_ACCESS_KEY = credentials('my-predefined-secret-text')
            }

            steps {
                echo 'Hello, Maven'
                sh 'mvn --version'
            }
        }
        stage('Example Test') {
            agent { docker 'openjdk:8-jre' }
            steps {
                echo 'Hello, JDK'
                sh 'java -version'
            }
        }
    }

     post {
        always {
            echo 'I will always say Hello again!'
        }
    }

}

when {
branch 'production'
}
steps {
echo 'Deploying'
}

when {
expression { BRANCH_NAME ==~ /(production|staging)/ }
anyOf {
environment name: 'DEPLOY_TO', value: 'production'
environment name: 'DEPLOY_TO', value: 'staging'
}
}
steps {
echo 'Deploying'
}

stage('Parallel In Sequential') {
ㄹ ailFast true
parallel {
stage('In Parallel 1') {
steps {
echo "In Parallel 1"
}
}
stage('In Parallel 2') {
steps {
echo "In Parallel 2"
}
}
}
}

matrix {
axes {
axis {
name 'PLATFORM'
values 'linux', 'mac', 'windows'
}
axis {
name 'BROWSER'
values 'chrome', 'edge', 'firefox', 'safari'
}
}
// ...
}
```
