import gql from 'graphql-tag'

export const CREATE_TASK_MUTATION = gql`
  mutation createTaskMutation($name: String!, $taskGroupId: Int!) {
    createTask(
      data: { name: $name, taskGroup: { connect: { id: $taskGroupId } } }
    ) {
      id
      name
      checked
      description
      taskGroup {
        id
        name
        description
        board {
          id
          name
          description
        }
      }
    }
  }
`
