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
};

export default config;
