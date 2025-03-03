const express = require("express");
const router = express.Router();

const ShipsValidation = require("../validations/ShipsValidation");
const ShipController = require("../app/controllers/ShipController");

// GET /ships
router.get("/", ShipController.show);

// GET /ships/:id
router.get("/:id", ShipController.index);

// POST /ships/create

router.post("/create", ShipsValidation.createNewShip, ShipController.create);

// PUT /ships/update/:id
router.put("/update/:id", ShipsValidation.updateShip, ShipController.update);

// DELETE /ships/delete/:id
router.delete("/delete/:id", ShipController.delete);

// PUT /ships/:id/features
router.put("/:id/features", ShipController.updateFeatures);

module.exports = router;
