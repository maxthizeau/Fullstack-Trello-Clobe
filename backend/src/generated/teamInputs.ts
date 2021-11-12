// This file has been generated. DO NOT MODIFY

import { gql } from "apollo-server-express"

export const teamInputs = gql`
  input WhereTeamInput { 
    AND: [WhereTeamInput]
    OR: [WhereTeamInput]
    id_is: Int
    id_not: Int
    id_lt: Int
    id_lte: Int
    id_gt: Int
    id_gte: Int
    publicId_is: String
    publicId_not: String
    publicId_lt: String
    publicId_lte: String
    publicId_gt: String
    publicId_gte: String
    name_is: String
    name_not: String
    name_lt: String
    name_lte: String
    name_gt: String
    name_gte: String
    members: WhereUserOnTeamInput
    members_is_null: Boolean
    boards: WhereBoardInput
    boards_is_null: Boolean
  }

  input WhereUniqueTeamInput { 
    id: Int! 
  }

  enum SortTeamBy { 
    id_ASC
    id_DESC
    publicId_ASC
    publicId_DESC
    name_ASC
    name_DESC
    members_ASC
    members_DESC
    boards_ASC
    boards_DESC
  }

  input RelateToManyTeamInput { 
    create: [CreateTeamInput]
    connect: [WhereUniqueTeamInput]
    disconnect: [WhereUniqueTeamInput]
    disconnectAll: Boolean
}

  input RelateToOneTeamInput { 
    create: CreateTeamInput
    connect: WhereUniqueTeamInput
    disconnect: WhereUniqueTeamInput
    disconnectAll: Boolean
}

  extend type Query {
    team(where: WhereUniqueTeamInput!): Team
    allTeams(where: WhereTeamInput, sortBy: [SortTeamBy!], first: Int, skip: Int): [Team]
  }

`