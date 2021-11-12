/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateTaskMutation
// ====================================================

export interface updateTaskMutation_updateTask_taskGroup {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
}

export interface updateTaskMutation_updateTask {
  __typename: "Task";
  id: number;
  name: string | null;
  checked: boolean | null;
  description: string | null;
  taskGroup: updateTaskMutation_updateTask_taskGroup | null;
}

export interface updateTaskMutation {
  updateTask: updateTaskMutation_updateTask;
}

export interface updateTaskMutationVariables {
  id: number;
  name?: string | null;
  description?: string | null;
  checked?: boolean | null;
}
