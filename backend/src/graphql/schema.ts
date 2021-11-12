import resolvers from "src/graphql/resolvers/resolverMap"
import typeDefs from "src/graphql/typedefs/typedefsMap"
import { typeDefs as scalarTypeDefs, resolvers as scalarResolvers } from "graphql-scalars"
import { makeExecutableSchema } from "@graphql-tools/schema"

export const schema = makeExecutableSchema({
  typeDefs: [...scalarTypeDefs, ...typeDefs],
  resolvers: { ...scalarResolvers, ...resolvers },
})
