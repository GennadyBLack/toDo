import { gql } from "@apollo/client/core";

export const ALL_USERS = gql`
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