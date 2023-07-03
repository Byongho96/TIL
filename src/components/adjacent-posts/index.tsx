import * as React from 'react'
import './style.scss'
import { navigate } from 'gatsby'
import LeftIcon from '@assets/svgs/triple-left.svg'
import RightIcon from '@assets/svgs/triple-right.svg'

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
    <div className="adjacent-posts">
      {prevPost ? <Post post={prevPost} isNext={false} /> : <div />}
      {nextPost ? <Post post={nextPost} isNext={true} /> : <div />}
    </div>
  )
}

export default NextPosts

const Post: React.FC = ({ post, isNext }) => {
  const icon = isNext ? <RightIcon /> : <LeftIcon />
  const direction = isNext ? 'next' : 'prev'
  const sign = isNext ? '다음 포스트' : '이전 포스트'

  const handleClick = () => {
    navigate(`/posts/${post.relativePath}`)
  }

  return (
    <article
      className={`adjacent-posts__post ${direction}`}
      onClick={handleClick}
    >
      {icon}
      <div className={`adjacent-posts__post--flex ${direction}`}>
        <div className="adjacent-posts__post__sign">{sign}</div>
        <h1 className="adjacent-posts__post__title">{post.title}</h1>
      </div>
    </article>
  )
}
