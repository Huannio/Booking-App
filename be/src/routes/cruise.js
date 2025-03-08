const express = require("express");
const router = express.Router();

const CruiseController = require("../app/controllers/CruiseController");

// GET /Cruises
router.get("/", CruiseController.show);

// GET /cruise-category
router.get("/cruise-category", CruiseController.getCategory);

module.exports = router;