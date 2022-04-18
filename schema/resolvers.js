//описание возможных запросов
const resolvers = {
  Query: {
    async getUser(root, { id }, { models, req }) {
      return models.User.findByPk(id);
    },
    async getAllUsers(root, args, { models }) {
      return models.User.findAll();
    },
    async getBoard(root, { id }, { models }) {
      return await models.Board.findByPk(id);
    },
    async getTask(root, { id }, { models, req }) {
      return models.Task.findByPk(id);
    },
    async getAllTasks(root, args, { models }) {
      return models.Tasks.findAll();
    },
    async hello(root) {
      return "Hello mister Aidar";
    },
    async me(root, _, { models, req }) {
      console.log(req);
      return models.User.findAll();
    },
  },
  Mutation: {
    async createUser(root, { name, email, password }, { models }) {
      return models.User.create({ name, email, password });
    },

    async createBoard(root, { UserId, title }, { models }) {
      return models.Board.create({ UserId, title });
    },

    async createTask(root, { BoardId, title }, { models }) {
      return models.Task.create({ BoardId, title });
    },
  },
  User: {
    async Board(Board) {
      return Board.getBoard();
    },
  },
  Board: {
    async User(User) {
      return User.getUser();
    },
  },
  Task: {
    async Task(Task) {
      return Task.getTask();
    },
  },
};

module.exports = resolvers;
