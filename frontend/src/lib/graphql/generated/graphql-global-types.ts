/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum SortTeamBy {
  boards_ASC = "boards_ASC",
  boards_DESC = "boards_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  members_ASC = "members_ASC",
  members_DESC = "members_DESC",
  name_ASC = "name_ASC",
  name_DESC = "name_DESC",
  publicId_ASC = "publicId_ASC",
  publicId_DESC = "publicId_DESC",
}

export interface CreateBoardInput {
  name: string;
  description?: string | null;
  taskGroups?: RelateToManyTaskGroupInput | null;
  team?: RelateToOneTeamInput | null;
  owner?: RelateToOneUserInput | null;
}

export interface CreateTaskGroupInput {
  name: string;
  description?: string | null;
  tasks?: RelateToManyTaskInput | null;
  board?: RelateToOneBoardInput | null;
}

export interface CreateTaskInput {
  name: string;
  description?: string | null;
  taskGroup?: RelateToOneTaskGroupInput | null;
}

export interface CreateTeamInput {
  name: string;
  members?: RelateToManyUserOnTeamInput | null;
  boards?: RelateToManyBoardInput | null;
}

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  teams?: RelateToManyUserOnTeamInput | null;
  boards?: RelateToManyBoardInput | null;
}

export interface CreateUserOnTeamInput {
  user?: RelateToOneUserInput | null;
  team?: RelateToOneTeamInput | null;
  isAdmin?: boolean | null;
}

export interface RelateToManyBoardInput {
  create?: (CreateBoardInput | null)[] | null;
  connect?: (WhereUniqueBoardInput | null)[] | null;
  disconnect?: (WhereUniqueBoardInput | null)[] | null;
  disconnectAll?: boolean | null;
}

export interface RelateToManyTaskGroupInput {
  create?: (CreateTaskGroupInput | null)[] | null;
  connect?: (WhereUniqueTaskGroupInput | null)[] | null;
  disconnect?: (WhereUniqueTaskGroupInput | null)[] | null;
  disconnectAll?: boolean | null;
}

export interface RelateToManyTaskInput {
  create?: (CreateTaskInput | null)[] | null;
  connect?: (WhereUniqueTaskInput | null)[] | null;
  disconnect?: (WhereUniqueTaskInput | null)[] | null;
  disconnectAll?: boolean | null;
}

export interface RelateToManyUserOnTeamInput {
  create?: (CreateUserOnTeamInput | null)[] | null;
  connect?: (WhereUniqueUserOnTeamInput | null)[] | null;
  disconnect?: (WhereUniqueUserOnTeamInput | null)[] | null;
  disconnectAll?: boolean | null;
}

export interface RelateToOneBoardInput {
  create?: CreateBoardInput | null;
  connect?: WhereUniqueBoardInput | null;
  disconnect?: WhereUniqueBoardInput | null;
  disconnectAll?: boolean | null;
}

export interface RelateToOneTaskGroupInput {
  create?: CreateTaskGroupInput | null;
  connect?: WhereUniqueTaskGroupInput | null;
  disconnect?: WhereUniqueTaskGroupInput | null;
  disconnectAll?: boolean | null;
}

export interface RelateToOneTeamInput {
  create?: CreateTeamInput | null;
  connect?: WhereUniqueTeamInput | null;
  disconnect?: WhereUniqueTeamInput | null;
  disconnectAll?: boolean | null;
}

export interface RelateToOneUserInput {
  create?: CreateUserInput | null;
  connect?: WhereUniqueUserInput | null;
  disconnect?: WhereUniqueUserInput | null;
  disconnectAll?: boolean | null;
}

export interface UpdateBoardInput {
  name?: string | null;
  description?: string | null;
  taskGroups?: RelateToManyTaskGroupInput | null;
  team?: RelateToOneTeamInput | null;
  owner?: RelateToOneUserInput | null;
}

export interface UpdateUserOnTeamInput {
  user?: RelateToOneUserInput | null;
  team?: RelateToOneTeamInput | null;
  isAdmin?: boolean | null;
}

export interface WhereBoardInput {
  AND?: (WhereBoardInput | null)[] | null;
  OR?: (WhereBoardInput | null)[] | null;
  id_is?: number | null;
  id_not?: number | null;
  id_lt?: number | null;
  id_lte?: number | null;
  id_gt?: number | null;
  id_gte?: number | null;
  name_is?: string | null;
  name_not?: string | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  description_is?: string | null;
  description_not?: string | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  taskGroups?: WhereTaskGroupInput | null;
  taskGroups_is_null?: boolean | null;
  team?: WhereTeamInput | null;
  team_is_null?: boolean | null;
  owner?: WhereUserInput | null;
  owner_is_null?: boolean | null;
}

