import gql from 'graphql-tag'

export const DELETE_TASKGROUP_MUTATION = gql`
  mutation deleteTaskGroupMutation($id: Int!) {
    deleteTaskGroup(id: $id) {
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
