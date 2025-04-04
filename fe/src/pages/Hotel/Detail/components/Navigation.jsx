/* eslint-disable react/prop-types */
import classNames from "classnames/bind";

import styles from "../Hotel.module.scss";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import Badge from "~/components/Badge/Badge";
import { formatMoney } from "~/utils/formatters";

const cx = classNames.bind(styles);
function Navigation({
  title,
  default_price,
  score_reviews,
  num_reviews,
  address,
}) {
  return (
    <div className="container">
      <div className={cx("ShipDetail-navigation")}>
        <SectionHeader
          column
          title={
            <h4>
              <div className="flex gap-32">
                <div className="flex flex-col gap-16 flex-grow">
                  <h4>{title}</h4>
                  <div className={cx("flex gap-8", "ShipDetail-badgeList")}>
                    <Badge
                      warning
                      BadgeLg
                      ContentSm
                      svg={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.2443 4.17391C11.4758 3.50799 11.5916 3.17503 11.7627 3.08276C11.9108 3.00289 12.0892 3.00289 12.2373 3.08276C12.4084 3.17503 12.5242 3.50799 12.7556 4.17391L14.2859 8.5763C14.3518 8.76583 14.3847 8.86059 14.4441 8.93116C14.4965 8.9935 14.5634 9.04209 14.6389 9.07269C14.7244 9.10734 14.8247 9.10938 15.0253 9.11347L19.6851 9.20843C20.3899 9.22279 20.7423 9.22998 20.883 9.36423C21.0047 9.48042 21.0598 9.65005 21.0297 9.81559C20.9948 10.0069 20.7139 10.2198 20.1521 10.6458L16.438 13.4615C16.2782 13.5828 16.1982 13.6434 16.1494 13.7216C16.1063 13.7908 16.0808 13.8694 16.075 13.9506C16.0685 14.0426 16.0975 14.1387 16.1556 14.3307L17.5053 18.7918C17.7094 19.4666 17.8115 19.804 17.7273 19.9792C17.6544 20.1309 17.5101 20.2357 17.3433 20.2582C17.1506 20.2841 16.8613 20.0828 16.2826 19.6801L12.4569 17.018C12.2922 16.9034 12.2099 16.8461 12.1204 16.8239C12.0413 16.8042 11.9587 16.8042 11.8796 16.8239C11.7901 16.8461 11.7078 16.9034 11.5431 17.018L7.71738 19.6801C7.1387 20.0828 6.84936 20.2841 6.65666 20.2582C6.48988 20.2357 6.34559 20.1309 6.2727 19.9792C6.18848 19.804 6.29056 19.4666 6.49471 18.7918L7.84436 14.3307C7.90246 14.1387 7.93151 14.0426 7.92497 13.9506C7.91919 13.8694 7.89365 13.7908 7.85056 13.7216C7.80179 13.6434 7.72184 13.5828 7.56195 13.4615L3.84791 10.6458C3.28611 10.2198 3.00521 10.0069 2.97034 9.81559C2.94015 9.65005 2.99527 9.48042 3.11699 9.36423C3.25764 9.22998 3.61007 9.22279 4.31492 9.20843L8.97472 9.11347C9.17533 9.10938 9.27564 9.10734 9.3611 9.07269C9.43659 9.04209 9.50346 8.9935 9.5559 8.93116C9.61526 8.86059 9.6482 8.76583 9.71408 8.5763L11.2443 4.17391Z"
                            stroke="var(--warning-base)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      }
                      content={`${score_reviews} (${num_reviews} đánh giá)`}
                    />
                    <a href="#map">
                      <Badge
                        BadgeDefault
                        BadgeLg
                        svg={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M6 4.2C6.74558 4.2 7.35 3.59558 7.35 2.85C7.35 2.10442 6.74558 1.5 6 1.5C5.25442 1.5 4.65 2.10442 4.65 2.85C4.65 3.59558 5.25442 4.2 6 4.2ZM6 4.2V10.5M6 10.5C4.80653 10.5 3.66193 10.0259 2.81802 9.18198C1.97411 8.33807 1.5 7.19347 1.5 6H2.85M6 10.5C7.19347 10.5 8.33807 10.0259 9.18198 9.18198C10.0259 8.33807 10.5 7.19347 10.5 6H9.15"
                              stroke="var(--gray-500)"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        }
                        ContentSm
                        content={address}
                      >
                        <a href="#map" className={cx("ShipDetail-mapLink")}>
                          Xem bản đồ và lịch trình
                        </a>
                      </Badge>
                    </a>
                  </div>
                </div>
              </div>
            </h4>
          }
        />
        <h4 style={{ color: "var(--primary-dark, #0E4F4F)" }}>
          {formatMoney(default_price)} đ/ khách
        </h4>
      </div>
    </div>
  );
}

export default Navigation;
