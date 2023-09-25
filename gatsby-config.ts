import type { GatsbyConfig } from 'gatsby'
import metaConfig from './gatsby-meta-config'

type SiteData = {
  siteMetadata: {
    description: string
    title: string
    siteUrl: string
  }
}

type MarkdownRemarkRSSNode = {
  node: {
    excerpt: string
    html: string
    fields: { slug: string }
    frontmatter: {
      title: string
      createdAt: string
    }
  }
}

type AllMarkdownRemarkRSSData = {
  edges: MarkdownRemarkRSSNode[]
}

type RSSQuery = {
  query: {
    site: SiteData
    allMarkdownRemark: AllMarkdownRemarkRSSData
  }
}

type MarkdownRemarkFuseNode = {
  id: string
  excerpt: string
  parent: {
    id: string
    name: string
    relativePath: string
  }
  frontmatter: {
    title: string
    createdAt: string
    updatedAt: string
    tags: string[]
  }
  fields: {
    slug: string
  }
}

type FuseQuery = {
  data: {
    allMarkdownRemark: {
      nodes: MarkdownRemarkFuseNode[]
    }
  }
}

const config: GatsbyConfig = {
  siteMetadata: metaConfig,
  pathPrefix: '/TIL', // gh-pages 배포시 필요
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      sassOptions: {
        includePaths: ['./src', './src/styles'], // 해당 옵션 작동 안함
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`, // Add css related plugins
      options: {
        printRejected: true, // Print removed selectors and processed file names
      },
    },

    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp', // Needed for dynamic images
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svgs/, // path matching
        },
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'ko',
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                description
                title
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }: RSSQuery) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.createdAt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: [
                    { frontmatter: { createdAt: DESC } }
                    { frontmatter: { title: DESC } }
                  ]
                  filter: {
                    frontmatter: { isCompleted: { eq: true } }
                    fileAbsolutePath: { regex: "/^(?!.*README).*posts.*$/" }
                  }
                  limit: 100
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        createdAt
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Byongho96's TIL RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest', // PWA를 위한 mainfest 파일 설정
      options: {
        name: `Byongho96 TIL`,
        short_name: `Byongho96 TIL`,
        start_url: `/`, //실행시에 시작되는 URL 주소
        background_color: `#fffefd`,
        theme_color: `#000000`,
        display: `standalone`, // 앱 표시 모드
        icon: './static/favicon.png',
        icons: [
          {
            src: `./static/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `./static/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
            purpose: 'any maskable',
          },
        ],
      },
    },
    `gatsby-plugin-offline`, // manifest 보다 뒤에 와야 함!
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-N3DKK06MWC', // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/assets/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: './posts/',
      },
      __key: 'posts',
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`, // markdown 내부의 이미지를 캐싱하여 보여줌
            options: {
              maxWidth: 700,
              wrapperStyle: 'margin-bottom: 20px;',
              quality: 50, // 압축 퀄리티
              withWebp: { quality: 50 }, // webP를 지원하는 브라우저에 해당 파일
            },
          },
          `gatsby-remark-gifs`,
          `gatsby-remark-emoji`, // <-- this line adds emoji
          {
            resolve: `gatsby-remark-autolink-headers`, // 마크다운 header에 대한 anchor 태그를 자동으로 생성해줌
            options: {
              offsetY: `200`,
              icon: `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`,
            },
          },
          // {
          //   resolve: `gatsby-remark-katex`,
          //   options: {
          //     // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
          //     strict: `ignore`,
          //   },
          // },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-fusejs`,
      options: {
        // 인덱스를 만들고자 하는 데이터의 쿼리
        query: `
            {
              allMarkdownRemark(
                filter: {
                  frontmatter: { isCompleted: { eq: true } }
                  fileAbsolutePath: { regex: "/^(?!.*README).*posts.*$/" }
                }
                sort: [
                  { frontmatter: { createdAt: DESC } }
                  { frontmatter: { title: DESC } }
                ]
              ) {
                nodes {
                  id
                  excerpt
                  parent {
                    ... on File {
                      id
                      name
                      relativePath
                    }
                  }
                  frontmatter {
                    title
                    createdAt
                    updatedAt
                    tags
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          `,
        // 인덱스를 만들고자 하는 데이터의 프로퍼티
        keys: ['name', 'title', 'tags', 'excerpt'],
        // graphql의 결과물을 단순 객체 배열로 변환하는 함수. 위의 인덱스를 키로 가져야 함
        normalizer: ({ data }: FuseQuery) =>
          data.allMarkdownRemark.nodes.map((node) => ({
            id: node.id,
            excerpt: node.excerpt,
            name: node.parent.name,
            relativePath: node.parent.relativePath,
            title: node.frontmatter.title,
            createdAt: node.frontmatter.createdAt,
            tags: node.frontmatter.tags,
            slug: node.fields.slug,
          })),
      },
    },
  ],
}

export default config
