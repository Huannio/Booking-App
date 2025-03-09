const express = require("express");
const router = express.Router();
const BlogsController = require("../app/controllers/BlogsController");
const upload = require("../middleware/upload");
const BlogsValidation = require("../validations/BlogsValidation");

// GET /blogs/pagination
router.get("/pagination", BlogsController.getBlogPagination);

// POST /blogs/create
router.post(
  "/create",
  upload.single("thumbnail"),
  BlogsValidation.createBlog,
  BlogsController.create
);

// POST /blogs/createDetails
router.post(
  "/createDetails",
  upload.array("images"),
  BlogsController.createDetails
);

// GET /blogs/types/:id
router.get("/types/:id", BlogsController.getBlogByTypeId);

// GET /blogs/types
router.get("/types", BlogsController.getTypes);

// GET /blogs/descriptions/types
router.get("/descriptions/types", BlogsController.getTypeBlogDescriptions);

// PUT /blogs/updateDetails
router.put(
  "/updateDetails",
  upload.array("images"),
  BlogsController.updateDetails
);

// GET /blogs/descriptions/:id
router.get("/descriptions/:id", BlogsController.getDescriptionsBlog);

// PUT /blogs/update/:id
router.put("/update/:id", upload.single("thumbnail"), BlogsController.update);

// DELETE /blogs/delete/:id
router.delete("/delete/:id", BlogsController.delete);

// GET /blogs/:id
router.get("/:id", BlogsController.index);

// GET /blogs
router.get("/", BlogsController.show);

module.exports = router;
