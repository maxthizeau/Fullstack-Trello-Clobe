import bcrypt from "bcryptjs"

export const usersCredentials = {
  admin: { email: "john.admin@seed.com", password: "Passwd01" },
  bob: { email: "bob.user@seed.com", password: "Passwd02" },
  max: { email: "mac.user@seed.com", password: "Passwd03" },
  michael: { email: "michael.user@seed.com", password: "Passwd04" },
}

export async function seedData(prisma) {
  // Adding Users :

  const johnAdmin = await prisma.user.upsert({
    where: { email: "john.admin@seed.com" },
    update: {},
    create: {
      email: "john.admin@seed.com",
      name: "JohnAdmin",
      publicId: "JohnAdmin#12345",
      password: await bcrypt.hash("Passwd01", 10),
      role: "ADMIN",
    },
  })

  const bobUser = await prisma.user.upsert({
    where: { email: "bob.user@seed.com" },
    update: {},
    create: {
      email: "bob.user@seed.com",
      name: "BobUser",
      publicId: "BobUser#56789",
      password: await bcrypt.hash("Passwd02", 10),
      role: "USER",
    },
  })

  const maxUser = await prisma.user.upsert({
    where: { email: "max.user@seed.com" },
    update: {},
    create: {
      email: "max.user@seed.com",
      name: "MaxUser",
      publicId: "MaxUser#13579",
      password: await bcrypt.hash("Passwd03", 10),
      role: "USER",
    },
  })

  const michaelUser = await prisma.user.upsert({
    where: { email: "michael.user@seed.com" },
    update: {},
    create: {
      email: "michael.user@seed.com",
      name: "MichaelUser",
      publicId: "MichaelUser#24680",
      password: await bcrypt.hash("Passwd04", 10),
      role: "USER",
    },
  })

  console.log("👍 users added to database")
  //   console.log({ johnAdmin, bobUser, maxUser, michaelUser })

  // Creating Teams - For each teams, create a board, a taskGroup and 2 tasks
  //   1. One team with Bob & Max
  const teamBobMax = await prisma.team.create({
    data: {
      name: "Bob & Max team",
      members: {
        create: [
          { userId: bobUser.id, isAdmin: true },
          { userId: maxUser.id, isAdmin: false },
        ],
      },
      boards: {
        create: {
          name: "Board of Bob&Max team",
          description: "To do lists of Bob&Max project",
          ownerId: bobUser.id,
          taskGroups: {
            create: [
              {
                name: "First Task Group of Bob&Max",
                description: "Will add description later",
                tasks: { create: [{ name: "First Task" }, { name: "Second Task" }] },
              },
              {
                name: "Second Task Group of Bob&Max",
                description: "We will also add description later",
                tasks: { create: [{ name: "Fourth Task" }, { name: "Fifth Task" }] },
              },
            ],
          },
        },
      },
    },
  })
  //   2. One team with Michael & Max
  const teamMichaelMax = await prisma.team.create({
    data: {
      name: "Michael & Max team",
      members: {
        create: [
          { userId: michaelUser.id, isAdmin: true },
          { userId: maxUser.id, isAdmin: false },
        ],
      },
      boards: {
        create: {
          name: "Board of Michael&Max team",
          description: "To do lists of Michael&Max project",
          ownerId: michaelUser.id,
          taskGroups: {
            create: [
              {
                name: "First Task Group of Michael&Max",
                description: "This will be added later",
                tasks: { create: [{ name: "First Task" }, { name: "Second Task" }] },
              },
              {
                name: "Second Task Group of Michael&Max",
                description: "To be added",
                tasks: { create: [{ name: "Fourth Task" }, { name: "Fifth Task" }] },
              },
            ],
          },
        },
      },
    },
  })
  //   3. One team with Bob & Michael
  const teamBobMichael = await prisma.team.create({
    data: {
      name: "Bob & Michael team",
      members: {
        create: [
          { userId: bobUser.id, isAdmin: true },
          { userId: michaelUser.id, isAdmin: false },
        ],
      },
      boards: {
        create: {
          name: "Board of Bob & Michael team",
          description: "To do lists of Bob & Michael project",
          ownerId: bobUser.id,
          taskGroups: {
            create: [
              {
                name: "First Task Group of Bob & Michael",
                description: "This will be added later",
                tasks: { create: [{ name: "First Task" }, { name: "Second Task" }] },
              },
              {
                name: "Second Task Group of Bob & Michael",
                description: "To be added",
                tasks: { create: [{ name: "Fourth Task" }, { name: "Fifth Task" }] },
              },
            ],
          },
        },
      },
    },
  })

  // 4. Create a single board with no team but with bob as the owner
  const bobBoard = await prisma.board.create({
    data: {
      name: "Only Bob can access this board",
      description: "Not owned by any team, owner is bob",
      ownerId: bobUser.id,
      taskGroups: {
        create: {
          name: "Bob Task Group",
          tasks: {
            create: {
              name: "One of many thing to do",
            },
          },
        },
      },
    },
  })

  console.log("👍 Teams, boards, tasksgroups, tasks added to database")
  //   console.log({ teamBobMax, teamMichaelMax, teamBobMichael, bobBoard })
}

export async function deleteAll(prisma, log = false) {
  const deletedUserOnTeamCount = await prisma.usersOnTeam.deleteMany({})
  log && console.log(`🗑️ Deleted ${deletedUserOnTeamCount.count} users on team relations`)
  const deletedTasksCount = await prisma.task.deleteMany({})
  log && console.log(`🗑️ Deleted ${deletedTasksCount.count} tasks`)
  const deletedTaskGroupsCount = await prisma.taskGroup.deleteMany({})
  log && console.log(`🗑️ Deleted ${deletedTaskGroupsCount.count} task groups`)
  const deletedBoardsCount = await prisma.board.deleteMany({})
  log && console.log(`🗑️ Deleted ${deletedBoardsCount.count} boards`)
  const deletedTeamsCount = await prisma.team.deleteMany({})
  log && console.log(`🗑️ Deleted ${deletedTeamsCount.count} teams`)
  const deletedUserCount = await prisma.user.deleteMany({})
  log && console.log(`🗑️ Deleted ${deletedUserCount.count} users`)
}
