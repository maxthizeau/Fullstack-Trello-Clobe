/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserOnTeamInput } from "./graphql-global-types";

// ====================================================
// GraphQL mutation operation: createUserOnTeam
// ====================================================

export interface createUserOnTeam_createUserOnTeam_user {
  __typename: "User";
  id: number;
  publicId: string | null;
  email: string | null;
  name: string | null;
}

export interface createUserOnTeam_createUserOnTeam_team {
  __typename: "Team";
  id: number;
  name: string | null;
}

export interface createUserOnTeam_createUserOnTeam {
  __typename: "UserOnTeam";
  id: number;
  user: createUserOnTeam_createUserOnTeam_user | null;
  team: createUserOnTeam_createUserOnTeam_team | null;
  isAdmin: boolean | null;
}

export interface createUserOnTeam {
  createUserOnTeam: createUserOnTeam_createUserOnTeam;
}

export interface createUserOnTeamVariables {
  data: CreateUserOnTeamInput;
}
