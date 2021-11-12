import { gql } from "apollo-server-express"
import { user, userTypesDefs } from "./user"
import { board, boardTypesDefs } from "./board"
import { task, taskTypesDefs } from "./task"
import { taskGroup, taskGroupTypesDefs } from "./taskGroup"
import { team, teamTypesDefs } from "./team"
import { userInputs } from "src/generated/userInputs"
import { boardInputs } from "src/generated/boardInputs"
import { taskInputs } from "src/generated/taskInputs"
import { taskGroupInputs } from "src/generated/taskGroupInputs"
import { teamInputs } from "src/generated/teamInputs"
import { userOnTeam, userOnTeamTypesDefs } from "./userOnTeam"
import { userOnTeamInputs } from "../../generated/userOnTeamInputs"
import appTypeDefs from "./appTypeDefs"

const rootTypeDefs = gql`
  type Query {
    root: String!
  }
  type Mutation {
    root: String!
  }
`

const typeDefs = [
  appTypeDefs,
  rootTypeDefs,
  user,
  userTypesDefs,
  userInputs,
  board,
  boardTypesDefs,
  boardInputs,
  task,
  taskTypesDefs,
  taskInputs,
  taskGroup,
  taskGroupTypesDefs,
  taskGroupInputs,
  team,
  teamTypesDefs,
  teamInputs,
  userOnTeam,
  userOnTeamTypesDefs,
  userOnTeamInputs,
]

// typeDefs.forEach((element) => {
//   console.log(element.definitions)
// })
export default typeDefs
