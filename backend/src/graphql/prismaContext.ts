import { PrismaClient } from "@prisma/client"
import { getUserId } from "src/utils/utils"
import cookie from "cookie"

export interface Context {
  req: any
  prisma: PrismaClient
  user: any
}

const prisma = new PrismaClient()

export const context = ({ req }: any): Context => {
  // First, we check the authorization header (prioritize auth header, then cookie)
  const tokenAuth = req?.headers?.authorization ?? null
  // We look for cookies
  let tokenCook = req?.headers?.cookie ? cookie.parse(req.headers.cookie) : null
  // We look for authToken cookie

  if (tokenCook) {
    tokenCook = typeof tokenCook["authToken"] !== "undefined" ? `Bearer ${tokenCook["authToken"]}` : null
  }

  // Token = TokenAuth if exist, or tokenCook (null anyway if doesnt have cookie)
  const token = tokenAuth && tokenAuth != "" ? tokenAuth : tokenCook

  // console.log("token = ", token)
  // console.log("Token Auth : ", tokenCook)

  return { ...req, prisma, user: req && token ? getUserId(req, token) : null }
}

// const newContext
