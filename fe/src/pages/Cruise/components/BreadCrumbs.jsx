import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "../Cruise.module.scss";
import BreadCrumb from "~/components/BreadCrumb/BreadCrumb";

const cx = classNames.bind(styles);
function BreadCrumbs({slug, title}) {
  return (
    <div className={cx("ShipDetail-breadCrumbsWrapper")}>
      <div className={cx("container", "ShipDetail-breadCrumbs")}>
        <BreadCrumb
          titleOption="Tìm du thuyền"
          option="timDuThuyen"
          linkSlug={`/du-thuyen/${slug}`}
          content={title}
        />
      </div>
    </div>
  );
}

BreadCrumbs.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
}

export default BreadCrumbs;
