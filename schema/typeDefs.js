const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    task: [Task!]!
  }
  type Task {
    id: Int!
    title: String!
    user: User!
    important: Boolean!
    completed: Boolean!
  }
  type Query {
    hello: String
    me: [User!]
    getUser(id: Int!): User!
    getAllUsers: [User!]!
    getTask(id: Int!): Task!
    getAllTasks: [Task!]!
  }
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createTask(userId: Int!, title: String!,   important: Boolean!, completed: Boolean!): Task!
  }
`;
module.exports = typeDefs;
//определяем схему для запросов
// type Student {
//   id: Int!
//   email: String!
//   password: String!
//   hobbies: [Hobbies!]!
// }

//type Query - хранит к себе возможные выборки для гет запросов

//type Mutation - остальные запросы как изменения удаление
