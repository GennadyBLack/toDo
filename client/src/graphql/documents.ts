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

export const All_TODOS = gql`
  query Query {
    getAllTasks {
      id
      title
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;
