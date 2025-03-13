const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");

const shipRouter = require("./Ship");
const FeatureRouter = require("./feature");
const path = require("path");
const cruises = require("./cruise");

const userCataloguesRouter = require("./userCatalogues");
const blogsRouter = require("./blogs");
const authorizeJWT = require("../middleware/authorize");

const router = (app) => {
  app.use("/users", authorizeJWT, userRouter);
  app.use("/users-catalogues", userCataloguesRouter);
  app.use("/auth", authRouter);
  
  app.use("/ships", shipRouter);
  app.use("/features", FeatureRouter);
  app.use("/blogs", blogsRouter);
  app.use("/cruises", cruises);
};

module.exports = router;
