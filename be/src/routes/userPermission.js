const express = require("express");
const router = express.Router();

const UserPermissionController = require("../app/controllers/UserPermissionController");
const checkPermission = require("../middleware/checkPermission");
const authorizeJWT = require("../middleware/authorize");
router.post(
  "/update",
  authorizeJWT,
  checkPermission("users-permissions.index"),
  UserPermissionController.update
);

// GET /user-permission/:id
router.get(
  "/:id",
  authorizeJWT,
  checkPermission("users-permissions.index"),
  UserPermissionController.index
);

module.exports = router;
