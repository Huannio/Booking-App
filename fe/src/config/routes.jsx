const routes = {
  home: "/",
  login: "/login",
  dashboard: "/dashboard",  
  users: {
    index: "/users",
    create: "/users/create",
    update: "/users/update/:id",
    delete: "/users/delete/:id",
  },

  ships: {
    index: "/ships",
    create: "/ships/create",
    update: "/ships/update/:id",
    delete: "/ships/delete/:id",
  },

  blogs: {
    index: "/blogs",
    create: "/blogs/create",
    createDetail: "/blogs/createDetail/:id",
    update: "/blogs/update/:id",
    updateDetail: "/blogs/updateDetail/:id",
    delete: "/blogs/delete/:id",
  }
};

export default routes;
