import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./ClientLayout.module.scss";
import GlobalLoading from "../../../components/Loading/GlobalLoading";

const cx = classNames.bind(styles);

ClientLayout.propTypes = {
  children: PropTypes.node,
};
function ClientLayout({ children }) {
  return (
    <GlobalLoading>
      <div className={cx("ClientLayout-layout")}>
        <Header />

        <div className="ClientLayout-main">{children}</div>

        <Footer />
      </div>
    </GlobalLoading>
  );
}

export default ClientLayout;
