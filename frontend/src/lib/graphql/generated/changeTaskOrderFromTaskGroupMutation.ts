/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changeTaskOrderFromTaskGroupMutation
// ====================================================

export interface changeTaskOrderFromTaskGroupMutation_changeTaskOrderFromTaskGroup_tasks {
  __typename: "Task";
  id: number;
  name: string | null;
  checked: boolean | null;
  order: number | null;
  description: string | null;
}

export interface changeTaskOrderFromTaskGroupMutation_changeTaskOrderFromTaskGroup_board {
  __typename: "Board";
  id: number;
  name: string | null;
}

export interface changeTaskOrderFromTaskGroupMutation_changeTaskOrderFromTaskGroup {
  __typename: "TaskGroup";
  id: number;
  name: string | null;
  description: string | null;
  order: number | null;
  tasks: (changeTaskOrderFromTaskGroupMutation_changeTaskOrderFromTaskGroup_tasks | null)[] | null;
  board: changeTaskOrderFromTaskGroupMutation_changeTaskOrderFromTaskGroup_board | null;
}

export interface changeTaskOrderFromTaskGroupMutation {
  changeTaskOrderFromTaskGroup: changeTaskOrderFromTaskGroupMutation_changeTaskOrderFromTaskGroup | null;
}

export interface changeTaskOrderFromTaskGroupMutationVariables {
  taskGroupId: number;
  taskIds: (number | null)[];
}
