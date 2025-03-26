const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const FeatureController = require("../app/controllers/FeatureController");

// POST /features/create
router.post(
    "/create",
    upload.single("icon"),
    FeatureController.create
);

// PUT /features/update/:id
router.put("/update/:id",
    upload.single("icon"),
    FeatureController.update
);

// GET /features/feature-types
router.get("/types", FeatureController.getTypes);

// DELETE /features/delete/:id
router.delete("/delete/:id", FeatureController.delete);

// GET /features/:id
router.get("/:id", FeatureController.index);

// GET /features
router.get("/", FeatureController.show);

module.exports = router;
