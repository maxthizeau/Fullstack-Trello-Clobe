import * as fs from "fs"
import path from "path"
import { capitalizeFirstLetter, lowercaseFirstLetter, tab } from "@src/utils/stringFunctions"
import { gql } from "apollo-server-express"
import { DocumentNode } from "graphql"

// Import GQL Types to generate
import { user } from "./typedefs/user"
import { task } from "./typedefs/task"
import { taskGroup } from "./typedefs/taskGroup"
import { board } from "./typedefs/board"
import { team } from "./typedefs/team"
import { userOnTeam } from "./typedefs/userOnTeam"

// Create an array of type to generate
const typeToGenerate: TypeToGenerate[] = [
  { name: "User", typeDef: user },
  { name: "Task", typeDef: task },
  { name: "TaskGroup", typeDef: taskGroup },
  { name: "Board", typeDef: board },
  { name: "Team", typeDef: team },
  { name: "UserOnTeam", typeDef: userOnTeam },
]

// The type you dont need to relate to a WhereInput
const baseTypes: string[] = ["ID", "Int", "String", "Boolean", "Float", "DateTime"]

interface GraphQLType {
  field: string
  type: string
  isBaseType?: boolean
}

interface TypeToGenerate {
  name: string
  typeDef: DocumentNode
}

function isBaseType(string: string): boolean {
  return baseTypes.includes(string.replace(/\[|\]|\!/gi, ""))
}

function removeBetweenParenthese(string: string): string {
  return string.replace(/ *\([^)]*\) */g, "")
}

function writeInput(typeArray: GraphQLType[], typeName: string): string {
  // WhereUserInput + enum SortBy
  let whereInput = `input Where${typeName}Input { \n`
  let sortBy = `${tab(2)}enum Sort${typeName}By { \n`

  whereInput += `${tab(4)}AND: [Where${typeName}Input]\n`
  whereInput += `${tab(4)}OR: [Where${typeName}Input]\n`

  typeArray.map((x) => {
    // remove everything after (
    const field = x.field.replace(/\([\s\S]*?\)/, "")
    // If the type is a basetype (Int, String, ...), create is/not/lt/lte/...
    if (isBaseType(x.type)) {
      whereInput += `${tab(4) + field}_is: ${x.type.replace("!", "")}\n`
      whereInput += `${tab(4) + field}_not: ${x.type.replace("!", "")}\n`
      whereInput += `${tab(4) + field}_lt: ${x.type.replace("!", "")}\n`
      whereInput += `${tab(4) + field}_lte: ${x.type.replace("!", "")}\n`
      whereInput += `${tab(4) + field}_gt: ${x.type.replace("!", "")}\n`
      whereInput += `${tab(4) + field}_gte: ${x.type.replace("!", "")}\n`
    } else {
      // Then, relate to the WhereInput
      whereInput += `${tab(4) + field}: Where${capitalizeFirstLetter(x.type.replace(/\[|\]|\!/gi, ""))}Input\n`
      whereInput += `${tab(4) + field}_is_null: Boolean\n`
    }
    sortBy += `${tab(4) + field}_ASC\n${tab(4) + field}_DESC\n`
  })
  whereInput += tab(2) + "}\n\n"
  sortBy += tab(2) + "}\n\n"

  // WhereUniqueUserInput
  let whereUniqueInput = `${tab(2)}input WhereUnique${typeName}Input { \n`
  whereUniqueInput += `${tab(4) + typeArray[0].field}: ${typeArray[0].type} \n${tab(2)}}\n\n`

  // RelateToOneInput
  let relateToOneInput = `${tab(2)}input RelateToOne${typeName}Input { \n`
  relateToOneInput += `${tab(4)}create: Create${typeName}Input\n`
  relateToOneInput += `${tab(4)}connect: WhereUnique${typeName}Input\n`
  relateToOneInput += `${tab(4)}disconnect: WhereUnique${typeName}Input\n`
  relateToOneInput += `${tab(4)}disconnectAll: Boolean\n}\n\n`

  // RelateToManyInput
  let relateToManyInput = `${tab(2)}input RelateToMany${typeName}Input { \n`
  relateToManyInput += `${tab(4)}create: [Create${typeName}Input]\n`
  relateToManyInput += `${tab(4)}connect: [WhereUnique${typeName}Input]\n`
  relateToManyInput += `${tab(4)}disconnect: [WhereUnique${typeName}Input]\n`
  relateToManyInput += `${tab(4)}disconnectAll: Boolean\n}\n\n`

  return whereInput + whereUniqueInput + sortBy + relateToManyInput + relateToOneInput
}

