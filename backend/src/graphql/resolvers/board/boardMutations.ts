import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getRandomIntString } from "src/utils/numberFunctions"
import { removeSpecialChar } from "../../../utils/stringFunctions"
import { Prisma } from ".prisma/client"
import { rules } from "../../accessRules"
import { ForbiddenError } from "apollo-server-errors"

function generatePublicId(name: string): string {
  return `${name}#${getRandomIntString(5)}`
}

const boardMutations: IResolvers = {
  // Access : Only connected
  Mutation: {
    createBoard: async (_root, args, context: Context) => {
      // Only allow to LoggedIn Users
      const access: any = rules.isLoggedIn(context)
      if (access === false) throw new ForbiddenError("You don't have permission to access this resource")

      const { data } = args

      return await context.prisma.board.create({ data: { ...data, owner: { connect: { id: context.user.id } } } })
    },
    updateBoard: async (_root, args, context: Context) => {
      // Only allow to LoggedIn Users. Users can only update their own boards (where they are owner or admin)
      const access: any = await rules.canManageBoard(context, args.id)
      if (!access) throw new ForbiddenError("You don't have permission to access this resource")

      return await context.prisma.board.update({
        where: { id: Number(args.id) },
        data: { ...args.data },
      })
    },
    deleteBoard: async (_root, args, context: Context) => {
      // Only allow to LoggedIn Users. Users can only update their own boards (where they are owner or admin)
      const access: any = await rules.canManageBoard(context, args.id)
      if (!access) throw new ForbiddenError("You don't have permission to access this resource")

      return await context.prisma.board.delete({ where: { id: Number(args.id) } })
    },
    changeTaskGroupsOrder: async (_root, args, context: Context) => {
      let access: any = await rules.canSeeThisBoard(context, args.boardId)
      if (!access) throw new ForbiddenError("You don't have permission to access this resource")

      const { boardId, taskGroupIds } = args

      for (let i = 0; i < taskGroupIds.length; i++) {
        const element = taskGroupIds[i]
        await context.prisma.taskGroup.update({ data: { order: i }, where: { id: element } })
      }

      return await context.prisma.board.findUnique({ where: { id: boardId } })
    },
    changeTaskOrder: async (_root, args, context: Context) => {
      let access: any = await rules.canSeeThisBoard(context, args.boardId)
      if (!access) throw new ForbiddenError("You don't have permission to access this resource")

      const { boardId, fromTaskGroupId, toTaskGroupId, fromTasksArr, toTasksArr, movedTaskId } = args

      // #1 . Change connect task group of moveTaskId
      const resUpdate = await context.prisma.task.update({
        where: { id: movedTaskId },
        data: { taskGroupId: toTaskGroupId },
      })

      // #2 . Set orders of "from"
      for (let i = 0; i < fromTasksArr.length; i++) {
        const element = fromTasksArr[i]
        await context.prisma.task.update({ data: { order: i }, where: { id: element } })
      }
      // #3 . Set orders of "to"
      for (let j = 0; j < toTasksArr.length; j++) {
        const element = toTasksArr[j]
        await context.prisma.task.update({ data: { order: j }, where: { id: element } })
      }

      const res = await context.prisma.board.findUnique({ where: { id: boardId } })

      return res
    },
  },
}
export default boardMutations
