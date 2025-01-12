const homeRouter = require("./home");

const router = (app) => {
  app.use("/", homeRouter);
};

module.exports = router;
