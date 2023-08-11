import { graphql, useStaticQuery } from 'gatsby'

// 'posts' 폴더의 하위 디렉토리가 곧 카테고리임을 가정
// 'posts' 폴더의 하위 디렉토리들을 리스트 형태로 반환하는 훅

// 이미지 관련 폴더 제거 : name: { nin: ["image", "images", "asset", "assets"] }
// 최상단 posts 폴더 제거 : relativePath: { ne: "" }

type DirectoryNode = {
  id: string
  name: string
  relativeDirectory: string
  relativePath: string
}

type DataProps = {
  allDirectory: {
    nodes: DirectoryNode[]
  }
}

const useCategories = (): DirectoryNode[] => {
  const data = useStaticQuery<DataProps>(graphql`
    query CategoriesQuery {
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
  `)

  return data.allDirectory.nodes
}

export default useCategories