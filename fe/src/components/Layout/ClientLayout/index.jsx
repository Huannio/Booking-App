import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";

ClientLayout.propTypes = {
  children: PropTypes.node,
};
function ClientLayout({ children }) {
  return (
    <>
      <Header />

      <div className="container main">{children}</div>

      <Footer />
    </>
  );
}

export default ClientLayout;
