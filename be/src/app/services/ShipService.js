const { StatusCodes } = require("http-status-codes");
const {
  Products,
  ProductType,
  Cruise,
  CruiseCategory,
} = require("../../models");
const { Op, where } = require("sequelize");
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
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getCruiseCategory() {
    try {
      return await CruiseCategory.findAll({
        attributes: ["id", "name"],
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
        images,
        thumbnail,
      } = reqBody;

      const ship = await this.getShipBySlug(slug);
      const checkShip = await Products.findOne({
        where: { slug: slugify(title), id: { [Op.ne]: ship.id } },
      });

      if (checkShip) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên du thuyền đã tồn tại!");
      }

      console.log(checkShip);

      let imageLinkList = [];
      let thumbnailLink = null;
      if (reqFiles) {
        if (reqFiles.thumbnail) {
          const thumbnail = await uploadToCloudinary(
            reqFiles.thumbnail[0].buffer
            // "thumbnail"
          );
          thumbnailLink = thumbnail.url;
        }

        if (reqFiles.images) {
          imageLinkList = await Promise.all(
            reqFiles.images.map(async (image) => {
              const uploadedImage = await uploadToCloudinary(
                image.buffer
                // slug
              );
              return uploadedImage.url;
            })
          );
        }
      }

      if (images && imageLinkList.length > 0) {
        imageLinkList.push(...images.split(","));
        imageLinkList = imageLinkList.join(",");
      }

      if (!images && imageLinkList.length > 0) {
        imageLinkList = imageLinkList.join(",");
      }

      if (images && imageLinkList.length === 0) {
        imageLinkList = images;
        imageLinkList = imageLinkList.join(",");
      }

      if (thumbnail) {
        thumbnailLink = thumbnail;
      }

      const product = await Products.update(
        {
          title,
          address,
          map_link,
          map_iframe_link,
          default_price,
          thumbnail: thumbnailLink,
          images: imageLinkList,
          type_product_id: 1,
          slug: slugify(title),
          active: true,
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
        {
          where: { id: ship.id },
        }
      );

      return {
        product,
        cruise,
      };
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
}

module.exports = new ShipService();
