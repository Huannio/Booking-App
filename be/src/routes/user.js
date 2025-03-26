const express = require("express");
const router = express.Router();

const UsersValidation = require("../validations/usersValidation");
const UserController = require("../app/controllers/UserController");
const checkPermission = require("../middleware/checkPermission");
const authorizeJWT = require("../middleware/authorize");

// GET /users/search
router.get("/search", UserController.search);

// POST /users/create

router.post(
  "/create",
  authorizeJWT,
  checkPermission("users.create"),
  UsersValidation.createNewUser,
  UserController.create
);

// PUT /users/update/:id
router.put(
  "/update/:id",
  authorizeJWT,
  checkPermission("users.update"),
  UsersValidation.updateUser,
  UserController.update
);

// DELETE /users/delete/:id
router.delete(
  "/delete/:id",
  authorizeJWT,
  checkPermission("users.delete"),
  UserController.delete
);

// PUT /users/verify-account
router.put(
  "/verify-account",
  UsersValidation.verifyAccount,
  UserController.verifyAccount
);

// GET /users/:id
router.get("/:id", UserController.index);

// GET /users
router.get("/", authorizeJWT, checkPermission("users.index"), UserController.show);

module.exports = router;
