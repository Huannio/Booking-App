import { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Collapse.module.scss";

const cx = classNames.bind(styles);

const Collapse = ({ headerElement, children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleCollapse = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={cx(
          {
            "Collapse-openHeader": isOpen,
          },
          className
        )}
        onClick={toggleCollapse}
      >
        {headerElement(isOpen)}
      </div>
      <div
        className={cx("Collapse-collapsed", {
          "Collapse-collapsed-content": !isOpen,
        })}
        ref={contentRef}
        style={{ height: isOpen ? contentRef.current?.scrollHeight : 0 }}
      >
        {children}
      </div>
    </>
  );
};

Collapse.propTypes = {
  headerElement: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Collapse;
