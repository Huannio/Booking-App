const express = require("express");
const router = express.Router();
const PermissionManagementController = require("../app/controllers/PermissionManagementController");

const authorizeJWT = require("../middleware/authorize");
const checkPermission = require("../middleware/checkPermission");

// POST /permissions-management/create
router.post(
  "/create",
  authorizeJWT,
  checkPermission("permissions-management.create"),
  PermissionManagementController.create
);

// PUT /permissions-management/update/:id
router.put(
  "/update/:id",
  authorizeJWT,
  checkPermission("permissions-management.update"),
  PermissionManagementController.update
);

// DELETE /permissions-management/delete/:id
router.delete(
  "/delete/:id",
  authorizeJWT,
  checkPermission("permissions-management.delete"),
  PermissionManagementController.delete
);

// GET /permissions-management/user-catalogues
router.get(
  "/user-catalogues",
  authorizeJWT,
  checkPermission("permissions-management.index"),
  PermissionManagementController.getAllUserCataloguePermission
);

// GET /permissions-management/user-catalogues/:id
router.get(
  "/user-catalogues/:id",
  authorizeJWT,
  checkPermission("permissions-management.index"),
  PermissionManagementController.getPermissionsByUserCatalogueId
);

// GET /permissions-management/:id
router.get(
  "/:id",
  authorizeJWT,
  checkPermission("permissions-management.index"),
  PermissionManagementController.index
);

// GET /permissions-management
router.get(
  "/",
  authorizeJWT,
  checkPermission("permissions-management.index"),
  PermissionManagementController.show
);

module.exports = router;
