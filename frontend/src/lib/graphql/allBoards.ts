import gql from 'graphql-tag'

export const ALL_BOARDS_QUERY = gql`
  query allBoards {
    allBoards {
      id
      name
      description
      taskGroups(sortBy: [order_ASC]) {
        id
        name
        description
        order
        tasks(sortBy: [order_ASC]) {
          id
          name
          order
          checked
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
