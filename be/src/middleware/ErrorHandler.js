const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack,
  };

  res.status(responseError.statusCode).json(responseError);
};

module.exports = errorHandler;
