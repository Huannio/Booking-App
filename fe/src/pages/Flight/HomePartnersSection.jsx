import classNames from "classnames/bind";
import styles from "./HomePartnersSection.module.scss";
import SectionHeader from "~/components/SectionHeader/SectionHeader";

const cx = classNames.bind(styles);

const partners = [
  "/src/assets/flight/flight-partner-0.png",
  "/src/assets/flight/flight-partner-1.png",
  "/src/assets/flight/flight-partner-2.png",
  "/src/assets/flight/flight-partner-3.png",
  "/src/assets/flight/flight-partner-4.png",
  "/src/assets/flight/flight-partner-5.png",
  "/src/assets/flight/flight-partner-6.png",
  "/src/assets/flight/flight-partner-7.png",
  "/src/assets/flight/flight-partner-8.png",
  "/src/assets/flight/flight-partner-9.png",
  "/src/assets/flight/flight-partner-10.png",
  "/src/assets/flight/flight-partner-11.png",
  "/src/assets/flight/flight-partner-12.png",
  "/src/assets/flight/flight-partner-13.png",
  "/src/assets/flight/flight-partner-14.png",
];

function PartnerSection() {
  return (
    <section className={cx("Home-partnersSection", "section-bg")}>
      <div className={cx("container", "PartnerSection-section")}>
        <SectionHeader
          title={
            <h4>
              Đối tác Cùng các <br /> Hãng Du thuyền Lớn
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
