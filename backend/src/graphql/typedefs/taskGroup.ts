import { gql } from "apollo-server-express"

const taskGroup = gql`
  type TaskGroup {
    id: Int!
    name: String
    description: String
    order: Int
    tasks(where: WhereTaskInput, sortBy: [SortTaskBy], first: Int, skip: Int): [Task]
    board: Board
  }
`

const taskGroupTypesDefs = gql`
  input CreateTaskGroupInput {
    name: String!
    description: String
    tasks: RelateToManyTaskInput
    board: RelateToOneBoardInput
  }
  input UpdateTaskGroupInput {
    name: String
    description: String
    tasks: RelateToManyTaskInput
    board: RelateToOneBoardInput
  }

  extend type Mutation {
    createTaskGroup(data: CreateTaskGroupInput!): TaskGroup!
    updateTaskGroup(id: Int!, data: UpdateTaskGroupInput!): TaskGroup!
    deleteTaskGroup(id: Int!): TaskGroup
    changeTaskOrderFromTaskGroup(taskGroupId: Int!, taskIds: [Int]!): TaskGroup
  }
`

export { taskGroup, taskGroupTypesDefs }
