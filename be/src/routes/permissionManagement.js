const express = require("express");
const router = express.Router();
const PermissionManagementController = require("../app/controllers/PermissionManagementController");

// POST /permissions-management/create
router.post(
  "/create",
  PermissionManagementController.create
);

// PUT /permissions-management/update/:id
router.put(
  "/update/:id",
  PermissionManagementController.update
);

// DELETE /permissions-management/delete/:id
router.delete(
  "/delete/:id",
  PermissionManagementController.delete
);

// GET /permissions-management/user-catalogues
router.get(
  "/user-catalogues",
  PermissionManagementController.getAllUserCataloguePermission
);

// GET /permissions-management/user-catalogues/:id
router.get(
  "/user-catalogues/:id",
  PermissionManagementController.getPermissionsByUserCatalogueId
);

// GET /permissions-management/:id
router.get("/:id", PermissionManagementController.index);

// GET /permissions-management
router.get("/", PermissionManagementController.show);

module.exports = router;
