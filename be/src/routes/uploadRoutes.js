const express = require("express");
const { uploadImage, upload } = require("../app/controllers/uploadController");

const router = express.Router();

// Route upload ảnh
router.post("/upload-thumbnail", upload.single("thumbnail"), uploadImage);
router.post("/upload-ship-images", upload.single("shipImages"), uploadImage);
module.exports = router;