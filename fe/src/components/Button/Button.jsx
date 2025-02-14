import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  submit: PropTypes.bool,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  color: PropTypes.bool,
  linkColor: PropTypes.bool,
  onlyIcon: PropTypes.bool,
  normal: PropTypes.bool,
  small: PropTypes.bool,
  widthFull: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function Button({
  to,
  href,
  submit = false,
  primary = false,
  outline = false,
  color = false,
  linkColor = false,
  onlyIcon = false,
  normal = false,
  small = false,
  widthFull = false,
  children,
  className,
  ...passProps
}) {
  const props = {
    ...passProps,
  };

  let Component = "button";
  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = "a";
  }

  const classes = cx(
    "btn",
    {
      primary,
      outline,
      color,
      linkColor,
      onlyIcon,
      normal,
      small,
      widthFull,
    },
    className
  );

  return (
    <Component
      type={submit ? "submit" : "button"}
      className={classes}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Button;
