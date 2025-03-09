"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feature.belongsTo(models.FeatureType, {
        foreignKey: "feature_types_id",
        as: "types",
      });

    //   Feature.hasMany(models.Products, {
    //     foreignKey: "id",
    //     as: "product",
    //   });
    }
  }
  Feature.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      icon: DataTypes.TEXT,
      text: DataTypes.STRING,
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "feature_types",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Features",
      tableName: "features",
    }
  );
  return Feature;
};
