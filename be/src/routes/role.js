const express = require("express");
const router = express.Router();
const RoleController = require("../app/controllers/RoleController");

// GET /users
router.get("/", RoleController.show);

// POST /users/create
router.post("/create", RoleController.create);

module.exports = router;
