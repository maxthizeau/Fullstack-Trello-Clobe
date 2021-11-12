import { ApolloServer } from "apollo-server-express"
import express from "express"
import { createServer } from "http"
import { schema } from "./graphql/schema"
import { context } from "src/graphql/prismaContext"
import { performAstCodegen } from "./codegen"
import { generateAllInputs } from "./graphql/generateInputs"
import cors from "cors"
import dotenv from "dotenv"

require("dotenv").config

export const server = new ApolloServer({
  schema,
  context,
})

export const PORT = 4500

var whitelist = ["http://localhost:3000", "http://localhost:4500", "https://studio.apollographql.com"]

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// }

async function startApolloServer() {
  // generateAllInputs()
  performAstCodegen()
  const app = express()
  // app.use(cors())
  const httpServer = createServer(app)

  // app.use(cors())
  await server.start()
  server.applyMiddleware({ app, cors: corsOptions })

  httpServer.listen(PORT, () => console.log(`🚀 Server is now running on http://localhost:${PORT}/graphql`))
}

startApolloServer()
