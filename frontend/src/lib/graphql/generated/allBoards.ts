/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: allBoards
// ====================================================

export interface allBoards_allBoards_taskGroups_tasks {
  __typename: "Task";
  id: number;
  name: string | null;
  order: number | null;
  checked: boolean | null;
  description: string | null;
}

export interface allBoards_allBoards_taskGroups {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
  description: string | null;
  order: number | null;
  tasks: (allBoards_allBoards_taskGroups_tasks | null)[] | null;
}

export interface allBoards_allBoards_team {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface allBoards_allBoards_owner {
  __typename: "User";
  id: number;
  publicId: string | null;
  name: string | null;
  email: string | null;
}

export interface allBoards_allBoards {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
  taskGroups: (allBoards_allBoards_taskGroups | null)[] | null;
  team: allBoards_allBoards_team | null;
  owner: allBoards_allBoards_owner | null;
}

export interface allBoards {
  allBoards: (allBoards_allBoards | null)[] | null;
}
