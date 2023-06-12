const path = require('path')

//  webpack 모듈 import 경로 alias 설정
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@asset': path.resolve(__dirname, 'src/asset'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@queries': path.resolve(__dirname, 'src/queries'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@templates': path.resolve(__dirname, 'src/templates'),
      },
    },
  })
}

// createPages API로 커스텀 페이지 생성
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // 카테고리 페이지 생성
  const postGroups = await graphql(
    `
      query {
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
    const path = 'posts/' + node.name
    // 상대 경로에 있는 md 파일들만 필터링(READEME.md 제외)
    const regex = new RegExp(
      `^(?!.*README).*${node.relativePath}.*$`
    ).toString()
    createPage({
      path,
      component: postGroupTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        regex: regex,
        ...node,
      },
    })
  })

  // 포스트 페이지 생성
  const posts = await graphql(
    `
      query {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/^(?!.*README).*posts.*$/" } }
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
    const path = 'posts/' + node.parent.relativePath
    createPage({
      path,
      component: postTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        pagePath: path,
        ...node,
      },
    })
  })
}
