/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userByPublicIdQuery
// ====================================================

export interface userByPublicIdQuery_allUsers {
  __typename: "User";
  id: number;
  publicId: string | null;
  name: string | null;
  email: string | null;
}

export interface userByPublicIdQuery {
  allUsers: (userByPublicIdQuery_allUsers | null)[] | null;
}

export interface userByPublicIdQueryVariables {
  publicId: string;
}
