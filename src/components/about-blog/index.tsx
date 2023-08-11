import React from 'react'
import './style.scss'
import { StaticImage } from 'gatsby-plugin-image'
import TypeAnimation from '@components/type-animation'

const AboutBlog: React.FC = () => {
  return (
    <article className="about-blog">
      <section className="about-blog__header">
        <h1 className="about-blog__header__title">About Blog</h1>
        <a href="/TIL/posts/Gatsby/" className="about-blog__header__typing">
          <TypeAnimation phrases={['블로그 제작 시리즈 Click Here!']} />
        </a>
      </section>
      <section className="about-blog__content">
        <h2>기획 배경</h2>
        <div>
          <p>
            그동안 꽤 구준히 공부한 내용을 Github에 마크다운 파일로 정리하고
            있었습니다. <br />1 년이 지나 글이 어느 정도 쌓인 걸 보니까, 작성한
            글로 블로그를 시작하고 싶어졌습니다.
          </p>
          <p>
            마침 요즘 시간적 여유도 있던 터라 직접 웹사이트를 제작해보기로
            했습니다. (2023. 07)
          </p>
        </div>
      </section>
      {/* <Taping color="black" phrase="coming soon" rotationDeg={2} /> */}
      <section className="about-blog__content">
        <h2>쓰인 기술</h2>
        <h3>Gatsby</h3>
        <div>
          <p>
            워낙 목표에 꼭 맞는 프레임워크여서 큰 고민 없이 선택했습니다. <br />
            공식문서의 튜토리얼 자체도 "마크다운 파일로 블로그 만들기"입니다.
            <br />
            거기에 익숙한 리액트 기반의 프레임워크라니, 마치 나를 위해 준비한
            몰래카메라 같았습니다.
          </p>
          <p>
            이번에 정적 사이트 생성기(SSG)를 접하면서, CSR과 SSR에 대한 이해도
            함께 높아졌습니다.
            <br />
            뭐든지 비교 대상이 있을 때, 개념이 더 구체화 되는 것 같습니다.
          </p>
        </div>
        <h3>GraphQL</h3>
        <div>
          <p>
            Gatsby를 선택하니 GraphQL이라는게 자매상품처럼 따라왔습니다.
            <br />몇 번 소문을 들어, 정체가 궁금했던 녀석이라 기꺼운 마음으로
            받아들였습니다.
          </p>
          <p>
            기존 API 시스템과 비교할 때 GraphQL은 정말 특이했습니다.
            <br />
            Gatsby의 파일시스템 플러그인과 결합하여 손수 API를 설계하지 않고도
            필요한 정보를 골라 받을 수 있다는 것은 신기했습니다.
            <br />
            근데 골라 받을 수는 있을 뿐, 원하는 형식으로 받을 수는 없어서
            귀찮았습니다.
          </p>
          <p>
            프론트보다 기존 백엔드 프레임워크에 GraphQL을 어떻게 적용하는 지가
            더 궁금해졌습니다. <br />
            나중에 녀석이 더 유명해지면 뒤늦게 공부해 볼 생각입니다.
          </p>
        </div>
        <h3>Sass</h3>
        <div>
          <p>CSS 스타일링으로는 Sass를 선택했습니다.</p>
          <p>
            순수 CSS에 가장 가까운 언어로 자유롭게 개발할 수 있다는 점이 Sass의
            매력인 것 같습니다.
            <br />
            CSS 변수와 JavaScript를 같이 활용해서, 순수 CSS로도 충분히 사용자와
            상호작용한 웹사이트를 만들고지 했습니다.
          </p>
        </div>
      </section>
      {/* <Taping color="white" phrase="coming soon" rotationDeg={5} /> */}
      <section className="about-blog__content">
        <h2>블로그 특징</h2>
        <h3>전형적인 UI</h3>
        <StaticImage src="../../assets/images/mockup.png" alt="profile image" />
        <div>
          <p>
            "전형적이다"라는 것은 "익숙하다"라는 의미이기도 합니다.
            <br />
            3단 메뉴 형식의 네비게이션 바를 가진 웹페이지는 아주 익숙합니다.
            <br />
            때문에 처음 들어 온 누구라도, 내 집 마냥 자연스럽게 사이트를 탐색할
            수 있습니다.
          </p>
          <p>
            또, 기술적인 측면에서 "전형적"이라는 것은 "기본적"임을 내포합니다.
            <br />
            근데 생각해보니 그 기본적인 UI를 직접 제대로 구현한 적이 없었습니다.
            <br />
            기기 사이즈에 따라 동적으로 반응하는, 전형적인 UI를 구현하는 것이
            목표였습니다.
          </p>
        </div>
        <h3>선택 가능한 메인 컬러</h3>
        <div>
          <p>
            이 웹사이트는 사용자가 메인컬러를 직접 선택 할 수 있습니다.
            <br />
            상단 네비게이션 바의 작은 정사각형을 눌러 메인 컬러를 선택할 수
            있습니다.
          </p>
          <p>
            사용자가 메인 컬러를 선택함으로써 웹사이트에 친밀감을 느끼고
            <br />
            그에 따른 지속적인 재방문이 웹사이트 수익창출로 이어질 것이라고 입을
            털 수 있을 것 같습니다.
          </p>
        </div>
        <h3>다크 모드</h3>
        <div>
          <p>기능 자체보다는 고민했던 UX적인 흐름을 공유하고 싶습니다</p>
          <p>
            <ol>
              <li>
                사용자의 prefers-color-scheme에 따라 초기 모드가 정해집니다.
              </li>
              <li>
                이후 사용자가 모드를 바꾸면, 이를 세션스토리지에 저장합니다.
              </li>
              <li>현재 세션에 있는 동안에는 선택된 모드가 유지됩니다.</li>
              <li>
                재방문 시에는 다시 prefers-color-scheme에 따라 초기 모드가
                정해집니다.
              </li>
            </ol>
          </p>
        </div>
        <h3>검색 기능</h3>
        <div>
          <p>
            fuse.js를 기반으로 만들어진 gatsby-plugin-fusejs를 이용해서
            구현했습니다.
          </p>
          <p>
            해당 플러그인은 주입한 컨텐츠로 index 트리를 만들어 동작한다는데,
            <br />
            솔직히 구체적인 동작 원리까지는 알지 못합니다.
            <br /> 아무튼 빠르고 fuzzy한 검색(비슷한 단어까지 매칭)이 가능하다고
            합니다.
          </p>
          <p>
            원래 단순히 반복문과 String.indexOf()연산으로 구현할 계획이었는데{' '}
            <br />
            만약 그랬다면 시간, 효율, 결과 모든 것을 놓칠 뻔했습니다 <br />
            적절하게 라이브러리를 잘 활용하는 것도 능력임을 다시 한 번 마음 속에
            되새깁니다.
          </p>
        </div>
        <h3>댓글 및 좋아요</h3>
        <div>
          <p>
            giscus라는 오픈 소스를 이용해서 구현했습니다.
            <br />
            github API를 기반으로 만들어진 사용하기 아주 간편한 오픈 소스입니다.
          </p>
          <p>
            서버가 없어서 당연히 댓글 기능 같은 건 구현 못할 줄 알았습니다.
            <br />
            그런데 개발자들은 어떻게든 늘 방법을 찾아내고야 마는 것 같습니다.
            <br />
            멋진 오픈소스들이 있다는 것에 감사하며, 나중에는 저도 유용한
            오픈소스를 만들어보고 싶습니다.
          </p>
        </div>
      </section>
      {/* <Taping color="white" phrase="coming soon" rotationDeg={5} /> */}
      {/* <Taping
        color="black"
        phrase="coming soon"
        rotationDeg={-7}
        direction="left"
      /> */}
      <section className="about-blog__content">
        <h2>개발 후기</h2>
        <div>
          <p>
            가벼운 마음으로 시작했는데 하다 보니 무거워졌습니다.
            <br />
            그만큼 배운 것도 많은 프로젝트였습니다.
            <br />
            앞서 말한 내용 외에도 SEO 관련한 rss.xml, sitemap.xml, html 메타
            태그 등에 대해 학습했고
            <br />
            개인 프로젝트를 초기설정하며 아이러니하게도 eslint, prettier, husky
            와 같은 협업 툴에 대한 이해가 높아졌습니다.
          </p>
          <p>
            매 프로젝트가 끝날 때마다, '이제 좀 잘하는 듯'하고 자부하고
            <br />
            매 프로젝트를 시작할 때마다, 그러한 자부심이 처참히 부서트리길
            반복합니다.
            <br />
            어서 빨리 취직하여 이제는 돈 받으며 이 사이클을 돌고 싶습니다.
          </p>
        </div>
      </section>
    </article>
  )
}

export default AboutBlog
