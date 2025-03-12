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
  },
  blog: {
    index: "/blog",
    detail: "/blog-detail/:slug",
  },
};

export default routes;
