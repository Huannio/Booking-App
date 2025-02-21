const userRouter = require("./user");
const authRouter = require("./auth");
const userCataloguesRouter = require("./userCatalogues");
const authorizeJWT = require("../middleware/authorize");

const router = (app) => {
  app.use("/users", userRouter);
  app.use("/users-catalogues", userCataloguesRouter);
  app.use("/auth", authRouter);
};

module.exports = router;
