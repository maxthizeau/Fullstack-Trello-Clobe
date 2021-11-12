import gql from 'graphql-tag'

export const UPDATE_TASKGROUP_MUTATION = gql`
  mutation updateTaskGroupMutation(
    $id: Int!
    $name: String
    $description: String
  ) {
    updateTaskGroup(id: $id, data: { name: $name, description: $description }) {
      id
      name
      description
    }
  }
`
