//описание возможных запросов
const bcrypt = require("bcrypt");
const rounds = 10;
const jwt = require("jsonwebtoken");
const { isConstructorDeclaration } = require("typescript");
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
    async getAllTasks(root, args, { models, req }) {
      try {
        if (req.user) {
          const filter = args.filter ? args.filter : {};
          console.log(filter, "FILTTTTTTEEER");
          filter.where["userId"] = req.user.id;
          let tasks = await models.Task.findAll({
            ...filter,
            order: [["id", "DESC"]],
          });

          return tasks;
        } else {
          throw new Error("please verify");
        }
      } catch (error) {
        console.log(error);
      }
    },
    // async getTasksByUser(root, __, { models, req }) {
    //   return models.Task.findAll({ where: { userId: req.user.id } });
    // },
    async me(_, __, { models, req }) {
      try {
        if (req?.user) {
          return req.user;
        }
      } catch (error) {
        return error;
      }
    },
  },
  Mutation: {
    async registerUser(root, { name, email, password }, { models }) {
      //используем промис, для того, чтобы через резолв вернуть юзера (ч/з обычный ретурн не работает)
      return await new Promise((resolve, reject) => {
        bcrypt.hash(password, rounds, async (error, hash) => {
          if (error) {
            console.log("error", error);
            throw new Error(error);
          } else {
            const newUser = await models.User.build({
              name,
              email,
              password: hash,
            });
            return newUser
              .save()
              .then((user) => {
                resolve({ token: generateToken(user), user: user });
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
      let pre = await models.User.findOne({ where: { email: email } })
        .then(async (user) => {
          console.log(user.password, "uuuuseeeeeerheeree");
          if (!user) return { errors: "no user with that email found" };
          else {
            return await new Promise((resolve, reject) =>
              bcrypt.compare(password, user.password, (errors, match) => {
                if (match) {
                  resolve({ token: generateToken(user), user: user });
                } else if (errors) {
                  return { error: errors };
                } else reject({ error: "passwords do not match" });
              })
            );
          }
        })
        .catch((error) => {
          return error;
        });
      console.log(pre, "preeeeeeee");
      return pre;
    },
    async createUser(root, { name, email, password }, { models }) {
      return models.User.create({ name, email, password });
    },
    async deleteUser(root, { id }, { models }) {
      const res = await models.User.destroy({ where: { id } });
      console.log(res);
      return "deleted";
    },

    async createTask(
      root,
      { title, important = false, completed = false },
      { models, req }
    ) {
      let userId = req.user.id;

      console.log(userId, "userId");
      return await models.Task.create({
        userId,
        title,
        important,
        completed,
      });
    },

    async updateTask(root, { id, title, important, completed }, { models }) {
      try {
        //Сначала находим объект, потом апдейтим. Т.к. иначе update вернёт только кол-во изменённых строк
        const res = await models.Task.findByPk(id).then((task) =>
          task.update({ title, important, completed })
        );
        console.log(res);
        return res;
      } catch (e) {
        throw new Error(e);
      }
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
