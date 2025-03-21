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

// PUT /ship/update/:id
router.put(
  "/update/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  HotelController.update
);

// DELETE /ship/delete/:id
router.delete("/delete/:id", HotelController.delete);

// GET /ship/cruise-category
router.get("/city", HotelController.getCity);


// GET /ship/:id
router.get("/:id", HotelController.index);

// GET /ship
router.get("/", HotelController.show);
module.exports = router;