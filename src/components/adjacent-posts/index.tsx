import * as React from 'react'
import './style.scss'
import { Link } from 'gatsby'
import LeftIcon from '@assets/svgs/triple-left.svg'
import RightIcon from '@assets/svgs/triple-right.svg'

type PostType = {
  id: string
  name: string
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  excerpt: string
  relativePath: string
}

interface Props {
  nextPost?: PostType
  prevPost?: PostType
}

const NextPosts: React.FC<Props> = ({ nextPost, prevPost }) => {
  return (
    <section className="adjacent-posts">
      {prevPost ? <Post post={prevPost} isNext={false} /> : <div />}
      {nextPost ? <Post post={nextPost} isNext={true} /> : <div />}
    </section>
  )
}

export default NextPosts

interface PostProps {
  post: PostType
  isNext: boolean
}

const Post: React.FC<PostProps> = ({ post, isNext }) => {
  const icon = isNext ? <RightIcon /> : <LeftIcon />
  const direction = isNext ? 'next' : 'prev'
  const sign = isNext ? '다음 포스트' : '이전 포스트'

  return (
    <article className="adjacent-posts__post">
      <Link
        className={`adjacent-posts__post--link ${direction}`}
        to={post.slug}
      >
        {icon}
        <div className={`adjacent-posts__post--flex ${direction}`}>
          <div className="adjacent-posts__post__sign">{sign}</div>
          <h1 className="adjacent-posts__post__title">{post.title}</h1>
        </div>
      </Link>
    </article>
  )
}
