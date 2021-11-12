/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserOnTeamInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateUserOnTeamMutation
// ====================================================

export interface updateUserOnTeamMutation_updateUserOnTeam {
  __typename: "UserOnTeam";
  id: number;
}

export interface updateUserOnTeamMutation {
  updateUserOnTeam: updateUserOnTeamMutation_updateUserOnTeam;
}

export interface updateUserOnTeamMutationVariables {
  id: number;
  data: UpdateUserOnTeamInput;
}
