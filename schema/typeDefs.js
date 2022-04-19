const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    board: [Board!]!
  }
  type Board {
    id: Int!
    title: String!
    user: User!
    task: [Task!]!
  }
  type Task {
    id: Int!
    title: String!
    board: Board!
    important: Boolean!
    completed: Boolean!
  }
  type Query {
    hello: String
    me: [User!]
    getUser(id: Int!): User!
    getAllUsers: [User!]!
    getBoard(id: Int!): Board!
    getAllBoards: [Board!]!
    getTask(id: Int!): Task!
    getAllTasks: [Task!]!
  }
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createBoard(userId: Int!, title: String!): Board!
    createTask(
      boardId: Int!
      title: String!
      important: Boolean!
      completed: Boolean!
    ): Task!
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
