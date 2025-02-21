import classNames from "classnames/bind";
import styles from "../Home.module.scss";

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
    <section className={cx("home-partnersSection", "section-bg")}> 
      <div className={cx("container", "PartnerSection-section")}> 
        <div className={cx("SectionHeader-sectionHeader")}> 
          <div className={cx("SectionHeader-title")}> 
            <h4>
              Đối tác Cùng các <br /> Hãng Du thuyền Lớn
            </h4>
            <div>
            <span style = {{boxSizing: "border-box",display: "inline-block",overflow: "hidden",width: "initial",height: "initial",background: "none",opacity: 1,border: 0,margin: 0,padding: 0,position: "relative",maxWidth: "100%",}} >
              <span style = {{boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, maxWidth: "100%",}} >
                <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2780%27%20height=%278%27/%3e" style={{display: "block", maxWidth: "100%", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0,}} />
              </span>  
                <img 
                  srcSet="/src/assets/images/heading-border.webp 1x, /src/assets/images/heading-border.webp 2x"
                  src="/src/assets/images/heading-border.webp"
                  alt="Heading Border"
                  style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%",}} />
            </span>
          </div>
          </div>
          <p className={cx("lg", "SectionHeader-description")}>
            Đối tác hàng đầu với các hãng du thuyền danh tiếng: Ưu đãi độc quyền dành riêng cho bạn
          </p>
        </div>
        <div className={cx("PartnerSection-partnerList")}> 
          {partners.map((partner, index) => (
            <div key={index} className={cx("PartnerSection-img-wrapper")}>
              <div className={cx("img-container")}>
                <img src={partner} alt="Partner Logo" loading="lazy" className={cx("partner-img")} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnerSection;
