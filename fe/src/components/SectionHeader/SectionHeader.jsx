import classNames from "classnames/bind";
import styles from "./SectionHeader.module.scss";
import PropTypes from "prop-types";
import ImageWrapper from "../ImageWrapper";

const cx = classNames.bind(styles);

function SectionHeader({
  title,
  mainContent,
  column = false,
  center = false,
  badge,
}) {
  return (
    <div
      className={cx(
        "SectionHeader",
        { "SectionHeader-column": column },
        { "SectionHeader-center": center }
      )}
    >
      <div className={cx("SectionHeader-title")}>
        {title}

        {badge}

        {!column && (
          <div>
            <ImageWrapper
              src="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp"
              alt="section-header"
              widthSvgWrapperImage={80}
              heightSvgWrapperImage={8}
            />
          </div>
        )}
      </div>

      <label htmlFor="" className={cx("lg", "SectionHeader-description")}>
        {mainContent}
      </label>

      {column && (
        <div>
          <ImageWrapper
            src="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1741405844/heading-border_jpgu2f.webp"
            alt="section-header"
            widthSvgWrapperImage={80}
            heightSvgWrapperImage={8}
          />
        </div>
      )}
    </div>
  );
}

SectionHeader.propTypes = {
  column: PropTypes.bool,
  title: PropTypes.node,
  mainContent: PropTypes.string,
  badge: PropTypes.node,
  center: PropTypes.bool,
};

export default SectionHeader;
