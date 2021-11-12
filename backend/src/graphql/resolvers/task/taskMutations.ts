import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getRandomIntString } from "@src/utils/numberFunctions"
import { rules } from "../../accessRules"
import { ForbiddenError } from "apollo-server-errors"

const taskMutations: IResolvers = {
  Mutation: {
    createTask: async (_root, args, context: Context) => {
      // Access : A user should be logged in to create task
      const access: any = rules.isLoggedIn(context)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      const { data } = args
      const id = args.data.taskGroup.create || args.data.taskGroup.connect

      const resultCount = await context.prisma.task.aggregate({
        _count: {
          taskGroupId: true,
        },
        where: {
          taskGroupId: id.id,
        },
      })
      const order = resultCount._count.taskGroupId ? resultCount._count.taskGroupId + 1 : 0
      const res = await context.prisma.task.create({ data: { ...data, order } })

      return res
    },
    updateTask: async (_root, args, context: Context) => {
      // Access : A user should be able to manage a Task when :
      // - He is member of the team > board > taskgroup > task
      // - He is owner of the board
      const access: any = await rules.canManageTasks(context, args.id)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      return await context.prisma.task.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteTask: async (_root, args, context: Context) => {
      // Access : A user should be able to manage a Task when :
      // - He is member of the team > board > taskgroup > task
      // - He is owner of the board
      const access: any = await rules.canManageTasks(context, args.id)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      return await context.prisma.task.delete({ where: { id: Number(args.id) } })
    },
    checkTask: async (_root, args, context: Context) => {
      const access: any = await rules.canManageTasks(context, args.id)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }
      const requestedTask = await context.prisma.task.findUnique({ where: { id: args.id } })
      if (!requestedTask) {
        throw new ForbiddenError("Requested task not found")
      }

      return await context.prisma.task.update({ where: { id: args.id }, data: { checked: !requestedTask.checked } })
    },
  },
}
export default taskMutations
