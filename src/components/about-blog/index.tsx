import React from 'react'
import './style.scss'
import { StaticImage } from 'gatsby-plugin-image'
import TypeAnimation from '@components/type-animation'

const AboutBlog: React.FC = () => {
  return (
    <article className="about-blog">
      <section className="about-blog__header">
        <h1 className="about-blog__header__title">About Blog</h1>
        <a
          href="/TIL/posts/Gatsby/"
          className="about-blog__header__typing"
          tabIndex={-1}
        >
          <TypeAnimation phrases={['블로그 제작기 Click Here!']} />
        </a>
      </section>
      <section className="about-blog__content">
        <h2>기획 배경</h2>
        <div>
          <p>
            SSAFY에서 TIL을 작성하라는 강권에 못이겨 껍데기같은 문서들을
            싸내려가기 시작했다. 그런데 그것도 꽤 쌓이니까 뿌듯해서 남들에게
            보여주고 싶었다. 마침 교육도 끝나서 시간이 남는터라 직접 블로그를
            만들기로 했다. 원래는 상남자답게 바닐라 자바스크립트로 만들려했는데,
            5시간만에 포기하고 Gatsby로 갈아탔다.
          </p>
        </div>
      </section>
      {/* <Taping color="black" phrase="coming soon" rotationDeg={2} /> */}
      <section className="about-blog__content">
        <h2>쓰인 기술</h2>
        <h3>Gatsby</h3>
        <div>
          <p>
            바닐라 자바스크립트에 손사래를 치고 방황하고 있을 때, 마치 누군가
            나를 위해 준비한 동앗줄 같았다. 공식문서의 튜토리얼부터 '마크다운
            파일로 블로그 만들기'이다. 그렇다고 모든 과정이 생각처럼 쉽게 풀린
            것은 아니었지만, 여전히 새 프레임워크를 적용한 것 치고는 수월하게
            블로그를 만든 것 같다. Next.js로 만들껄...
          </p>
        </div>
        <h3>GraphQL</h3>
        <div>
          <p>
            Gatsby를 선택하니까 GraphQL이라는게 자매상품처럼 딸려왔다. Gatsby의
            플러그인과 결합해서 파일 시스템으로부터 자동으로 GraphQL 노드를
            생성한다. 덕분에 손쉽게 블로그를 만들 수 있었다. 말은 이렇게 했는데,
            솔직히 지금도 녀석의 정체를 잘 모르겠다. 실제 백엔드 프레임워크에
            GraphQL을 적용해봐야지 감이 올 것 같다.
          </p>
        </div>
        <h3>Sass & CSS BEM</h3>
        <div>
          <p>
            Sass와 CSS BEM 네이밍 규칙을 적용했다. BEM 네이밍을 쓰니까 뭔가
            있어보여서 기분이 좋다. 그런데 지금 보니까 너무 남발해서 도대체 무슨
            클래스인지 나조차도 모르겠다. 이제는 신 만이 아실 것이다.
          </p>
        </div>
      </section>
      {/* <Taping color="white" phrase="coming soon" rotationDeg={5} /> */}
      <section className="about-blog__content">
        <h2>블로그 특징</h2>
        <h3>전형적인 반응형 UI</h3>
        <StaticImage src="../../assets/images/mockup.png" alt="profile image" />
        <div>
          <p>
            "3단 메뉴바 형식 너무 식상하지 않음?" 이라고 나도 생각했다. 그런데
            곰곰히 생각해보니 그 식상한 걸 구현해본 적이 없더라. 그래서 이번에
            한 번 구현해보기로 했다. 반응형 UI도 4가지 기기에 따라 구현했는데
            심히 노가다스러웠다. 현업에서도 이렇게 하는지가 궁금하다.
          </p>
        </div>
        <h3>메인 컬러 커스텀</h3>
        <div>
          <p>
            네비게이션바 왼쪽 상단에서 메인 컬러를 커스텀할 수 있다. 메인컬러를
            CSS 변수로 사용하기 때문에 이곳저곳의 색깔이 죄다 바뀐다. 그런데
            사실 고백하자면, CSS 변수를 이번에 처음 알게되었다. 사람이 이래서
            기본기를 착실하게 다져야한다.
          </p>
        </div>
        <h3>검색 기능</h3>
        <div>
          <p>
            fuse.js를 기반으로 만들어진 gatsby-plugin-fusejs를 이용해서
            구현했다. 원래 단순히 반복문으로 구현할 생각이었는데, 하마터면
            시간과 효율 모두 놓칠 뻔했다. 자체적으로 인덱스 트리를 만들기 때문에
            유사 검색도 가능한데, 원리는 잘 모르겠고 아무튼 신기하다.
          </p>
        </div>
        <h3>댓글 및 좋아요</h3>
        <div>
          <p>
            giscus라는 Git API 기반 라이브러리를 이용해서 구현했다. 서버가
            없어서 당연히 댓글 기능 같은 건 구현 못할 줄 알았는데, 다른
            개발자들이 다 방법을 만들어놓았다.
          </p>
        </div>
        <h3>웹 접근성</h3>
        <div>
          <p>
            라이트하우스 수치를 낮추려고 깨작거리고는 있었는데, 어느 날 그건
            정말 보여주기 식일 뿐이란 것을 깨달았다. aria-label을 달고, html
            순서를 조절하고, 포커스 트랩을 구현했다. 프론트는 디테일을 놓치지
            않는 장인정신으로 임해야하는 것 같다.
          </p>
        </div>
      </section>
      <section className="about-blog__content">
        <h2>개발 후기</h2>
        <div>
          <p>
            전체적으로 기본기를 다질 수 있던 프로젝트였다고 생각한다. 반응형 UI,
            SVG 애니메이션, 웹 접근성, SEO 등을 공부하고 적용했다. 물론 그것도
            3달쯤 지나서 보니 죄다 거지같다. 그만큼 성장했다는 의미로
            받아들이려고 한다.
          </p>
          <p>
            원래 목표는 많이 싼 마크다운 문서를 자랑하는 거였는데, 방문자 수를
            보니 글러먹은 것 같다. 하라는 SEO는 다했는데 어디서부터 잘못된건지
            도저히 모르겠다. 그럼에도 불구하고 블로그가 있으니까, 글 하나를
            쓰더라도 좀 더 정성스럽게 작성하게 된다는 장점이 있다.
          </p>
        </div>
      </section>
    </article>
  )
}

export default AboutBlog
