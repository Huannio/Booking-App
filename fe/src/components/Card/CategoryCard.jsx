import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function CategoryCard({ button, imgSrc, alt, title }) {
  return (
    <div className={cx("Card", "CategoryCard")}>
      <div className={cx("CategoryCard-imageWrapper")}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={imgSrc}
            alt={alt}
            width={"100%"}
            height={"100%"}
            loading="lazy"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
      <div className={cx("CategoryCard-body")}>
        <h6>{title}</h6>
      </div>
      <div className={cx("CategoryCard-footer")}>{button}</div>
    </div>
  );
}

CategoryCard.propTypes = {
  button: PropTypes.node,
  imgSrc: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
};

export default CategoryCard;
