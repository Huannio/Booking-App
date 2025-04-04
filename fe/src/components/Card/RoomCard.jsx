/* eslint-disable react/prop-types */
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Card.module.scss";
import Button from "../Button/Button";
import { formatMoney } from "~/utils/formatters";
import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
const cx = classNames.bind(styles);

const RoomCard = forwardRef(
  (
    {
      imgSrc,
      id,
      title,
      size,
      bedType,
      view,
      max_persons,
      default_price,
      handleTotalPrice,
      option = "",
      onRoomSelect,
      quantityRoomOrder,
    },
    ref
  ) => {
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
      const roomOrder = quantityRoomOrder?.find((room) => room.room_id === id);
      if (roomOrder) {
        setQuantity(roomOrder.quantity);
      }
    }, [quantityRoomOrder, id]);

    const handleIncreaseQuantity = () => {
      setQuantity((prevQuantity) => {
        const newQuantity = prevQuantity + 1;
        handleTotalPrice(default_price, 1);
        if (onRoomSelect) {
          const room = {
            id: id,
            title: title,
            size: size,
            bedType: bedType,
            view: view,
            max_persons: max_persons,
            default_price: default_price,
            quantity: newQuantity,
            images: imgSrc,
          };
          onRoomSelect(room, newQuantity);
        }
        return newQuantity;
      });
    };

    const handleDecreaseQuantity = () => {
      setQuantity((prevQuantity) => {
        if (prevQuantity > 0) {
          const newQuantity = prevQuantity - 1;
          handleTotalPrice(default_price, -1);
          if (onRoomSelect) {
            const room = {
              id: id,
              title: title,
              size: size,
              bedType: bedType,
              view: view,
              max_persons: max_persons,
              default_price: default_price,
              quantity: newQuantity,
              images: imgSrc,
            };
            onRoomSelect(room, newQuantity);
          }

          return newQuantity;
        }

        if (prevQuantity === 0) {
          if (onRoomSelect) {
            onRoomSelect(null, 0);
          }
        }

        return prevQuantity;
      });
    };

    const reset = () => {
      setQuantity(0);
      handleTotalPrice(default_price, -quantity);
    };

    useImperativeHandle(ref, () => ({
      reset,
    }));

    return (
      <div className={cx("Card", `${option}RoomCard`)}>
        <div className={cx(`${option}RoomCard-imgWrapper`)}>
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              width="100%"
              height="100%"
              loading="lazy"
              style={{ objectFit: "cover" }}
              src={imgSrc}
              alt="room-thumbnail"
            />
          </div>
        </div>

        <div className={cx(`${option}RoomCard-roomDetail`)}>
          <p className={cx(`${option}RoomCard-title`)}>{title}</p>
          <div className={cx(`${option}RoomCard-roomInfo`)}>
            {size && (
              <div className={cx(`${option}RoomCard-roomInfo-item`)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 3.5H4C3.20435 3.5 2.44129 3.81607 1.87868 4.37868C1.31607 4.94129 1 5.70435 1 6.5V19.5C1 19.7652 1.10536 20.0196 1.29289 20.2071C1.48043 20.3946 1.73478 20.5 2 20.5H6C6.16471 20.4991 6.32665 20.4576 6.47145 20.3791C6.61625 20.3006 6.73941 20.1876 6.83 20.05L8.54 17.5H15.46L17.17 20.05C17.2606 20.1876 17.3838 20.3006 17.5285 20.3791C17.6733 20.4576 17.8353 20.4991 18 20.5H22C22.2652 20.5 22.5196 20.3946 22.7071 20.2071C22.8946 20.0196 23 19.7652 23 19.5V6.5C23 5.70435 22.6839 4.94129 22.1213 4.37868C21.5587 3.81607 20.7956 3.5 20 3.5ZM21 18.5H18.54L16.83 16C16.7454 15.8531 16.6248 15.7302 16.4796 15.6428C16.3344 15.5553 16.1694 15.5062 16 15.5H8C7.83529 15.5009 7.67335 15.5424 7.52855 15.6209C7.38375 15.6994 7.26059 15.8124 7.17 15.95L5.46 18.5H3V13.5H21V18.5ZM7 11.5V10.5C7 10.2348 7.10536 9.98043 7.29289 9.79289C7.48043 9.60536 7.73478 9.5 8 9.5H10C10.2652 9.5 10.5196 9.60536 10.7071 9.79289C10.8946 9.98043 11 10.2348 11 10.5V11.5H7ZM13 11.5V10.5C13 10.2348 13.1054 9.98043 13.2929 9.79289C13.4804 9.60536 13.7348 9.5 14 9.5H16C16.2652 9.5 16.5196 9.60536 16.7071 9.79289C16.8946 9.98043 17 10.2348 17 10.5V11.5H13ZM21 11.5H19V10.5C19 9.70435 18.6839 8.94129 18.1213 8.37868C17.5587 7.81607 16.7956 7.5 16 7.5H14C13.2599 7.50441 12.5476 7.78221 12 8.28C11.4524 7.78221 10.7401 7.50441 10 7.5H8C7.20435 7.5 6.44129 7.81607 5.87868 8.37868C5.31607 8.94129 5 9.70435 5 10.5V11.5H3V6.5C3 6.23478 3.10536 5.98043 3.29289 5.79289C3.48043 5.60536 3.73478 5.5 4 5.5H20C20.2652 5.5 20.5196 5.60536 20.7071 5.79289C20.8946 5.98043 21 6.23478 21 6.5V11.5Z"
                    fill="var(--gray-600)"
                  ></path>
                </svg>

                <p className="sm">{size} m²</p>
              </div>
            )}

            {bedType && (
              <div className={cx(`${option}RoomCard-roomInfo-item`)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 3.5H4C3.20435 3.5 2.44129 3.81607 1.87868 4.37868C1.31607 4.94129 1 5.70435 1 6.5V19.5C1 19.7652 1.10536 20.0196 1.29289 20.2071C1.48043 20.3946 1.73478 20.5 2 20.5H6C6.16471 20.4991 6.32665 20.4576 6.47145 20.3791C6.61625 20.3006 6.73941 20.1876 6.83 20.05L8.54 17.5H15.46L17.17 20.05C17.2606 20.1876 17.3838 20.3006 17.5285 20.3791C17.6733 20.4576 17.8353 20.4991 18 20.5H22C22.2652 20.5 22.5196 20.3946 22.7071 20.2071C22.8946 20.0196 23 19.7652 23 19.5V6.5C23 5.70435 22.6839 4.94129 22.1213 4.37868C21.5587 3.81607 20.7956 3.5 20 3.5ZM21 18.5H18.54L16.83 16C16.7454 15.8531 16.6248 15.7302 16.4796 15.6428C16.3344 15.5553 16.1694 15.5062 16 15.5H8C7.83529 15.5009 7.67335 15.5424 7.52855 15.6209C7.38375 15.6994 7.26059 15.8124 7.17 15.95L5.46 18.5H3V13.5H21V18.5ZM7 11.5V10.5C7 10.2348 7.10536 9.98043 7.29289 9.79289C7.48043 9.60536 7.73478 9.5 8 9.5H10C10.2652 9.5 10.5196 9.60536 10.7071 9.79289C10.8946 9.98043 11 10.2348 11 10.5V11.5H7ZM13 11.5V10.5C13 10.2348 13.1054 9.98043 13.2929 9.79289C13.4804 9.60536 13.7348 9.5 14 9.5H16C16.2652 9.5 16.5196 9.60536 16.7071 9.79289C16.8946 9.98043 17 10.2348 17 10.5V11.5H13ZM21 11.5H19V10.5C19 9.70435 18.6839 8.94129 18.1213 8.37868C17.5587 7.81607 16.7956 7.5 16 7.5H14C13.2599 7.50441 12.5476 7.78221 12 8.28C11.4524 7.78221 10.7401 7.50441 10 7.5H8C7.20435 7.5 6.44129 7.81607 5.87868 8.37868C5.31607 8.94129 5 9.70435 5 10.5V11.5H3V6.5C3 6.23478 3.10536 5.98043 3.29289 5.79289C3.48043 5.60536 3.73478 5.5 4 5.5H20C20.2652 5.5 20.5196 5.60536 20.7071 5.79289C20.8946 5.98043 21 6.23478 21 6.5V11.5Z"
                    fill="var(--gray-600)"
                  ></path>
                </svg>
                <p className="sm">{bedType}</p>
              </div>
            )}

            {view && (
              <div className={cx(`${option}RoomCard-roomInfo-item`)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"
                    stroke="var(--gray-600)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <p className="sm">{view}</p>
              </div>
            )}

            {max_persons && (
              <div className={cx(`${option}RoomCard-roomInfo-item`)}>
                <p className="sm">Tối đa:</p>
                <div className="flex gap-4 align-center">
                  <p className="sm">{max_persons}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                      stroke="var(--gray-600)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={cx(
            "flex gap-20 justify-between align-center",
            `${option}RoomCard-footer`
          )}
        >
          <div>
            <div className={cx(`${option}RoomCard-price`, "subheading md")}>
              {formatMoney(default_price)} đ
            </div>
            <div className={cx(`${option}RoomCard-user`)}>/khách</div>
          </div>

          <Button normal outline className={cx("RoomCard-roomBtn")}>
            <div onClick={handleDecreaseQuantity}>
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

            <div className="label md">{quantity}</div>

            <div onClick={handleIncreaseQuantity}>
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
          </Button>
        </div>
      </div>
    );
  }
);

RoomCard.displayName = "RoomCard";
RoomCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.number,
  bedType: PropTypes.string,
  view: PropTypes.string,
  max_persons: PropTypes.number,
  default_price: PropTypes.string,
  option: PropTypes.string,
  handleTotalPrice: PropTypes.func,
};

export default RoomCard;
