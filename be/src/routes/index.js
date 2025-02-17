const userRouter = require("./user");
const roleRouter = require("./role");
const authRouter = require("./auth");
const shipRouter = require("./Ship");

const authorizeJWT = require("../middleware/authorize");

const router = (app) => {
  app.use("/roles", roleRouter);
  app.use("/users", authorizeJWT, userRouter);
  app.use("/auth", authRouter);
  app.use("/ship", shipRouter);
};

module.exports = router;
