import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import type { AppProps } from 'next/app'
import merge from 'deepmerge'
import { useMemo } from 'react'
import isEqual from 'lodash/isEqual'
import { IncomingHttpHeaders } from 'http'
import { useAuthToken } from '../auth'

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  // credentials: 'same-origin',
})

const authMiddleware = (authToken: any) =>
  new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    if (authToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      })
    }

    return forward(operation)
  })

const cache = new InMemoryCache({
  possibleTypes: {
    authenticatedUser: ['User'],
  },
})

export const createApolloClient = () => {
  const [authToken] = useAuthToken()
  console.log('AuthToken : ', authToken)
  return new ApolloClient({
    link: authMiddleware(authToken).concat(httpLink),
    cache,
  })
}

type InitialState = NormalizedCacheObject | undefined

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null
  initialState?: InitialState | null
}

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  }
) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = initializeApollo({ initialState: state })
  return store
}
