/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import SectionHeader from "~/components/SectionHeader/SectionHeader";
import styles from "../Cruise.module.scss";

const cx = classNames.bind(styles);
function Map({ id, title, address, schedule, schedule_link, map_iframe_link }) {
  return (
    <div className="flex flex-col gap-40" id={id}>
      <SectionHeader title={<h4>Bản đồ và lịch trình</h4>} />
      <div className="flex flex-col gap-20">
        <div className={cx("Alert", "Alert-gray")}>
          <div className={cx("Alert-clostBtn")}>
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
          </div>

          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M13 16H12V12H11M12 8H12.01M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </div>

          <div>
            <label className="sm">Thông tin cần biết:</label>
            <div className={cx("Alert-content")}>
              <ul>
                <li>
                  Du thuyền {title} xuất phát từ {address}
                </li>

                <li>
                  Bạn có thể xem chi tiết lịch trình {schedule}
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "var(--primary-dark, #0E4F4F)",
                      textDecoration: "underline",
                    }}
                    to={schedule_link}
                  >
                    tại đây
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <iframe
          title="google-map"
          width="100%"
          height="332"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            border: "0px",
            borderRadius: "24px",
          }}
          src={map_iframe_link}
        />
      </div>
    </div>
  );
}

export default Map;
