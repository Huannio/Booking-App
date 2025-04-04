/* eslint-disable react/prop-types */
import classNames from "classnames/bind";

import SectionHeader from "~/components/SectionHeader/SectionHeader";
import Button from "~/components/Button/Button";
import RoomCard from "~/components/Card/RoomCard";

import { formatMoney } from "~/utils/formatters";
import styles from "../Cruise.module.scss";
import { useRef, useState } from "react";
import Popup from "./Popup";

const cx = classNames.bind(styles);

function Rooms({ id, rooms }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const roomCardRefs = useRef([]);

  const handleTotalPrice = (price, quantity) => {
    setTotalPrice((prevPrice) => prevPrice + price * quantity);
  };

  const handleReset = () => {
    roomCardRefs.current.forEach((roomCard) => {
      if (roomCard) {
        roomCard.reset();
      }
    });
  };

  return (
    <>
      <div className={cx("flex flex-col gap-40")} id={id}>
        <SectionHeader title={<h4>Các loại phòng & giá</h4>} />

        <div
          className={cx(
            "flex flex-col gap-40 section-bg",
            "ShipDetail-roomTypes"
          )}
        >
          <div className="flex justify-end">
            <Button small outline type="button" onClick={handleReset}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <div className="label sm">Xóa lựa chọn</div>
            </Button>
          </div>

          <div className="flex flex-col gap-16">
            {rooms?.map((room) => (
              <div key={room.id}>
                <RoomCard
                  ref={(el) => (roomCardRefs.current[room.id] = el)}
                  imgSrc={room.images}
                  title={room.title}
                  size={room.size}
                  max_persons={room.max_persons}
                  default_price={room.default_price}
                  handleTotalPrice={handleTotalPrice}
                />
              </div>
            ))}
          </div>

          <div
            className={cx(
              "flex align-center gap-40 justify-between",
              "ShipDetail-roomsFooter"
            )}
          >
            <div>
              <label className={cx("sm", "ShipDetail-price-label")}>
                Tổng tiền
              </label>
              <div className={cx("subheading lg", "ShipDetail-price")}>
                {formatMoney(totalPrice)} đ
              </div>
            </div>

            <div className="flex gap-16">
              <Button normal outline type="button">
                <div
                  className="label md"
                  onClick={() => setDropdownVisible(true)}
                >
                  Thuê trọn tàu
                </div>
              </Button>

              <Button normal color type="button">
                <div
                  className="label md"
                  onClick={() => setDropdownVisible(true)}
                >
                  Đặt ngay
                </div>
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
      </div>

      {dropdownVisible && <Popup setDropdownVisible={setDropdownVisible} totalPrice={totalPrice} />}
    </>
  );
}

export default Rooms;
