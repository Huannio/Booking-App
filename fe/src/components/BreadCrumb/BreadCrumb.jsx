import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./BreadCrumb.module.scss";
import classNames from "classnames/bind";
import config from "~/config";

const cx = classNames.bind(styles);

function BreadCrumb({
  option = "ship",
  titleOption = "ship",
  linkSlug,
  content,
}) {
  return (
    <div className={cx("BreadCrumbs-breadCrumbsContainer")}>
      <Link to={config.routes.home} className={cx("BreadCrumbs-breadCrumb")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M8 17H16M11.0177 2.76401L4.23539 8.03914C3.78202 8.39176 3.55534 8.56807 3.39203 8.78887C3.24737 8.98446 3.1396 9.2048 3.07403 9.43907C3 9.70353 3 9.99071 3 10.5651V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V10.5651C21 9.99071 21 9.70353 20.926 9.43907C20.8604 9.2048 20.7526 8.98446 20.608 8.78887C20.4447 8.56807 20.218 8.39176 19.7646 8.03914L12.9823 2.76401C12.631 2.49076 12.4553 2.35413 12.2613 2.30162C12.0902 2.25528 11.9098 2.25528 11.7387 2.30162C11.5447 2.35413 11.369 2.49076 11.0177 2.76401Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </Link>
      <Link to={config.routes[option]?.index}>
        <div className={cx("BreadCrumbs-breadCrumbs")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 6L15 12L9 18"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <div className={cx("BreadCrumbs-breadCrumb", "capitalize")}>
            {titleOption}
          </div>
        </div>
      </Link>

      <Link to={linkSlug}>
        <div className={cx("BreadCrumbs-breadCrumbs")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 6L15 12L9 18"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <div className={cx("BreadCrumbs-breadCrumb", "BreadCrumbs-selected")}>
            {content}
          </div>
        </div>
      </Link>
    </div>
  );
}

BreadCrumb.propTypes = {
  option: PropTypes.string,
  titleOption: PropTypes.string,
  linkSlug: PropTypes.string,
  content: PropTypes.string,
};

export default BreadCrumb;
