import { PrismaClient } from "@prisma/client"
import { gql } from "apollo-server-express"
import { toPromise } from "apollo-link"
import { constructTestServer, startTestServer } from "./__utils"
import { deleteAll, seedData, usersCredentials } from "../prisma/seedDataFunction"

const prisma = new PrismaClient()

const ALL_USER_QUERY = gql`
  query all {
    allUsers {
      id
      name
      email
    }
  }
`

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

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      user {
        id
        email
        name
        publicId
      }
      token
    }
  }
`

describe("Auth", () => {
  let stop, graphql
  beforeAll(async () => {
    const resultSeedData = await seedData(prisma).catch((e) => {
      console.error(e)
    })

    console.log("✨ Seed data successfully created")
  })

  afterAll(async () => {
    const resultDeleteAll = await deleteAll(prisma)
    await prisma.$disconnect()
  })
  beforeEach(async () => {
    const server = constructTestServer(prisma)
    const testServer = await startTestServer(server)
    stop = testServer.stop
    graphql = testServer.graphql
  })
  afterEach(async () => {
    stop()
  })
  it("should thrown an error when accessing list of users without being logged in", async () => {
    const res: any = await toPromise(
      graphql({
        query: ALL_USER_QUERY,
      })
    )

    expect(res.errors[0].message).toBe("You don't have permission to access this resource")
    // expect(res.errors[0]).toEqual(new Error("You don't have permission to access this resource"))
  })
  it("should return token Auth and user data when logged with correct credentials", async () => {
    const res: any = await toPromise(
      graphql({
        query: LOGIN_MUTATION,
        variables: { email: usersCredentials.admin.email, password: usersCredentials.admin.password },
      })
    )

    expect(res.data.login.token).not.toBeNull()
    expect(res.data.login.user).not.toBeNull()
  })
  it("should return an error when logged with incorrect password", async () => {
    const res: any = await toPromise(
      graphql({
        query: LOGIN_MUTATION,
        variables: { email: usersCredentials.admin.email, password: "ThisIsNotThePassword" },
      })
    )

    expect(res.data.login).toBeNull()
    expect(res.errors).not.toBeNull()
  })
  it("should create a new user and return the token when signing up", async () => {
    const newUser = {
      name: "NewUser",
      email: "this.is@my.email",
      password: "myPasswd",
    }

    const res: any = await toPromise(
      graphql({
        query: SIGNUP_MUTATION,
        variables: newUser,
      })
    )

    expect(res.data.signup.user).toHaveProperty("name", newUser.name)
    expect(res.data.signup.user).toHaveProperty("email", newUser.email)
    expect(res.data.signup.token).not.toBeNull()
  })
  it("should not create a new user when signing up with password < 8 chars", async () => {
    const newUser = {
      name: "NewUser",
      email: "this@gmail.com",
      password: "my",
    }

    const res: any = await toPromise(
      graphql({
        query: SIGNUP_MUTATION,
        variables: newUser,
      })
    )

    expect(res.data.signup).toBeNull()
    expect(res.error).not.toBeNull()
  })
  it("should not create a new user when signing up with not valid email", async () => {
    const newUser = {
      name: "NewUser",
      email: "thisisnotavalidemail",
      password: "mypass09Q",
    }

    const res: any = await toPromise(
      graphql({
        query: SIGNUP_MUTATION,
        variables: newUser,
      })
    )

    expect(res.data.signup).toBeNull()
    expect(res.error).not.toBeNull()
  })
})
