import * as path from 'path' // require일 경우, typescript 처리방법 알아보기
import { createFilePath } from 'gatsby-source-filesystem'
import type { GatsbyNode } from 'gatsby'

//  webpack 모듈 import 경로 alias 설정
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  const { setWebpackConfig } = actions

  setWebpackConfig({
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@queries': path.resolve(__dirname, 'src/queries'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  })
}

// 마크다운 파일에 대해서 slug 경로 생성
export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = '/posts' + createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

type DirectoryNode = {
  id: string
  name: string
  relativePath: string
}

type PostGroupData = {
  allDirectory: {
    nodes: DirectoryNode[]
  }
}

type MarkdownRemarkNode = {
  id: string
  parent: {
    id: string
    name: string
    relativePath: string
  }
  fields: {
    slug: string
  }
}

type PostData = {
  allMarkdownRemark: {
    nodes: MarkdownRemarkNode[]
  }
}

// createPages API로 커스텀 페이지 생성
export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  // 카테고리 페이지 생성
  const postGroups = await graphql<PostGroupData>(
    `
      query PostGroupsQuery {
        allDirectory(
          filter: {
            sourceInstanceName: { eq: "posts" }
            name: { nin: ["image", "images", "asset", "assets"] }
            relativePath: { ne: "" }
          }
        ) {
          nodes {
            id
            name
            relativePath
          }
        }
      }
    `
  )

  // Handle errors
  if (postGroups.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each markdown file.
  const postGroupTemplate = path.resolve(`src/templates/post-group/index.tsx`)
  postGroups.data.allDirectory.nodes.forEach((node) => {
    const path = '/posts/' + node.name
    // 상대 경로에 있는 md 파일들만 필터링(READEME.md 제외)
    const postPathRegex = new RegExp(
      `^(?!.*README).*${node.relativePath}.*$`
    ).toString()
    createPage({
      path,
      component: postGroupTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        postPathRegex: postPathRegex,
        ...node,
      },
    })
  })

  // 포스트 페이지 생성
  const posts = await graphql<PostData>(
    `
      query PostsQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: { isCompleted: { eq: true } }
            fileAbsolutePath: { regex: "/^(?!.*README).*posts.*$/" }
          }
        ) {
          nodes {
            id
            parent {
              ... on File {
                id
                name
                relativePath
              }
            }
            fields {
              slug
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (posts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each markdown file.
  const postTemplate = path.resolve(`src/templates/post/index.tsx`)
  posts.data.allMarkdownRemark.nodes.forEach((node) => {
    const relativeDirectory = node.parent.relativePath.split('/').at(-2)
    const relativeDirectoryPath = node.parent.relativePath
      .split('/')
      .slice(0, -1)
      .join('/')
    // 페이지 경로 생성.
    const path = node.fields.slug
    // 같은 디렉토리에 있는 형제 md 파일들을 필터링(READEME.md 제외)하는 regex
    const siblingPostsPathRegex = new RegExp(
      `^(?!.*README).*${relativeDirectoryPath}.*$`
    ).toString()
    createPage({
      path,
      component: postTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        siblingPostsPathRegex: siblingPostsPathRegex,
        relativeDirectory: relativeDirectory,
        ...node,
      },
    })
  })
}
