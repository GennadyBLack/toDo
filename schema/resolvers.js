//описание возможных запросов
const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
const tokenSecret = "my-token-secret";

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

const resolvers = {
  Query: {
    async getUser(root, { id }, { models, req }) {
      return models.User.findByPk(id);
    },
    async getAllUsers(root, args, { models }) {
      return models.User.findAll();
    },
    async getTask(root, { id }, { models, req }) {
      return models.Task.findByPk(id);
    },
    async getAllTasks(root, args, { models }) {
      return models.Tasks.findAll();
    },
    async me(_, __, { models, req }) {
      return req.user;
    },
  },
  Mutation: {
    async registerUser(root, { name, email, password }, { models }) {
      //используем промис, для того, чтобы через резолв вернуть юзера (ч/з обычный ретурн не работает)
      return await new Promise((resolve, reject) => {
        bcrypt.hash(password, rounds, async (error, hash) => {
          if (error) {
            console.log("error", error);
            res.status(500).json({ error: error });
          } else {
            const newUser = await models.User.build({
              name,
              email,
              password: hash,
            });
            return newUser
              .save()
              .then((user) => {
                resolve(user);
              })
              .catch((error) => {
                console.log(error);
                return {
                  error: "cold not create user",
                };
              });
          }
        });
      });
    },
    async loginUser(root, { email, password }, { models }) {
      return await models.User.findOne({ where: { email: email } })
        .then(async (user) => {
          if (!user) return { errors: "no user with that email found" };
          else {
            return await new Promise((resolve, reject) =>
              bcrypt.compare(password, user.password, (errors, match) => {
                if (errors) return { error: errors };
                else if (match)
                  resolve({ token: generateToken(user), user: user });
                else reject({ error: "passwords do not match" });
              })
            );
          }
        })
        .catch((error) => {
          return { errors: "no user with that email found" };
        });
    },
    async createUser(root, { name, email, password }, { models }) {
      return models.User.create({ name, email, password });
    },
    async deleteUser(root, { id }, { models }) {
      models.User.destroy({ where: { id } });
      return "deleted";
    },

    async createTask(root, { userId, title }, { models }) {
      return models.Task.create({ userId, title });
    },
    async deleteTask(root, { id }, { models }) {
      models.Task.destroy({ where: { id } });
      return "deleted";
    },
  },
  //ассоциации, чтобы потом можно было достать
  User: {
    async task(task) {
      return task.getTask();
    },
  },
  Task: {
    async user(user) {
      return user.getUser();
    },
  },
  // Task: {
  //   async board(board) {
  //     return board.getBoard();
  //   },
  // },
};

module.exports = resolvers;
