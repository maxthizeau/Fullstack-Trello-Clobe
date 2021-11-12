import gql from 'graphql-tag'

export const ALL_TEAMS_QUERY = gql`
  query allTeamsQuery(
    $where: WhereTeamInput
    $sortBy: [SortTeamBy!]
    $first: Int
    $skip: Int
  ) {
    allTeams(where: $where, sortBy: $sortBy, first: $first, skip: $skip) {
      id
      name
      members {
        id
        user {
          id
          publicId
          name
          email
        }
        isAdmin
      }
      boards {
        id
        name
        description
      }
    }
  }
`
