import gql from 'graphql-tag'

export const CHANGE_TASK_ORDER_FROM_TASKGROUP_MUTATION = gql`
  mutation changeTaskOrderFromTaskGroupMutation(
    $taskGroupId: Int!
    $taskIds: [Int]!
  ) {
    changeTaskOrderFromTaskGroup(taskGroupId: $taskGroupId, taskIds: $taskIds) {
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
      board {
        id
        name
      }
    }
  }
`
