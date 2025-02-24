import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);
function Payment() {
  return (
    <div className={cx("container", "flex", "flex-col", "gap-40", "PaymentType-wrapper")}>
    <div className={cx("flex", "flex-col", "gap-20")}>
      <div className="SectionHeader-sectionHeader">
        <div className="SectionHeader-title">
          <h4>Hình thức thanh toán</h4>
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
    </div>

    <div>
      <div className={cx("subheading", "md")}>1. Thanh toán trực tuyến bằng mã QR:</div>
      <br></br>
      <p className="md">
        Đối với vé máy bay, sau khi đặt vé thành công, quý khách chọn hình thức thanh toán trực tuyến qua QR trên website.
        Khi thanh toán thành công, quý khách sẽ nhận được vé điện tử qua địa chỉ email của quý khách đã đăng ký.
      </p>
      <div className={cx("relative", "overflow-hidden")} style={{ width: "100%", height: "100%" }}>
        <img
          alt="mixivivu"
          src="https://mixivivu.com/payment-type.png"
          width="100%"
          height="100%"
          loading="lazy"
          className="object-cover"
        />
      </div>
      <br></br>
      <div className={cx("subheading", "md")}>2. Thanh toán bằng chuyển khoản ngân hàng:</div>
      <br></br>
      <p className="md">
        Tên tài khoản: <b>Công ty TNHH Du lịch và dịch vụ Mixi Vivu</b>
      </p>
      <br></br>
      <p className="md">
        Số tài khoản: <b>226456789</b>
      </p>
      <br></br>
      <p className="md">
        Tại: <b>Ngân hàng TMCP Quân đội - MB Bank</b>
      </p>
      <br></br>
      <p className="md">
        Chi nhánh: <b>Chi nhánh Hoàng Quốc Việt</b>
      </p>
      <br></br>
      <div className={cx("subheading", "md")}>3. Thanh toán tại văn phòng của Mixi Vivu:</div>
      <br></br>
      <p className="md">
        Địa chỉ: Số nhà 25 – Ngõ 38 – Phố Yên Lãng – Phường Láng Hạ - Quận Đống Đa – Thành phố Hà Nội – Việt Nam
      </p>
      <br></br>
      <p className="md">Số điện thoại hotline: 0922 222 016</p>
      <br></br>
      <p className="md">
        Giờ làm việc: 9h00 – 17h30 (từ thứ 2 – đến thứ 6) và 9h00 – 12h00 (thứ 7)
      </p>
    </div>
  </div>
  )
}

export default Payment;
