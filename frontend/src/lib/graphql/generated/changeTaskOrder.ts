/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changeTaskOrder
// ====================================================

export interface changeTaskOrder_changeTaskOrder_taskGroups_tasks {
  __typename: "Task";
  id: number;
  name: string | null;
  checked: boolean | null;
  order: number | null;
  description: string | null;
}

export interface changeTaskOrder_changeTaskOrder_taskGroups {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
  description: string | null;
  order: number | null;
  tasks: (changeTaskOrder_changeTaskOrder_taskGroups_tasks | null)[] | null;
}

export interface changeTaskOrder_changeTaskOrder_team {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface changeTaskOrder_changeTaskOrder_owner {
  __typename: "User";
  id: number;
  publicId: string | null;
  name: string | null;
  email: string | null;
}

export interface changeTaskOrder_changeTaskOrder {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
  taskGroups: (changeTaskOrder_changeTaskOrder_taskGroups | null)[] | null;
  team: changeTaskOrder_changeTaskOrder_team | null;
  owner: changeTaskOrder_changeTaskOrder_owner | null;
}

export interface changeTaskOrder {
  changeTaskOrder: changeTaskOrder_changeTaskOrder | null;
}

export interface changeTaskOrderVariables {
  boardId: number;
  fromTaskGroupId: number;
  toTaskGroupId: number;
  fromTasksArr: (number | null)[];
  toTasksArr: (number | null)[];
  movedTaskId: number;
}
