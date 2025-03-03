const express = require("express");
const router = express.Router();
const { upload, uploadImage } = require("../app/controllers/uploadController");

// Route để tải lên ảnh
router.post("/upload", upload.single("thumbnail"), uploadImage);

// Route tạo mới du thuyền với ảnh
// router.post("/ships", upload.fields([
//   { name: "thumbnail", maxCount: 1 }, // 1 ảnh thumbnail
//   { name: "shipImages", maxCount: 10 }, // Tối đa 10 ảnh du thuyền
// ]), (req, res) => {
//   try {
//     const { title, address } = req.body;

//     // Lấy đường dẫn ảnh từ file đã tải lên
//     const thumbnail = req.files["thumbnail"] ? `/assets/thumbnail/${req.files["thumbnail"][0].filename}` : null;
//     const shipImages = req.files["shipImages"] ? req.files["shipImages"].map(file => `/assets/shipImages/${file.filename}`) : [];

//     // Lưu thông tin vào cơ sở dữ liệu (ví dụ)
//     const newShip = {
//       title,
//       address,
      
//       thumbnail,
//       shipImages,
//     };

//     res.status(201).json({ message: "Tạo du thuyền thành công!", data: newShip });
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi server!", error: error.message });
//   }
// });

module.exports = router;