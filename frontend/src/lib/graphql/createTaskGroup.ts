import gql from 'graphql-tag'

export const CREATE_TASKGROUP_MUTATION = gql`
  mutation createTaskGroupMutation($name: String!, $boardId: Int!) {
    createTaskGroup(
      data: { name: $name, board: { connect: { id: $boardId } } }
    ) {
      id
      name
      description
      board {
        id
        name
      }
    }
  }
`
