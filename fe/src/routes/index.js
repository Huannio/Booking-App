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

import {
  Show as ShowBlog,
  Create as CreateBlog,
  CreateDetail as CreateDetailBlog,
  Update as UpdateBlog,
  UpdateDetail as UpdateDetailBlog,
  Delete as DeleteBlog,
} from "../pages/Blog/BlogAdmin";
import config from "~/config";
import BusinessPage from "../pages/business";

// Blog
import BlogPage from "../pages/Blog/Homeblog";
import BlogDetail from "../pages/Blog/DetailBlog";

// Footer
import {
  AboutUs,
  Terms,
  Privacy,
  HowToUse,
  Payment,
  Contact,
  Rules,
  Question,
} from "../pages/Footer";

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
  {
    path: "/doanh-nghiep",
    component: BusinessPage,
  },

  // Footer
  {
    path: "/ve-chung-toi",
    component: AboutUs,
  },
  {
    path: "/dieu-khoan-va-dieu-kien",
    component: Terms,
  },
  {
    path: "/chinh-sach-rieng-tu",
    component: Privacy,
  },
  {
    path: "/huong-dan-su-dung",
    component: HowToUse,
  },
  {
    path: "/hinh-thuc-thanh-toan",
    component: Payment,
  },
  {
    path: "/lien-he",
    component: Contact,
  },
  {
    path: "/quy-dinh-chung-va-luu-y",
    component: Rules,
  },
  {
    path: "/cau-hoi-thuong-gap",
    component: Question,
  },

  // Blog
  {
    path: "/blog",
    component: BlogPage,
  },
  {
    path: "/blog:slug",
    component: BlogDetail,
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

  // Blogs
  {
    path: config.routes.blogs.index,
    component: ShowBlog,
    layout: AdminLayout,
  },
  {
    path: config.routes.blogs.create,
    component: CreateBlog,
    layout: AdminLayout,
  },
  {
    path: config.routes.blogs.update,
    component: UpdateBlog,
    layout: AdminLayout,
  },
  {
    path: config.routes.blogs.createDetail,
    component: CreateDetailBlog,
    layout: AdminLayout,
  },
  {
    path: config.routes.blogs.updateDetail,
    component: UpdateDetailBlog,
    layout: AdminLayout,
  },
  {
    path: config.routes.blogs.delete,
    component: DeleteBlog,
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
