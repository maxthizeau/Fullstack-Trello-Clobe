import { useQuery } from '@apollo/client'
// import { TypedQueryDocumentNode } from 'graphql'
// <T extends HTMLElement = HTMLElement>
export const useImperativeQuery = <T, V>(query: any) => {
  const { refetch } = useQuery<T, V>(query, { skip: true })

  const imperativelyCallQuery = (variables: V) => {
    return refetch(variables)
  }

  return imperativelyCallQuery
}
