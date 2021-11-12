import { gql } from '@apollo/client'

const GetAppConfig = gql`
  query GetAppConfig {
    appConfig @client {
      isPaused
      showModal
    }
  }
`

export default GetAppConfig
