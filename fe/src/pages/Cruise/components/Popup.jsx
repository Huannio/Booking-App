import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "../Cruise.module.scss";
import { TextField, InputField } from "~/components/Input";
import Button from "~/components/Button/Button";
import Datepicker from "~/components/DatePicker/DatePicker";
import RoomPicker from "./RoomPicker";
import { formatMoney } from "~/utils/formatters";
import config from "~/config";

const cx = classNames.bind(styles);

function Popup({ setDropdownVisible, totalPrice }) {
  const {
    control,
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(config.orderSchema),
  });

  const handleOrderForm = (data) => {
    console.log(data);
  };

  return (
    <div className={cx("Popup-root")}>
      <div
        className={cx("Popup-overlay")}
        tabIndex="-1"
        data-popup="modal"
        data-testid="overlay"
        style={{
          position: "fixed",
          inset: "0px",
          display: "block",
          zIndex: "99999",
          pointerEvents: "auto",
        }}
      >
        <div
          className={cx("Popup-content")}
          role="dialog"
          id="popup"
          style={{
            position: "relative",
            margin: "auto",
            pointerEvents: "auto",
          }}
        >
          <div>
            <div
              className={cx("Modal-closeBtn")}
              onClick={() => setDropdownVisible(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="var(--gray-600)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>

            <form onSubmit={handleSubmit(handleOrderForm)}>
              <div className={cx("ShipDetail-booking-detail-modal")}>
                <h6>Đặt du thuyền</h6>
                <div className={cx("ShipDetail-divider")}></div>

                <div className="flex flex-col gap-24">
                  <div className={cx("ShipDetail-groupInput")}>
                    <Datepicker control={control} setValue={setValue} />
                    <RoomPicker control={control} setValue={setValue} />
                  </div>

                  <InputField
                    label="Họ và tên"
                    type="text"
                    name="name"
                    placeholder="Nhập họ và tên"
                    control={control}
                    error={errors.name}
                    required
                  />

                  <InputField
                    label="Số điện thoại"
                    name="phone_number"
                    placeholder="Nhập số điện thoại"
                    control={control}
                    error={errors.phone_number}
                    required
                  />

                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Nhập email"
                    control={control}
                    error={errors.email}
                    required
                  />

                  <TextField
                    label="Yêu cầu của bạn"
                    name="request"
                    placeholder="Nhập yêu cầu của bạn"
                    control={control}
                    error={errors.request}
                  />
                </div>

                <div
                  className={cx(
                    "flex gap-40 justify-between",
                    "ShipDetail-booking-detail-modal-footer"
                  )}
                >
                  <div className="flex flex-col gap-6">
                    <label className={cx("sm", "ShipDetail-price-label")}>
                      Tổng tiền
                    </label>
                    <div
                      className={cx("subheading lg", "ShipDetail-price")}
                      style={{ color: "var(--primary-dark, #0E4F4F)" }}
                    >
                      {formatMoney(totalPrice)} đ
                      <input
                        name="price"
                        value={`${formatMoney(totalPrice)} đ`}
                        type="hidden"
                        {...register("price")}
                      />
                    </div>
                  </div>

                  <div
                    className={cx(
                      "ShipDetail-actions",
                      "flex gap-16 flex-grow justify-end"
                    )}
                  >
                    <Button normal outline to="/lien-he">
                      <div className="label md">Đăng ký tư vấn</div>
                    </Button>

                    <Button type="submit" normal primary color>
                      <div className="label md">Đặt ngay</div>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
