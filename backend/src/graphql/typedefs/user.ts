import { gql } from "apollo-server-express"

const user = gql`
  type User {
    id: Int!
    publicId: String
    name: String
    email: String
    password: String
    registeredAt: DateTime
    updatedAt: DateTime
    teams(where: WhereUserOnTeamInput, sortBy: [SortUserOnTeamBy], first: Int, skip: Int): [UserOnTeam]
    boards(where: WhereBoardInput, sortBy: [SortBoardBy], first: Int, skip: Int): [Board]
  }
`

const userTypesDefs = gql`
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    teams: RelateToManyUserOnTeamInput
    boards: RelateToManyBoardInput
  }
  input UpdateUserInput {
    name: String
    password: String
    teams: RelateToManyUserOnTeamInput
    boards: RelateToManyBoardInput
  }

  # extend type Query {
  #   user(where: WhereUniqueUserInput!): User
  #   allUsers(where: WhereUserInput, sortBy: [SortUserBy!], first: Int, skip: Int): [User]
  # }

  extend type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: Int!, data: UpdateUserInput!): User!
    deleteUser(id: Int!): User
  }
`

export { user, userTypesDefs }
