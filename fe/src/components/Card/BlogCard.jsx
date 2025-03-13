import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

function BlogCard({ imgSrc, title, description, date }) {
  return (
    <div className={cx("Card", "BlogCard")}>
      <div className={cx("BlogCard-imageWrapper")}>
        <div
          className={cx("BlogCard-imageWrapper-image")}
          style={{
            width: "352px",
            height: "216px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            alt="mixivivu"
            src={imgSrc}
            width="100%"
            height="100%"
            loading="lazy"
            style={{ objectFit: "cover" }}
          ></img>
        </div>
      </div>
      <div className={cx("BlogCard-body")}>
        <p className={cx("BlogCard-title", "subheading md")}>{title}</p>
        <p className={cx("BlogCard-description", "sm")}>{description}</p>
      </div>
      <p className={cx("BlogCard-footer", "detail sm")}>{date}</p>
    </div>
  );
}

BlogCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default BlogCard;
