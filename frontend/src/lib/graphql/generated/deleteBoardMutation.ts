/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteBoardMutation
// ====================================================

export interface deleteBoardMutation_deleteBoard_team {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface deleteBoardMutation_deleteBoard_owner {
  __typename: "User";
  id: number;
  publicId: string | null;
  name: string | null;
  email: string | null;
}

export interface deleteBoardMutation_deleteBoard {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
  team: deleteBoardMutation_deleteBoard_team | null;
  owner: deleteBoardMutation_deleteBoard_owner | null;
}

export interface deleteBoardMutation {
  deleteBoard: deleteBoardMutation_deleteBoard | null;
}

export interface deleteBoardMutationVariables {
  deleteBoardId: number;
}
