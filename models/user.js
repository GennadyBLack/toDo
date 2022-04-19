"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //ОБЯЗАТЕЛЬНО нужно так же прописывать обратную связь в ассоциативной модели !!!! без этого не будет работать графкл!!! { foreignKey: "userId" } так же обязательно
      User.hasMany(models.Board, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
