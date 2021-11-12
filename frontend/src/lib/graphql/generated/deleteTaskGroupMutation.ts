/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteTaskGroupMutation
// ====================================================

export interface deleteTaskGroupMutation_deleteTaskGroup_board {
  __typename: "Board";
  id: number;
  name: string | null;
}

export interface deleteTaskGroupMutation_deleteTaskGroup {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
  description: string | null;
  board: deleteTaskGroupMutation_deleteTaskGroup_board | null;
}

export interface deleteTaskGroupMutation {
  deleteTaskGroup: deleteTaskGroupMutation_deleteTaskGroup | null;
}

export interface deleteTaskGroupMutationVariables {
  id: number;
}
