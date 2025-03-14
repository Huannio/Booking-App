const { UserCatalogues, Permissions } = require("../models");

const getPermissionsByUserCatalogueId = async (id) => {
  const data = await UserCatalogues.findOne({
    where: { id },
    attributes: ["id", "name", "description"],
    include: {
      model: Permissions,
      as: "permissions",
      attributes: ["id", "name", "canonical"],
      through: { attributes: [] },
    },
  });
  const permissions = data?.permissions.map((p) => p.canonical) || [];
  return permissions;
};

module.exports = getPermissionsByUserCatalogueId;
