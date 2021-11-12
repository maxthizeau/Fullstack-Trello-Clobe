import gql from 'graphql-tag'

export const DELETE_BOARD_MUTATION = gql`
  mutation deleteBoardMutation($deleteBoardId: Int!) {
    deleteBoard(id: $deleteBoardId) {
      id
      name
      description
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
