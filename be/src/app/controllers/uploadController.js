const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Đường dẫn đến thư mục frontend
const frontendThumbnailFolder = path.join(__dirname, "..", "..", "fe", "src", "assets", "thumbnail");
const frontendShipImagesFolder = path.join(__dirname, "..", "..", "fe", "src", "assets", "shipImages");

// Tạo thư mục nếu chưa tồn tại
const createUploadFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

// Cấu hình multer để lưu ảnh vào thư mục tùy chỉnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder = frontendThumbnailFolder; // Thư mục mặc định cho thumbnail
    if (file.fieldname === "shipImages") {
      uploadFolder = frontendShipImagesFolder; // Thư mục cho ảnh du thuyền
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

const upload = multer({ storage });

// Upload ảnh
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Không có file được tải lên!" });
  }

  // Trả về đường dẫn ảnh (tương đối so với thư mục frontend)
  const imageUrl = `/assets/${req.file.fieldname === "thumbnail" ? "thumbnail" : "shipImages"}/${req.file.filename}`;
  res.status(200).json({ imageUrl });
};

module.exports = { upload, uploadImage };