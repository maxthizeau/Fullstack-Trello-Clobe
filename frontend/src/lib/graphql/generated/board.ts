/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: board
// ====================================================

export interface board_board_taskGroups_tasks {
  __typename: "Task";
  id: number;
  name: string | null;
  checked: boolean | null;
  description: string | null;
}

export interface board_board_taskGroups {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
  description: string | null;
  order: number | null;
  tasks: (board_board_taskGroups_tasks | null)[] | null;
}

export interface board_board_team {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface board_board_owner {
  __typename: "User";
  id: number;
  publicId: string | null;
  name: string | null;
  email: string | null;
}

export interface board_board {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
  taskGroups: (board_board_taskGroups | null)[] | null;
  team: board_board_team | null;
  owner: board_board_owner | null;
}

export interface board {
  board: board_board | null;
}

export interface boardVariables {
  id: number;
}
