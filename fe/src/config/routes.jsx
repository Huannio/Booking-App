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
};

export default routes;
