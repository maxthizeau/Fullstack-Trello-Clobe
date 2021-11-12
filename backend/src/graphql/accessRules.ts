import { Prisma } from ".prisma/client"
export const rules = {
  isAdmin(context) {
    if (!this.isLoggedIn(context)) return false

    if (context.user.role === "ADMIN") return true
    else return false
  },
  isLoggedIn(context) {
    if (!context.user) {
      return false
    }
    return true
  },
  // A user should only see the boards which he is the owner or member of the team that can access it
  // (Or if the user.role is ADMIN)
  canSeeBoards(context) {
    if (!this.isLoggedIn(context)) {
      return false
    }
    const { user } = context
    // Return true to allow all access
    if (user.role === "ADMIN") {
      return true
    }
    // Otherwise, return a PrismaWhere cond
    // Here : Either is the owner of the board or member of a team that can access it
    return {
      OR: [
        { ownerId: user.id },
        {
          team: {
            members: {
              some: {
                userId: user.id,
              },
            },
          },
        },
      ],
    }
  },
  // A user should only access a board he owns or member of the team that can access it
  async canSeeThisBoard(context, boardId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const access: Prisma.BoardWhereInput = {
      OR: [
        { ownerId: user.id },
        {
          team: { members: { some: { userId: user.id } } },
        },
      ],
    }

    const queryWhere: Prisma.BoardWhereInput = { AND: [{ id: boardId }, access] }
    // console.log(queryWhere)
    // const canSeeThisOne = await context.prisma.board.findUnique({ where: queryWhere })
    const canSeeThisOne = await context.prisma.board.findFirst({ where: queryWhere })
    // console.log("Can see this one : ", canSeeThisOne)
    return canSeeThisOne
  },
  // A user should be able to manage (update/delete) boards he owns or he is admin of the team that can access it
  // (Or if the user.role is ADMIN)
  async canManageBoard(context, boardId) {
    if (!this.isLoggedIn(context)) {
      return false
    }
    const { user } = context
    // Return true to allow all access
    if (user.role === "ADMIN") {
      return true
    }
    // Otherwise, return a PrismaWhere cond
    // Here : Either is the owner of the board or member of a team that can access it

    const access: Prisma.BoardWhereInput = {
      OR: [
        { ownerId: user.id },
        {
          team: {
            members: {
              some: {
                userId: user.id,
                isAdmin: true,
              },
            },
          },
        },
      ],
    }

    const queryWhere: Prisma.BoardWhereInput = { AND: [{ id: boardId }, access] }
    const canEditThisOne = await context.prisma.board.findFirst({ where: queryWhere })
    return canEditThisOne
  },
  canUpdateUser(context, requestedUserId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true
    const { user } = context
    return requestedUserId == user.id
  },
  // A user should only access a team when he is member of
  async canSeeThisTeam(context, teamId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const access: Prisma.TeamWhereInput = {
      members: { some: { userId: user.id } },
    }

    const queryWhere: Prisma.TeamWhereInput = { AND: [{ id: teamId }, access] }
    const canSeeThisOne = await context.prisma.team.findFirst({ where: queryWhere })

    return canSeeThisOne
  },
  // A user should only access teams he's member of
  canSeeTeams(context) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const returnedWhereInput: Prisma.TeamWhereInput = {
      members: { some: { userId: user.id } },
    }
    return returnedWhereInput
  },
  // Access : A user should be able to update a team only if he is admin of the team
  async canUpdateTeam(context, teamId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true
    const { user } = context

    const access: Prisma.TeamWhereInput = {
      members: { some: { userId: user.id, isAdmin: true } },
    }

    const queryWhere: Prisma.TeamWhereInput = { AND: [{ id: teamId }, access] }
    // console.log(JSON.stringify(queryWhere, null, 4))
    const canUpdateThisTeam = await context.prisma.team.findFirst({ where: queryWhere })
    // console.log(canUpdateThisTeam)
    return canUpdateThisTeam
  },
  // Access : A user should be able to see a Task Group when :
  // - He is member of the team that has the board atatched to the task group
  // - He is owner of the team that has the board attached to the task group
  async canSeeThisTaskGroup(context, taskGroupId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const access: Prisma.TaskGroupWhereInput = {
      board: {
        OR: [{ team: { members: { some: { userId: user.id } } } }, { ownerId: user.id }],
      },
    }

    const queryWhere: Prisma.TaskGroupWhereInput = { AND: [{ id: taskGroupId }, access] }

    // console.log(queryWhere)
    const canSeeThisOne = await context.prisma.taskGroup.findFirst({ where: queryWhere })

    return canSeeThisOne
  },
  // Access : A user should be able to see tasks groups where :
  // - He is member of the team that has the board atatched to the task group
  // - He is owner of the team that has the board attached to the task group
  canSeeTaskGroups(context) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const returnedWhereInput: Prisma.TaskGroupWhereInput = {
      board: {
        OR: [{ team: { members: { some: { userId: user.id } } } }, { ownerId: user.id }],
      },
    }
    return returnedWhereInput
  },
  // Access : A user should be able to update/delete a task group only :
  //   - when he is member of the team that own the board
  //   - when he owns the board
  async canManageTaskGroup(context, taskGroupID) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true
    const { user } = context

    const access: Prisma.TaskGroupWhereInput = {
      board: {
        OR: [{ team: { members: { some: { userId: user.id } } } }, { ownerId: user.id }],
      },
    }

    const queryWhere: Prisma.TaskGroupWhereInput = { AND: [{ id: taskGroupID }, access] }
    const canUpdateThisOne = await context.prisma.taskGroup.findFirst({ where: queryWhere })
    return canUpdateThisOne
  },
  // Access : A user should be able to see a Task when :
  // - He is member of the team > board > taskgroup > task
  // - He is owner of the board
  async canSeeThisTask(context, taskId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const access: Prisma.TaskWhereInput = {
      taskGroup: {
        board: {
          OR: [{ team: { members: { some: { userId: user.id } } } }, { ownerId: user.id }],
        },
      },
    }

    const queryWhere: Prisma.TaskWhereInput = { AND: [{ id: taskId }, access] }
    const canSeeThisOne = await context.prisma.task.findFirst({ where: queryWhere })

    return canSeeThisOne
  },
  // Access : A user should be able to see tasks when :
  // - He is member of the team > board > taskgroup > task
  // - He is owner of the board
  canSeeTasks(context) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const returnedWhereInput: Prisma.TaskWhereInput = {
      taskGroup: {
        board: {
          OR: [{ team: { members: { some: { userId: user.id } } } }, { ownerId: user.id }],
        },
      },
    }
    return returnedWhereInput
  },
  // Access : A user should be able to manage a Task when :
  // - He is member of the team > board > taskgroup > task
  // - He is owner of the board
  async canManageTasks(context, taskId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true
    const { user } = context

    const access: Prisma.TaskWhereInput = {
      taskGroup: {
        board: {
          OR: [{ team: { members: { some: { userId: user.id } } } }, { ownerId: user.id }],
        },
      },
    }

    const queryWhere: Prisma.TaskWhereInput = { AND: [{ id: taskId }, access] }
    const canUpdateThisOne = await context.prisma.task.findFirst({ where: queryWhere })
    return canUpdateThisOne
  },
  // Access : Should only access to teams where current user is in
  async canSeeThisUserOnTeamRelation(context, userOnTeamId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const access: Prisma.UsersOnTeamWhereInput = {
      team: {
        members: {
          some: { userId: user.id },
        },
      },
    }

    const queryWhere: Prisma.UsersOnTeamWhereInput = { AND: [{ id: userOnTeamId }, access] }
    const canSeeThisOne = await context.prisma.userOnTeam.findFirst({ where: queryWhere })

    return canSeeThisOne
  },
  // Access : Should only access to teams where current user is in
  canSeeUserOnTeamRelations(context) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true

    const { user } = context

    const returnedWhereInput: Prisma.UsersOnTeamWhereInput = {
      team: {
        members: {
          some: { userId: user.id },
        },
      },
    }

    // const returnedWhereInput: Prisma.UsersOnTeamWhereInput = {
    //   userId: user.id,
    // }
    // console.log("!", returnedWhereInput.team?.members?.every)
    return returnedWhereInput
  },
  // Access : A user should be able to manage a Task when :
  // - He is member of the team > board > taskgroup > task
  // - He is owner of the board
  async canManageUserOnTeamRelations(context, taskId) {
    if (!this.isLoggedIn(context)) return false
    if (this.isAdmin(context)) return true
    const { user } = context

    const access: Prisma.UsersOnTeamWhereInput = {
      team: {
        members: {
          some: { userId: user.id },
        },
      },
    }

    const queryWhere: Prisma.TaskWhereInput = { AND: [{ id: taskId }, access] }
    const canUpdateThisOne = await context.prisma.task.findFirst({ where: queryWhere })
    return canUpdateThisOne
  },
}
