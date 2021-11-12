/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: changeTaskGroupsOrderMutation
// ====================================================

export interface changeTaskGroupsOrderMutation_changeTaskGroupsOrder_taskGroups {
  __typename: "TaskGroup";
  id: number;
  order: number | null;
}

export interface changeTaskGroupsOrderMutation_changeTaskGroupsOrder {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
  taskGroups: (changeTaskGroupsOrderMutation_changeTaskGroupsOrder_taskGroups | null)[] | null;
}

export interface changeTaskGroupsOrderMutation {
  changeTaskGroupsOrder: changeTaskGroupsOrderMutation_changeTaskGroupsOrder | null;
}

export interface changeTaskGroupsOrderMutationVariables {
  boardId: number;
  taskGroupIds: (number | null)[];
}
