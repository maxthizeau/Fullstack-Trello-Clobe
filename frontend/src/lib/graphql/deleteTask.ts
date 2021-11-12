import gql from 'graphql-tag'

export const DELETE_TASK_MUTATION = gql`
  mutation deleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
      name
      description
    }
  }
`
