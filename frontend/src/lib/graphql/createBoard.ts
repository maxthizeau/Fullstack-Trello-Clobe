import gql from 'graphql-tag'

export const CREATE_BOARD_MUTATION = gql`
  mutation createBoardMutation($data: CreateBoardInput!) {
    createBoard(data: $data) {
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
