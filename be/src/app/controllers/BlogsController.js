const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../../config/cloudinary");
const BlogsService = require("../services/BlogsService");
const uploadToCloudinary = require("../../utils/cloudinary");

class BlogsController {
  constructor() {
    this.blogsService = BlogsService;
  }

  index = async (req, res, next) => {
    try {
      const data = await this.blogsService.getBlogById(req.params.id);
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const data = await this.blogsService.getAllBlog();
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.blogsService.createBlog(req.body, req.file);
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo thông tin bài viết mới thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.blogsService.updateBlog(
        req.body,
        req.file,
        req.params.id
      );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật bài viết thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  createDetails = async (req, res, next) => {
    try {
      const createBlogDetails = await this.blogsService.createBlogDetails(
        req.body,
        req.files
      );
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo chi tiết bài viết thành công",
        createBlogDetails,
      });
    } catch (error) {
      next(error);
    }
  };

  updateDetails = async (req, res, next) => {
    try {
      const updateBlogDetails = await this.blogsService.updateBlogDetails(
        req.body,
        req.files
      );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật chi tiết bài viết thành công!",
        updateBlogDetails,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = await this.blogsService.deleteBlog(req.params.id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa thành công!",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getDescriptionsBlog = async (req, res, next) => {
    try {
      const blogDescriptions = await this.blogsService.getDescriptionsBlog(
        req.params.id
      );
      return res.status(StatusCodes.OK).json(blogDescriptions);
    } catch (error) {
      next(error);
    }
  };

  getTypeBlogDescriptions = async (req, res, next) => {
    try {
      const blogDescriptionsTypes =
        await this.blogsService.getTypeBlogDescriptions();
      return res.status(StatusCodes.OK).json(blogDescriptionsTypes);
    } catch (error) {
      next(error);
    }
  };

  getTypes = async (req, res, next) => {
    try {
      const blogTypes = await this.blogsService.getTypes();
      return res.status(StatusCodes.OK).json(blogTypes);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new BlogsController();
