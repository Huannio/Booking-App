import { AdminLayout } from "../components/Layout";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import {
  Cruise as CruiseSearch,
  Flight as FlightSearch,
} from "../pages/Search";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import {
  Show as ShowUser,
  Create as CreateUser,
  Update as UpdateUser,
  Delete as DeleteUser,
} from "../pages/User";
import {
  Show as ShowShip,
  Create as CreateShip,
  Update as UpdateShip,
  Delete as DeleteShip,
} from "../pages/Ship";
import config from "~/config";

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
    path: "/tim-ve-may-bay",
    component: FlightSearch,
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

  // Ship
  {
    path: config.routes.ships.index,
    component: ShowShip,
    layout: AdminLayout,
  },
  {
    path: config.routes.ships.create,
    component: CreateShip,
    layout: AdminLayout,
  },
  {
    path: config.routes.ships.update,
    component: UpdateShip,
    layout: AdminLayout,
  },
  {
    path: config.routes.ships.delete,
    component: DeleteShip,
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
