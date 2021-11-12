/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RelateToManyUserOnTeamInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createTeamMutation
// ====================================================

export interface createTeamMutation_createTeam {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface createTeamMutation {
  createTeam: createTeamMutation_createTeam;
}

export interface createTeamMutationVariables {
  name: string;
  members?: RelateToManyUserOnTeamInput | null;
}
