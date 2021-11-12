/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBoardInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateBoardMutation
// ====================================================

export interface updateBoardMutation_updateBoard_team {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface updateBoardMutation_updateBoard_owner {
  __typename: "User";
  id: number;
  publicId: string | null;
  name: string | null;
  email: string | null;
}

export interface updateBoardMutation_updateBoard {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
  team: updateBoardMutation_updateBoard_team | null;
  owner: updateBoardMutation_updateBoard_owner | null;
}

export interface updateBoardMutation {
  updateBoard: updateBoardMutation_updateBoard;
}

export interface updateBoardMutationVariables {
  updateBoardId: number;
  data: UpdateBoardInput;
}
