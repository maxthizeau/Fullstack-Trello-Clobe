import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { Context } from "src/graphql/prismaContext"
import { getRandomIntString } from "src/utils/numberFunctions"
import { removeSpecialChar } from "../../../utils/stringFunctions"
import { Prisma } from ".prisma/client"
import { rules } from "../../accessRules"
import { ForbiddenError } from "apollo-server-errors"

export function generatePublicId(name: string): string {
  return `${name}#${getRandomIntString(5)}`
}

const userMutations: IResolvers = {
  Mutation: {
    createUser: async (_root, args, context: Context) => {
      // Access : only admin should access this mutation. Users should use signup mutation
      const access: any = rules.isAdmin(context)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      const { data } = args
      const emailAlreadyExists = await context.prisma.user.findFirst({ where: { email: data.email } })

      if (emailAlreadyExists) throw new Error("Email is already in use")

      const user = { ...data, name: removeSpecialChar(data.name) }
      let publicId = generatePublicId(user.name)
      user.publicId = publicId

      // TO DO : Verify unique publicId

      return await context.prisma.user.create({ data: user })
    },
    updateUser: async (_root, args, context: Context) => {
      // Access : a user should only update himself
      const access: any = rules.canUpdateUser(context, args.id)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      return await context.prisma.user.update({ where: { id: Number(args.id) }, data: { ...args.data } })
    },
    deleteUser: async (_root, args, context: Context) => {
      // Access : only admin can delete users, user cannot delete his account himself
      const access: any = rules.isAdmin(context)
      if (!access) {
        throw new ForbiddenError("You don't have permission to access this resource")
      }

      return await context.prisma.user.delete({ where: { id: Number(args.id) } })
    },
  },
}
export default userMutations
