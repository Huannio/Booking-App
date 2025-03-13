"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LongDescType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LongDescType.hasMany(models.LongDescBlog, {
        foreignKey: "type_id",
        as: "long_desc",
      });
    }
  }
  LongDescType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LongDescType",
      tableName: "long_desc_type",
    }
  );
  return LongDescType;
};
