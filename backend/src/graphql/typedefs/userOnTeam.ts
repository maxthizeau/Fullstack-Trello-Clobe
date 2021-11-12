import { gql } from "apollo-server-express"

const userOnTeam = gql`
  type UserOnTeam {
    id: Int!
    user: User
    team: Team
    isAdmin: Boolean
  }
`

const userOnTeamTypesDefs = gql`
  input CreateUserOnTeamInput {
    user: RelateToOneUserInput
    team: RelateToOneTeamInput
    isAdmin: Boolean
  }
  input UpdateUserOnTeamInput {
    user: RelateToOneUserInput
    team: RelateToOneTeamInput
    isAdmin: Boolean
  }

  extend type Mutation {
    createUserOnTeam(data: CreateUserOnTeamInput!): UserOnTeam!
    updateUserOnTeam(id: Int!, data: UpdateUserOnTeamInput!): UserOnTeam!
    deleteUserOnTeam(id: Int!): UserOnTeam
  }
`

export { userOnTeam, userOnTeamTypesDefs }
