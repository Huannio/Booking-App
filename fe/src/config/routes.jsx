const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",
  users: {
    index: "/users",
    create: "/users/create",
    update: "/users/update/:id",
    delete: "/users/delete/:id",

    catalogues: {
      index: "/users-catalogues",
      create: "/users-catalogues/create",
      update: "/users-catalogues/update/:id",
      delete: "/users-catalogues/delete/:id",
    },

    permissions: {
      index: "/users-permissions",
      update: "/users-permissions/update/:id",
    },
  },
  permissions: {
    create: "/permissions-management/create",
    update: "/permissions-management/update/:id",
    delete: "/permissions-management/delete/:id",
    index: "/permissions-management",
  },

  blogs: {
    index: "/blogs",
    create: "/blogs/create",
    createDetail: "/blogs/createDetail/:id",
    update: "/blogs/update/:id",
    updateDetail: "/blogs/updateDetail/:id",
    delete: "/blogs/delete/:id",
  },
  ships: {
    index: "/ships",
    create: "/ships/create",
    update: "/ships/update/:slug",
    delete: "/ships/delete/:slug",
    createDetail: "/ships/createDetail/:slug",
    updateDetail: "/ships/updateDetail/:slug",
    updateFeatures: "/ships/updateFeatures/:slug",
  },
  features: {
    index: "/features",
    create: "/features/create",
    update: "/features/update/:id",
    delete: "/features/delete/:id",
  },
  feature: {
    index: "/features",
    create: "/features/create",
    update: "/features/update/:id",
    delete: "/features/delete/:id",
  },
  blog: {
    index: "/blog",
    detail: "/blog-detail/:slug",
  },
  hotel: {
    index: "/hotel",
    create: "/hotel/create",
    update: "/hotel/update/:slug",
    delete: "/hotel/delete/:slug",
    createDetail: "/hotel/createDetail/:slug",
    updateDetail: "/hotel/updateDetail/:slug",
    updateFeatures: "/hotel/updateFeatures/:slug",
  },
  account: {
    verification: "/account/verification",
  },
};

export default routes;
