const env = require("./environment");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(env.DATABASE, env.DBNAME, env.DBPASSWORD, {
  host: env.HOST,
  dialect: "mysql",
});

module.exports = sequelize;
