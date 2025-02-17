'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Mối quan hệ giữa Ship và các models khác (nếu có)
      // Ví dụ: Một Ship có thể thuộc về một User (người dùng quản lý)
      Ship.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
      // Mối quan hệ với Role (nếu cần thiết)
      // Ship.belongsTo(models.Roles, { foreignKey: "role_id", as: "role" });
    }
  }
  
  Ship.init({
    title: DataTypes.STRING,
    address:  DataTypes.STRING,
    map_link:  DataTypes.TEXT ,
    map_iframe_link:  DataTypes.TEXT,
    default_price:  DataTypes.DECIMAL,
    slug:  DataTypes.STRING,
    num_reviews:  DataTypes.INTEGER,
    score_review:  DataTypes.FLOAT,
    schedule:  DataTypes.STRING,
    thumbnail:  DataTypes.TEXT,
    images:  DataTypes.TEXT,
    type_product:  DataTypes.INTEGER.UNSIGNED,
    active:  DataTypes.TINYINT,
    created_at:  DataTypes.DATE,
    updated_at:  DataTypes.DATE,
    deleted_at: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'products',
  });

  return Ship;
};
