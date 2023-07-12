import { useGatsbyPluginFusejs } from 'react-use-fusejs'
import { graphql, useStaticQuery } from 'gatsby'
import { useDebounce } from './use-debounce'

type FusejsData = {
  item: {
    id: string
    excerpt: string
    name: string
    relativePath: string
    title: string
    createtAt: string
    tags: string[]
    slug: string
  }
}

type DataProps = {
  fusejs: {
    index: string
    data: FusejsData[]
  }
}

export const useFuseJs = (query: string): FusejsData[] => {
  const data = useStaticQuery<DataProps>(graphql`
    {
      fusejs {
        index
        data
      }
    }
  `)

  const deBouncedQuery = useDebounce(query, 200) // debounce 쿼리

  /* eslint-disable @typescript-eslint/no-unsafe-call */
  const result: FusejsData[] = useGatsbyPluginFusejs(
    deBouncedQuery,
    data.fusejs
  ) as FusejsData[]

  return result
}
