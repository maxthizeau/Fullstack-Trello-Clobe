import gql from 'graphql-tag'

export const UPDATE_USERONTEAM_MUTATION = gql`
  mutation updateUserOnTeamMutation($id: Int!, $data: UpdateUserOnTeamInput!) {
    updateUserOnTeam(id: $id, data: $data) {
      id
    }
  }
`
