import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "../resolverFunctions"
import { query } from "express"
import { Prisma } from ".prisma/client"
import { rules } from "../../accessRules"
import { ForbiddenError } from "apollo-server-errors"
import { SortBoardBy } from "@src/generated/graphql"

const boardQueries: IResolvers = {
  Query: {
    board: async (_parent, args, context: Context) => {
      let access: any = await rules.canSeeThisBoard(context, args.where.id)

      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      return await context.prisma.board.findUnique({ where: { id: Number(args.where.id) } })
    },
    allBoards: async (_parent, args, context: Context) => {
      let access: any = rules.canSeeBoards(context)
      if (access === false) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      const queryAccess = access !== true ? access : {}

      // Generate all the args (where, first, skip, sortBy)
      const queryArgs = getWhereSortByFirstSkipRequest(args)

      queryArgs.where = { AND: [queryArgs.where, queryAccess] }

      const result = await context.prisma.board.findMany(queryArgs)
      return result
    },
  },
  Board: {
    team: async (parent, args, context: Context) => {
      if (!parent.teamId) return null
      const result = await context.prisma.team.findFirst({ where: { id: parent.teamId } })
      return result
    },
    owner: async (parent, args, context: Context) => {
      const result = await context.prisma.user.findUnique({ where: { id: parent.ownerId } })
      return result
    },
    taskGroups: async (parent, args, context: Context) => {
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, boardId: parent.id }
      const result = await context.prisma.taskGroup.findMany(argsRequest)
      return result
    },
  },
}

export default boardQueries
