import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getRandomIntString } from "@src/utils/numberFunctions"
import { rules } from "../../accessRules"
import { ForbiddenError } from "apollo-server-errors"

const taskGroupMutations: IResolvers = {
  Mutation: {
    createTaskGroup: async (_root, args, context: Context) => {
      // Access : A user should be logged in to create group
      const access: any = rules.isLoggedIn(context)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      const id = args.data.board.create || args.data.board.connect

      const resultCount = await context.prisma.taskGroup.aggregate({
        _count: {
          boardId: true,
        },
        where: {
          boardId: id.id,
        },
      })
      const order = resultCount._count.boardId ? resultCount._count.boardId + 1 : 0

      const { data } = args
      return await context.prisma.taskGroup.create({ data: { ...data, order } })
    },
    updateTaskGroup: async (_root, args, context: Context) => {
      // Access : A user should be able to update a task group only :
      //   - when he is member of the team that own the board
      //   - when he owns the board
      const access: any = await rules.canManageTaskGroup(context, args.id)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      return await context.prisma.taskGroup.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteTaskGroup: async (_root, args, context: Context) => {
      // Access : A user should be able to delete a task group only :
      //   - when he is member of the team that own the board
      //   - when he owns the board
      const access: any = await rules.canManageTaskGroup(context, args.id)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      return await context.prisma.taskGroup.delete({ where: { id: Number(args.id) } })
    },

    changeTaskOrderFromTaskGroup: async (_root, args, context: Context) => {
      const access: any = await rules.canManageTaskGroup(context, args.taskGroupId)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      const { taskGroupId, taskIds } = args

      for (let i = 0; i < taskIds.length; i++) {
        const element = taskIds[i]
        await context.prisma.task.update({ data: { order: i }, where: { id: element } })
      }
      return await context.prisma.taskGroup.findUnique({ where: { id: taskGroupId } })
    },
  },
}
export default taskGroupMutations
