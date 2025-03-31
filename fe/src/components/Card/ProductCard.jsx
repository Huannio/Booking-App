import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import PropTypes from "prop-types";
import Button from "../Button";
import Badge from "../Badge/Badge";

const cx = classNames.bind(styles);

function ProductCard({
  BadgeImageWrapper,
  BadgeLocation,
  imgSrc,
  title,
  iconDescription,
  contentDescription,
  price,
  originalPrice,
  grid,
  list,
  tags,
}) {
  return (
    <div
      className={cx(
        "Card",
        { "ProductCard-grid": grid },
        { "ProductCard-list": list }
      )}
    >
      <div className={cx("ProductCard-imageWrapper")}>
        <div
          className={cx("ProductCard-imageWrapper-image")}
          style={{
            width: "352px",
            height: grid ? "216px" : "264px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src={imgSrc}
            alt="mixivivu"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </div>
        {BadgeImageWrapper}
      </div>
      <div className={cx("ProductCard-cardContent")}>
        <div className={cx("ProductCard-body")}>
          {BadgeLocation}
          <p className={cx("ProductCard-title", "subheading md")}>{title}</p>
          <div className={cx("ProductCard-description")}>
            {iconDescription}
            <p className="sm">{contentDescription}</p>
          </div>
        </div>

        {tags && (
          <div className={cx("ProductCard-tags")}>
            {tags?.map((tag) => (
              <Badge
                BadgeDefault
                BadgeSm
                ContentXs
                content={tag.text}
                key={tag.id}
              />
            ))}
          </div>
        )}

        <div className={cx("ProductCard-footer")}>
          <div>
            <div>
              {originalPrice && (
                <p className={cx("ProductCard-originalPrice")}>
                  {originalPrice}
                </p>
              )}

              <p
                className={cx("ProductCard-price", "subheading md")}
                style={{ color: "var(--primary-dark, #0E4F4F)" }}
              >
                {price}
              </p>
            </div>
          </div>
          <Button color small>
            <div className="label sm">Đặt ngay</div>
          </Button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  BadgeImageWrapper: PropTypes.node.isRequired,
  BadgeLocation: PropTypes.node.isRequired,
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconDescription: PropTypes.node,
  contentDescription: PropTypes.node,
  price: PropTypes.string.isRequired,
  originalPrice: PropTypes.string,
  grid: PropTypes.bool,
  list: PropTypes.bool,
  tags: PropTypes.array,
};

export default ProductCard;
