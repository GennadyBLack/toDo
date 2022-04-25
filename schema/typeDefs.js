const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type User {
    id: Int!
    email: String!
    name: String!
    password: String!
    task: [Task!]!
  }
  type AuthData {
    token: String!
    user: User!
  }
  type Task {
    id: Int!
    title: String!
    user: User!
  }
  type Query {
    hello: String
    me: User!
    getUser(id: Int!): User!
    getAllUsers: [User!]!
    getTask(id: Int!): Task!
    getAllTasks: [Task!]!
    getTasksByUser(userId: Int!): [Task!]!
  }
  type Mutation {
    loginUser(email: String!, password: String!): AuthData!
    registerUser(name: String!, email: String!, password: String!): AuthData!
    createUser(name: String!, email: String!, password: String!): User!
    createTask(
      userId: Int!
      title: String!
      important: Boolean
      completed: Boolean
    ): Task!
    deleteUser(id: Int): String
    deleteTask(id: Int): Task
  }
`;
//deleteUser(id: Int): String - возвращаем тип того, что вернётся при удалении (ответ возвращаем в резолвере, в соотв мутации)

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
