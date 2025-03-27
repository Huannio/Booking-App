import { AdminLayout } from "../components/Layout";
import Home from "../pages/Home";
import {
  Cruise as CruiseSearch,
  Flight as FlightSearch,
} from "../pages/Search";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Hotel from "../pages/Hotel/HomeHotel";

import {
  Show as ShowUser,
  Create as CreateUser,
  Update as UpdateUser,
  Delete as DeleteUser,
} from "../pages/User";

import {
  Show as ShowUserCatalogues,
  Create as CreateUserCatalogues,
  Update as UpdateUserCatalogues,
  Delete as DeleteUserCatalogues,
} from "../pages/UserCatalogues";

import {
  Show as ShowPermissionManagement,
  Create as CreatePermissionManagement,
  Update as UpdatePermissionManagement,
  Delete as DeletePermissionManagement,
} from "../pages/Permissions/Management";

import {
  Show as ShowShip,
  Create as CreateShip,
  Update as UpdateShip,
  Delete as DeleteShip,
  CreateDetail as CreateShipDetail,
  UpdateDetail as UpdateShipDetail,
  UpdateFeature as UpdateShipFeature,
} from "../pages/Ship";
import {
  Show as ShowFeature,
  Create as CreateFeature,
  Update as UpdateFeature,
  Delete as DeleteFeature,
} from "../pages/Feature";

import {
  Show as ShowHotel,
  Create as CreateHotel,
  Update as UpdateHotel,
  Delete as DeleteHotel,
  CreateDetail as CreateHotelDetail,
  UpdateDetail as UpdateHotelDetail,
  UpdateFeature as UpdateHotelFeatures,
} from "../pages/Hotel/HotelAdmin";

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
import DetailBlog from "../pages/Blog/DetailBlog";

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

import {
  Show as ShowUserPermission,
  Update as UpdateUserPermission,
} from "../pages/Permissions/Permission";

import AccountVerification from "../pages/Auth/AccountVerification";

