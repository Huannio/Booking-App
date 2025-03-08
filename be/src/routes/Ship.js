const express = require("express");
const router = express.Router();

const ShipsValidation = require("../validations/ShipsValidation");
const upload = require("../middleware/upload");
const ShipController = require("../app/controllers/ShipController");

// GET /ships
router.get("/", ShipController.show);

// POST /ships/create
router.post(
  "/create",
  upload.single("thumbnail"),
  upload.array("images"),
  ShipsValidation.createShip,
  ShipController.create
);

// GET /ships/types
router.get("/types", ShipController.getTypes);

// GET /ships/:id
router.get("/:id", ShipController.index);


// PUT /ships/update/:id
router.put("/update/:id", upload.single("thumbnail"), upload.array("images"), ShipController.update);

// DELETE /ships/delete/:id
router.delete("/delete/:id", ShipController.delete);

// PUT /ships/:id/features
// router.put("/:id/features", ShipController.updateFeatures);

module.exports = router;
