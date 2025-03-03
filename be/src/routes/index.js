const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");
const shipRouter = require("./Ship");
const uploadRoutes = require("./uploadRoutes");
const path = require("path");

const userCataloguesRouter = require("./userCatalogues");
const uploadRouter = require("./upload");
const blogsRouter = require("./blogs");
const authorizeJWT = require("../middleware/authorize");

const ShipTypeRouter = require("./ShipType");
const CruiseCategoryRouter = require("./CruiseCategory");

const router = (app) => {
  app.use("/users", authorizeJWT, userRouter);
  app.use("/users-catalogues", userCataloguesRouter);
  app.use("/auth", authRouter);
  
  //ship
  app.use("/ships", shipRouter);

  app.use("/upload", uploadRoutes);
  app.use("/assets", express.static(path.join(__dirname, "public", "assets")));

  //danh mục du thuyền
  app.use("/cruise-category", CruiseCategoryRouter);
  // loại du thuyền
  app.use("/ship-type", ShipTypeRouter);


  app.use("/upload", uploadRouter);
  app.use("/blogs", blogsRouter);
};

module.exports = router;
