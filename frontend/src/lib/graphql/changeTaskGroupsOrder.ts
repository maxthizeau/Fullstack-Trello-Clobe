import gql from 'graphql-tag'

export const CHANGE_TASKGROUP_ORDER_MUTATION = gql`
  mutation changeTaskGroupsOrderMutation(
    $boardId: Int!
    $taskGroupIds: [Int]!
  ) {
    changeTaskGroupsOrder(boardId: $boardId, taskGroupIds: $taskGroupIds) {
      id
      name
      description
      taskGroups {
        id
        order
      }
    }
  }
`
