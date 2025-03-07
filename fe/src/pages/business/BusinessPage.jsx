import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "./BusinessPage.module.scss";

const cx = classNames.bind(styles);

function BusinessPage() {
  return (
    <div className={cx("section-bg")}> 
      <div className={cx("container", "flex", "flex-col", "gap-80", "BusinessPage-Wrapper")}>
        <div className={cx("BusinessPage-business-info", "flex", "gap-136")}>
          <div className={cx("flex", "flex-col", "justify-between", "gap-40")}>
            <div className={cx("flex", "flex-col", "gap-24")}>
              <div className={cx("SectionHeader-sectionHeader")}>
                <div className={cx("SectionHeader-title")}>
                  <h4>
                  Mixivivu - Tour Du thuyền Hạ Long: Kết nối doanh nghiệp, khám phá vẻ đẹp tự nhiên
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
              </div>
              <label className={cx("lg")} style={{ color: "var(--gray-600, #475467)" }}>
                Với sự trải nghiệm thực tế, Công ty TNHH Du lịch và Dịch vụ MixiVivu mong muốn đưa du thuyền Hạ Long trở thành một lựa chọn đầu tiên cho doanh nghiệp. Nhiều chương trình du lịch hấp dẫn, đa dạng được kết hợp sẽ đem đến cho quý doanh nghiệp sự hài lòng và thuận tiện. Du thuyền Hạ Long cũng sẽ là một món quà tri ân vô cùng ý nghĩa dành cho nhân viên của quý doanh nghiệp. Bên cạnh đó, du thuyền Hạ Long còn rất phù hợp cho những cuộc hội thảo, hợp tác đầu tư hay giao lưu của quý doanh nghiệp.
              </label>
            </div>
            <a href="/lien-he">
              <Button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-primary", "btn-color")}> 
                <div className={cx("label", "md")}>Liên hệ với Mixivivu</div>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </a>
          </div>
          <div className={cx("flex", "flex-col", "gap-24")}> 
            <div className={cx("BusinessPage-feature-card", "flex", "gap-24", "align-center")}> 
                <div className={cx("BusinessPage-img-Wrapper")}>
                    <div style={{height:"100%", position:"relative", overflow:"hidden",}}>
                        <img alt="mixivivu" src="./src/assets/partner/business1.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                </div>
                <div className={cx("flex", "flex-col", "gap-16")}>
                    <h6>Lịch trình phù hợp với yêu cầu của doanh nghiệp</h6>
                    <p className={cx("sm")} style={{ color: "var(--gray-600, #475467)" }}>
                        Du thuyền sẽ sắp xếp lịch trình phù hợp với từng sự kiện của doanh nghiệp: du
                        lịch của công ty tri ân nhân viên, hội thảo hay làm việc với đối tác
                    </p>
                </div>
            </div>
            <div className={cx("BusinessPage-feature-card", "flex", "gap-24", "align-center")}> 
                <div className={cx("BusinessPage-img-Wrapper")}>
                    <div style={{height:"100%", position:"relative", overflow:"hidden",}}>
                        <img alt="mixivivu" src="./src/assets/partner/business2.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                </div>
                <div className={cx("flex", "flex-col", "gap-16")}>
                    <h6>Đa dạng trong sự lựa chọn các du thuyền</h6>
                    <p className={cx("sm")} style={{ color: "var(--gray-600, #475467)" }}>
                        Tùy vào nhu cầu của doanh nghiệp, chúng tôi sẽ tư vấn cung cấp du thuyền phù hợp về: số lượng phòng nghỉ, boong tàu rộng rãi hay chi phí hợp lý.
                    </p>
                </div>
            </div>
            <div className={cx("BusinessPage-feature-card", "flex", "gap-24", "align-center")}> 
                <div className={cx("BusinessPage-img-Wrapper")}>
                    <div style={{height:"100%", position:"relative", overflow:"hidden",}}>
                        <img alt="mixivivu" src="./src/assets/partner/business3.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                </div>
                <div className={cx("flex", "flex-col", "gap-16")}>
                    <h6>Thời gian linh hoạt</h6>
                    <p className={cx("sm")} style={{ color: "var(--gray-600, #475467)" }}>
                        Chúng tôi sẽ tư vấn thời gian linh hoạt nhất phù hợp với tính chất của sự kiện và lịch làm việc trước và sau chuyến đi của quý doanh nghiệp.
                    </p>
                </div>
            </div>   
          </div>
        </div>
      </div>

        <div className={cx("section-bg", "BusinessPage-customers")}> 
            <div className={cx("container", "flex", "flex-col", "gap-80")}> 
                <div className={cx("SectionHeader-sectionHeader")}> 
                    <div className={cx("SectionHeader-title")}> 
                        <h4>Khách hàng của Mixivivu</h4>
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
                    <label className={cx("lg", "SectionHeader-description")}>
                        Mixivivu mang đến một trải nghiệm hoàn toàn mới, trải nghiệm đẳng cấp 5 sao cho khách hàng
                    </label>
                </div>
                <div className={cx("BusinessPage-customers-list")}>
                    <div className={cx("BusinessPage-customer-img")} style={{ width: "176px", height: "64px", position: "relative", overflow: "hidden" }}>
                        <img alt="mixivivu" src="/src/assets/partner/partner1.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                    <div className={cx("BusinessPage-customer-img")} style={{ width: "176px", height: "64px", position: "relative", overflow: "hidden" }}>
                        <img alt="mixivivu" src="/src/assets/partner/partner2.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                    <div className={cx("BusinessPage-customer-img")} style={{ width: "176px", height: "64px", position: "relative", overflow: "hidden" }}>
                        <img alt="mixivivu" src="/src/assets/partner/partner3.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                    <div className={cx("BusinessPage-customer-img")} style={{ width: "176px", height: "64px", position: "relative", overflow: "hidden" }}>
                        <img alt="mixivivu" src="/src/assets/partner/partner4.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                    <div className={cx("BusinessPage-customer-img")} style={{ width: "176px", height: "64px", position: "relative", overflow: "hidden" }}>
                        <img alt="mixivivu" src="/src/assets/partner/partner5.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                    <div className={cx("BusinessPage-customer-img")} style={{ width: "176px", height: "64px", position: "relative", overflow: "hidden" }}>
                        <img alt="mixivivu" src="/src/assets/partner/partner6.png" width="100%" height="100%" loading="lazy" style={{ objectFit: "cover" }} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BusinessPage;
