import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getRandomIntString } from "@src/utils/numberFunctions"

const userOnTeamMutations: IResolvers = {
  Mutation: {
    createUserOnTeam: async (_root, args, context: Context) => {
      const { data } = args
      return await context.prisma.usersOnTeam.create({ data })
    },
    updateUserOnTeam: async (_root, args, context: Context) => {
      return await context.prisma.usersOnTeam.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteUserOnTeam: async (_root, args, context: Context) => {
      return await context.prisma.usersOnTeam.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default userOnTeamMutations
