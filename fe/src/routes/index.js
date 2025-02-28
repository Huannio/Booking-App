import { AdminLayout } from "../components/Layout";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import {
  Cruise as CruiseSearch,
} from "../pages/servicesList";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import {
  Show as ShowUser,
  Create as CreateUser,
  Update as UpdateUser,
  Delete as DeleteUser,
} from "../pages/User";
import config from "~/config";
import HotelSearch from "../pages/servicesList/Hotel";

export const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/:type/:slug",
    component: Detail,
  },
  {
    path: "/tim-du-thuyen",
    component: CruiseSearch,
  },
  {
    path: "/tim-khach-san",
    component: HotelSearch,
  },
];

export const privateRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    layout: AdminLayout,
  },
  {
    path: config.routes.users.index,
    component: ShowUser,
    layout: AdminLayout,
  },
  {
    path: config.routes.users.create,
    component: CreateUser,
    layout: AdminLayout,
  },
  {
    path: config.routes.users.update,
    component: UpdateUser,
    layout: AdminLayout,
  },
  {
    path: config.routes.users.delete,
    component: DeleteUser,
    layout: AdminLayout,
  },
];

export const authRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
];
