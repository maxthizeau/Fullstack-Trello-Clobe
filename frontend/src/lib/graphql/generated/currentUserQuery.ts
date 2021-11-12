/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUserQuery
// ====================================================

export interface currentUserQuery_authenticatedUser {
  __typename: "User";
  id: number;
  name: string | null;
  email: string | null;
  publicId: string | null;
}

export interface currentUserQuery {
  authenticatedUser: currentUserQuery_authenticatedUser | null;
}
