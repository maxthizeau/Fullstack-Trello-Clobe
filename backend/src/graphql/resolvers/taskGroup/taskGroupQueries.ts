import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getWhereSortByFirstSkipRequest } from "../resolverFunctions"
import { rules } from "../../accessRules"
import { ForbiddenError } from "apollo-server-errors"

const taskGroupQueries: IResolvers = {
  Query: {
    taskGroup: async (_parent, args, context: Context) => {
      // Access : A user should be able to see a Task Group when :
      // - He is member of the team that has the board atatched to the task group
      // - He is owner of the team that has the board attached to the task group
      const access: any = await rules.canSeeThisTaskGroup(context, args.id)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      return await context.prisma.taskGroup.findUnique({ where: { id: Number(args.where.id) } })
    },
    allTaskGroups: async (_parent, args, context: Context) => {
      // Access : A user should be able to see a Task Group when :
      // - He is member of the team that has the board atatched to the task group
      // - He is owner of the team that has the board attached to the task group
      const access: any = await rules.canSeeTaskGroups(context)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      const queryAccess = access !== true ? access : {}

      const queryArgs = getWhereSortByFirstSkipRequest(args)

      queryArgs.where = { AND: [queryArgs.where, queryAccess] }

      const result = await context.prisma.taskGroup.findMany(queryArgs)
      return result
    },
  },
  TaskGroup: {
    board: async (_parent, args, context: Context) => {
      // Find board where taskGroupId
      const result = await context.prisma.board.findUnique({ where: { id: _parent.boardId } })
      return result
    },
    tasks: async (_parent, args, context: Context) => {
      const argsRequest = getWhereSortByFirstSkipRequest(args)
      argsRequest.orderBy = { order: "asc" }
      argsRequest.where = { ...argsRequest.where, taskGroupId: _parent.id }
      const result = await context.prisma.task.findMany(argsRequest)
      return result
    },
  },
}
export default taskGroupQueries
