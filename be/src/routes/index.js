const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");
const shipRouter = require("./Ship");
const uploadRoutes = require("./uploadRoutes");
const path = require("path");

const userCataloguesRouter = require("./userCatalogues");
const authorizeJWT = require("../middleware/authorize");
// const shipTypeRouter = require("./shipType");

const router = (app) => {
  app.use("/users", authorizeJWT, userRouter);
  app.use("/users-catalogues", userCataloguesRouter);
  app.use("/auth", authRouter);
  
  //ship
  app.use("/ships", shipRouter);
  // app.use("/ships-type", shipTypeRouter);
  app.use("/upload", uploadRoutes);
  app.use("/assets", express.static(path.join(__dirname, "..", "fe", "src", "assets")));

};

module.exports = router;
