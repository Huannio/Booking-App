"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeatureTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeatureTypes.hasMany(models.Features, {
        foreignKey: "type",
        as: "feature",
      });
    }
  }
  FeatureTypes.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FeatureTypes", 
      tableName: "feature_types", 
    }
  );
  return FeatureTypes;
};
