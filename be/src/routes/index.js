const userRouter = require("./user");
const authRouter = require("./auth");
const userCataloguesRouter = require("./userCatalogues");
const uploadRouter = require("./upload");
const blogsRouter = require("./blogs");
const authorizeJWT = require("../middleware/authorize");

const router = (app) => {
  app.use("/users", authorizeJWT, userRouter);
  app.use("/users-catalogues", userCataloguesRouter);
  app.use("/auth", authRouter);
  app.use("/upload", uploadRouter);
  app.use("/blogs", blogsRouter);
};

module.exports = router;
