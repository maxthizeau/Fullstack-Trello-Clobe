/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteTeamMutation
// ====================================================

export interface deleteTeamMutation_deleteTeam {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface deleteTeamMutation {
  deleteTeam: deleteTeamMutation_deleteTeam | null;
}

export interface deleteTeamMutationVariables {
  id: number;
}
