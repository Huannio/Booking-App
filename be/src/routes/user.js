const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/UserController");

// GET /users
router.get("/", UserController.show);

// GET /users/:id
router.get("/:id", UserController.index);

// POST /users/create
router.post("/create", UserController.create);

// POST /users/search
router.get("/search", UserController.search);

// PUT /users/update/:id
router.put("/update/:id", UserController.update);

// DELETE /users/delete/:id
router.delete("/delete/:id", UserController.delete);

module.exports = router;
