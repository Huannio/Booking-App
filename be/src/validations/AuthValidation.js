const Joi = require("joi");
const { StatusCodes } = require("http-status-codes");
const ApiError = require("../middleware/ApiError");

const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim().strict(),
    password: Joi.string().required().trim().strict(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false }); // abortEarly: false will return all errors
    next();
  } catch (error) {
    next(new ApiError(StatusCodes.BAD_REQUEST, new Error(error.message)));
  }
};

module.exports = { login };