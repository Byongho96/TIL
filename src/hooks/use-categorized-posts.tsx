import { graphql, useStaticQuery } from 'gatsby'
import { sortByName } from '@utils/sortByTypes'

// 마크다운 파일 정보
interface Post {
  id: string
  title: string
  relativePath: string
}

// 카테고리(디렉토리) 정보
interface Category {
  name: string
  posts: Post[]
  nums: number
  folders: Category[]
}

interface CategorizedPosts {
  totalPosts: number // 전체 포스트 수
  categories: Category[] // 카테고리(디렉토리) 정보 배열
}

export const useCategorizedPosts = (): CategorizedPosts => {
  // 마크다운 파일 수집
  // 조건 1. isCompleted: true
  // 조건 2. README.md 제외
  // 조건 3. posts 디렉토리 하위
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

  const totalPosts = data.allMarkdownRemark.nodes.length // 전체 포스트 수

  // 마크다운 파일 순회하며 카테고리 분류
  const categories = []
  data.allMarkdownRemark.nodes.forEach((post) => {
    // 데이터 분해
    const { id, parent, frontmatter } = post
    const { name, relativePath } = parent
    const { title } = frontmatter

    // 카테고리 분류를 위해 상대 경로를 배열로 변환
    const pathArray = relativePath.split('/')

    // 루트 카테고리 분류
    const rootCategoryName = pathArray[0]
    let rootCategory = categories.find(
      (category) => category.name === rootCategoryName
    )
    if (!rootCategory) {
      // 루트 카테고리가 없을 경우, 새로 생성
      const newCategory = {
        name: rootCategoryName,
        num: 1,
        posts: [],
        subCategories: [],
      }
      categories.push(newCategory)
      rootCategory = newCategory
    } else {
      // 루트 카테고리가 있을 경우, 갯수만 업데이트
      rootCategory.num += 1
    }

    // 서브 카테고리 분류
    let parentCategory = rootCategory // 상대 경로 배열을 순회하며, 부모 디렉토리 재할당
    pathArray.slice(1, -1).forEach((subCategoryName) => {
      let subCategory = parentCategory.subCategories.find(
        (category) => category.name === subCategoryName
      )
      if (!subCategory) {
        // 서브 카테고리가 없을 경우, 새로 생성
        const newCategory = {
          name: subCategoryName,
          num: 1,
          posts: [],
          subCategories: [],
        }
        parentCategory.subCategories.push(newCategory)
        parentCategory.subCategories.sort(sortByName) // 서브 카테고리 이름 순 정렬
        subCategory = newCategory
      } else {
        // 서브 카테고리가 있을 경우, 새로 생성
        subCategory.num += 1
      }
      parentCategory = subCategory
    })

    // 포스트 삽입
    parentCategory.posts.push({ id, title, name, relativePath })
  })

  categories.sort(sortByName) // 최상단 카테고리 이름 순 정렬

  return { totalPosts, categories }
}
