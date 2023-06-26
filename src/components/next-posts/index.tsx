import * as React from 'react'
import * as styles from './style.module.scss'
import { navigate } from 'gatsby'
import LeftIcon from '@assets/svgs/left.svg'
import RightIcon from '@assets/svgs/right.svg'

type Post = {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  excerpt: string
  relativePath: string
}

type Props = {
  nextPost: Post
  prevPost: Post
}

const NextPosts: React.FC<Props> = ({ nextPost, prevPost }) => {
  return (
    <div className={styles.posts}>
      {prevPost ? <Post post={prevPost} isNext={false} /> : <div />}
      {nextPost ? <Post post={nextPost} isNext={true} /> : <div />}
    </div>
  )
}

export default NextPosts

const Post: React.FC = ({ post, isNext }) => {
  const icon = isNext ? <RightIcon /> : <LeftIcon />
  const direction = isNext ? styles.next : styles.prev

  const handleClick = () => {
    navigate(`/posts/${post.relativePath}`)
  }

  return (
    <div className={styles.post} onClick={handleClick}>
      <div className={`${styles.flexbox} ${direction}`}>
        <div className={styles.title}>{post.title}</div>
        <div className={styles.icon}>{icon}</div>
      </div>
      <div className={styles.excerpt}>{post.excerpt}</div>
    </div>
  )
}
