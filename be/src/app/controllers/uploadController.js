const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../../config/cloudinary");

class UploadController {
  uploadImage = async (req, res, next) => {
    try {
      console.log("req.file", req.files);
      console.log("req.body", req.body);

      // const image = req?.file?.path;
      // const uploadedImage = [];
      // const results = await cloudinary.uploader.upload(image);
      // uploadedImage.push({
      //   url: results.secure_url,
      //   publicId: results.public_id,
      // });

      // console.log(results);
      return res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UploadController();
