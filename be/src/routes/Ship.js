const express = require("express");
const router = express.Router();

const ShipsValidation = require("../validations/ShipsValidation");
const ShipController = require("../app/controllers/ShipController");

// GET /users
router.get("/", ShipController.show);

// GET /users/:id
router.get("/:id", ShipController.index);

// POST /users/create

router.post("/create", ShipsValidation.createNewShip, ShipController.create);

// PUT /users/update/:id
router.put("/update/:id", ShipsValidation.updateShip, ShipController.update);

// DELETE /users/delete/:id
router.delete("/delete/:id", ShipController.delete);

module.exports = router;
