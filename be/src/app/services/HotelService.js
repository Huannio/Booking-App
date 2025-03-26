const { StatusCodes } = require("http-status-codes");
const {
  Products,
  Hotel,
  Cities,
  Rooms,
  ProductType,
  Features,
} = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");
const slugify = require("../../utils/slugify");
const uploadToCloudinary = require("../../utils/cloudinary");

class HotelService {
  async getAllHotel() {
    try {
      return await Products.findAll({
        where: { type_product_id: 2 },
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
            model: Hotel,
            as: "hotel",
            attributes: ["id", "admin", "city_id"],
            include: [
              {
                model: Cities,
                as: "cities",
                attributes: ["name", "id"],
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

  async getHotelBySlug(slug) {
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
            model: Hotel,
            as: "hotel",
            attributes: ["id", "admin", "city_id"],
            include: [
              {
                model: Cities,
                as: "cities",
                attributes: ["name", "id"],
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

  async getCity() {
    try {
      return await Cities.findAll({
        attributes: ["id", "name", "image"],
      });
    } catch (error) {
      throw error;
    }
  }

  async createHotel(reqBody, reqFiles) {
    try {
      const {
        title,
        address,
        cities,
        default_price,
        map_iframe_link,
        map_link,
        admin,
      } = reqBody;

      const checkHotel = await Products.findOne({
        where: { slug: slugify(title) },
      });
      if (checkHotel) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên Khách sạn đã tồn tại!");
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
        type_product_id: 2,
        slug,
        active: true,
      });

      const hotel = await Hotel.create({
        id: product.id,
        city_id: cities,
        admin,
      });

      return {
        product,
        hotel,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateHotel(slug, reqBody, reqFiles) {
    try {
      const {
        title,
        address,
        cities,
        default_price,
        map_iframe_link,
        map_link,
        admin,
        images,
        thumbnail,
      } = reqBody;
      const hotel = await this.getHotelBySlug(slug);
      const checkHotel = await Products.findOne({
        where: { slug: slugify(title), id: { [Op.ne]: hotel.id } },
      });

      if (checkHotel) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên Khách sạn đã tồn tại!");
      }

      let imageLinkList = [];
      let thumbnailLink = null;
      if (reqFiles) {
        if (reqFiles.thumbnail) {
          const thumbnail = await uploadToCloudinary(
            reqFiles.thumbnail[0].buffer
          );
          thumbnailLink = thumbnail.url;
        }

        if (reqFiles.images) {
          imageLinkList = await Promise.all(
            reqFiles.images.map(async (image) => {
              const uploadedImage = await uploadToCloudinary(image.buffer);
              return uploadedImage.url;
            })
          );
        }
      }

      if (images && imageLinkList.length > 0) {
        imageLinkList.push(...images);
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
          type_product_id: 2,
          slug: slugify(title),
          active: true,
        },
        { where: { id: hotel.id } }
      );

      const updateHotel = await Hotel.update(
        {
          city_id: cities,
          admin,
        },
        {
          where: { id: hotel.id },
        }
      );

      return {
        product,
        updateHotel,
      };
    } catch (error) {
      throw error;
    }
  }
  async deleteHotel(slug) {
    try {
      return await Products.destroy({ where: { slug } });
    } catch (error) {
      throw error;
    }
  }
  async getHotelSearch(
    limit,
    offset,
    cityId,
    title,
    greaterDefaultPrice,
    lowerDefaultPrice
  ) {
    try {
      let whereHotel = {};
      let whereProducts = {};

      if (cityId != null) {
        whereHotel.city_id = cityId;
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
            model: Hotel,
            as: "hotel",
            where: whereHotel,
          },
        ],
      });

      // Về sau nếu thiếu trường nào thì hãy vào đây viết thêm để query vào trường đó
      const hotels = await Products.findAndCountAll({
        limit,
        offset,
        attributes: [
          "id",
          "title",
          "thumbnail",
          "slug",
          "address",
          "default_price",
        ],
        where: whereProducts,
        include: [
          {
            model: Hotel,
            as: "hotel",
            where: whereHotel,
            attributes: ["id", "city_id", "admin"],
          },
          {
            model: Features,
            as: "features",
            attributes: ["id", "icon", "text", "type"],
            through: { attributes: [] },
          },
        ],
        order: [["id", "ASC"]],
      });

      return {
        total: total,
        data: hotels.rows,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async getActiveHotel() {
    try {
      return await Products.findAll({
        where: { active: true, type_product_id: 2 },
        attributes: [
          "id",
          "title",
          "thumbnail",
          "slug",
          "address",
          "default_price",
        ],
        include: [
          {
            model: Hotel,
            as: "hotel",
            attributes: ["id", "admin"],
            include: [
              {
                model: Cities,
                as: "cities",
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
}

module.exports = new HotelService();
