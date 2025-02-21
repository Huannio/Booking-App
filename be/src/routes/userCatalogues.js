const express = require("express");
const router = express.Router();
const UserCataloguesController = require("../app/controllers/UserCataloguesController");

// GET /users
router.get("/", UserCataloguesController.show);

module.exports = router;
