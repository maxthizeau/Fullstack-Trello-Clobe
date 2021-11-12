/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBoardInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createBoardMutation
// ====================================================

export interface createBoardMutation_createBoard_team {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface createBoardMutation_createBoard_owner {
  __typename: "User";
  id: number;
  publicId: string | null;
  name: string | null;
  email: string | null;
}

export interface createBoardMutation_createBoard {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
  team: createBoardMutation_createBoard_team | null;
  owner: createBoardMutation_createBoard_owner | null;
}

export interface createBoardMutation {
  createBoard: createBoardMutation_createBoard;
}

export interface createBoardMutationVariables {
  data: CreateBoardInput;
}
