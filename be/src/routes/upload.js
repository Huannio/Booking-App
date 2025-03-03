const express = require("express");
const router = express.Router();
const UploadController = require("../app/controllers/UploadController");
const upload = require("../middleware/upload");
// GET /upload
router.post("/image", upload.array("images"), UploadController.uploadImage);

module.exports = router;
