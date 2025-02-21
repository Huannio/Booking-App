import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "~/components/Button";

import config from "~/config";
import ImageWrapper from "~/components/ImageWrapper";
import images from "~/assets/images";
import { InputField } from "~/components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "~/utils/axios.config";
import { notification } from "antd";
const cx = classNames.bind(styles);
function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.loginSchema),
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const response = await axios.post("/auth/login", data);
    if (response?.data?.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      notification.success({
        message: "Đăng nhập thành công!",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div className={cx("Login-container")}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className={cx("container")}>
            <div className={cx("Login-modalLogin")}>
              <Link to={config.routes.home}>
                <ImageWrapper
                  src={images.logo}
                  alt={"logo"}
                  widthSvgWrapperImage={232}
                  heightSvgWrapperImage={62}
                />
              </Link>

              <InputField
                className="inputCustom"
                label="Email"
                type="email"
                name="email"
                placeholder="type your email here..."
                control={control}
                error={errors.email}
                required
              />

              <InputField
                className="inputCustom"
                label="Password"
                type="password"
                name="password"
                placeholder="type your password here..."
                control={control}
                error={errors.password}
                required
              />

              <Button primary normal submit className="interceptor-loading">
                <div className="label md">Login</div>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
