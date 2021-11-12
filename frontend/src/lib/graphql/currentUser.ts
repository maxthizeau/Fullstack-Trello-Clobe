import gql from 'graphql-tag'

export const CURRENT_USER_QUERY = gql`
  query currentUserQuery {
    authenticatedUser {
      id
      name
      email
      publicId
    }
  }
`
