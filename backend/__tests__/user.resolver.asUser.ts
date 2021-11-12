import { PrismaClient } from "@prisma/client"
import { gql } from "apollo-server-express"
import { toPromise } from "apollo-link"
import { constructTestServer, startTestServer } from "./__utils"
import { deleteAll, seedData, usersCredentials } from "../prisma/seedDataFunction"
const TEST_PORT = 6601
const prisma = new PrismaClient()

// Mutation used in BeforeAll to get token auth
const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

describe("User queries as logged in user", () => {
  let stop, graphql
  let token = ""

  // Before all test, insert seed data, create a temporary server used to log in and get Auth token.
  beforeAll(async () => {
    // Seed Data :
    const resultSeedData = await seedData(prisma).catch((e) => {
      console.error(e)
    })

    console.log("✨ Seed data successfully created")

    // Create the temporary server and request login mutation
    const serverForLogin = constructTestServer(prisma)
    let testServer = await startTestServer(serverForLogin, TEST_PORT)
    const resultTest = await toPromise(
      testServer.graphql({
        query: LOGIN_MUTATION,
        variables: { email: usersCredentials.bob.email, password: usersCredentials.bob.password },
      })
    )
    token = resultTest.data?.login?.token
    // Stop the tmp server
    testServer.stop()
  })

  afterAll(async () => {
    // Delete all data after tests
    const resultDeleteAll = await deleteAll(prisma)
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    // Create a server and pass the auth token
    const server = constructTestServer(prisma)
    const testServer = await startTestServer(server, TEST_PORT, token)
    stop = testServer.stop
    graphql = testServer.graphql
  })
  afterEach(async () => {
    // Stop the server after a test
    stop()
  })

  it("Query allUsers should return the list of users when logged in as basic user", async () => {
    const res: any = await toPromise(
      graphql({
        query: gql`
          query allUsers {
            allUsers {
              id
              email
              name
            }
          }
        `,
      })
    )
    expect(res).toMatchSnapshot()
  })
})
