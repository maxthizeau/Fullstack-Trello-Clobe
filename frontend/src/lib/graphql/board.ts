import gql from 'graphql-tag'

export const BOARD_QUERY = gql`
  query board($id: Int!) {
    board(where: { id: $id }) {
      id
      name
      description
      taskGroups(sortBy: [order_ASC]) {
        id
        name
        description
        order
        tasks {
          id
          name
          checked
          order
          description
        }
      }
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
