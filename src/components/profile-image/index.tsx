import React from 'react'
import * as styles from './style.module.scss'
import { StaticImage } from 'gatsby-plugin-image'

const ProfileImage: React.FC = () => {
  return (
    <StaticImage
      className={styles.profileImage}
      src="../../assets/images/profile-image.png"
      alt="profile image"
    />
  )
}

export default ProfileImage
