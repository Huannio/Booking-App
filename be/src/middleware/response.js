const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    success: false,
    message: err.message || "Internal Server Error",
  });
};

const responseHandler = (req, res, next) => {
  res.success = (body, flag = "Success", statusCode = 200) => {
    res.status(statusCode).json({
      status: statusCode,
      flag,
      data: body.data || body,
    });
  };
  next();
};

module.exports = { errorHandler, responseHandler };
