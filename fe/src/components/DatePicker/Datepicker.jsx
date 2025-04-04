/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

import Button from "~/components/Button/Button";
import { InputField } from "~/components/Input";

function Datepicker({ control, setValue }) {
  const [startDate, setStartDate] = useState(new Date());

  // Format ngày thành "dd/MM/yyyy"
  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Chuyển đổi ngày từ chuỗi "dd/MM/yyyy" sang Date
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatMonth = (date) => {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    return `${months[date.getMonth()]}, ${date.getFullYear()}`;
  };

  const weekdaysInVietnamese = {
    Sunday: "CN", // Chủ nhật
    Monday: "T2", // Thứ hai
    Tuesday: "T3", // Thứ ba
    Wednesday: "T4", // Thứ tư
    Thursday: "T5", // Thứ năm
    Friday: "T6", // Thứ sáu
    Saturday: "T7", // Thứ bảy
  };

  return (
    <div className="DatePicker-mixiDatePicker">
      <Controller
        name="checkin_date"
        control={control}
        defaultValue={formatDate(startDate)} // Lưu dưới dạng chuỗi "dd/MM/yyyy"
        render={({ field }) => {
          const selectedDate = field.value
            ? parseDate(field.value)
            : new Date();

          return (
            <DatePicker
              selected={selectedDate} // Truyền kiểu Date vào DatePicker
              onChange={(date) => {
                setStartDate(date);
                setValue("checkin_date", formatDate(date)); // Lưu chuỗi "dd/MM/yyyy"
              }}
              disabledKeyboardNavigation
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              showPopperArrow={false}
              formatWeekDay={(day) => weekdaysInVietnamese[day] || day}
              dayClassName={() => "DatePicker-calendarCell"}
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="DatePicker-header">
                  <Button
                    small
                    linkColor
                    onlyIcon
                    onClick={decreaseMonth}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 6L9 12L15 18"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </Button>

                  <div className="subheading sm">{formatMonth(date)}</div>

                  <Button
                    small
                    linkColor
                    onlyIcon
                    onClick={increaseMonth}
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 6L15 12L9 18"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </Button>
                </div>
              )}
              customInput={
                <div>
                  <InputField
                    firstIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M3 9H21M7 3V5M17 3V5M6 12H10V16H6V12ZM6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
                          stroke="#101828"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    }
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
                    label="Ngày nhận phòng"
                    name="checkin_date"
                    control={control}
                    readOnly
                  />
                </div>
              }
            />
          );
        }}
      />
    </div>
  );
}

export default Datepicker;