export const publicRoutes = [
  {
    path: config.routes.account.verification,
    component: AccountVerification,
    layout: null,
  },
  {
    path: "/",
    component: Home,
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
  {
    path: "/khach-san",
    component: Hotel,
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
    path: config.routes.blog.index,
    component: BlogPage,
  },
  {
    path: config.routes.blog.detail,
    component: DetailBlog,
  },
];

export const privateRoutes = [
  {
    path: "/dashboard",
    component: Dashboard,
    layout: AdminLayout,
    requiredPermission: "dashboard.index",
  },
  {
    path: config.routes.users.index,
    component: ShowUser,
    layout: AdminLayout,
    requiredPermission: "users.index",
  },
  {
    path: config.routes.users.create,
    component: CreateUser,
    layout: AdminLayout,
    requiredPermission: "users.create",
  },
  {
    path: config.routes.users.update,
    component: UpdateUser,
    layout: AdminLayout,
    requiredPermission: "users.update",
  },
  {
    path: config.routes.users.delete,
    component: DeleteUser,
    layout: AdminLayout,
    requiredPermission: "users.delete",
  },

  // User Catalogues
  {
    path: config.routes.users.catalogues.index,
    component: ShowUserCatalogues,
    layout: AdminLayout,
    requiredPermission: "users-catalogues.index",
  },
  {
    path: config.routes.users.catalogues.create,
    component: CreateUserCatalogues,
    layout: AdminLayout,
    requiredPermission: "users-catalogues.create",
  },
  {
    path: config.routes.users.catalogues.update,
    component: UpdateUserCatalogues,
    layout: AdminLayout,
    requiredPermission: "users-catalogues.update",
  },
  {
    path: config.routes.users.catalogues.delete,
    component: DeleteUserCatalogues,
    layout: AdminLayout,
    requiredPermission: "users-catalogues.delete",
  },

  // Permissions-Management
  {
    path: config.routes.permissions.index,
    component: ShowPermissionManagement,
    layout: AdminLayout,
    requiredPermission: "permissions-management.index",
  },
  {
    path: config.routes.permissions.create,
    component: CreatePermissionManagement,
    layout: AdminLayout,
    requiredPermission: "permissions-management.create",
  },
  {
    path: config.routes.permissions.update,
    component: UpdatePermissionManagement,
    layout: AdminLayout,
    requiredPermission: "permissions-management.update",
  },
  {
    path: config.routes.permissions.delete,
    component: DeletePermissionManagement,
    layout: AdminLayout,
    requiredPermission: "permissions-management.delete",
  },

  // users-permissions
  {
    path: config.routes.users.permissions.index,
    component: ShowUserPermission,
    layout: AdminLayout,
    requiredPermission: "users-permissions.index",
  },
  {
    path: config.routes.users.permissions.update,
    component: UpdateUserPermission,
    layout: AdminLayout,
    requiredPermission: "users-permissions.index",
  },

  // Ship
  {
    path: config.routes.ships.index,
    component: ShowShip,
    layout: AdminLayout,
    requiredPermission: "ships.index",
  },
  {
    path: config.routes.ships.create,
    component: CreateShip,
    layout: AdminLayout,
    requiredPermission: "ships.create",
  },
  {
    path: config.routes.ships.update,
    component: UpdateShip,
    layout: AdminLayout,
    requiredPermission: "ships.update",
  },
  {
    path: config.routes.ships.delete,
    component: DeleteShip,
    layout: AdminLayout,
    requiredPermission: "ships.delete",
  },
  {
    path: config.routes.ships.createDetail,
    component: CreateShipDetail,
    layout: AdminLayout,
    requiredPermission: "ships.create",
  },
  {
    path: config.routes.ships.updateDetail,
    component: UpdateShipDetail,
    layout: AdminLayout,
    requiredPermission: "ships.update",
  },
  {
    path: config.routes.ships.updateFeatures,
    component: UpdateShipFeature,
    layout: AdminLayout,
    requiredPermission: "ships.update",
  },

  // Feature
  {
    path: config.routes.features.index,
    component: ShowFeature,
    layout: AdminLayout,
    requiredPermission: "features.index",
  },
  {
    path: config.routes.features.create,
    component: CreateFeature,
    layout: AdminLayout,
    requiredPermission: "features.create",
  },
  {
    path: config.routes.features.update,
    component: UpdateFeature,
    layout: AdminLayout,
    requiredPermission: "features.update",
  },
  {
    path: config.routes.features.delete,
    component: DeleteFeature,
    layout: AdminLayout,
    requiredPermission: "features.delete",
  },

  // Hotel
  {
    path: config.routes.hotel.index,
    component: ShowHotel,
    layout: AdminLayout,
    requiredPermission: "hotel.index",
  },
  {
    path: config.routes.hotel.create,
    component: CreateHotel,
    layout: AdminLayout,
    requiredPermission: "hotel.create",
  },
  {
    path: config.routes.hotel.update,
    component: UpdateHotel,
    layout: AdminLayout,
    requiredPermission: "hotel.update",
  },
  {
    path: config.routes.hotel.delete,
    component: DeleteHotel,
    layout: AdminLayout,
    requiredPermission: "hotel.delete",
  },
  {
    path: config.routes.hotel.createDetail,
    component: CreateHotelDetail,
    layout: AdminLayout,
    requiredPermission: "hotel.update",
  },
  {
    path: config.routes.hotel.updateDetail,
    component: UpdateHotelDetail,
    layout: AdminLayout,
    requiredPermission: "hotel.update",
  },
  {
    path: config.routes.hotel.updateFeatures,
    component: UpdateHotelFeatures,
    layout: AdminLayout,
    requiredPermission: "hotel.update",
  },

  // Blogs
  {
    path: config.routes.blogs.index,
    component: ShowBlog,
    layout: AdminLayout,
    requiredPermission: "blogs.index",
  },
  {
    path: config.routes.blogs.create,
    component: CreateBlog,
    layout: AdminLayout,
    requiredPermission: "blogs.create",
  },
  {
    path: config.routes.blogs.update,
    component: UpdateBlog,
    layout: AdminLayout,
    requiredPermission: "blogs.update",
  },
  {
    path: config.routes.blogs.createDetail,
    component: CreateDetailBlog,
    layout: AdminLayout,
    requiredPermission: "blogs.create",
  },
  {
    path: config.routes.blogs.updateDetail,
    component: UpdateDetailBlog,
    layout: AdminLayout,
    requiredPermission: "blogs.update",
  },
  {
    path: config.routes.blogs.delete,
    component: DeleteBlog,
    layout: AdminLayout,
    requiredPermission: "blogs.delete",
  },
];

export const authRoutes = [
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
];
