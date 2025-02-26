"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.belongsTo(models.UserCatalogues, {
        foreignKey: "user_catalogues_id",
        as: "user_catalogues",
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      publish: DataTypes.BOOLEAN,
      user_catalogues_id: DataTypes.INTEGER,
      active_token: DataTypes.TEXT,
      remember_token: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};