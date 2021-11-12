import gql from 'graphql-tag'

export const DELETE_USERONTEAM_MUTATION = gql`
  mutation deleteUserOnTeamMutation($id: Int!) {
    deleteUserOnTeam(id: $id) {
      id
    }
  }
`
