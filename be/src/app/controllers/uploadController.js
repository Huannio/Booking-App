const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Đường dẫn đến thư mục public
const publicThumbnailFolder = path.join(__dirname, "..", "public", "assets", "thumbnail");
const publicShipImagesFolder = path.join(__dirname, "..", "public", "assets", "shipImages");

// Tạo thư mục nếu chưa tồn tại
const createUploadFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

// Cấu hình multer để lưu ảnh vào thư mục tùy chỉnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder = publicThumbnailFolder; // Thư mục mặc định cho thumbnail
    if (file.fieldname === "shipImages") {
      uploadFolder = publicShipImagesFolder; // Thư mục cho ảnh du thuyền
    }
    createUploadFolder(uploadFolder); // Đảm bảo thư mục tồn tại
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + path.extname(file.originalname); // Tạo tên file duy nhất
    cb(null, filename);
  },
});

// Kiểm tra loại file (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Chỉ được phép tải lên file ảnh!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn kích thước file (5MB)
  },
});

// Upload ảnh
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file được tải lên!" });
  }

  // Trả về đường dẫn ảnh (tương đối so với thư mục public)
  const imageUrl = `/assets/${req.file.fieldname === "thumbnail" ? "thumbnail" : "shipImages"}/${req.file.filename}`;
  res.status(200).json({ imageUrl });
};

module.exports = { upload, uploadImage };