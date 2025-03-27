const { StatusCodes } = require("http-status-codes");
const {
  Products,
  ProductType,
  Features,
  Cruise,
  CruiseCategory,
  LongDescProducts,
  LongDescType,
} = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");
const slugify = require("../../utils/slugify");
const uploadToCloudinary = require("../../utils/cloudinary");

class ShipService {
  async getAllShips() {
    try {
      return await Products.findAll({
        where: { type_product_id: 1 },
        attributes: [
          "id",
          "title",
          "address",
          "map_link",
          "map_iframe_link",
          "default_price",
          "slug",
          "num_reviews",
          "score_reviews",
          "schedule",
          "thumbnail",
          "images",
          "type_product_id",
          "active",
        ],
        include: [
          { model: ProductType, as: "type", attributes: ["name", "id"] },
          {
            model: Cruise,
            as: "cruise",
            attributes: ["id", "year", "cabin", "shell", "admin", "trip"],
            include: [
              {
                model: CruiseCategory,
                as: "cruise_category",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: Features,
            as: "features",
            attributes: ["text", "id", "icon"],
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getShipBySlug(slug) {
    try {
      return await Products.findOne({
        where: { slug },
        attributes: [
          "id",
          "title",
          "address",
          "map_link",
          "map_iframe_link",
          "default_price",
          "slug",
          "num_reviews",
          "score_reviews",
          "schedule",
          "thumbnail",
          "images",
          "type_product_id",
          "active",
        ],
        include: [
          { model: ProductType, as: "type", attributes: ["name", "id"] },
          {
            model: Cruise,
            as: "cruise",
            attributes: ["id", "year", "cabin", "shell", "admin", "trip"],
            include: [
              {
                model: CruiseCategory,
                as: "cruise_category",
                attributes: ["id", "name"],
              },
            ],
          },
          {
            model: Features,
            as: "features",
            attributes: ["text", "id", "icon"],
            through: { attributes: [] },
          },
          {
            model: LongDescProducts,
            as: "long_desc_products",
            attributes: [
              "id",
              "type_id",
              "product_id",
              "text",
              "caption",
              "image_url",
            ],
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

  async getCruiseCategory() {
    try {
      return await CruiseCategory.findAll({
        attributes: ["id", "name", "image"],
      });
    } catch (error) {
      throw error;
    }
  }

  async getFeatureShip(product_id) {
    try {
      return await Features.findAll({
        attributes: ["id", "icon", "text", "type"],
        include: [
          {
            model: Features,
            as: "features",
            attributes: ["text", "id", "icon"],
          },
          {
            model: Products,
            as: "products",
            attributes: ["id"],
            where: { id: product_id },
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async createShip(reqBody, reqFiles) {
    try {
      const {
        title,
        address,
        cruise_category,
        default_price,
        map_iframe_link,
        map_link,
        shell,
        cabin,
        year,
        admin,
        trip,
        schedule,
      } = reqBody;

      const checkShip = await Products.findOne({
        where: { slug: slugify(title) },
      });
      if (checkShip) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên du thuyền đã tồn tại!");
      }

      let imageLinkList = [];
      let thumbnailLink = null;
      const slug = slugify(title);
      if (reqFiles) {
        const thumbnail = await uploadToCloudinary(
          reqFiles.thumbnail[0].buffer,
          "thumbnail"
        );
        thumbnailLink = thumbnail.url;
        imageLinkList = await Promise.all(
          reqFiles.images.map(async (image) => {
            const uploadedImage = await uploadToCloudinary(image.buffer, slug);
            return uploadedImage.url;
          })
        );
      }

      const product = await Products.create({
        title,
        address,
        map_link,
        map_iframe_link,
        default_price,
        thumbnail: thumbnailLink,
        images: imageLinkList.join(","),
        type_product_id: 1,
        slug,
        active: true,
        schedule,
      });

      const cruise = await Cruise.create({
        id: product.id,
        category_id: cruise_category,
        shell,
        cabin,
        year,
        admin,
        trip,
      });
      return {
        product,
        cruise,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateShip(slug, reqBody, reqFiles) {
    try {
      const {
        title,
        address,
        cruise_category,
        default_price,
        map_iframe_link,
        map_link,
        shell,
        cabin,
        year,
        admin,
        trip,
        schedule,
        images: existingImages,
        thumbnail: existingThumbnail,
      } = reqBody;

      const ship = await this.getShipBySlug(slug);
      const checkShip = await Products.findOne({
        where: {
          slug: slugify(title),
          id: { [Op.ne]: ship.id },
        },
      });

      if (checkShip) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên du thuyền đã tồn tại!");
      }

      let thumbnailLink = existingThumbnail;
      if (reqFiles?.thumbnail) {
        const thumbnail = await uploadToCloudinary(
          reqFiles.thumbnail[0].buffer,
          "thumbnail"
        );
        thumbnailLink = thumbnail.url;
      }

      let imageLinkList = [];

      if (reqFiles?.images) {
        const newImageUrls = await Promise.all(
          reqFiles.images.map(async (image) => {
            const uploadedImage = await uploadToCloudinary(image.buffer, slug);
            return uploadedImage.url;
          })
        );
        imageLinkList.push(...newImageUrls);
      }

      if (existingImages) {
        imageLinkList.push(
          ...(Array.isArray(existingImages)
            ? existingImages
            : existingImages.split(","))
        );
      }

      const finalImageList = imageLinkList.join(",");

      const product = await Products.update(
        {
          title,
          address,
          map_link,
          map_iframe_link,
          default_price,
          thumbnail: thumbnailLink,
          images: finalImageList,
          type_product_id: 1,
          slug: slugify(title),
          active: true,
          schedule,
        },
        { where: { id: ship.id } }
      );

      const cruise = await Cruise.update(
        {
          category_id: cruise_category,
          shell,
          cabin,
          year,
          admin,
          trip,
        },
        { where: { id: ship.id } }
      );

      return { product, cruise };
    } catch (error) {
      throw error;
    }
  }

  async deleteShip(slug) {
    try {
      return await Products.destroy({ where: { slug } });
    } catch (error) {
      throw error;
    }
  }

  async getShipSearch(
    limit,
    offset,
    categoryId,
    title,
    greaterDefaultPrice,
    lowerDefaultPrice
  ) {
    try {
      let whereCruise = {};
      let whereProducts = {};

      if (categoryId != null) {
        whereCruise.category_id = categoryId;
      }

      if (title != null) {
        whereProducts = {
          title: {
            [Op.like]: `%${title}%`,
          },
        };
      }

      if (greaterDefaultPrice != null || lowerDefaultPrice != null) {
        whereProducts.default_price = {};
        if (greaterDefaultPrice != null) {
          whereProducts.default_price[Op.gte] = greaterDefaultPrice;
        }

        if (lowerDefaultPrice != null) {
          whereProducts.default_price[Op.lte] = lowerDefaultPrice;
        }
      }

      const total = await Products.count({
        where: whereProducts,
        include: [
          {
            model: Cruise,
            as: "cruise",
            where: whereCruise,
          },
        ],
      });

      // Về sau nếu thiếu trường nào thì hãy vào đây viết thêm để query vào trường đó
      const ships = await Products.findAndCountAll({
        limit,
        offset,
        attributes: ["id", "title", "thumbnail", "slug", "address"],
        where: whereProducts,
        include: [
          {
            model: Cruise,
            as: "cruise",
            where: whereCruise,
            attributes: [
              "id",
              "category_id",
              "shell",
              "cabin",
              "year",
              "admin",
              "trip",
            ],
            include: [
              {
                model: CruiseCategory,
                as: "cruise_category",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      return {
        total: total,
        data: ships.rows,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getActiveShip() {
    try {
      return await Products.findAll({
        where: { active: true, type_product_id: 1 },
        attributes: [
          "id",
          "title",
          "thumbnail",
          "slug",
          "address",
          "default_price",
          "schedule",
        ],
        include: [
          {
            model: Cruise,
            as: "cruise",
            attributes: [
              "id",
              "category_id",
              "shell",
              "cabin",
              "year",
              "admin",
              "trip",
            ],
            include: [
              {
                model: CruiseCategory,
                as: "cruise_category",
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async createDetail(slug, reqBody, reqFiles) {
    try {
      const contentBlocks = JSON.parse(reqBody.contentBlocks);

      if (reqFiles) {
        const uploadImages = await Promise.all(
          reqFiles?.map((file) => uploadToCloudinary(file.buffer, slug))
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
          product_id: block.product_id,
          type_id: block.type_id,
          text: block.content ?? null,
          image_url: block.file ?? null,
          caption: block.caption ?? null,
        });
      });

      return await LongDescProducts.bulkCreate(data);
    } catch (error) {
      throw error;
    }
  }

  async updateDetail(slug, reqBody, reqFiles) {
    try {
      const contentBlocks = JSON.parse(reqBody.contentBlocks);

      if (reqFiles) {
        const uploadImages = await Promise.all(
          reqFiles?.map((file) => uploadToCloudinary(file.buffer, slug))
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
      let productId;
      contentBlocks.forEach((block) => {
        data.push({
          product_id: block.product_id,
          type_id: block.type_id,
          text: block.content ?? null,
          image_url: block.image_url ? block.image_url.url : block.file ?? null,
          caption: block.caption ?? null,
        });
        productId = block.product_id;
      });

      const longDescProduct = await LongDescProducts.findAll({
        where: { product_id: productId },
      });

      if (longDescProduct.length > 0) {
        await LongDescProducts.destroy({
          where: { product_id: productId },
        });
      }
      return await LongDescProducts.bulkCreate(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ShipService();
