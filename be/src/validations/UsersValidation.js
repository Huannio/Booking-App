const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../middleware/ApiError");
const createNewUser = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().trim().strict(),
    email: Joi.string().email().required().trim().strict(),
    user_catalogues_id: Joi.number().required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false }); // abortEarly: false will return all errors
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, new Error(error.message)));
  }
};

const updateUser = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().strict(),
    email: Joi.string().email().trim().strict(),
    user_catalogues_id: Joi.number().required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, new Error(error.message)));
  }
};

module.exports = {
  createNewUser,
  updateUser,
};
