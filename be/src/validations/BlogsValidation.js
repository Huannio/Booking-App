const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../middleware/ApiError");

const createBlog = async (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    short_desc: Joi.string().required(),
    type_id: Joi.number().required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false }); // abortEarly: false will return all errors
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, new Error(error.message)));
  }
};

module.exports = { createBlog };
