import styles from "./SearchBox.module.scss";
import Proptypes from "prop-types";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SearchBox({ className, title, description, children }) {
  return (
    <div
      className={cx(
        "Card",
        "SearchBox-searchBox",
        "flex flex-col justify-center gap-40",
        className
      )}
    >
      <div className={cx("flex flex-col gap-16 gray-900")}>
        <h4 className={cx("text-center", "Searchbox-title")}>{title}</h4>
        <p className={cx("lg text-center", "Searchbox-description")}>
          {description}
        </p>
      </div>

      <div className={cx("flex gap-20", "SearchBox-input-group")}>
        {children}
      </div>
    </div>
  );
}

SearchBox.propTypes = {
  className: Proptypes.string,
  title: Proptypes.string,
  description: Proptypes.string,
  children: Proptypes.node,
};

export default SearchBox;
