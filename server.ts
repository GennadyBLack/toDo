// server.js
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app: any = express(); //хз
const port: number = 4000;
const tokenSecret: string = "my-token-secret";
const jwt = require("jsonwebtoken");

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
models.sequelize.authenticate().then(async () => {
  await models.sequelize.sync({ logging: console.log, force: true });
});
//создаем таблицы, {force:true} для удаления всех таблиц

//настраиваем аполо сервер
let apolloServer = null;
async function startServer() {
  apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      debugger;
      let token: string = req.get("Authorization");
      //По идее это объект с нашим юзером, только захешированный в строку
      let user: null | object;
      try {
        if (token) {
          token = token.split(" ")[1];
          console.log(jwt.verify(token, tokenSecret).data);
          //на выходе снова получаем объект с юзером
          user = jwt.verify(token, tokenSecret).data;
          console.log(user, "USER");
        } else {
          user = null;
          console.log(user, "USER");
        }
        // return req.user;
      } catch (error: unknown) {
        throw new Error(error as string);
      }
      return { models, req, user };
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
