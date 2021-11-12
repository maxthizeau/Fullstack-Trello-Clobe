import gql from 'graphql-tag'

export const DELETE_TEAM_MUTATION = gql`
  mutation deleteTeamMutation($id: Int!) {
    deleteTeam(id: $id) {
      id
      name
    }
  }
`
