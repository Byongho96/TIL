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
            프로그래밍을 본격적으로 배우기 시작하면서 TIL 마크다운 문서를
            작성하기 시작했다. 공부한 것을 기록하는 문화라니 개발자들은 참으로
            바람직하기도 하다. 한 해 동안의 글을 작성하고 보니 어느새 양이
            상당히 늘어나 있었다. 마냥 레포지토리에 묵혀 두기도 아까워서, 공부도
            할 겸 직접 블로그를 제작해보기로 했다.
          </p>
        </div>
      </section>
      <section className="about-blog__content">
        <h2>쓰인 기술</h2>
        <h3>Gatsby</h3>
        <div>
          <p>
            사용할 프레임워크를 조사하는 과정에서 Gatsby와 Jekyll이 가장
            대표적인 정적 사이트 생성기(SSG)로 추천되었다. Jeykyll은 오랜 역사를
            가지고 있었으나 Liquid와 Ruby라는 생소한 언어를 사용하는 반면,
            Gatsby는 비교적 최근에 만들어져 React와 함께 빠르게 성장하고 있었다.
            이러한 점들로 이미 Gatsby가 더 매력적으로 다가왔는데, Gatsby의
            튜토리얼이 '마크다운 파일로 블로그 만들기'라는 점에서 마음을 굳혔다.
          </p>
        </div>
        <h3>GraphQL</h3>
        <div>
          <p>
            Gatsby를 선택하니까 GraphQL이라는 기술이 자매상품처럼 함께
            재공되었다. Gatsby의{' '}
            <a
              href="https://www.gatsbyjs.com/plugins/gatsby-source-filesystem/"
              title="gatsby source file system 플러그인"
            >
              파일 시스템 플러그인
            </a>
            이 GraphQL과 함께 동작하여 로컬 파일에 대한 GraphQL 노드를 자동으로
            생성했다. 이 덕분에 손쉽게 블로그를 만들 수 있었지만, 아아직도
            GraphQL이 정확히 어떤 것인지는 설명하기가 어렵다. 이 다음에 백엔드
            프레임워크에 GraphQL을 적용할 기회가 생긴다면, 그때서야 더 명확하게
            감을 잡을 수 있을 것 같다.
          </p>
        </div>
        <h3>Sass & CSS BEM</h3>
        <div>
          <p>
            CSS 스타일링으로는 Sass와 CSS BEM 네이밍 규칙을 사용했다. 모든 UI를
            직접 구현하면서 CSS 실력을 향상시키고 싶었기 떼문이다. 이를 통해
            레이아웃이나 애니메이션 활용 능력을 한층 더 성장시킬 수 있었다. 다만
            BEM 규칙은 이번에 처음 적용하면서 다소 중구난방된 점이 없지 않다.
          </p>
        </div>
      </section>
      <section className="about-blog__content">
        <h2>블로그 특징</h2>
        <h3>반응형 UI</h3>
        <StaticImage src="../../assets/images/mockup.png" alt="profile image" />
        <div>
          <p>
            4가지 기기에 따라 다르게 동작하는 반응형 UI로 구현했다. 실제
            반응형을 구현하는 과정은 '이게 맞나?'싶을 정도로 조금 노가다스러운
            면이 있었다. 단순히 폰트 크기를 조절하는 것 뿐만 아니라, 필요에 따라
            레이아웃 배치를 변경하고 자바스크립트 코드를 추가해야 했다. 그러나
            이번 프로젝트를 계기로, 다읍 프로젝트는 반응형 UI를 설계하는
            단계부터 더 효율적으로 구현할 수 있을 것 같다.
          </p>
        </div>
        <h3>메인 컬러 커스텀</h3>
        <div>
          <p>
            네비게이션바에 있는 빨간색 정사각형을 클릭해서 메인 컬러를 커스텀할
            수 있다. 이 메인 컬러는 CSS 변수로 공유되기 때문에 여러 컴포넌트의
            색깔이 함게 변경된다. 원래는 Supreme과 유사한 느낌을 주기 위해
            빨간색을 메인 컬러로 선택했지만, 정작 나도 눈이 아파서 하늘색으로
            변경해서 사용하고 있다.😅
          </p>
        </div>
        <h3>검색 기능</h3>
        <div>
          <p>
            fuse.js를 기반으로 만들어진 gatsby-plugin-fusejs 플러그인을 사용해서
            검색 기능을 구현했다. fuse.js의 가장 큰 특징은 fuzzy searching을
            지원한다는 것이다. fuzzy searching이란 사용자가 정확한 철자를
            입력하지 않아도 관련성이 있는 항목을 찾아내는 검색 기술을 말한다.
            라이브러리 내부적으로 Bitap 알고리즘을 적용했다고 하는데, 기술에
            대한 아주 간략한 설명을{' '}
            <a
              href="https://www.fusejs.io/concepts/scoring-theory.html"
              title="fues.js 공식문서 scoring theory"
            >
              여기
            </a>
            에서 확인할 수 있다.
          </p>
        </div>
        <h3>댓글 및 좋아요</h3>
        <div>
          <p>
            <a href="https://giscus.app/" title="giscus 공식 페이지">
              giscus
            </a>
            라는 Github API 기반의 라이브러리를 사용해서 댓글 기능을 구현했다.
            서버가 없기 때문에 댓글 기능을 적용하지 못할 줄 알았는데, 개발자들은
            어떤 상황에서도 창의적인 해결책을 찾아내는 것 같다. giscus
            라이브러리는 Github 레포지토리의 discussions 탭과 연동되어 동작한다.
          </p>
        </div>
        <h3>웹 접근성</h3>
        <div>
          <p>
            웹 표준을 공부하면서 웹 접근성의 중요성을 깨닫게 되었다.
            라이트하우스의 수치를 맞추는 것은 그저 빙산의 일각에 불과했다.
            스크린 리더를 설치해서 직접 청각 보조자료를 확인하고, 키보드
            접근성을 높이기 위해 HTML 코드 순서를 조정하거나 포커스 트랩을
            구현하는 등의 작업을 했다.
          </p>
        </div>
        <h3>자동 배포</h3>
        <div>
          <p>
            Github Action을 등록해서 매인 브랜치에 푸시하면 자동으로 빌드하고
            Github Pages에 배포되도록 설정했다. 구글링을 해보면 보통 이 과정에서
            Personal Access Token을 발급받아 등록하는데, 나는 이것이 불필요하게
            느껴졌다. 왜냐하면 워크플로우가 시작되었던 동일한 레포지토리로
            재접근하려는 상황이기 때문이다. 더구나 토큰은 만료되어 주기적으로
            재발급 받아야 하는 번거로움이 있다. 결국 Personal Access Token을
            사용하지 않는{' '}
            <a
              href="https://github.com/peaceiris/actions-gh-pages"
              title="peaceiris의 actions-gh-pages 깃헙"
            >
              액션
            </a>
            을 찾을 수 있었는데, 대신 깃헙 토큰을 사용한다. 깃헙 토큰이란
            워크플로우 내에서 본인인증을 위해 GitHub Actions Runner가 자동
            생성하는 값이다.
          </p>
        </div>
      </section>
      <section className="about-blog__content">
        <h2>개발 후기</h2>
        <div>
          <p>
            이번 프로젝트의 가장 큰 수확은 렌더링 방식의 차이를 이해한 것이다.
            React가 기본적으로 CSR 기반의 SPA 프로젝트라는 것을 알고는 있었지만,
            비교 대상이 없었기 때문에 그냥 아는 수준에 머물렀다. 이번에 Gatsby를
            사용하면서 React와 미묘한 차이를 계속해서 경험했고, 그 차이의 원인이
            렌더링 방식에 있음을 깨달았다. 그 결과로 SSG 뿐만 아니라 CSR과 SSR에
            대해서도 더 깊이 이해하게 된 시간이었다.
          </p>
          <p>
            또 다른 수확은 애니메이션 구현 능력이 한 단계 상승했다는 점이다.
            기본적인 CSS 애니메이션 뿐만 아니라 JavsScript와 canvas 애니메이션을
            활용하는 능력도 향상되었다. (아무도 몰랐겠지만{' '}
            <a href="https://byongho96.github.io/TIL/404" title="404 페이지">
              404 페이지
            </a>
            에 캔버스 애니메이션이 적용되어 있다.) 이전까지는 애니메이션을
            추가하는 것이 부담스러운 작업이었지만, 지금은 오히려 어떻게 구현할지
            자꾸 생각하면서 기대하게 된다.
          </p>
        </div>
      </section>
    </article>
  )
}

export default AboutBlog
