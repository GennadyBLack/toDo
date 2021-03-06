// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();
const port = 4000;
const authHelper = require("./helpers/auth");
const chalk = require("chalk");

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
      //подмешиваем юзера в каждый запрос, добавив его в контекст аполло
      try {
        let token = req?.headers?.authorization ? req?.headers?.authorization?.split(" ")[1] : null;
        let user = null;

        if(token) {
          console.log(chalk.bold.blue(typeof token, "TOKEN TYPE"))
          user = authHelper.checkToken(token);
        }
        req.user = user;
      } catch (error) {
        console.log(chalk.red(error, "ERROR FROM CONTEXT"));
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
