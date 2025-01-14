require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  'root',
  null,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
