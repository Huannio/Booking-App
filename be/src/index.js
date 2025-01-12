require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const configViewEngine = require("./config/viewEngine");
const router = require("./routes/index");
const cors = require("cors");
const sequelize = require("./config/database");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Middleware
app.use(express.json()); // for parsing application/json
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


// Template Engine
configViewEngine(app);
router(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
