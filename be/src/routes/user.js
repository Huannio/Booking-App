const express = require("express");
const router = express.Router();

const UsersValidation = require("../validations/usersValidation");
const UserController = require("../app/controllers/UserController");
const checkPermission = require("../middleware/checkPermission");
const authorizeJWT = require("../middleware/authorize");

router.use(authorizeJWT);

// GET /users/:id
router.get("/:id", UserController.index);

// POST /users/create

router.post(
  "/create",
  checkPermission("users.create"),
  UsersValidation.createNewUser,
  UserController.create
);

// PUT /users/update/:id
router.put(
  "/update/:id",
  checkPermission("users.update"),
  UsersValidation.updateUser,
  UserController.update
);

// DELETE /users/delete/:id
router.delete(
  "/delete/:id",
  checkPermission("users.delete"),
  UserController.delete
);

// GET /users
router.get("/", checkPermission("users.index"), UserController.show);

module.exports = router;
