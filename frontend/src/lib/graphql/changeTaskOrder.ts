import gql from 'graphql-tag'

export const CHANGE_TASK_ORDER_MUTATION = gql`
  mutation changeTaskOrder(
    $boardId: Int!
    $fromTaskGroupId: Int!
    $toTaskGroupId: Int!
    $fromTasksArr: [Int]!
    $toTasksArr: [Int]!
    $movedTaskId: Int!
  ) {
    changeTaskOrder(
      boardId: $boardId
      fromTaskGroupId: $fromTaskGroupId
      toTaskGroupId: $toTaskGroupId
      fromTasksArr: $fromTasksArr
      toTasksArr: $toTasksArr
      movedTaskId: $movedTaskId
    ) {
      id
      name
      description
      taskGroups {
        id
        name
        description
        order
        tasks {
          id
          name
          checked
          order
          description
        }
      }
      team {
        id
        name
      }
      owner {
        id
        publicId
        name
        email
      }
    }
  }
`
