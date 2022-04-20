//описание возможных запросов
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
      return models.User.findAll();
    },
  },
  Mutation: {
    async createUser(root, { name, email, password }, { models }) {
      return models.User.create({ name, email, password });
    },
    async deleteUser(root, { id }, { models }) {
       models.User.destroy({ where: {id} });
      return "deleted";
    },

    async createTask(root, { userId, title }, { models }) {
      return models.Task.create({ userId, title });
    },
    async deleteTask(root, { id }, { models }) {
      models.Task.destroy({ where: {id} });
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
