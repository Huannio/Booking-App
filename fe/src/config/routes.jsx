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
};

export default routes;
