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
            프로그래밍이란 본질적으로 상상을 구현내는 과정이 아닐까 싶다. 여여러
            사람의 상상과 아이디어가 모여 체계적으로 구성되면, 비로소 새로운
            서비스로 탄생하는 것 같다.
          </p>
          <p>
            기술의 발전은 계속해서 프로그래밍의 한계를 확장하고 있다. 나도
            이러한 기술적 이점에 합류하여 더 자유로게 상상을 현실로 구현해내고
            싶다.
          </p>
        </div>
      </div>
    </article>
  )
}

export default AboutMe
