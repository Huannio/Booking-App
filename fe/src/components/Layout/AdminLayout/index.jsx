import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";

import Sidebar from "~/components/Layout/AdminLayout/Sidebar";
import GlobalLoading from "../../Loading/GlobalLoading";
const cx = classNames.bind(styles);

AdminLayout.propTypes = {
  children: PropTypes.node,
};
function AdminLayout({ children }) {
  return (
    <>
      <GlobalLoading>
        <div className={cx("AdminLayout-layout")}>
          <Sidebar />
          <div className={cx("AdminLayout-main")}>{children}</div>
        </div>
      </GlobalLoading>
    </>
  );
}

export default AdminLayout;
