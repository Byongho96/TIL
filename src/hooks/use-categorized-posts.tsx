import { graphql, useStaticQuery } from 'gatsby'
import { sortByName } from '@utils/sortByTypes'

type MarkdownRemarkNode = {
  id: string
  parent: {
    id: string
    name: string
    relativePath: string
  }
  frontmatter: {
    title: string
  }
  fields: {
    slug: string
  }
}

type DataProps = {
  allMarkdownRemark: {
    nodes: MarkdownRemarkNode[]
  }
}

// 마크다운 파일 정보
export type PostType = {
  id: string
  title: string
  name: string
  slug: string
  relativePath: string
}

// 카테고리(디렉토리) 정보
export type CategoryType = {
  name: string
  posts: PostType[]
  num: number
  subCategories: CategoryType[]
}

export interface CategorizedPosts {
  totalPosts: number // 전체 포스트 수
  categories: CategoryType[] // 카테고리(디렉토리) 정보 배열
}

export const useCategorizedPosts = (): CategorizedPosts => {
  // 마크다운 파일 수집
  // 조건 1. isCompleted: true
  // 조건 2. README.md 제외
  // 조건 3. posts 디렉토리 하위
  const data = useStaticQuery<DataProps>(graphql`
    query CategorizedPostsQuery {
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
          fields {
            slug
          }
        }
      }
    }
  `)

  const totalPosts = data.allMarkdownRemark.nodes.length // 전체 포스트 수

  // 마크다운 파일 순회하며 카테고리 분류
  const categories: CategoryType[] = []
  data.allMarkdownRemark.nodes.forEach((post) => {
    // 데이터 분해
    const { id, parent, frontmatter, fields } = post
    const { name, relativePath } = parent
    const { title } = frontmatter
    const { slug } = fields

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
    parentCategory.posts.push({ id, title, name, slug, relativePath })
  })

  categories.sort(sortByName) // 최상단 카테고리 이름 순 정렬

  return { totalPosts, categories }
}
