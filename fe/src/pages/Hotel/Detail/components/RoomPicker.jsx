/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import styles from "../Hotel.module.scss";
import Button from "~/components/Button/Button";
import { useEffect, useRef, useState } from "react";
import InputField from "~/components/Input/InputField";

const cx = classNames.bind(styles);
function RoomPicker({ control, setValue }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [selectedValue, setSelectedValue] = useState(
    `${adult} Người lớn - ${child} Trẻ em`
  );

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

  const handleSelect = () => {
    setDropdownVisible(true);
  };

  const handleIncreaseAdult = () => {
    setAdult(adult + 1);
  };

  const handleDecreaseAdult = () => {
    if (adult > 1) {
      setAdult(adult - 1);
    }
  };

  const handleIncreaseChild = () => {
    setChild(child + 1);
  };

  const handleDecreaseChild = () => {
    if (child > 0) {
      setChild(child - 1);
    }
  };

  const handleApplyChanges = () => {
    setDropdownVisible(false);
    setSelectedValue(`${adult} Người lớn - ${child} Trẻ em`);
    setValue("guests_number", `${adult} Người lớn - ${child} Trẻ em`);
  };

  return (
    <div className={cx("RoomPicker-roomPicker")} ref={wrapperRef}>
      <div onClick={handleSelect}>
        <InputField
          control={control}
          name="guests_number"
          label="Số lượng"
          defaultValue={selectedValue}
          value={selectedValue}
          lastIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          }
          readOnly
        />
      </div>

      {dropdownVisible && (
        <div className={cx("RoomPicker-roomPicker-dropdown")}>
          <div className={cx("RoomPicker-content", "flex flex-col gap-16")}>
            <div className={cx("RoomPicker-item", "flex gap-8")}>
              <div className={cx("subheading md", "RoomPicker-item-value")}>
                {adult}
              </div>
              <label className="lg flex-grow">Người lớn</label>
              <div className={cx("RoomPicker-groupBtn")}>
                <div
                  onClick={handleDecreaseAdult}
                  className={cx("RoomPicker-item-btn", "RoomPicker-minus")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 12L18 12"
                      stroke="#101828"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div
                  onClick={handleIncreaseAdult}
                  className={cx("RoomPicker-item-btn")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 12H18M12 6V18"
                      stroke="#101828"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className={cx("RoomPicker-item", "flex gap-8")}>
              <div className={cx("subheading md", "RoomPicker-item-value")}>
                {child}
              </div>
              <label className="lg flex-grow">Trẻ em</label>
              <div className={cx("RoomPicker-groupBtn")}>
                <div
                  onClick={handleDecreaseChild}
                  className={cx("RoomPicker-item-btn", "RoomPicker-minus")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 12L18 12"
                      stroke="#101828"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <div
                  onClick={handleIncreaseChild}
                  className={cx("RoomPicker-item-btn")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 12H18M12 6V18"
                      stroke="#101828"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("RoomPicker-actions")}>
            <Button
              onClick={handleApplyChanges}
              className={cx("RoomPicker-actions-btn")}
              small
              primary
            >
              <div className="label sm">Áp dụng</div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomPicker;
