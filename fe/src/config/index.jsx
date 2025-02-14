import routes from "./routes";
import menus from "./menus";
import intro from "./intro";
import { userSchema, loginSchema } from "./validationSchema";
const config = {
  routes,
  menus,
  intro,
  userSchema,
  loginSchema,
};

export default config;
