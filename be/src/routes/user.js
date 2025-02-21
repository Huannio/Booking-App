const express = require("express");
const router = express.Router();
const UsersValidation = require("../validations/usersValidation");
const UserController = require("../app/controllers/UserController");

// GET /users
router.get("/", UserController.show);

// GET /users/:id
router.get("/:id", UserController.index);

// POST /users/create
router.post("/create", UsersValidation.createNewUser, UserController.create);

// PUT /users/update/:id
router.put("/update/:id", UsersValidation.updateUser, UserController.update);

// DELETE /users/delete/:id
router.delete("/delete/:id", UserController.delete);

module.exports = router;
