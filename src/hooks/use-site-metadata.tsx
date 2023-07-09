import { graphql, useStaticQuery } from 'gatsby'

type SiteMetaData = {
  title: string
  description: string
  image: string
  siteUrl: string
  author: string
}

type DataProps = {
  site: {
    siteMetadata: SiteMetaData
  }
}

export const useSiteMetadata = (): SiteMetaData => {
  const data = useStaticQuery<DataProps>(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          image
          siteUrl
          author
        }
      }
    }
  `)

  return data.site.siteMetadata
}
