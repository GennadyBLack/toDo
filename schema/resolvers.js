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
      bcrypt.hash(password, rounds, (error, hash) => {
        if (error) res.status(500).json({ error: error });
        else {
          const newUser = models.User.build({
            name,
            email,
            password,
          });
          newUser
            .save()
            .then((user) => {
              return user;
            })
            .catch((error) => {
              {
                error: "cold not create user";
              }
            });
        }
      });
    },
    async loginUser(root, { email, password }, { models }) {
      await models.User.findOne({ where: { email: email } })
        .then((user) => {
          if (!user) return { errors: "no user with that email found" };
          else {
            bcrypt.compare(password, user.password, (errors, match) => {
              if (errors) return { error: errors };
              else if (match) return { token: generateToken(user), user: user };
              else return { error: "passwords do not match" };
            });
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
