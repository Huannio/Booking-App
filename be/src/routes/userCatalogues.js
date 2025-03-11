const express = require("express");
const router = express.Router();
const UserCataloguesController = require("../app/controllers/UserCataloguesController");

// POST /users-catalogues/create
router.post("/create", UserCataloguesController.create);

// PUT /users-catalogues/update/:id
router.put("/update/:id", UserCataloguesController.update);

// DELETE /users-catalogues/delete/:id
router.delete("/delete/:id", UserCataloguesController.delete);

// GET /users-catalogues/:id
router.get("/:id", UserCataloguesController.index);

// GET /users-catalogues
router.get("/", UserCataloguesController.show);

module.exports = router;
