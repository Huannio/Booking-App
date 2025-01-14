import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "~/components/Button";

import config from "~/config";
import ImageWrapper from "~/components/ImageWrapper";
import images from "~/assets/images";
import { InputField } from "~/components/Input";
const cx = classNames.bind(styles);
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log("Form data: ", data);
    // Send data to server
  };

  return (
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
              label="Email"
              type="email"
              name="email"
              placeholder="type your email here ..."
              validation={config.emailValidation}
              register={register}
              error={errors.email}
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="type your password here ..."
              validation={config.passwordValidation}
              register={register}
              error={errors.password}
            />

            <Button primary normal submit>
              <div className="label md">Login</div>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
