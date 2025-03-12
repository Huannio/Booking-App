const { StatusCodes } = require("http-status-codes");

const checkPermission = (permissionCode) => {
  return (req, res, next) => {
    const userPermissions = req.permissions || [];
    if (!userPermissions.includes(permissionCode)) {
      return res.status(StatusCodes.FORBIDDEN).json({
        message: "Bạn không có quyền truy cập chức năng này.",
      });
    }

    next();
  };
};

module.exports = checkPermission;
