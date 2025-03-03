const express = require("express");
const router = express.Router();
const CruiseCategoryController = require("../app/controllers/CruiseCategoryController");

// GET /users
router.get("/", CruiseCategoryController.show);

module.exports = router;
