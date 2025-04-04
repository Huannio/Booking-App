import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import classNames from "classnames/bind";
import { Link } from "react-scroll";
import PropTypes from "prop-types";

import styles from "./Tabs.module.scss";
const cx = classNames.bind(styles);
function Tabs({ list }) {
  useEffect(() => {
    scroll.scrollToTop({ duration: 0 });
  });
  
  return (
    <>
      <div className={cx("Tabs-header")}>
        {list.map((item, index) => (
          <Link
            className={cx("Tabs-item", "Tabs-sm")}
            key={index}
            to={item.id}
            spy={true}
            smooth={true}
            duration={50}
            offset={-150}
            activeClass={cx("Tabs-active")}
          >
            <label style={{ fontWeight: 400, fontSize: "14px" }}>
              {item.name}
            </label>
          </Link>
        ))}
      </div>
    </>
  );
}

Tabs.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Tabs;
