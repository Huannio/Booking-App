const userRouter = require("./user");
const roleRouter = require("./role");
const authRouter = require("./auth");

const router = (app) => {
  app.use("/roles", roleRouter);
  app.use("/users", userRouter);
  app.use("/auth", authRouter);
};

module.exports = router;
