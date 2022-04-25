// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();
const port = 4000;
const authHelper = require("./helpers/auth");

const corsConfig = {
  credentials: true,
  allowedHeaders: ["Authorization"],
  exposedHeaders: ["Authorization"],
};
//возмодные типы запросов
const typeDefs = require("./schema/typeDefs");
//обработчики запросов
const resolvers = require("./schema/resolvers");
//модели
const models = require("./models");
//проверяем удалось ли подсключиться к базе данных пострес
models.sequelize.authenticate();
//создаем таблицы, {force:true} для удаления всех таблиц
models.sequelize.sync();
//настраиваем аполо сервер
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      try {
        let token = req.headers.authorization.split(" ")[1];
        let user = authHelper.checkToken(token);
        console.log(user, "UUUSEEER");
        req.user = user ?? null;
      } catch (error) {
        console.log(error);
      }

      return { models, req };
    },
  });
  //стартуем
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://${port}${apolloServer?.graphqlPath}`)
);
