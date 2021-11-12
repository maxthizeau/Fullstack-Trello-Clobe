import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { createUploadLink } from 'apollo-upload-client'
import merge from 'deepmerge'
import { IncomingHttpHeaders } from 'http'
import fetch from 'isomorphic-unfetch'
import isEqual from 'lodash/isEqual'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import cookie from 'cookie'
import type { IncomingMessage } from 'http'
import Cookies from 'universal-cookie'
// import { paginationField } from "./paginationField";
import { useAuthToken } from '../auth'
import { GetServerSidePropsContext } from 'next'
const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
export const COOKIES_TOKEN_NAME = 'authToken'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined
// const [authToken, _set, removeAuthToken] = useAuthToken()

const authMiddleware = new ApolloLink((operation, forward) => {
  // console.log(operation.getContext())
  console.log('start of middleware')
  // add the authorization to the headers
  let token = new Cookies().get(COOKIES_TOKEN_NAME)

  operation.setContext(({ headers = {} }) => {
    //  token = cookie.parse(headers.cookie as string)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })
  console.log('DONNNE : ', token)

  return forward(operation)
})

//After the backend responds, we take the refreshToken from headers if it exists, and save it in the cookie.
// const afterwareLink = new ApolloLink((operation, forward) => {
//   return forward(operation).map((response) => {
//     const context = operation.getContext()
//     const {
//       response: { headers },
//     } = context

//     if (headers) {
//       const refreshToken = headers.get('refreshToken')
//       if (refreshToken) {
//         localStorage.setItem(COOKIES_TOKEN_NAME, refreshToken)
//       }
//     }

//     return response
//   })
// })

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  console.log('Create Apollo Client')
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    // console.log('header : ', url, init.headers)
    // const cookies = new Cookies()
    // const token = cookies.get(COOKIES_TOKEN_NAME)
    const token = cookie.parse(headers?.cookie as string)
    console.log(token['authToken'])
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        cookie: headers?.cookie ?? '',
        // authorization: token['authToken'] ? `Bearer ${token['authToken']}` : '',
      },
    }).then((response) => response)
  }

  // console.log('EEF', enhancedFetch)
  const apolloC = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // ssrMode: true,
    link: ApolloLink.from([
      authMiddleware,
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          )
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
        fetchOptions: {
          mode: 'cors',
        },
        credentials: 'include',
        fetch: enhancedFetch,
      }) as any,
    ]),
    cache: new InMemoryCache({
      possibleTypes: {
        authenticatedItem: ['User'],
      },
      typePolicies: {
        Query: {
          fields: {
            // allProducts: paginationField(),
          },
        },
      },
    }),
  })
  // console.log('app : ', apolloC.)
  return apolloC
}

type InitialState = NormalizedCacheObject | undefined

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null
  initialState?: InitialState | null
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  },
  context: GetServerSidePropsContext | undefined = undefined
) => {
  if (apolloClient) {
    console.log('WE DONT CREATE')
  } else {
    console.log('WE CREATE')
  }
  // headers?.authorization
  //   ? (headers.authorization = cookie.parse(headers?.cookie as string)[
  //       'authToken'
  //     ])
  //   : null

  // console.log(headers)
  const _apolloClient = apolloClient ?? createApolloClient(headers)
  // console.log('Apollo client : ', _apolloClient)
  console.log('Apollo client header : ', headers)
  // console.log('Apollo client context : ', context)
  // console.log('Apollo client initial state : ', initialState)
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
  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state]
  )
  return store
}
