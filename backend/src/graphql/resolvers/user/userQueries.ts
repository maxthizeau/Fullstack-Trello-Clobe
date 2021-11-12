// import { QueryAllBoardsArgs } from "@src/generated/graphql"
import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "../resolverFunctions"
import { Prisma } from ".prisma/client"
import { rules } from "../../accessRules"
import { ForbiddenError } from "apollo-server-errors"

const userQueries: IResolvers = {
  Query: {
    user: async (_parent, args, context: Context) => {
      let access: any = rules.isLoggedIn(context)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      return await context.prisma.user.findUnique({ where: { id: Number(args.where.id) } })
    },
    allUsers: async (_parent, args, context: Context) => {
      let access: any = rules.isLoggedIn(context)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      const queryArgs = getWhereSortByFirstSkipRequest(args)
      const result = await context.prisma.user.findMany(queryArgs)
      return result
    },
    authenticatedUser: async (_parent, args, context: Context) => {
      let access: any = rules.isLoggedIn(context)
      if (!access) {
        return null
      }
      return await context.prisma.user.findUnique({ where: { id: context.user.id } })
    },
  },
  User: {
    boards: async (parent, args, context: Context) => {
      // TODO : access restricted to boards that parent can see
      if (!parent.id) return []

      let access: any = rules.canSeeBoards(context)
      if (!access) {
        return []
      }
      const queryAccess = access !== true ? access : {}

      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, ...queryAccess, ownerId: parent.id }
      const result = await context.prisma.board.findMany(argsRequest)
      return result
    },
    // To do UserOnTeam
    teams: async (parent, args, context: Context) => {
      if (!parent.id) return []

      let access: any = rules.canSeeUserOnTeamRelations(context)
      if (!access) {
        return []
      }
      const queryAccess = access !== true ? access : {}

      const argsRequest: Prisma.UsersOnTeamFindManyArgs = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, ...queryAccess, userId: parent.id }

      const result = await context.prisma.usersOnTeam.findMany(argsRequest)

      return result
    },
  },
}
export default userQueries
