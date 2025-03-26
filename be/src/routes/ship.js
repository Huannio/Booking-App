const express = require("express");
const router = express.Router();
const ShipController = require("../app/controllers/ShipController");
const upload = require("../middleware/upload");
const authorizeJWT = require("../middleware/authorize");
const checkPermission = require("../middleware/checkPermission");

// GET /ships/search
router.get("/search", ShipController.search);

// POST /ships/createDetail/:slug
router.post(
  "/createDetail/:slug",
  upload.array("images"),
  ShipController.createDetail
);

// PUT /ships/updateDetail/:slug
router.put(
  "/updateDetail/:slug",
  upload.array("images"),
  ShipController.updateDetail
);

// POST /ships/create
router.post(
  "/create",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ShipController.create
);

// PUT /ships/update/:slug
router.put(
  "/update/:slug",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ShipController.update
);

// DELETE /ships/delete/:slug
router.delete(
  "/delete/:slug",
  authorizeJWT,
  checkPermission("ships.delete"),
  ShipController.delete
);

// GET /ships/active
router.get("/active", ShipController.getActive);

// GET /ships/cruise-category
router.get("/cruise-category", ShipController.getCruiseCategory);

// GET /ship/feature
router.get("/feature", ShipController.getFeatureShip);

// GET /ships/:slug
router.get("/:slug", ShipController.index);

// GET /ships
router.get("/", ShipController.show);
module.exports = router;
