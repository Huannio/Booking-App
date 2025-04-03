import classNames from "classnames/bind";
import styles from "./CheckBox.module.scss";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function CheckBox({ id, title, description, value, onChange, checked }) {
  return (
    <label htmlFor={id} className={cx("Checkbox-container")}>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        value={value}
        checked={checked}
      />
      <span className={cx("Checkbox-checkmark", "Checkbox-sm")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 12.6111L8.92308 17.5L20 6.5"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </span>

      <div className={cx("Checkbox-textGroup")}>
        <div className={cx("sm label", "Checkbox-title")}>{title}</div>
        <p className="sm">{description}</p>
      </div>
    </label>
  );
}

CheckBox.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
}

export default CheckBox;
