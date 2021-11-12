import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "../prismaContext"
import { generatePublicId } from "./user/userMutations"
import { removeSpecialChar } from "../../utils/stringFunctions"
import { AuthenticationError } from "apollo-server-errors"
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { APP_SECRET, getUserId } = require("src/utils/utils")

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

async function signup(parent, args, context, info) {
  const publicId = removeSpecialChar(generatePublicId(args.name))

  if (args.password.length < 8) {
    throw new Error("Your password should be at least 8 characters")
  }
  if (!validateEmail(args.email)) {
    throw new Error("Please enter a valid email address")
  }

  // 1
  const password = await bcrypt.hash(args.password, 10)
  const data = { ...args, name: removeSpecialChar(args.name), publicId: publicId, password }

  // 2
  const user = await context.prisma.user.create({ data })

  // 3
  const token = jwt.sign({ user: user }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })
  if (!user) {
    throw new AuthenticationError("No such user found")
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new AuthenticationError("Invalid password")
  }

  const token = jwt.sign({ user: user }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

const appMutations: IResolvers = {
  Mutation: {
    login: async (_root, args, context: Context, info) => {
      return login(_root, args, context, info)
    },
    signup: async (_root, args, context: Context, info) => {
      return signup(_root, args, context, info)
    },
  },
}

export { appMutations, login }
