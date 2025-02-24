import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

function Privacy() {
  return (
    <div className={cx('container', 'flex', 'flex-col', 'gap-40', 'Privacy-wrapper')}>
      <div className={cx('flex', 'flex-col', 'gap-20')}>
        <div className="SectionHeader-sectionHeader">
          <div className="SectionHeader-title">
            <h4>Chính sách quyền riêng tư</h4>
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
        <div className={cx('subheading', 'md')}>I. Chính sách quyền riêng tư:</div>
        <br />
        <p className="md">Chúng tôi đánh giá cao sự tin tưởng của quý khách...</p>
        <br />
        <div className={cx('subheading', 'sm')}>1. Mục đích thu thập thông tin của khách hàng:</div>
        <br />
        <p className="md">Mục đích: website Mixivivu.com thu thập thông tin khách hàng...</p>
        <br />
        <div className={cx('subheading', 'sm')}>2. Phạm vi thu thập thông tin của khách hàng:</div>
        <br />
        <p className="md">Chúng tôi thu thập các thông tin cá nhân của Khách hàng như Họ tên...</p>
        <br />
        <div className={cx('subheading', 'sm')}>3. Phạm vi sử dụng thông tin:</div>
        <br />
        <p className="md">Website Mixivivu sử dụng các thông tin của khách hàng như sau:</p>
        <br />
        <p className="md">- Đặt vé, cung cấp thông tin khách hàng...</p>
        <br />
        <p className="md">- Cung cấp thông tin khách hàng cho đơn vị cung cấp du thuyền...</p>
        <br />
        <div className={cx('subheading', 'sm')}>4. Thời gian lưu trữ thông tin:</div>
        <br />
        <p className="md">Việc lưu trữ thông tin là không có giới hạn...</p>
        <br />
        <div className={cx('subheading', 'sm')}>5. Những người hoặc tổ chức được tiếp cận với thông tin:</div>
        <br />
        <p className="md">- Quản lý website.</p>
        <br />
        <p className="md">- Các hãng hàng không và đơn vị du thuyền Hạ Long</p>
        <br />
        <p className="md">- Theo yêu cầu của cơ quan nhà nước có thẩm quyền;</p>
        <br />
        <div className={cx('subheading', 'sm')}>6. Đơn vị thu thập thông tin:</div>
        <br />
        <p className="md">- Đơn vị thu thập thông tin: Công ty TNHH Du lịch và dịch vụ Mixi Vivu</p>
        <br />
        <p className="md">- Địa chỉ: Số nhà 25, ngõ 38, phố Yên Lãng...</p>
        <br />
        <p className="md">- Điện thoại: <a href="tel:0922222016" className="font-bold" style={{ color: 'var(--primary-dark)' }}>0922 222 016</a></p>
        <br />
        <p className="md">- Email: <a href="mailto:info@mixivivu.com" className="font-bold" style={{ color: 'var(--primary-dark)' }}>info@mixivivu.com</a></p>
        <br />
        <div className={cx('subheading', 'md')}>II. Chính sách của chúng tôi về các Cookie:</div>
        <br />
        <p className="md">Cookie là một file thông tin nhỏ...</p>
        <br />
        <p className="md">Các cookie cho phép các ứng dụng website phản hồi...</p>
        <br />
        <div className={cx('subheading', 'md')}>III. Các đường liên kết (link):</div>
        <br />
        <p className="md">Website Mixivivu của chúng tôi có thể có các đường link...</p>
        <br />
      </div>
    </div>
  )
}

export default Privacy;
