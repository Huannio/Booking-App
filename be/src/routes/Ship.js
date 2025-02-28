const express = require("express");
const router = express.Router();
const ShipController = require("../app/controllers/ShipController");

// GET /Ship
router.get("/", ShipController.show);

// GET /Ship/:id
router.get("/:id", ShipController.index);

// POST /Ship/create
router.post("/create", ShipController.create);

// PUT /Ship/update/:id
router.put("/update/:id", ShipController.update);

// DELETE /Ship/delete/:id
router.delete("/delete/:id", ShipController.delete);

module.exports = router;
