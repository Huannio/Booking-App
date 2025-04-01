import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { NavLink, Link } from "react-router-dom";
import config from "~/config";
import ImageWrapper from "~/components/ImageWrapper";
import images from "~/assets/images";
import Button from "~/components/Button";
import { useState } from "react";

const cx = classNames.bind(styles);
function Header() {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive((prev) => !prev);
  };

  return (
    <header className={cx("header-wrapper", "Home-header")}>
      <div
        className={cx(
          "container flex justify-between align-center",
          "header-container"
        )}
      >
        <div className={cx("flex align-center gap-40 h-full")}>
          <Link to={config.routes.home} className={cx("header-logo")}>
            <ImageWrapper
              src={images.logo}
              alt="mixivivu"
              widthSvgWrapperImage={156}
              heightSvgWrapperImage={42}
            />
          </Link>

          <ul
            className={cx(
              "flex gap-24 h-full align-center cursor-pointer",
              "header-nav-container"
            )}
          >
            {config.menus.map((item, index) => (
              <NavLink
                className={({ isActive }) =>
                  cx("header-menu", "flex align-center h-full", {
                    "header-active": isActive,
                  })
                }
                key={index}
                to={item.to}
              >
                <label htmlFor="" className="md">
                  {item.label}
                </label>
              </NavLink>
            ))}
          </ul>
        </div>

        <div className={cx("flex gap-16 align-center")}>
          <div className={cx("header-phone")}>
            <div className={cx("header-phone-icon")}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.247,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-2.384,2.384,5.417,10.185,7.8,7.8a3.877,3.877,0,0,1,1.173-.781,2.092,2.092,0,0,1,2.328.445Z"></path>
              </svg>
            </div>
            <Link to="tel:0922222016">Hotline: 0922222016</Link>
          </div>

          <Button to="/lien-he" small color>
            <div className="label sm">Liên hệ Mixivivu</div>
          </Button>

          <div className={cx("header-menu-mb")} onClick={handleClick}>
            <div style={active ? { margin: "-4px" } : {}}>
              {active ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M17.8782 15.9977L23.606 10.2832C23.8568 10.0324 23.9977 9.69222 23.9977 9.33749C23.9977 8.98277 23.8568 8.64257 23.606 8.39174C23.3552 8.14091 23.015 8 22.6602 8C22.3055 8 21.9653 8.14091 21.7145 8.39174L16 14.1195L10.2855 8.39174C10.0347 8.14091 9.6945 8 9.33977 8C8.98504 8 8.64485 8.14091 8.39402 8.39174C8.14319 8.64257 8.00227 8.98277 8.00227 9.33749C8.00227 9.69222 8.14319 10.0324 8.39402 10.2832L14.1218 15.9977L8.39402 21.7122C8.26917 21.836 8.17007 21.9834 8.10244 22.1457C8.03482 22.308 8 22.4821 8 22.658C8 22.8338 8.03482 23.0079 8.10244 23.1702C8.17007 23.3325 8.26917 23.4799 8.39402 23.6037C8.51785 23.7286 8.66517 23.8277 8.8275 23.8953C8.98982 23.9629 9.16392 23.9977 9.33977 23.9977C9.51562 23.9977 9.68972 23.9629 9.85204 23.8953C10.0144 23.8277 10.1617 23.7286 10.2855 23.6037L16 17.8759L21.7145 23.6037C21.8383 23.7286 21.9856 23.8277 22.148 23.8953C22.3103 23.9629 22.4844 23.9977 22.6602 23.9977C22.8361 23.9977 23.0102 23.9629 23.1725 23.8953C23.3348 23.8277 23.4822 23.7286 23.606 23.6037C23.7308 23.4799 23.8299 23.3325 23.8976 23.1702C23.9652 23.0079 24 22.8338 24 22.658C24 22.4821 23.9652 22.308 23.8976 22.1457C23.8299 21.9834 23.7308 21.836 23.606 21.7122L17.8782 15.9977Z"
                    fill="black"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 7C4 5.34315 5.34315 4 7 4C8.65685 4 10 5.34315 10 7C10 8.65685 8.65685 10 7 10C5.34315 10 4 8.65685 4 7Z"
                    stroke="#1D2939"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14 7C14 5.34315 15.3431 4 17 4C18.6569 4 20 5.34315 20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7Z"
                    stroke="#1D2939"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14 17C14 15.3431 15.3431 14 17 14C18.6569 14 20 15.3431 20 17C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17Z"
                    stroke="#1D2939"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M4 17C4 15.3431 5.34315 14 7 14C8.65685 14 10 15.3431 10 17C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17Z"
                    stroke="#1D2939"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              )}
            </div>
          </div>

          {active && (
            <div className={cx("Dropdown", "header-menu-mb-content")}>
              {config.menus.map((item, index) => (
                <NavLink
                  className={({ isActive }) =>
                    cx("header-menu-mb-nav-item", {
                      "header-menu-mb-nav-item-active": isActive,
                    })
                  }
                  key={index}
                  to={item.to}
                  onClick={() => setActive(false)}
                >
                  <label htmlFor="" className="md">
                    {item.label}
                  </label>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
