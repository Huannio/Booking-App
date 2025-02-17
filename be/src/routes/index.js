const userRouter = require("./user");
const roleRouter = require("./role");
const authRouter = require("./auth");

const authorizeJWT = require("../middleware/authorize");

const router = (app) => {
  app.use("/roles", roleRouter);
  app.use("/users", authorizeJWT, userRouter);
  app.use("/auth", authRouter);
};

module.exports = router;
