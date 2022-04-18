const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    password: String!
    boards: [Board!]!
  }
  type Board {
    id: Int!
    title: String!
    user: User!
  }
  type Task {
    id: Int!
    title: String!
    board: Board!
  }
  type Query {
    hello: String
    me: [Student!]
    getUser(id: Int!): User
    getAllUsers: [User!]!
    getBoard(id: Int!): Board!
    getAllBoards: [Board!]!
    getTask(id: Int!): Task
    getAllTasks: [Task!]!
  }
  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createBoard(userId: String!, title: String!): Board!
    createTask(boardId: String!, title: String!): Task!
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
