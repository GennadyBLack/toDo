import { gql } from "@apollo/client/core";

export const SEARCH_USERS = gql`
  query Query {
    getAllUsers {
      email
      id
    }
  }
`;


export const ME_QUERY = gql`
query Query {
  me {
    email
    name
    id
  }
}
`;