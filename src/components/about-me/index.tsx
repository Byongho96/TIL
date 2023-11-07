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
          <TypeAnimation phrases={['상상을 구현하는 개발자']} />
        </div>
        <div className="about-me__content__writing">
          <p>
            건축공학과 전기전자공학을 이중전공하는 패기를 부리고서는, 하라는
            취직은 안하고 프로그래밍을 공부하고 있다.
          </p>
          <p>
            전공수업에서 대륙 간 해저케이블이 놓여있다는 걸 듣고, 인터넷에
            흥미를 느낀게 모든 일의 발단이었다.
          </p>
          <p>
            컴퓨터만 있으면 머릿속 생각을 구현하고, 인터넷으로 전세계에 선보일
            수 있다니 아무리 생각해도 치트키 같다.
          </p>
        </div>
      </div>
    </article>
  )
}

export default AboutMe
