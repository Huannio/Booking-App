
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./DatePicker.module.scss"; 

const cx = classNames.bind(styles);

const CustomDatePicker = ({ selected, onChange, placeholderText, minDate, dateFormat }) => {
  return (
    <div className={cx("custom-datepicker")}>
      <DatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={placeholderText}
        minDate={minDate}
        dateFormat={dateFormat || "dd/MM/yyyy"} // Định dạng mặc định là "dd/MM/yyyy"
        className={cx("datepicker-input")}
        calendarClassName={cx("custom-calendar")}
        renderCustomHeader={({
          monthDate,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className={cx("custom-header")}>
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className={cx("nav-button")}
            >
              {"<"}
            </button>
            <span className={cx("month-title")}>
              {monthDate.toLocaleString("vi-VN", { month: "long", year: "numeric" })}
            </span>
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className={cx("nav-button")}
            >
              {">"}
            </button>
          </div>
        )}
      />
      <svg
        className={cx("calendar-icon")}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    </div>
  );
};

CustomDatePicker.propTypes = {
  selected: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholderText: PropTypes.string,
  minDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
};

export default CustomDatePicker;