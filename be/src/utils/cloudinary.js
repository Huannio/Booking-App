const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (buffer, folder = "default") => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      })
      .end(buffer);
  });
};

module.exports = uploadToCloudinary;