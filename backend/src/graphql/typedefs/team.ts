import { gql } from "apollo-server-express"

const team = gql`
  type Team {
    id: Int!
    name: String
    members(where: WhereUserOnTeamInput, sortBy: [SortUserOnTeamBy], first: Int, skip: Int): [UserOnTeam]
    boards(where: WhereBoardInput, sortBy: [SortBoardBy], first: Int, skip: Int): [Board]
  }
`

const teamTypesDefs = gql`
  input CreateTeamInput {
    name: String!
    members: RelateToManyUserOnTeamInput
    boards: RelateToManyBoardInput
  }
  input UpdateTeamInput {
    name: String
    members: RelateToManyUserOnTeamInput
    boards: RelateToManyBoardInput
  }

  extend type Mutation {
    createTeam(data: CreateTeamInput!): Team!
    updateTeam(id: Int!, data: UpdateTeamInput!): Team!
    deleteTeam(id: Int!): Team
  }
`

export { team, teamTypesDefs }
