import { graphql, useStaticQuery } from 'gatsby'
import { sortByName, sortByTitle } from '@utils/sortByTypes'

// 'posts' 폴더의 하위 md파일이 곧 포스트임을 가정
// 'posts' 폴더의 하위 디렉토리가 곧 카테고리임을 가정
// 'posts' 폴더의 하위 md파일들을 디렉토리 구조(카테고리)에 따라 가공하여 반환하는 훅

// 'posts' 하위 md 파일 만을 탐색
// 'README' md 파일 제거

export const useCategorizedPosts = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          frontmatter: { isCompleted: { eq: true } }
          fileAbsolutePath: { regex: "/^(?!.*README).*posts.*$/" }
        }
        sort: { frontmatter: { title: ASC } }
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
          frontmatter {
            title
          }
        }
      }
    }
  `)

  // 마크다운 파일을 디렉토리 구조에 따라 카테고리 분류
  /*
  type Post ={
    id: string
    title: string
    relativePath: string
  }

  type Folder = {
    name: string
    posts: Post[]
    nums: number
    folders: Folder[]
  }

  type Category = Folder[]
  */
  const categories = []
  data.allMarkdownRemark.nodes.forEach((node) => {
    const { id, parent, frontmatter } = node
    const { name, relativePath } = parent
    const { title } = frontmatter
    const pathArray = relativePath.split('/')

    // 최상단 카테고리 분류
    const rootCategory = pathArray[0]
    let foundCategory = categories.find(
      (category) => category.name === rootCategory
    )
    if (!foundCategory) {
      // 최상단 카테고리가 없으면 새로 생성
      const newCategory = {
        name: rootCategory,
        num: 1,
        posts: [],
        subCategories: [],
      }
      categories.push(newCategory)
      foundCategory = newCategory
    } else {
      // 최상단 카테고리가 있으면 갯수만 추가
      foundCategory.num += 1
    }

    // 서브 카테고리 분류
    let parentCategory = foundCategory // 바로 위의 상대 부모 디렉토리를 기억해서 여러 depth를 처리
    pathArray.slice(1, -1).forEach((subCategory) => {
      let foundCategory = parentCategory.subCategories.find(
        (category) => category.name === subCategory
      )
      if (!foundCategory) {
        // 서브 카테고리가 없으면 새로 생성
        const newCategory = {
          name: subCategory,
          num: 1,
          posts: [],
          subCategories: [],
        }
        parentCategory.subCategories.push(newCategory)
        parentCategory.subCategories.sort(sortByName) // 서브 카테고리 이름 순 정렬
        foundCategory = newCategory
      } else {
        // 서브 카테고리가 있으면 갯수만 추가
        foundCategory.num += 1
      }
      parentCategory = foundCategory
    })

    // 포스트 분류
    parentCategory.posts.push({ id, title, name, relativePath })
  })

  categories.sort(sortByName) // 최상단 카테고리 이름 순 정렬

  return categories
}
