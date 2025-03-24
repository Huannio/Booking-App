
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CruiseCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CruiseCategory.hasMany(models.Cruise, {
        foreignKey: "category_id",
        as: "cruise_category",
      });
    }
  }
  CruiseCategory.init(
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
      image: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "CruiseCategory",
      tableName: "cruise_category",
    }
  );
  return CruiseCategory;
};
