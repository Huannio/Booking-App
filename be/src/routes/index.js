const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");

const shipRouter = require("./Ship");
const path = require("path");
const cruiseRouter = require("./cruise");

const userCataloguesRouter = require("./userCatalogues");
const blogsRouter = require("./blogs");
const authorizeJWT = require("../middleware/authorize");

const router = (app) => {
  app.use("/users", authorizeJWT, userRouter);
  app.use("/users-catalogues", userCataloguesRouter);
  app.use("/auth", authRouter);
  

  app.use("/cruise", cruiseRouter);

  app.use("/ships", shipRouter);
  app.use("/blogs", blogsRouter);
};

module.exports = router;
