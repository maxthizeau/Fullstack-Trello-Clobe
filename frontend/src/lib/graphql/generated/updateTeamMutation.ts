/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RelateToManyUserOnTeamInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateTeamMutation
// ====================================================

export interface updateTeamMutation_updateTeam {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface updateTeamMutation {
  updateTeam: updateTeamMutation_updateTeam;
}

export interface updateTeamMutationVariables {
  id: number;
  name?: string | null;
  members?: RelateToManyUserOnTeamInput | null;
}
