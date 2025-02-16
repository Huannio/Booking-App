import { Spin } from "antd";
import { LoadingContext } from "./Loading";
import { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./GlobalLoading.module.scss";

const cx = classNames.bind(styles);
function GlobalLoading({ children }) {
  const { globalLoading } = useContext(LoadingContext);
  return (
    <Spin
      spinning={globalLoading}
      size="large"
      className={cx("global-loading")}
    >
      {children}
    </Spin>
  );
}

GlobalLoading.propTypes = {
  children: PropTypes.node,
};

export default GlobalLoading;
