import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);
function HowToUse() {
  return (
    <div className={cx("container", "flex", "flex-col", "gap-40", "Instruction-wrapper")}>
      <div className={cx("flex", "flex-col", "gap-20")}>
        <div className={cx("SectionHeader-sectionHeader")}>
          <div className={cx("SectionHeader-title")}>
            <h4>Hướng dẫn sử dụng</h4>
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
        <div className={cx("subheading", "md")}>1. Dành cho người khách hàng cá nhân: đặt du thuyền, đặt vé máy bay:</div>
        <br />
        <div className={cx("subheading", "sm")}>1.1 Du thuyền Hạ Long:</div>
        <br />
        <ul className={cx("sm")}>
          <li>Bước 1: Tìm kiếm du thuyền phù hợp với yêu cầu của quý khách</li>
          <li>Bước 2: Nhập phòng và du thuyền cần đặt cùng với họ và tên, số điện thoại, địa chỉ email để nhân viên tư vấn của Mixivivu liên hệ.</li>
          <li>Bước 3: Chọn &quot;Đặt ngay&quot; để đặt dịch vụ</li>
          <li>Bước 4: Thông tin của khách hàng được gửi về trung tâm xử lý dữ liệu của website.</li>
          <li>Bước 5: Nhân viên tư vấn sẽ kiểm tra tính có sẵn của dịch vụ và tính hợp lệ của đơn hàng sau đó gọi điện liên hệ với khách để yêu cầu chuyển tiền.</li>
          <li>Bước 6: Sau khi khách hàng chuyển tiền, nhân viên tư vấn sẽ tiến hành đặt dịch vụ với các bên đối tác.</li>
          <li>Bước 7: Nhân viên tư vấn sẽ gửi phiếu xác nhận dịch vụ bao gồm mã đơn hàng, thông tin khách hàng, thông tin dịch vụ và tổng giá trị dịch vụ.</li>
        </ul>
        <br />
        <div className={cx("subheading", "sm")}>1.2 Vé máy bay:</div>
        <br />
        <ul className={cx("sm")}>
          <li>Bước 1: Tìm kiếm chuyến bay phù hợp với yêu cầu của quý khách</li>
          <li>Bước 2: Nhập thông tin khách gồm: họ và tên, số điện thoại, xác thực bằng địa chỉ email và ấn “Tiếp” đến bước thanh toán.</li>
          <li>Bước 3: Thanh toán bằng mã QR cùng số tiền hiển thị trên màn hình.</li>
          <li>Bước 4: Vé xuất sẽ được gửi về địa chỉ email của quý khách hàng và email info@mixivivu.com của website.</li>
          <li>Bước 5: Nhân viên tư vấn sẽ kiểm tra lại vé đã được gửi đến quý khách hàng hay chưa để hỗ trợ kịp thời.</li>
        </ul>
        <br />
        <div className={cx("subheading", "md")}>2. Quy trình hủy đơn hàng:</div>
        <br />
        <div className={cx("subheading", "sm")}>2.1 Du thuyền Hạ Long:</div>
        <br />
        <ul className={cx("sm")}>
          <li>Khách hàng liên hệ để hủy đơn hàng với Mixivivu bằng 1 trong các hình thức:</li>
          <li>Gửi yêu cầu theo form “liên hệ” trên website</li>
          <li>Gửi thông tin tới địa chỉ email: info@mixivivu.com</li>
          <li>Gọi điện thoại tới số điện thoại: 0922 222 016</li>
          <li>Liên hệ với nhân viên phụ trách đơn hàng của quý khách.</li>
        </ul>
        <br />
        <div className={cx("subheading", "sm")}>2.2 Vé máy bay:</div>
        <br />
        <p className={cx("md")}>Vé máy bay sau khi xuất vé thành công sẽ không thể hủy trên website cũng như hệ thống vé máy bay của các hãng hàng không.</p>
        <br />
        <p className={cx("md")}>Khách hàng liên hệ với nhân viên tư vấn để được hỗ trợ xử lý vé sau khi xuất vé thành công.</p>
        <br />
        <div className={cx("subheading", "md")}>3. Giải quyết các phát sinh trong quá trình giao dịch:</div>
        <br />
        <ul>
          <li>Mixivivu luôn có trách nhiệm tiếp nhận và xử lý khiếu nại của khách hàng liên quan đến giao dịch tại: mixivivu.com</li>
          <li>Khi có tranh chấp xảy ra, quý khách hàng liên hệ ngay với Mixivivu theo số hotline: 0922 222 016 hoặc gửi email theo địa chỉ email: info@mixivivu.com. Chúng tôi sẽ liên hệ lại ngay với quý khách hàng để giải quyết các phát sinh.</li>
          <li>Mọi tranh chấp phát sinh giữa Mixivivu và thành viên sẽ được giải quyết trên cơ sở thương lượng. Trường hợp không đạt được thỏa thuận như mong muốn, một trong hai bên có quyền đưa vụ việc ra Tòa án kinh tế để giải quyết.</li>
          <li>Khi tranh chấp phát sinh giữa khách hàng với nhà cung cấp dịch vụ trực tiếp, ban quản lý website sẽ có trách nhiệm cung cấp cho khách hàng thông tin về người bán, tích cực hỗ trợ khách hàng hoặc đại diện khách hàng bảo vệ quyền lợi và lợi ích hợp pháp của mình.</li>
          <li>Khi thực hiện các giao dịch trên website, bắt buộc các thành viên phải thực hiện đúng theo các quy trình hướng dẫn.</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToUse;
