/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createTaskMutation
// ====================================================

export interface createTaskMutation_createTask_taskGroup_board {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
}

export interface createTaskMutation_createTask_taskGroup {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
  description: string | null;
  board: createTaskMutation_createTask_taskGroup_board | null;
}

export interface createTaskMutation_createTask {
  __typename: "Task";
  id: number;
  name: string | null;
  checked: boolean | null;
  description: string | null;
  taskGroup: createTaskMutation_createTask_taskGroup | null;
}

export interface createTaskMutation {
  createTask: createTaskMutation_createTask;
}

export interface createTaskMutationVariables {
  name: string;
  taskGroupId: number;
}
