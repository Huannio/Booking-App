import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import config from "~/config";

import ImageWrapper from "~/components/ImageWrapper";
import images from "~/assets/images";

const cx = classNames.bind(styles);
function Footer() {
  return (
    <>
      <div className={cx("footer-1", "flex justify-center")}>
        <footer className={cx("footer", "container")}>
          <div className={cx("flex flex-col gap-20")}>
            <Link to={config.routes.home}>
              <ImageWrapper src={images.whiteLogo} alt="mixivivu" widthSvgWrapperImage={218} heightSvgWrapperImage={59} />
            </Link>
            <label
              htmlFor=""
              className={cx("md")}
              style={{ color: "var(--gray-300)" }}
            >
              Công ty TNHH Du Lịch và Dịch Vụ Mixivivu
              <br />
              <br />
              Tầng 7, số nhà 25, ngõ 38 phố Yên Lãng, phường Láng Hạ, quận Đống
              Đa, TP. Hà Nội
              <br />
              <br />
              Mã số doanh nghiệp: 0110376372 do Sở Kế hoạch và Đầu tư Thành phố
              Hà Nội cấp ngày 05/06/2023
            </label>
          </div>
          <div className={cx("footer-list", "flex justify-between gap-32")}>
            <div className={cx("flex flex-col gap-16")}>
              <span className={cx("detail-sm")}>GIỚI THIỆU</span>
              <div className={cx("flex flex-col gap-12")}>
                {config.intro.map((item, index) => (
                  <Link
                    to={item.href}
                    key={index}
                    className={cx("subheading sm", "anchor")}
                  >
                    {item.content}
                  </Link>
                ))}
              </div>
            </div>

            <div className={cx("flex flex-col gap-16")}>
              <span className={cx("detail-sm")}>ĐIỂM ĐẾN</span>
              <div className={cx("flex flex-col gap-12")}>
                <Link
                  to={config.routes.home}
                  className={cx("subheading sm", "anchor")}
                >
                  Vịnh Hạ Long
                </Link>

                <Link
                  to={config.routes.home}
                  className={cx("subheading sm", "anchor")}
                >
                  Vịnh Hạ Long
                </Link>

                <Link
                  to={config.routes.home}
                  className={cx("subheading sm", "anchor")}
                >
                  Vịnh Hạ Long
                </Link>
              </div>
            </div>

            <div className={cx("flex flex-col gap-16")}>
              <span className={cx("detail-sm")}>DU THUYỀN</span>
              <div className={cx("flex flex-col gap-12")}>
                <Link
                  to={config.routes.home}
                  className={cx("subheading sm", "anchor")}
                >
                  Blog
                </Link>
                <Link
                  to={config.routes.home}
                  className={cx("subheading sm", "anchor")}
                >
                  Blog
                </Link>
                <Link
                  to={config.routes.home}
                  className={cx("subheading sm", "anchor")}
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div className={cx("footer-2", "flex justify-center")}>
        <footer className={cx("footer", "container")}>
          <p className="md">Bản quyền © 2024 Mixivivu.</p>
          <div className="flex gap-24 align-center">
            <a href="http://online.gov.vn/Home/WebDetails/110960">
              <ImageWrapper src={images.logoSaleNoti} alt="mixivivu" widthSvgWrapperImage={120} heightSvgWrapperImage={50} />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
