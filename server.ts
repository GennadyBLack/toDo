// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();
const port = 4000;

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
models.sequelize.authenticate().then(async()=>{
  await models.sequelize.sync({logging:console.log,force:true});
});
//создаем таблицы, {force:true} для удаления всех таблиц

//настраиваем аполо сервер
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {

      return { models, req };
    },
  });
  //стартуем
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}
startServer();

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:localhost:${port}${apolloServer?.graphqlPath}`
  )
);
