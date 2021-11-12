import gql from 'graphql-tag'

export const UPDATE_BOARD_MUTATION = gql`
  mutation updateBoardMutation($updateBoardId: Int!, $data: UpdateBoardInput!) {
    updateBoard(id: $updateBoardId, data: $data) {
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
