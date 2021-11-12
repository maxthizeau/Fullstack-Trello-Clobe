// This file has been generated. DO NOT MODIFY

import { gql } from "apollo-server-express"

export const taskGroupInputs = gql`
  input WhereTaskGroupInput {
    AND: [WhereTaskGroupInput]
    OR: [WhereTaskGroupInput]
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
    order_is: String
    order_not: String
    order_lt: String
    order_lte: String
    order_gt: String
    order_gte: String
    description_is: String
    description_not: String
    description_lt: String
    description_lte: String
    description_gt: String
    description_gte: String
    tasks: WhereTaskInput
    tasks_is_null: Boolean
    board: WhereBoardInput
    board_is_null: Boolean
  }

  input WhereUniqueTaskGroupInput {
    id: Int!
  }

  enum SortTaskGroupBy {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    description_ASC
    description_DESC
    order_ASC
    order_DESC
    tasks_ASC
    tasks_DESC
    board_ASC
    board_DESC
  }

  input RelateToManyTaskGroupInput {
    create: [CreateTaskGroupInput]
    connect: [WhereUniqueTaskGroupInput]
    disconnect: [WhereUniqueTaskGroupInput]
    disconnectAll: Boolean
  }

  input RelateToOneTaskGroupInput {
    create: CreateTaskGroupInput
    connect: WhereUniqueTaskGroupInput
    disconnect: WhereUniqueTaskGroupInput
    disconnectAll: Boolean
  }

  extend type Query {
    taskGroup(where: WhereUniqueTaskGroupInput!): TaskGroup
    allTaskGroups(where: WhereTaskGroupInput, sortBy: [SortTaskGroupBy!], first: Int, skip: Int): [TaskGroup]
  }
`
