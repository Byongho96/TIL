import React from 'react'
import { useSiteMetadata } from '@hooks/use-site-metadata'

interface Props {
  title: string
  description: string
  pathname: string
  children: React.ReactNode
}

type SeoType = {
  title: string
  description: string
  image: string
  url: string
}

const SEO: React.FC<Props> = ({ title, description, pathname, children }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    siteUrl,
  } = useSiteMetadata()

  const seo: SeoType = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ''}`,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {children}
    </>
  )
}

export default SEO
