import Proptypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import styles from "./SearchBox.module.scss";

function SearchSelectBox({
  stylesModule,
  baseClass = "SearchBox",
  className,
  inputGroup,
  name,
  label,
  firstIcon,
  lastIcon,
  defaultValue = "",
  items = [],
  fieldDropdown,
  onSelectItem,
  fieldSelectItem,
}) {
  const appliedStyles = stylesModule || styles;
  const cx = classNames.bind(appliedStyles);
  
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleSelectItem = (item) => {
    setValue(item?.[fieldDropdown] ?? item);
    setDropdownVisible(false);
    if (onSelectItem)
      onSelectItem(item?.[fieldSelectItem] ?? item?.[fieldDropdown]);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={cx(`${baseClass}-selectInput`, className)}>
      <div>
        <label
          htmlFor={name}
          className={inputGroup ? "input-group" : "not-input-group"}
        >
          {firstIcon}

          <input
            style={{ width: "100%" }}
            name={name}
            className="p-md"
            id={name}
            type="button"
            value={value}
            onClick={() => setDropdownVisible(!dropdownVisible)}
          />

          {lastIcon}

          <label htmlFor={name} className={cx("sm")}>
            {label}
          </label>
        </label>
      </div>

      {dropdownVisible && (
        <div className={cx(`${baseClass}-dropdown`)}>
          <div
            key={defaultValue}
            className={cx(`${baseClass}-dropdown-item`)}
            onClick={() => handleSelectItem(defaultValue)}
          >
            {defaultValue}
          </div>
          {items.map((item) => (
            <div
              key={item?.[fieldDropdown]}
              className={cx(`${baseClass}-dropdown-item`)}
              onClick={() => handleSelectItem(item)}
            >
              {item?.[fieldDropdown]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

SearchSelectBox.propTypes = {
  className: Proptypes.string,
  inputGroup: Proptypes.bool,
  name: Proptypes.string,
  label: Proptypes.string,
  firstIcon: Proptypes.node,
  lastIcon: Proptypes.node,
  defaultValue: Proptypes.string,
  items: Proptypes.array,
  fieldDropdown: Proptypes.string,
  onSelectItem: Proptypes.func,
  fieldSelectItem: Proptypes.string,
  baseClass: Proptypes.string,
  stylesModule: Proptypes.object,
};

export default SearchSelectBox;
