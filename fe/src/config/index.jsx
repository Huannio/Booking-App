import routes from "./routes";
import menus from "./menus";
import intro from "./intro";
import {
  userSchema,
  loginSchema,
  blogSchema,
  blogDetailSchema,
  cruiseSchema,
  featureSchema,
  usersCataloguesSchema,
  permissionSchema,
  hotelSchema,
  shipDetailSchema,
} from "./validationSchema";
const config = {
  routes,
  menus,
  intro,
  userSchema,
  loginSchema,
  blogSchema,
  blogDetailSchema,
  cruiseSchema,
  featureSchema,
  usersCataloguesSchema,
  permissionSchema,
  hotelSchema,
  shipDetailSchema,
};

export default config;
