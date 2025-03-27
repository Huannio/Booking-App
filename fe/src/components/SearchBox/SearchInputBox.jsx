import styles from "./SearchBox.module.scss";
import Proptypes from "prop-types";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function SearchInputBox({
  className,
  inputGroup,
  name,
  placeholder,
  label,
  firstIcon,
  lastIcon,
  api,
  fieldDropdown,
  fieldDropdownLink,
  to,
  reactHookFormChange,
  onSearchResult,
  hideDropdown,
  isDebounceEmptyCallApi = true,
}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([]);
  const debounced = useDebounce(value, 700);
  const isFirstRender = useRef(true);
  const handleSelectItem = (item) => {
    setValue(item);
    setDropdownVisible(false);
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

  const handleChange = (e) => {
    setValue(e.target.value);
    setDropdownVisible(false);
    if (reactHookFormChange) reactHookFormChange(e); // set value cho react-hook-form
  };

  useEffect(() => {
    console.log(isFirstRender.current);
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Bỏ qua lần render đầu tiên
    }

    if (!isDebounceEmptyCallApi && !debounced.trim()) return;
    if (!api) return;
    api(debounced).then((res) => {
      setItems(res.data);
      if (onSearchResult) onSearchResult(res.data);
      if (hideDropdown) return;
      setDropdownVisible(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, api]);

  return (
    <div ref={wrapperRef} className={cx(className, "SearchBox-searchInput")}>
      <div>
        <label
          htmlFor={name}
          className={inputGroup ? "input-group" : "not-input-group"}
        >
          {firstIcon}

          <input
            name={name}
            placeholder={placeholder}
            className="p-md"
            id={name}
            type="text"
            value={value}
            autoComplete="off"
            onChange={handleChange}
          />

          {lastIcon}

          <label htmlFor={name} className={cx("sm")}>
            {label}
          </label>
        </label>
      </div>

      {dropdownVisible && (
        <div className={cx("SearchBox-dropdown")}>
          {items && items.length === 0 && (
            <div
              className={cx(
                "flex flex-col gap-12 justify-center align-center w-full"
              )}
              style={{ padding: "20px" }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1742663567/buon_transparent_lgfryk.png"
                  alt="mixivivu"
                  width={"100%"}
                  height={"100%"}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p>Không tìm thấy kết quả</p>
            </div>
          )}
          {items.map((item) => (
            <Link key={item?.id} to={to + item?.[fieldDropdownLink]}>
              <div
                className={cx("SearchBox-dropdown-item")}
                onClick={() => handleSelectItem(item?.[fieldDropdown])}
              >
                {item?.[fieldDropdown]}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

SearchInputBox.propTypes = {
  className: Proptypes.string,
  inputGroup: Proptypes.bool,
  name: Proptypes.string,
  placeholder: Proptypes.string,
  label: Proptypes.string,
  firstIcon: Proptypes.node,
  lastIcon: Proptypes.node,
  api: Proptypes.func,
  fieldDropdown: Proptypes.string,
  fieldDropdownLink: Proptypes.string,
  to: Proptypes.string,
  reactHookFormChange: Proptypes.func,
  onSearchResult: Proptypes.func,
  hideDropdown: Proptypes.bool,
  isDebounceEmptyCallApi: Proptypes.bool,
};

export default SearchInputBox;
