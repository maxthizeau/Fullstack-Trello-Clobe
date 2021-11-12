import gql from 'graphql-tag'

// {
//     create: [
//       { user: { connect: { id: 211 } }, isAdmin: true }
//       { user: { connect: { id: 212 } }, isAdmin: false }
//       { user: { connect: { id: 213 } }, isAdmin: false }
//     ]
//   }

export const CREATE_TEAM_MUTATION = gql`
  mutation createTeamMutation(
    $name: String!
    $members: RelateToManyUserOnTeamInput
  ) {
    createTeam(data: { name: $name, members: $members }) {
      id
      name
    }
  }
`
