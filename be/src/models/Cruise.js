"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cruise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cruise.belongsTo(models.CruiseCategory, {
        foreignKey: "category_id",
        as: "cruise_category",
      });

      Cruise.hasMany(models.Products, {
        foreignKey: "id",
        as: "product",
      });
    }
  }
  Cruise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,

        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cruise_category",
          key: "id",
        },
      },
      year: DataTypes.INTEGER,
      cabin: DataTypes.STRING,
      shell: DataTypes.STRING,
      trip: DataTypes.STRING,
      admin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cruise",
      tableName: "cruise",
    }
  );
  return Cruise;
};
