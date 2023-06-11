import { graphql, useStaticQuery } from 'gatsby'

// 'posts' 폴더의 하위 md파일이 곧 포스트임을 가정
// 'posts' 폴더의 하위 디렉토리가 곧 카테고리임을 가정
// 'posts' 폴더의 하위 md파일들을 디렉토리 구조(카테고리)에 따라 가공하여 반환하는 훅

// 'posts' 하위 md 파일 만을 탐색
// 'README' md 파일 제거

export const useCategorizedPosts = () => {
  const data = useStaticQuery(graphql`
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
  `)

  // 마크다운 파일을 디렉토리 구조에 따라 카테고리 분류
  /* Exmample
  {
    "rootCategory1" : {
      num: 6,
      posts: [{id: "id1", name: "name1"}]
      subCategories: {
        "subCategory1": {
          num: 3,
          posts: [{id: "id2", name: "name2"}, {id: "id3", name: "name3"}, {id: "id4", name: "name4"}],
          subCategories: {},
        },
        "subCategory2": {
          num: 2,
          posts: [{id: "id5", name: "name5"}, {id: "id6", name: "name6"}],
          subCategories: {},
        },
      }
    },
    ...
  }
  */
  const categories = []
  data.allMarkdownRemark.nodes.forEach((node) => {
    const { id, parent } = node
    const { name, relativePath } = parent
    const pathArray = relativePath.split('/')

    // 최상단 카테고리 분류
    const rootCategory = pathArray[0]
    let foundCategory = categories.find(
      (category) => category.name === rootCategory
    )
    if (!foundCategory) {
      const newCategory = {
        name: rootCategory,
        num: 1,
        posts: [],
        subCategories: [],
      }
      categories.push(newCategory)
      foundCategory = newCategory
    } else {
      foundCategory.num += 1
    }

    // 서브 카테고리 분류
    let parentCategory = foundCategory
    pathArray.slice(1, -1).forEach((subCategory) => {
      let foundCategory = parentCategory.subCategories.find(
        (category) => category.name === subCategory
      )
      if (!foundCategory) {
        const newCategory = {
          name: subCategory,
          num: 1,
          posts: [],
          subCategories: [],
        }
        parentCategory.subCategories.push(newCategory)
        foundCategory = newCategory
      } else {
        foundCategory.num += 1
      }
      parentCategory = foundCategory
    })

    // 포스트 분류
    parentCategory.posts.push({ id, name, relativePath })
    parentCategory.posts.sort((a, b) => {
      const nameA = a.name.toUpperCase() // ignore upper and lowercase
      const nameB = b.name.toUpperCase() // ignore upper and lowercase
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      // names must be equal
      return 0
    })
  })

  // sort by name
  categories.sort((a, b) => {
    const nameA = a.name.toUpperCase() // ignore upper and lowercase
    const nameB = b.name.toUpperCase() // ignore upper and lowercase
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }

    // names must be equal
    return 0
  })

  return categories
}
