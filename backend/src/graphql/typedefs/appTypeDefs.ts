import { gql } from "apollo-server-express"

const appTypeDefs = gql`
  extend type Mutation {
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    user: User
  }
`

export default appTypeDefs
