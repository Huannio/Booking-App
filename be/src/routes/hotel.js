const express = require("express");
const router = express.Router();
const HotelController = require("../app/controllers/HotelController");
const upload = require("../middleware/upload");
const checkPermission = require("../middleware/checkPermission");
const authorizeJWT = require("../middleware/authorize");

// GET /hotel/active
router.get("/active", HotelController.getActive);

// GET /hotel/search
router.get("/search", HotelController.search);

// POST /hotel/createDetail/:slug
router.post(
  "/createDetail/:slug",
  authorizeJWT,
  checkPermission("hotel.update"),
  upload.array("images"),
  HotelController.createDetail
);

// PUT /hotel/updateDetail/:slug
router.put(
  "/updateDetail/:slug",
  authorizeJWT,
  checkPermission("hotel.update"),
  upload.array("images"),
  HotelController.updateDetail
);

// POST /hotel/create
router.post(
  "/create",
  authorizeJWT,
  checkPermission("hotel.create"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  HotelController.create
);

// PUT /hotel/update/:slug
router.put(
  "/update/:slug",
  authorizeJWT,
  checkPermission("hotel.create"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  HotelController.update
);

// DELETE /hotel/delete/:slug
router.delete(
  "/delete/:slug",
  authorizeJWT,
  checkPermission("hotel.create"),
  HotelController.delete
);

// GET /hotel/city
router.get("/city", HotelController.getCity);

// GET /hotel/:slug
router.get("/:slug", HotelController.index);

// GET /hotel
router.get("/", HotelController.show);
module.exports = router;
