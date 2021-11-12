// This file has been generated. DO NOT MODIFY

import { gql } from "apollo-server-express"

export const taskInputs = gql`
  input WhereTaskInput {
    AND: [WhereTaskInput]
    OR: [WhereTaskInput]
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
    checked_is: Boolean
    description_is: String
    description_not: String
    description_lt: String
    description_lte: String
    description_gt: String
    description_gte: String
    taskGroup: WhereTaskGroupInput
    taskGroup_is_null: Boolean
  }

  input WhereUniqueTaskInput {
    id: Int!
  }

  enum SortTaskBy {
    id_ASC
    id_DESC
    name_ASC
    name_DESC
    order_ASC
    order_DESC
    description_ASC
    description_DESC
    taskGroup_ASC
    taskGroup_DESC
  }

  input RelateToManyTaskInput {
    create: [CreateTaskInput]
    connect: [WhereUniqueTaskInput]
    disconnect: [WhereUniqueTaskInput]
    disconnectAll: Boolean
  }

  input RelateToOneTaskInput {
    create: CreateTaskInput
    connect: WhereUniqueTaskInput
    disconnect: WhereUniqueTaskInput
    disconnectAll: Boolean
  }

  extend type Query {
    task(where: WhereUniqueTaskInput!): Task
    allTasks(where: WhereTaskInput, sortBy: [SortTaskBy!], first: Int, skip: Int): [Task]
  }
`
