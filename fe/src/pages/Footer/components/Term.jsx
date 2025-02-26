import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

function Terms() {
  return (
    <div className={cx("container", "flex", "flex-col", "gap-40", "Rules-wrapper")}> 
      <div className={cx("flex", "flex-col", "gap-20")}>
        <div className={cx("SectionHeader-sectionHeader")}>
          <div className={cx("SectionHeader-title")}>
            <h4>Điều khoản và điều kiện</h4>
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
        <p className={cx("md")}>
          Website này thuộc quyền sở hữu và quản lý của Công ty TNHH Du lịch và dịch vụ Mixi Vivu. Khi truy cập và sử dụng website này, bạn đồng ý rằng đã đọc, hiểu các điều kiện và điều khoản dưới đây. Chính vì vậy, bạn cần đọc rõ và sử dụng tiếp.
        </p>
        <p className={cx("md")}>
          Điều khoản và điều kiện trên Mixivivu.com bao gồm những nội dung sau:
        </p>
      </div>

      <div>
        <div className={cx("subheading", "md")}>1.Điều khoản chung:</div>
        <br />
        <div className={cx("subheading", "sm")}>1.1. Đồng ý với các điều khoản sử dụng:</div>
        <br />
        <p className={cx("md")}>
        Khi sử dụng Website Thương mại Điện tử Mixivivu.com (sau đây gọi tắt là “Website”), Quý khách đã mặc nhiên chấp thuận các điều khoản và điều kiện sử dụng (sau đây gọi tắt là “Điều kiện Sử dụng”) được quy định dưới đây. Để biết được các sửa đổi mới nhất, Quý khách nên thường xuyên kiểm tra lại “Điều kiện Sử dụng”. Chúng tôi có quyền thay đổi, điều chỉnh, thêm hay bớt các nội dung của “Điều kiện Sử dụng” tại bất kỳ thời điểm nào. Nếu Quý khách vẫn tiếp tục sử dụng Website sau khi có các thay đổi như vậy thì có nghĩa là Quý khách đã chấp thuận các thay đổi đó.
        </p>
        <br />
        <div className={cx("subheading", "sm")}>1.2 Các thông tin hiển thị:</div>
        <br />
        <p className={cx("md")}>
        Các nội dung hiển thị trên Website nhằm mục đích cung cấp thông tin về du thuyền Hạ Long, chuyến bay, giờ bay, lịch bay và giá vé của các hãng hàng không trong nước và quốc tế, về dịch vụ vận chuyển hành khách, hành lý và hàng hóa của hãng, dịch vụ khách sạn, cũng như các dịch vụ bổ trợ khác liên quan đến du lịch, lữ hành của nhiều nhà cung cấp khác nhau (sau đây được gọi chung là “Nhà Cung Cấp”).
        </p>
        <br />
        <div className={cx("subheading", "md")}>2.Chính sách bảo hành/bảo trì</div>
        <br />
        <p className={cx("md")}>
          Sản phẩm giao dịch giữa Mixivivu.com và khách hàng là dịch vụ, nên không áp dụng chính sách bảo hành/bảo trì.
        </p>
        <br />
        <div className={cx("subheading", "md")}>3. Miễn trừ trách nhiệm:</div>
        <br />
        <p className={cx("md")}>
        Mixivivu.com và các nhà cung cấp khác cũng từ chối trách nhiệm hay đưa ra đảm bảo tằng website sẽ không có lỗi vận hành, an toàn, không bị gián đoạn hay bất cứ đảm bảo nào về tính chính xác, đầy đủ và đúng hạn của các thông tin hiển thị.
        Khi truy cập vào website này, quý khách mặc nhiên đồng ý rằng Mixivivu, các nhà cung cấp khác cũng với đối tác liên kết không chịu bất cứ trách nhiệm nào liên quan đến thương tật, mất mát, khiếu kiên, thiện hại trực tiếp hoặc gián tiếp do không lường trước dưới bất kỳ hình thức nào phát sinh hay có liên quan đến việc
        <br />
        <br/>
        a. Sử dụng các thông tin trên website này
        <br/>
        b. Các truy cập kết nối từ website này
        <br/>
        c. Đăng ký thành viên, đăng ký nhận thư điện tự hay tham gia chương trình khách hàng thường
        xuyên
        <br/>
        d. Các hạn chế liên quan đến đặt chỗ trực tuyến mô tả tại đây.
        <br/>
        <br/>
        Các điều kiện và hạn chế nêu trên chỉ có hiệu lực trong khuôn khổ pháp luật hiện hành.
        </p>
        <br />
        <div className={cx("subheading", "md")}>4. Thông tin về các sản phẩm dịch vụ:</div>
        <br />
        <div className={cx("subheading", "sm")}>4.1 Du thuyền Hạ Long:</div>
        <br />
        <p className={cx("md")}>
          - Dịch vụ nghỉ dưỡng trên du thuyền tại vịnh Hạ Long là một sản phẩm dịch vụ nên không áp dụng các chính sách dùng thử, bảo hành, bảo trì.
        </p>
        <br />
        <p className={cx("md")}>
          - Các dịch vụ đặt phòng tại website đều không thể hoàn, hủy và chỉ có thể đổi ngày đi trong điều kiện các du thuyền còn các hạng phòng tương tự hoặc quý khách có thể trả thêm phí chênh lệch các hạng phòng.
        </p>
        <br />
        <p className={cx("md")}>
          - Trường hợp thời tiết xấu có Công văn của Ban Quản lý Vịnh Hạ Long cấm không cho du thuyền ngủ đêm hoạt động, quý khách sẽ được đổi ngày trên cơ sở thỏa thuận giữa các bên.
        </p>
        <br />
        <div className={cx("subheading", "sm")}>4.2 Vé máy bay:</div>
        <br />
        <p className={cx("md")}>
        Sau khi quý khách thanh toán, vé máy bay của quý khách sẽ được gửi tới địa chỉ email mà quý khách đăng ký. Trường hợp, quý khách không nhận được vé như đã thanh toán, quý khách vui lòng liên hệ số hotline: 0922 222 016 hoặc gửi email: info@mixivivu.com để yêu cầu sự hỗ trợ.
        </p>
        <br />
        <p className={cx("md")}>
        Mọi yêu cầu về thay đổi vé, hoàn vé, quý khách vui lòng liên hệ với chúng tôi theo số hotline và email được công bố trên website để được trợ giúp nhanh nhất.
        </p>
        <br />
        <div className={cx("subheading", "md")}>5. Trách nhiệm của Ban quản lý website:</div>
        <br />
        <p className={cx("md")}>
          Cam kết cung cấp cho khách hàng nội dung, thông tin đúng như các nhà cung cấp đã đưa ra.
        </p>
        <br />
        <p className={cx("md")}>
        Tư vấn, giải đáp các thắc mắc của quý khách một cách chính xác và nhanh nhất.
        </p>
        <br />
        <p className={cx("md")}>
        Bảo mật thông tin của quý khách hàng.
        </p>
        <br />
        <p className={cx("md")}>
        Tuân thủ các quy định của pháp luật về thanh toán, quảng cáo, khuyến mại và bảo vệ quyền lợi của người tiêu dùng và các quy định của pháp luật có liên quan khác khi bán hàng hóa hoặc cung ứng dịch vụ trên sàn giao dịch thương mại điện tử.
        </p>
        <br />
        <div className={cx("subheading", "md")}>6. Nghĩa vụ của khách hàng khi sử dụng website:</div>
        <br />
        <p className={cx("md")}>
        Quý khách vui lòng cung cấp đầy đủ thông tin khi đặt dịch vụ trên website: họ và tên, số điện thoại, địa chỉ email. Chúng tôi không chịu trách nhiệm nếu quý khách cung cấp sai thông tin khi đặt dịch vụ hay đặt vé máy bay và thanh toán trực tuyến.
        </p>
        <br />
        <p className={cx("md")}>
        Tuyệt đối không sử dụng các hình thức hoặc công cụ nào nhằm làm thay đổi dữ liệu hay mục đích phá hoại website. Mọi vi phạm sẽ bị xử lý theo pháp luật.
        </p>
      </div>
    </div>
  );
}

export default Terms;
