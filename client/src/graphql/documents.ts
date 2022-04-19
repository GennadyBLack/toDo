import { gql } from "@apollo/client/core";

export const SEARCH_USERS = gql`
  query Query {
    getAllUsers {
      email
      id
    }
  }
`;
