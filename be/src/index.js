const env = require("./config/environment");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/ErrorHandler");
const sequelize = require("./config/database");
const app = express();
const port = env.PORT || 3000;

// Fix cache from disk (GONE - 410)
app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache");
  next();
});

app.use(
  cors({
    origin: env.ORIGIN,
    credentials: true,
  })
);
// Middleware
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// HTTP logger
app.use(morgan("combined"));

// Database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

router(app);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
