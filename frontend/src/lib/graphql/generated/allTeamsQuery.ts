/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WhereTeamInput, SortTeamBy } from "./graphql-global-types";

// ====================================================
// GraphQL query operation: allTeamsQuery
// ====================================================

export interface allTeamsQuery_allTeams_members_user {
  __typename: "User";
  id: number;
  publicId: string | null;
  name: string | null;
  email: string | null;
}

export interface allTeamsQuery_allTeams_members {
  __typename: "UserOnTeam";
  id: number;
  user: allTeamsQuery_allTeams_members_user | null;
  isAdmin: boolean | null;
}

export interface allTeamsQuery_allTeams_boards {
  __typename: "Board";
  id: number;
  name: string | null;
  description: string | null;
}

export interface allTeamsQuery_allTeams {
  __typename: "Team";
  id: number;
  name: string | null;
  members: (allTeamsQuery_allTeams_members | null)[] | null;
  boards: (allTeamsQuery_allTeams_boards | null)[] | null;
}

export interface allTeamsQuery {
  allTeams: (allTeamsQuery_allTeams | null)[] | null;
}

export interface allTeamsQueryVariables {
  where?: WhereTeamInput | null;
  sortBy?: SortTeamBy[] | null;
  first?: number | null;
  skip?: number | null;
}
