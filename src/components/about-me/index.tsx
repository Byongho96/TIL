import React, { useContext } from 'react'
import './style.scss'
import GithubIcon from '@assets/svgs/github.svg'
import GmailIcon from '@assets/svgs/gmail.svg'
import LinkedinIcon from '@assets/svgs/linkedin.svg'
import ProfileImage from '@components/profile-image'
import TypeAnimation from '@components/type-animation'
import { ThemeContext } from '@contexts/theme-context'

const AboutMe: React.FC = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <article className="about-me">
      <h1 className="about-me__title">About Me</h1>
      <div className="about-me__content">
        <div className="about-me__content__image">
          <ProfileImage />
          <nav className="about-me__content__image__links">
            <a href="https://github.com/Byongho96/" aria-label="작성자의 깃헙">
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/byongho-lee-b445ba22a"
              aria-label="작성자의 링크드인"
            >
              <LinkedinIcon />
            </a>
            <a
              href="mailto:unlike96@gmail.com"
              aria-label="작성자에게 구글 메일 전송"
            >
              <GmailIcon />
            </a>
          </nav>
        </div>
        <div className="about-me__content__typing">
          <TypeAnimation phrases={['공부하는 개발자 이병호입니다']} />
        </div>
        <div className="about-me__content__writing">
          <p>
            건축공학과 전기전자공학을 이중전공한 뒤, 지금은 개발자로서의
            커리어를 준비하고 있습니다.
          </p>
          <p>
            컴퓨터와 인터넷만 있으면, 내 생각을 가시화해서 모든 사람들에게
            보여줄 수 있다는 점이 개발이 매력이라고 생각합니다.
          </p>
          <p>
            생각한 것을 온전하게 구현하내기 위해서 공부하고 생각합니다. 공부한
            내용을 정리하기 위해 TIL 블로그를 만들었습니다.
          </p>
        </div>
      </div>
    </article>
  )
}

export default AboutMe
