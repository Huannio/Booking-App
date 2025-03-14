const userRouter = require("./user");
const authRouter = require("./auth");
const shipRouter = require("./ship");
const userCataloguesRouter = require("./userCatalogues");
const blogsRouter = require("./blogs");
const permissionManagementRouter = require("./permissionManagement");
const userPermissionRouter = require("./userPermission");

const router = (app) => {
  app.use("/users", userRouter);
  app.use("/users-catalogues", userCataloguesRouter);
  app.use("/auth", authRouter);
  app.use("/ships", shipRouter);
  app.use("/blogs", blogsRouter);
  app.use("/permissions-management", permissionManagementRouter);
  app.use("/users-permissions", userPermissionRouter)
};

module.exports = router;
