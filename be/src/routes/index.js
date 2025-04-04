const express = require("express");
const userRouter = require("./user");
const authRouter = require("./auth");

const shipRouter = require("./ship");
const FeatureRouter = require("./feature");
const hotelRouter = require("./hotel");
const roomRouter = require("./rooms");

const userCataloguesRouter = require("./userCatalogues");
const blogsRouter = require("./blogs");
const permissionManagementRouter = require("./permissionManagement");
const userPermissionRouter = require("./userPermission");

const orders = require("./orders");


const router = (app) => {
  app.use("/users", userRouter);
  app.use("/users-catalogues", userCataloguesRouter);
  app.use("/auth", authRouter);
  app.use("/ships", shipRouter);
  app.use("/features", FeatureRouter);
  app.use("/blogs", blogsRouter);
  app.use("/hotel", hotelRouter);
  app.use("/permissions-management", permissionManagementRouter);
  app.use("/users-permissions", userPermissionRouter)
  app.use("/rooms", roomRouter);
  app.use("/orders", orders);
};

module.exports = router;
