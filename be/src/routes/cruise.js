const express = require("express");
const router = express.Router();
const CruiseController = require("../app/controllers/CruiseController");

// GET /users
router.get("/", CruiseController.show);

module.exports = router;
