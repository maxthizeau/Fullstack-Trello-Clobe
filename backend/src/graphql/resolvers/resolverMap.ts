// resolverMap.ts
import { IResolvers } from "@graphql-tools/utils/Interfaces"
import { mergeResolvers } from "@graphql-tools/merge"

import boardQueries from "src/graphql/resolvers/board/boardQueries"
import taskQueries from "src/graphql/resolvers/task/taskQueries"
import userQueries from "src/graphql/resolvers/user/userQueries"
import userMutations from "src/graphql/resolvers/user/userMutations"
import taskGroupQueries from "src/graphql/resolvers/taskGroup/taskGroupQueries"
import teamQueries from "src/graphql/resolvers/team/teamQueries"
import boardMutations from "./board/boardMutations"
import taskMutations from "./task/taskMutations"
import taskGroupMutations from "./taskGroup/taskGroupMutations"
import teamMutations from "./team/teamMutations"
import userOnTeamQueries from "./userOnTeam/userOnTeamQueries"
import userOnTeamMutations from "./userOnTeam/userOnTeamMutations"
import { appMutations } from "./appMutations"

const resolverMap = [
  appMutations,
  userQueries,
  userMutations,
  boardQueries,
  boardMutations,
  taskQueries,
  taskMutations,
  taskGroupQueries,
  taskGroupMutations,
  teamQueries,
  teamMutations,
  userOnTeamQueries,
  userOnTeamMutations,
]

// const resolverMap: IResolvers = {}

export default mergeResolvers(resolverMap)
// export default resolverMap
