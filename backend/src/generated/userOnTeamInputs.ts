// This file has been generated. DO NOT MODIFY

import { gql } from "apollo-server-express"

export const userOnTeamInputs = gql`
  input WhereUserOnTeamInput {
    AND: [WhereUserOnTeamInput]
    OR: [WhereUserOnTeamInput]
    id_is: Int
    id_not: Int
    id_lt: Int
    id_lte: Int
    id_gt: Int
    id_gte: Int
    user: WhereUserInput
    user_is_null: Boolean
    team: WhereTeamInput
    team_is_null: Boolean
    isAdmin_is: Boolean
    isAdmin_not: Boolean
    isAdmin_lt: Boolean
    isAdmin_lte: Boolean
    isAdmin_gt: Boolean
    isAdmin_gte: Boolean
  }

  input WhereUniqueUserOnTeamInput {
    id: Int!
  }

  enum SortUserOnTeamBy {
    id_ASC
    id_DESC
    user_ASC
    user_DESC
    team_ASC
    team_DESC
    isAdmin_ASC
    isAdmin_DESC
  }

  input RelateToManyUserOnTeamInput {
    create: [CreateUserOnTeamInput]
    connect: [WhereUniqueUserOnTeamInput]
    disconnect: [WhereUniqueUserOnTeamInput]
    disconnectAll: Boolean
  }

  input RelateToOneUserOnTeamInput {
    create: CreateUserOnTeamInput
    connect: WhereUniqueUserOnTeamInput
    disconnect: WhereUniqueUserOnTeamInput
    disconnectAll: Boolean
  }

  extend type Query {
    userOnTeam(where: WhereUniqueUserOnTeamInput!): UserOnTeam
    allUserOnTeams(where: WhereUserOnTeamInput, sortBy: [SortUserOnTeamBy!], first: Int, skip: Int): [UserOnTeam]
  }
`
