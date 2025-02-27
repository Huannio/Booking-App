const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../middleware/ApiError");

const createNewShip = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().trim().strict(),
    address: Joi.string().required().trim().strict(),
    shell: Joi.string().required().trim().strict(),
    year: Joi.number().required(),
    cabin: Joi.number().required(),
    admin: Joi.string().required().trim().strict(),
    map_link: Joi.string().uri().required(),
    map_iframe_link: Joi.string().uri().required(),
    schedule: Joi.string().required().trim().strict(),
    trip: Joi.string().required().trim().strict(),
    slug: Joi.string().required().trim().strict(),
    type_product: Joi.number().required(),
    active: Joi.number().valid(0, 1).required(),
    default_price: Joi.number().required(),
    num_reviews: Joi.number().required(),
    score_review: Joi.number().required(),
    thumbnail: Joi.string().uri().required(),
    images: Joi.string().uri().required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, new Error(error.message)));
  }
};

const updateShip = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().trim().strict(),
    address: Joi.string().trim().strict(),
    shell: Joi.string().trim().strict(),
    year: Joi.number(),
    cabin: Joi.number(),
    admin: Joi.string().trim().strict(),
    map_link: Joi.string().uri(),
    map_iframe_link: Joi.string().uri(),
    schedule: Joi.string().trim().strict(),
    trip: Joi.string().trim().strict(),
    slug: Joi.string().trim().strict(),
    type_product: Joi.number(),
    active: Joi.number().valid(0, 1),
    default_price: Joi.number(),
    num_reviews: Joi.number(),
    score_review: Joi.number(),
    thumbnail: Joi.string().uri(),
    images: Joi.string().uri(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, new Error(error.message)));
  }
};

module.exports = {
  createNewShip,
  updateShip,
};