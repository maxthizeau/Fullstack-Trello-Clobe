import gql from 'graphql-tag'

export const USER_BY_PUBLICID_QUERY = gql`
  query userByPublicIdQuery($publicId: String!) {
    allUsers(where: { publicId_is: $publicId }) {
      id
      publicId
      name
      email
    }
  }
`
