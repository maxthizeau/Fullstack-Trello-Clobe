// This file has been generated. DO NOT MODIFY

import { gql } from "apollo-server-express"

export const boardInputs = gql`
  input WhereBoardInput { 
    AND: [WhereBoardInput]
    OR: [WhereBoardInput]
    id_is: Int
    id_not: Int
    id_lt: Int
    id_lte: Int
    id_gt: Int
    id_gte: Int
    name_is: String
    name_not: String
    name_lt: String
    name_lte: String
    name_gt: String
    name_gte: String
    description_is: String
    description_not: String
    description_lt: String
    description_lte: String
    description_gt: String
    description_gte: String
    taskGroups: WhereTaskGroupInput
    taskGroups_is_null: Boolean
    team: WhereTeamInput
    team_is_null: Boolean
    owner: WhereUserInput
    owner_is_null: Boolean
  }

  input WhereUniqueBoardInput { 
    id: Int! 
  }

  enum SortBoardBy { 
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    description_ASC
    description_DESC
    taskGroups_ASC
    taskGroups_DESC
    team_ASC
    team_DESC
    owner_ASC
    owner_DESC
  }

  input RelateToManyBoardInput { 
    create: [CreateBoardInput]
    connect: [WhereUniqueBoardInput]
    disconnect: [WhereUniqueBoardInput]
    disconnectAll: Boolean
}

  input RelateToOneBoardInput { 
    create: CreateBoardInput
    connect: WhereUniqueBoardInput
    disconnect: WhereUniqueBoardInput
    disconnectAll: Boolean
}

  extend type Query {
    board(where: WhereUniqueBoardInput!): Board
    allBoards(where: WhereBoardInput, sortBy: [SortBoardBy!], first: Int, skip: Int): [Board]
  }

`