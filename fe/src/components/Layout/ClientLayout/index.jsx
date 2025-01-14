import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ClientLayout.module.scss";
const cx = classNames.bind(styles);

ClientLayout.propTypes = {
  children: PropTypes.node,
};
function ClientLayout({ children }) {
  return (
    <div className={cx("ClientLayout-layout")}>
      <Header />

      <div className="ClientLayout-main">{children}</div>

      <Footer />
    </div>
  );
}

export default ClientLayout;
