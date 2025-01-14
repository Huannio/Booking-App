import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";
const cx = classNames.bind(styles);

AdminLayout.propTypes = {
  children: PropTypes.node,
};
function AdminLayout({ children }) {
  return <div className={cx("AdminLayout-layout")}>{children}</div>;
}

export default AdminLayout;
