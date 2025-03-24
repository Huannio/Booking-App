const { UserCataloguePermission } = require("../../models");
class UserPermissionService {
  getPermissionId = async (id) => {
    try {
      const permissions = await UserCataloguePermission.findAll({
        where: { user_catalogue_id: id },
        attributes: ["permission_id"],
      });

      const permissionIds = permissions.map(
        (permission) => permission.permission_id
      );

      return { permissions: permissionIds };
    } catch (error) {
      throw error;
    }
  };

  update = async (reqBody) => {
    try {
      const { permissions, userCatalogueId } = reqBody;
      if (permissions.length === 0) {
        return await UserCataloguePermission.destroy({
          where: { user_catalogue_id: userCatalogueId },
        });
      }

      if (permissions.length > 0) {
        const newPermissions = permissions.map((permissionId) => ({
          user_catalogue_id: userCatalogueId,
          permission_id: permissionId,
        }));
        await UserCataloguePermission.destroy({
          where: { user_catalogue_id: userCatalogueId },
        });
        return await UserCataloguePermission.bulkCreate(newPermissions);
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new UserPermissionService();