export interface WhereTaskGroupInput {
  AND?: (WhereTaskGroupInput | null)[] | null;
  OR?: (WhereTaskGroupInput | null)[] | null;
  id_is?: number | null;
  id_not?: number | null;
  id_lt?: number | null;
  id_lte?: number | null;
  id_gt?: number | null;
  id_gte?: number | null;
  name_is?: string | null;
  name_not?: string | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  order_is?: string | null;
  order_not?: string | null;
  order_lt?: string | null;
  order_lte?: string | null;
  order_gt?: string | null;
  order_gte?: string | null;
  description_is?: string | null;
  description_not?: string | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  tasks?: WhereTaskInput | null;
  tasks_is_null?: boolean | null;
  board?: WhereBoardInput | null;
  board_is_null?: boolean | null;
}

export interface WhereTaskInput {
  AND?: (WhereTaskInput | null)[] | null;
  OR?: (WhereTaskInput | null)[] | null;
  id_is?: number | null;
  id_not?: number | null;
  id_lt?: number | null;
  id_lte?: number | null;
  id_gt?: number | null;
  id_gte?: number | null;
  name_is?: string | null;
  name_not?: string | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  order_is?: string | null;
  order_not?: string | null;
  order_lt?: string | null;
  order_lte?: string | null;
  order_gt?: string | null;
  order_gte?: string | null;
  checked_is?: boolean | null;
  description_is?: string | null;
  description_not?: string | null;
  description_lt?: string | null;
  description_lte?: string | null;
  description_gt?: string | null;
  description_gte?: string | null;
  taskGroup?: WhereTaskGroupInput | null;
  taskGroup_is_null?: boolean | null;
}

export interface WhereTeamInput {
  AND?: (WhereTeamInput | null)[] | null;
  OR?: (WhereTeamInput | null)[] | null;
  id_is?: number | null;
  id_not?: number | null;
  id_lt?: number | null;
  id_lte?: number | null;
  id_gt?: number | null;
  id_gte?: number | null;
  publicId_is?: string | null;
  publicId_not?: string | null;
  publicId_lt?: string | null;
  publicId_lte?: string | null;
  publicId_gt?: string | null;
  publicId_gte?: string | null;
  name_is?: string | null;
  name_not?: string | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  members?: WhereUserOnTeamInput | null;
  members_is_null?: boolean | null;
  boards?: WhereBoardInput | null;
  boards_is_null?: boolean | null;
}

export interface WhereUniqueBoardInput {
  id: number;
}

export interface WhereUniqueTaskGroupInput {
  id: number;
}

export interface WhereUniqueTaskInput {
  id: number;
}

export interface WhereUniqueTeamInput {
  id: number;
}

export interface WhereUniqueUserInput {
  id: number;
}

export interface WhereUniqueUserOnTeamInput {
  id: number;
}

export interface WhereUserInput {
  AND?: (WhereUserInput | null)[] | null;
  OR?: (WhereUserInput | null)[] | null;
  id_is?: number | null;
  id_not?: number | null;
  id_lt?: number | null;
  id_lte?: number | null;
  id_gt?: number | null;
  id_gte?: number | null;
  publicId_is?: string | null;
  publicId_not?: string | null;
  publicId_lt?: string | null;
  publicId_lte?: string | null;
  publicId_gt?: string | null;
  publicId_gte?: string | null;
  name_is?: string | null;
  name_not?: string | null;
  name_lt?: string | null;
  name_lte?: string | null;
  name_gt?: string | null;
  name_gte?: string | null;
  email_is?: string | null;
  email_not?: string | null;
  email_lt?: string | null;
  email_lte?: string | null;
  email_gt?: string | null;
  email_gte?: string | null;
  password_is?: string | null;
  password_not?: string | null;
  password_lt?: string | null;
  password_lte?: string | null;
  password_gt?: string | null;
  password_gte?: string | null;
  registeredAt_is?: any | null;
  registeredAt_not?: any | null;
  registeredAt_lt?: any | null;
  registeredAt_lte?: any | null;
  registeredAt_gt?: any | null;
  registeredAt_gte?: any | null;
  updatedAt_is?: any | null;
  updatedAt_not?: any | null;
  updatedAt_lt?: any | null;
  updatedAt_lte?: any | null;
  updatedAt_gt?: any | null;
  updatedAt_gte?: any | null;
  teams?: WhereUserOnTeamInput | null;
  teams_is_null?: boolean | null;
  boards?: WhereBoardInput | null;
  boards_is_null?: boolean | null;
}

export interface WhereUserOnTeamInput {
  AND?: (WhereUserOnTeamInput | null)[] | null;
  OR?: (WhereUserOnTeamInput | null)[] | null;
  id_is?: number | null;
  id_not?: number | null;
  id_lt?: number | null;
  id_lte?: number | null;
  id_gt?: number | null;
  id_gte?: number | null;
  user?: WhereUserInput | null;
  user_is_null?: boolean | null;
  team?: WhereTeamInput | null;
  team_is_null?: boolean | null;
  isAdmin_is?: boolean | null;
  isAdmin_not?: boolean | null;
  isAdmin_lt?: boolean | null;
  isAdmin_lte?: boolean | null;
  isAdmin_gt?: boolean | null;
  isAdmin_gte?: boolean | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
