const express = require("express");
const router = express.Router();
const UserCataloguesController = require("../app/controllers/UserCataloguesController");
const checkPermission = require("../middleware/checkPermission");
const authorizeJWT = require("../middleware/authorize");

// POST /users-catalogues/create
router.post(
  "/create",
  authorizeJWT,
  checkPermission("users-catalogues.create"),
  UserCataloguesController.create
);

// PUT /users-catalogues/update/:id
router.put(
  "/update/:id",
  authorizeJWT,
  checkPermission("users-catalogues.update"),
  UserCataloguesController.update
);

// DELETE /users-catalogues/delete/:id
router.delete(
  "/delete/:id",
  authorizeJWT,
  checkPermission("users-catalogues.delete"),
  UserCataloguesController.delete
);

// GET /users-catalogues/:id
router.get("/:id", UserCataloguesController.index);

// GET /users-catalogues
router.get("/", UserCataloguesController.show);

module.exports = router;
