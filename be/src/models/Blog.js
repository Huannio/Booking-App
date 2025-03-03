"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.BlogType, {
        foreignKey: "type_id",
        as: "type",
      });
      Blog.hasMany(models.LongDescBlog, {
        foreignKey: "blog_id",
        as: "long_desc",
      });
    }
  }
  Blog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      short_desc: DataTypes.TEXT,
      thumbnail: DataTypes.TEXT,
      type_id: DataTypes.INTEGER,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Blog",
      tableName: "blog",
    }
  );
  return Blog;
};
