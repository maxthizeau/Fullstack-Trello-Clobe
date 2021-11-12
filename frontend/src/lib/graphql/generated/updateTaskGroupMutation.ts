/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateTaskGroupMutation
// ====================================================

export interface updateTaskGroupMutation_updateTaskGroup {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
  description: string | null;
}

export interface updateTaskGroupMutation {
  updateTaskGroup: updateTaskGroupMutation_updateTaskGroup;
}

export interface updateTaskGroupMutationVariables {
  id: number;
  name?: string | null;
  description?: string | null;
}
