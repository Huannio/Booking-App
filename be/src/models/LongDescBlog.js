"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LongDescBlog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LongDescBlog.belongsTo(models.Blog, {
        foreignKey: "blog_id",
        as: "blog",
      });
      LongDescBlog.belongsTo(models.LongDescType, {
        foreignKey: "type_id",
        as: "type",
      });
    }
  }
  LongDescBlog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      blog_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      image_url: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "LongDescBlog",
      tableName: "long_desc_blog",
    }
  );
  return LongDescBlog;
};
