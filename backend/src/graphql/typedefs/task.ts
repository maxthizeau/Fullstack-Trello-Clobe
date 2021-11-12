import { gql } from "apollo-server-express"

const task = gql`
  type Task {
    id: Int!
    name: String
    checked: Boolean
    order: Int
    description: String
    taskGroup: TaskGroup
  }
`

const taskTypesDefs = gql`
  input CreateTaskInput {
    name: String!
    description: String
    taskGroup: RelateToOneTaskGroupInput
  }
  input UpdateTaskInput {
    name: String
    description: String
    checked: Boolean
    taskGroup: RelateToOneTaskGroupInput
  }

  extend type Query {
    authenticatedUser: User
  }

  extend type Mutation {
    createTask(data: CreateTaskInput!): Task!
    checkTask(id: Int!): Task!
    updateTask(id: Int!, data: UpdateTaskInput!): Task!
    deleteTask(id: Int!): Task
  }
`

export { task, taskTypesDefs }
