const express = require("express");
const router = express.Router();
const RoomController = require("../app/controllers/RoomController");
const upload = require("../middleware/upload");
const authorizeJWT = require("../middleware/authorize");
const checkPermission = require("../middleware/checkPermission");

// POST /rooms/updateFeature/:id
router.post("/updateFeature/:id", RoomController.updateFeature);

// POST /rooms/create/:slug
router.post("/create/:slug", upload.array("images"), RoomController.create);

// PUT /rooms/update/:id
router.put("/update/:id", upload.array("images"), RoomController.update);

// DELETE /rooms/delete/:id
router.delete("/delete/:id", RoomController.delete);

// GET /rooms/:slug
router.get("/:slug", RoomController.show);

// GET /rooms/:id
router.get("/id/:id", RoomController.index);

module.exports = router;
