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

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const postGroups = await graphql(
    `
      query {
        allDirectory(
          filter: {
            sourceInstanceName: { eq: "posts" }
            name: { nin: ["image", "images", "asset", "assets"] }
            relativeDirectory: { nin: ["VanillaWeb"] }
            relativePath: { ne: "" }
          }
        ) {
          nodes {
            id
            name
            relativeDirectory
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
  const postGroupTemplate = path.resolve(`src/templates/post-group.tsx`)
  postGroups.data.allDirectory.nodes.forEach((node) => {
    const path = 'posts/' + node.name
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

  // Query for markdown nodes to use in creating pages.
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
  const postTemplate = path.resolve(`src/templates/post.tsx`)
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
