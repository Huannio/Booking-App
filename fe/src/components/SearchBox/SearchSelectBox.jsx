import styles from "./SearchBox.module.scss";
import Proptypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function SearchSelectBox({
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
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleSelectItem = (item) => {
    setValue(item?.[fieldDropdown] ?? item);
    setDropdownVisible(false);
    if(onSelectItem) onSelectItem(item?.[fieldSelectItem] ?? item?.[fieldDropdown]);
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
    <div ref={wrapperRef} className={cx('SearchBox-selectInput', className)}>
      <div>
        <label
          htmlFor={name}
          className={inputGroup ? "input-group" : "not-input-group"}
        >
          {firstIcon}

          <input
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
        <div className={cx("SearchBox-dropdown")}>
            <div
              key={defaultValue}
              className={cx("SearchBox-dropdown-item")}
              onClick={() => handleSelectItem(defaultValue)}
            >
              {defaultValue}
            </div>
          {items.map((item) => (
            <div
              key={item?.[fieldDropdown]}
              className={cx("SearchBox-dropdown-item")}
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
};

export default SearchSelectBox;
