/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createTaskGroupMutation
// ====================================================

export interface createTaskGroupMutation_createTaskGroup_board {
  __typename: "Board";
  id: number;
  name: string | null;
}

export interface createTaskGroupMutation_createTaskGroup {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
  description: string | null;
  board: createTaskGroupMutation_createTaskGroup_board | null;
}

export interface createTaskGroupMutation {
  createTaskGroup: createTaskGroupMutation_createTaskGroup;
}

export interface createTaskGroupMutationVariables {
  name: string;
  boardId: number;
}
