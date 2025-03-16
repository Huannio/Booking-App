const express = require("express");
const router = express.Router();
const HotelController = require("../app/controllers/HotelController");
const upload = require("../middleware/upload");

// POST /ship/create
router.post(
  "/create",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  HotelController.create
);

// PUT /ship/update/:slug
router.put(
  "/update/:slug",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  HotelController.update
);

// DELETE /ship/delete/:slug
router.delete("/delete/:slug", HotelController.delete);

// GET /ship/cruise-category
router.get("/cruise-category", HotelController.getCity);


// GET /ship/:slug
router.get("/:slug", HotelController.index);

// GET /ship
router.get("/", HotelController.show);
module.exports = router;