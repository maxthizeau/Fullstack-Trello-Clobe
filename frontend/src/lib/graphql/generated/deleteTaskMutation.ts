/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteTaskMutation
// ====================================================

export interface deleteTaskMutation_deleteTask {
  __typename: "Task";
  id: number;
  name: string | null;
  description: string | null;
}

export interface deleteTaskMutation {
  deleteTask: deleteTaskMutation_deleteTask | null;
}

export interface deleteTaskMutationVariables {
  id: number;
}
