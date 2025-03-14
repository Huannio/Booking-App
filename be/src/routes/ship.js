const express = require("express");
const router = express.Router();
const ShipController = require("../app/controllers/ShipController");
const upload = require("../middleware/upload");
const authorizeJWT = require("../middleware/authorize");
const checkPermission = require("../middleware/checkPermission");
// POST /ship/create
router.post(
  "/create",
  authorizeJWT,
  checkPermission("ships.create"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ShipController.create
);

// PUT /ship/update/:slug
router.put(
  "/update/:slug",
  authorizeJWT,
  checkPermission("ships.update"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  ShipController.update
);

// DELETE /ship/delete/:slug
router.delete(
  "/delete/:slug",
  authorizeJWT,
  checkPermission("ships.delete"),
  ShipController.delete
);

// GET /ship/cruise-category
router.get("/cruise-category", ShipController.getCruiseCategory);


// GET /ship/:slug
router.get("/:slug", ShipController.index);

// GET /ship
router.get("/", ShipController.show);
module.exports = router;