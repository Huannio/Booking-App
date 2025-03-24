import classNames from "classnames/bind";
import styles from "./HomePartnersSection.module.scss";
import SectionHeader from "~/components/SectionHeader/SectionHeader";

const cx = classNames.bind(styles);

const partners = [
  "/src/assets/partner/partner1.png",
  "/src/assets/partner/partner2.png",
  "/src/assets/partner/partner3.png",
  "/src/assets/partner/partner4.png",
  "/src/assets/partner/partner5.png",
  "/src/assets/partner/partner6.png",
  "/src/assets/partner/partner7.png",
  "/src/assets/partner/partner8.png",
  "/src/assets/partner/partner9.png",
  "/src/assets/partner/partner10.png",
  "/src/assets/partner/partner11.png",
  "/src/assets/partner/partner12.png",
  "/src/assets/partner/partner13.png",
  "/src/assets/partner/partner14.png",
];

function PartnerSection() {
  return (
    <section className={cx("Home-partnersSection", "section-bg")}>
      <div className={cx("container", "PartnerSection-section")}>
        <SectionHeader
          title={
            <h4>
              Đối tác Cùng các <br /> Khách Sạn Lớn
            </h4>
          }
          mainContent="Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi độc quyền dành riêng cho bạn"
        />
        <div className={cx("PartnerSection-partnerList")}>
          {partners.map((partner, index) => (
            <div key={index} className={cx("PartnerSection-img-wrapper")}>
              <div className={cx("img-container")}>
                <img
                  src={partner}
                  alt="Partner Logo"
                  loading="lazy"
                  className={cx("partner-img")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerSection;
