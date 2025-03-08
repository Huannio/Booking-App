import routes from "./routes";
import menus from "./menus";
import intro from "./intro";
import {
  userSchema,
  loginSchema,
  shipSchema,
  blogSchema,
  blogDetailSchema,
} from "./validationSchema";
const config = {
  routes,
  menus,
  intro,
  userSchema,
  loginSchema,
  shipSchema,
  blogSchema,
  blogDetailSchema,
};

export default config;
