import React from 'react'
import './style.scss'
import { StaticImage } from 'gatsby-plugin-image'

const ProfileImage: React.FC = () => {
  return (
    <StaticImage
      className="profile-image"
      src="../../assets/images/profile-image.png"
      alt="작성자 프로필"
    />
  )
}

export default ProfileImage
