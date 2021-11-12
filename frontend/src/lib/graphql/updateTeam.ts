import gql from 'graphql-tag'

export const UPDATE_TEAM_MUTATION = gql`
  mutation updateTeamMutation(
    $id: Int!
    $name: String
    $members: RelateToManyUserOnTeamInput
  ) {
    updateTeam(id: $id, data: { name: $name, members: $members }) {
      id
      name
    }
  }
`
