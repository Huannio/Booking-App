require("dotenv").config();

const env = {
  PORT: process.env.PORT,
  HOSTDB: process.env.HOSTDB,
  DATABASE: process.env.DATABASE,
  DBNAME: process.env.DBNAME,
  DBPASSWORD: process.env.DBPASSWORD,
  ORIGIN: process.env.ORIGIN,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
};

module.exports = env;
