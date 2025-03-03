"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BlogType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BlogType.hasMany(models.Blog, {
        foreignKey: "type_id",
        as: "blog",
      });
    }
  }
  BlogType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BlogType",
      tableName: "blog_type",
    }
  );
  return BlogType;
};
