import gql from 'graphql-tag'

export const CREATE_USERONTEAM_MUTATION = gql`
  mutation createUserOnTeam($data: CreateUserOnTeamInput!) {
    createUserOnTeam(data: $data) {
      id
      user {
        id
        publicId
        email
        name
      }
      team {
        id
        name
      }
      isAdmin
    }
  }
`
