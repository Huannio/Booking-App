"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permissions.belongsToMany(models.UserCatalogues, {
        through: models.UserCataloguePermission,
        foreignKey: "permission_id",
        otherKey: "user_catalogue_id",
        as: "user_catalogues",
      });
    }
  }
  Permissions.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      canonical: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      module: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Permissions",
      tableName: "permissions",
    }
  );
  return Permissions;
};
