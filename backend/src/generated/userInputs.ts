// This file has been generated. DO NOT MODIFY

import { gql } from "apollo-server-express"

export const userInputs = gql`
  input WhereUserInput { 
    AND: [WhereUserInput]
    OR: [WhereUserInput]
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
    email_is: String
    email_not: String
    email_lt: String
    email_lte: String
    email_gt: String
    email_gte: String
    password_is: String
    password_not: String
    password_lt: String
    password_lte: String
    password_gt: String
    password_gte: String
    registeredAt_is: DateTime
    registeredAt_not: DateTime
    registeredAt_lt: DateTime
    registeredAt_lte: DateTime
    registeredAt_gt: DateTime
    registeredAt_gte: DateTime
    updatedAt_is: DateTime
    updatedAt_not: DateTime
    updatedAt_lt: DateTime
    updatedAt_lte: DateTime
    updatedAt_gt: DateTime
    updatedAt_gte: DateTime
    teams: WhereUserOnTeamInput
    teams_is_null: Boolean
    boards: WhereBoardInput
    boards_is_null: Boolean
  }

  input WhereUniqueUserInput { 
    id: Int! 
  }

  enum SortUserBy { 
    id_ASC
    id_DESC
    publicId_ASC
    publicId_DESC
    name_ASC
    name_DESC
    email_ASC
    email_DESC
    password_ASC
    password_DESC
    registeredAt_ASC
    registeredAt_DESC
    updatedAt_ASC
    updatedAt_DESC
    teams_ASC
    teams_DESC
    boards_ASC
    boards_DESC
  }

  input RelateToManyUserInput { 
    create: [CreateUserInput]
    connect: [WhereUniqueUserInput]
    disconnect: [WhereUniqueUserInput]
    disconnectAll: Boolean
}

  input RelateToOneUserInput { 
    create: CreateUserInput
    connect: WhereUniqueUserInput
    disconnect: WhereUniqueUserInput
    disconnectAll: Boolean
}

  extend type Query {
    user(where: WhereUniqueUserInput!): User
    allUsers(where: WhereUserInput, sortBy: [SortUserBy!], first: Int, skip: Int): [User]
  }

`