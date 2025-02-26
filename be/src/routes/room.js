const express = require("express");
const router = express.Router();
const RoomController = require("../app/controllers/RoomController");

// GET /Room
router.get("/", RoomController.show);

// GET /Room/:id
router.get("/:id", RoomController.index);

// POST /Room/create
router.post("/create", RoomController.create);

// PUT /Room/update/:id
router.put("/update/:id", RoomController.update);

// DELETE /Room/delete/:id
router.delete("/delete/:id", RoomController.delete);

module.exports = router;
