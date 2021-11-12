import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import cookie from "cookie"

const APP_SECRET = "THISISTOKEN"

function getTokenPayload(token) {
  const test = jwt.verify(token, APP_SECRET)
  // console.log("test: ", test)

  return jwt.verify(token, APP_SECRET)
}

function getUserId(req, authToken) {
  if (req) {
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

    if (token) {
      const tokenFinal = token.replace("Bearer ", "")
      if (!tokenFinal) {
        throw new Error("No token found")
      }
      // console.log("tokenpayload : ", getTokenPayload(token))
      const { user }: any = getTokenPayload(tokenFinal)
      return user
    }
  } else if (authToken) {
    // Else if no req but we passed authToken
    const { user }: any = getTokenPayload(authToken.replace("Bearer ", ""))
    return user
  }

  throw new Error("Not authenticated")
}

export { getUserId, APP_SECRET }
