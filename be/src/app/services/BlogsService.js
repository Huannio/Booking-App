const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../middleware/ApiError");
const { Blog, BlogType, LongDescBlog, LongDescType } = require("../../models");
const slugify = require("../../utils/slugify");
const uploadToCloudinary = require("../../utils/cloudinary");

class BlogsService {
  async getBlogById(id) {
    try {
      return await Blog.findOne({
        where: { id },
        attributes: ["id", "title", "short_desc", "thumbnail", "slug"],
        include: [
          {
            model: BlogType,
            as: "type",
            attributes: ["id", "type"],
          },
          {
            model: LongDescBlog,
            as: "long_desc",
            attributes: ["id", "type_id", "text", "blog_id", "image_url"],
            include: {
              model: LongDescType,
              as: "type",
              attributes: ["id", "type"],
            },
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllBlog() {
    try {
      return await Blog.findAll({
        attributes: [
          "id",
          "title",
          "short_desc",
          "thumbnail",
          "slug",
          "createdAt",
          "updatedAt",
        ],
        include: {
          model: BlogType,
          as: "type",
          attributes: ["type"],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createBlog(reqBody, reqFile) {
    try {
      const { title, short_desc, type_id } = reqBody;
      const data = {
        title,
        short_desc,
        type_id,
        slug: slugify(title),
      };
      if (reqFile) {
        const uploadImage = await uploadToCloudinary(
          reqFile.buffer,
          "thumbnail"
        );
        data.thumbnail = uploadImage.url;
      }

      return await Blog.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateBlog(reqBody, reqFile, id) {
    try {
      const { title, short_desc, type_id } = reqBody;
      const data = {
        title,
        short_desc,
        type_id,
      };

      if (reqFile) {
        const uploadImage = await uploadToCloudinary(
          reqFile.buffer
          // "thumbnail"
        );
        data.thumbnail = uploadImage.url;
      }

      return await Blog.update(data, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async createBlogDetails(reqBody, reqFiles) {
    try {
      const contentBlocks = JSON.parse(reqBody.contentBlocks);

      if (reqFiles) {
        const uploadImages = await Promise.all(
          reqFiles.map((file) => uploadToCloudinary(file.buffer, "default"))
        );

        let fileIndex = 0;
        contentBlocks.forEach((block) => {
          if (block.type === "Image") {
            block.file = uploadImages[fileIndex].url;
            fileIndex++;
          }
        });
      }

      let data = [];
      contentBlocks.forEach((block) => {
        data.push({
          blog_id: block.blog_id,
          type_id: block.type_id,
          text: block.content ?? null,
          image_url: block.file ?? null,
        });
      });

      return await LongDescBlog.bulkCreate(data);
    } catch (error) {
      throw error;
    }
  }

  async updateBlogDetails(reqBody, reqFiles) {
    try {
      const contentBlocks = JSON.parse(reqBody.contentBlocks);
      if (reqFiles) {
        const uploadImages = await Promise.all(
          reqFiles.map((file) => uploadToCloudinary(file.buffer))
        );

        let fileIndex = 0;
        contentBlocks.forEach((block) => {
          if (block.type === "Image" && !block.image_url) {
            block.file = uploadImages[fileIndex].url;
            fileIndex++;
          }
        });
      }

      let data = [];
      let blogId;
      contentBlocks.forEach((block) => {
        data.push({
          blog_id: block.blog_id,
          type_id: block.type_id,
          text: block.content ?? null,
          image_url: block.image_url ? block.image_url.url : block.file ?? null,
        });
        blogId = block.blog_id;
      });

      const blogDesc = await LongDescBlog.findAll({
        where: { blog_id: blogId },
      });

      if (blogDesc.length > 0) {
        const deleteData = await LongDescBlog.destroy({
          where: { blog_id: blogId },
        });

        if (deleteData) {
          return await LongDescBlog.bulkCreate(data);
        }
      }

      return await LongDescBlog.bulkCreate(data);
    } catch (error) {
      throw error;
    }
  }

  async deleteBlog(id) {
    try {
      return await Blog.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
  async getDescriptionsBlog(id) {
    try {
      return await LongDescBlog.findAll({
        where: { blog_id: id },
        attributes: ["id", "type_id", "text", "blog_id", "image_url"],
        include: {
          model: LongDescType,
          as: "type",
          attributes: ["id", "type"],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getTypeBlogDescriptions() {
    try {
      return await LongDescType.findAll({
        attributes: ["id", "type"],
      });
    } catch (error) {
      throw error;
    }
  }

  async getTypes() {
    try {
      return await BlogType.findAll({
        attributes: ["id", "type"],
      });
    } catch (error) {
      throw error;
    }
  }

  async getBlogByTypeId(id) {
    try {
      return await Blog.findAll({
        where: { type_id: id },
        attributes: ["id", "title", "short_desc", "thumbnail", "slug"],
        include: {
          model: BlogType,
          as: "type",
          attributes: ["type"],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getBlogPagination(limit, offset, blogTypeId) {
    try {
      const where = blogTypeId ? { type_id: blogTypeId } : null;
      const totalPages = await Blog.count({ where });
      const blogs = await Blog.findAndCountAll({
        where,
        limit,
        offset,
        attributes: [
          "id",
          "title",
          "short_desc",
          "thumbnail",
          "slug",
          "createdAt",
          "updatedAt",
        ],
        include: {
          model: BlogType,
          as: "type",
          attributes: ["type"],
        },
        order: [["createdAt", "DESC"]],
      });

      return {
        total: blogs.count,
        blogs: blogs.rows,
        totalPages: Math.ceil(totalPages / limit),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BlogsService();