function writeQueries(typeArray: GraphQLType[], typeName: string): string {
  let returnedString = "extend type Query {\n"
  returnedString += `${tab(4) + lowercaseFirstLetter(typeName)}(where: WhereUnique${typeName}Input!): ${typeName}\n`
  returnedString += `${tab(4)}all${capitalizeFirstLetter(
    typeName
  )}s(where: Where${typeName}Input, sortBy: [Sort${typeName}By!], first: Int, skip: Int): [${typeName}]\n`
  returnedString += `${tab(2)}}\n`
  return returnedString
}

function generateResolvers(gqlDef: TypeToGenerate, arrayOfFields: GraphQLType[]) {
  let output = `// This file has been generated. DO NOT MODIFY\n\n`
  const { name, typeDef } = gqlDef
  const pathNameTemplate = path.join("src", "utils", `templateQueries.txt`)
  const pathNameQueries = path.join("src", "generated", `${lowercaseFirstLetter(name)}Queries.ts`)
  const contentTemplate = fs.existsSync(pathNameTemplate) ? fs.readFileSync(pathNameTemplate, "utf-8") : ""
  const contentQueries = fs.existsSync(pathNameQueries) ? fs.readFileSync(pathNameQueries, "utf-8") : null

  output = contentTemplate
    .replaceAll("%%lname%%", lowercaseFirstLetter(name))
    .replaceAll("%%cname%%", capitalizeFirstLetter(name))

  let includesFunction = ""
  arrayOfFields.forEach((element) => {
    if (!element.isBaseType) {
      includesFunction += `${tab(6)}queryArgs.include = {${lowercaseFirstLetter(element.field)}:true}\n`
    }
  })

  output = output.replace("//%%generateInclude%%", includesFunction)
  if (contentQueries !== output) {
    fs.writeFile(pathNameQueries, output, () => {
      console.log(name, " resolvers generated!")
    })
  }
}

async function generate(gqlDef: TypeToGenerate) {
  const { name, typeDef } = gqlDef
  // 1. Get the source code of typedefinition
  const source = typeDef.loc?.source.body

  // 2. Filter : Only keep type definitions (without commented ones)
  const regex = /(?=.*:)^.\s*[A-Z0-9].*/gim
  const explodedSource = source?.split("\n")
  const result = explodedSource?.filter((line) => line.match(regex))

  // 3. Build an array of GraphQLType {field : 'id', type : 'Int!' }
  const arrayOfFields: GraphQLType[] = []
  result?.map((x) => {
    const tmp = removeBetweenParenthese(x).split(":")
    const fields: GraphQLType = {
      field: tmp[0].replace(/\s/g, ""),
      type: tmp[1].replace(/\s/g, ""),
      isBaseType: isBaseType(tmp[1].replace(/\s/g, "")),
    }
    // console.log(fields)
    arrayOfFields.push(fields)
  })

  // 4. Write all inputs from the array
  const inputs = writeInput(arrayOfFields, name)
  // console.log(inputs)
  // 5. Write all Queries from the array
  const queries = writeQueries(arrayOfFields, name)

  // Write Output
  let output = `// This file has been generated. DO NOT MODIFY\n\n`
  output += `import { gql } from "apollo-server-express"\n\n`
  output += `export const ${lowercaseFirstLetter(name)}Inputs = gql\`\n${tab(2) + inputs}${tab(2) + queries}\n\``

  // 8. Generate files
  const pathName = path.join("src", "generated", `${lowercaseFirstLetter(name)}Inputs.ts`)

  const content = fs.existsSync(pathName) ? fs.readFileSync(pathName, "utf-8") : null
  console.log(name, ":", content === output)
  if (content !== output) {
    fs.writeFile(pathName, output, () => {
      console.log(name, " inputs generated!")
    })
  }

  return arrayOfFields
}

export async function generateAllInputs() {
  // if (active) {
  typeToGenerate.forEach(async (element) => {
    const arrayOfFields = await generate(element)
    // if (needToGenerateResolvers) {
    //   generateResolvers(element, arrayOfFields)
    // }
  })
  // }
}
// Get the user type def alone (export it)
// Import it in this file, and insert it into an array
//
