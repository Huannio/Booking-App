const express = require("express");
const router = express.Router();
const YachtController = require("../app/controllers/YachtController");

// GET /yachts - Lấy danh sách du thuyền
router.get("/", YachtController.getAll);

// GET /yachts/:id - Lấy thông tin chi tiết một du thuyền
router.get("/:id", YachtController.getById);

// POST /yachts/create - Tạo mới du thuyền
router.post("/create", YachtController.create);

// PUT /yachts/update/:id - Cập nhật thông tin du thuyền
router.put("/update/:id", YachtController.update);

// DELETE /yachts/delete/:id - Xóa du thuyền
router.delete("/delete/:id", YachtController.delete);

module.exports = router;
