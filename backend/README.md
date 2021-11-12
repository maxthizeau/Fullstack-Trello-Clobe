## Database Structure

1. User
2. Team
   - Team can have many Users and many Admins
3. Task
   - Task is always assigned to a TaskGroup
4. TaskGroup
   - TaskGroup is always assigned to a Board
5. Board
   - Board can be assigned to a Team and always have an owner (User)

## How to use generator of inputs (where, orderby, first, skip)

### Why I did that :

The only reason why I did this project is to improve and learn how to build a basic app with GraphQL / Prisma / Typescript.<br />
This is the second backend project I do with GraphQL, and the first with TypeScript, and without a Headless CMS like Keystone.JS / Strapi.<br />
I created some kind of CRUD GraphQL API without Keystone.js to understand better how it works in the end.<br />
This is why I tried to create a script to generate all inputs, and queries needed for this purpose.<br />

### Afterthought :

The 2 main problems are :<br />

- I am using codegen which already generate some code that is imported in mutations/queries
- "My" generator create multiples files that are needed by codegen to generate schema and typescript types
  <br />

**Codegen needs my generator to work properly, and my generator needs codegen to work properly.**

If you delete all generated file and try to generate all over again, you might face a lot of bugs. Forcing you to comment/remove some portions of actual code (mainly in typedefs and resolvers) to make it work, and then uncomment everything.<br /><br />

I learned a lot doing that generator, but it is NOT maintainable at all. Even knowing this, I decided to move on and continue the project since my goal is not to recreate TypeGraph or Keystone but to learn.<br />

### How to (try to) use the generator :

In this project, I wanted to add some filters for queries and mutations for all models. To do so, I created a script that can generate all graphql Inputs and queries needed. It needs few steps to set it up and can still be optimized a lot.<br />

_File : @src/graphql/generateInputs.ts_

1. Call generateAllInputs() on the server launch

- It will generate all the inputs and create a file in _@src/generated/typeInputs.ts_

2. Export the typeDef for the type you want to create Where Inputs
3. Import it in _generateInputs.ts_, and add it in typeToGenerate array
4. In _@src/graphql/typedefs/typedefsMaps.ts_ : Import and add the typeDefs you wrote and the generated files
5. Run the server, in order to generate all inputs and schema (from codegen)
6. In _@src/graphql/resolvers/resolversFunctions.ts_ : add the new types in the WhereInputTypes, ...
7. Add user() and allUsers() (those are exemples) queries in your resolvers, you can use the resolver function to args of prisma function

## Work done/to do

- Build a Package that generate all User Input + queries + Mutations based on user typedefs
- Add global function to solve "Where", "OrderBy", "First", "Skip",
