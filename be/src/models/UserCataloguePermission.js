"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCataloguePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCataloguePermission.belongsTo(models.UserCatalogues, {
        foreignKey: "user_catalogue_id",
        as: "user_catalogue",
      });
      UserCataloguePermission.belongsTo(models.Permissions, {
        foreignKey: "permission_id",
        as: "permission",
      });
    }
  }
  UserCataloguePermission.init(
    {
      user_catalogue_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "UserCataloguePermission", // name of the model
      tableName: "user_catalogue_permission", // name of the table
      timestamps: false,
    }
  );
  return UserCataloguePermission;
};
