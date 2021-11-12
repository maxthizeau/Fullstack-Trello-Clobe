import gql from 'graphql-tag'

export const UPDATE_TASK_MUTATION = gql`
  mutation updateTaskMutation(
    $id: Int!
    $name: String
    $description: String
    $checked: Boolean
  ) {
    updateTask(
      id: $id
      data: { name: $name, description: $description, checked: $checked }
    ) {
      id
      name
      checked
      description
      taskGroup {
        id
        name
      }
    }
  }
`
