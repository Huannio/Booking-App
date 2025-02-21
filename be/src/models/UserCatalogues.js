"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCatalogues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCatalogues.hasMany(models.Users, {
        foreignKey: "user_catalogues_id",
        as: "users",
      });
    }
  }
  UserCatalogues.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      publish: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UserCatalogues", // name of the model
      tableName: "user_catalogues", // name of the table
    }
  );
  return UserCatalogues;
};
