import classNames from "classnames/bind";
import styles from "./Badge.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function Badge({
  BadgeDefault = false,
  warning = false,
  BadgeLg = false,
  BadgeSm = false,
  ContentXs = false,
  ContentSm = false,
  children,
  svg,
  content,
  className,
}) {
  return (
    <div
      className={cx(
        "Badge-container",
        {
          "Badge-waring": warning,
          "Badge-lg": BadgeLg,
          "Badge-default": BadgeDefault,
          "Badge-sm": BadgeSm,
        },
        className
      )}
    >
      {svg}
      <label htmlFor="" className={cx({ xs: ContentXs, sm: ContentSm })}>
        {content}
      </label>
      {children}
    </div>
  );
}

Badge.propTypes = {
  BadgeDefault: PropTypes.bool,
  warning: PropTypes.bool,
  BadgeLg: PropTypes.bool,
  BadgeSm: PropTypes.bool,
  ContentXs: PropTypes.bool,
  ContentSm: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  svg: PropTypes.node,
  content: PropTypes.string,
};

export default Badge;
