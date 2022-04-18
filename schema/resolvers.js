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
    async getAllBoards(root, args, { models }) {
      return models.Board.findAll();
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

    async createBoard(root, { userId, title }, { models }) {
      return models.Board.create({ userId, title });
    },

    async createTask(root, { boardId, title }, { models }) {
      return models.Task.create({ boardId, title });
    },
  },
  User: {
    async board(board) {
      return board.getBoard();
    },
  },
  Board: {
    async user(user) {
      return user.getUser();
    },
  },
  Task: {
    async board(board) {
      return board.getBoard();
    },
  },
};

module.exports = resolvers;
