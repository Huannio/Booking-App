import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";
import Button from "../Button";

const cx = classNames.bind(styles);
function NotFound() {
  return (
    <div className={cx("Card", "NotFound")}>
      <div className={cx("NotFound-imgWrapper")}>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="https://res.cloudinary.com/dhnp8ymxv/image/upload/v1742663567/buon_transparent_lgfryk.png"
            alt="mixivivu"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className={cx("flex flex-col gap-8")}>
        <h5>Rất tiếc, Mixivivu không tìm thấy kết quả cho bạn</h5>
        <p className="md" style={{ color: "var(--gray-600, #475467)" }}>
          Nhấn OK để bắt đầu tìm kiếm mới.
        </p>
      </div>

      <Link to="/">
        <Button normal outline>
          <div className="label md">OK</div>
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
      </Link>
    </div>
  );
}

export default NotFound;
