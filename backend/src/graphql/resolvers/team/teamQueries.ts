import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "../resolverFunctions"
import { rules } from "../../accessRules"
import { prisma, Prisma } from ".prisma/client"
import { ApolloError, ForbiddenError, UserInputError } from "apollo-server-errors"

const teamQueries: IResolvers = {
  Query: {
    team: async (_parent, args, context: Context) => {
      // Access : A user should only access a team when he is member of
      const access: any = await rules.canSeeThisTeam(context, args.id)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      return await context.prisma.team.findUnique({ where: { id: Number(args.where.id) } })
    },
    allTeams: async (_parent, args, context: Context) => {
      // Access : A user should only acces teams he's member of
      const access: any = rules.canSeeTeams(context)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      const queryAccess = access !== true ? access : {}

      const queryArgs = getWhereSortByFirstSkipRequest(args)

      queryArgs.where = { AND: [queryArgs.where, queryAccess] }

      const result = await context.prisma.team.findMany(queryArgs)
      return result
    },
  },
  Team: {
    members: async (_parent, args, context: Context) => {
      // No need to add access since users are restricted to connected users and team queries already need to be connected
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, teamId: _parent.id }
      const result = await context.prisma.usersOnTeam.findMany(argsRequest)

      return result
    },
    boards: async (_parent, args, context: Context) => {
      // No need to add access because only boards of the team that can access current user are returned in parent
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.where = { ...argsRequest.where, team: { id: _parent.id } }
      const result = await context.prisma.board.findMany(argsRequest)
      return result
    },
  },
}
export default teamQueries
