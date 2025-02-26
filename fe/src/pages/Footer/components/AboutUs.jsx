import classNames from "classnames/bind";
import Button from "~/components/Button";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

function AboutUs() {
  return (
    <div className={cx("container", "flex", "flex-col", "gap-80", "AboutUsPage-wrapper")}>
      <div className={cx("SectionHeader-sectionHeader")}>
        <div className={cx("SectionHeader-title")}>
          <h4>Về Mixivivu</h4>
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
      <div className={cx("flex flex-col gap-40")}>
        <div className={cx("flex flex-col gap-16")}>
          <h6 style={{ color: "var(--gray-900, #101828)" }}>1. Chúng tôi là Mixi Vivu</h6>
          <p className={cx("md")}>
            Mixivivu.com là sản phẩm chính thức của Công ty TNHH Du lịch và dịch vụ Mixi Vivu. Với niềm đam mê du lịch, ưa khám phá, chúng tôi đã cùng nhau xây dựng một website – nơi mà khách hàng sẽ dễ dàng lựa chọn cho mình cũng như những người thân yêu chuyến nghỉ dưỡng đáng nhớ. Mixi Vivu chọn lọc các du thuyền, khách sạn và liên kết với các hãng hàng không nhằm cung cấp những dịch vụ đa dạng và tốt nhất cho du khách.
          </p>
        </div>
        <div>
          <div className={cx("flex flex-col gap-16")}>
            <h6 style={{ color: "var(--gray-900,#101828)" }}>2. Tại sao chọn chúng tôi?</h6>
            <p className={cx("md")} style={{ color: "var(--gray-600, #475467)" }}>
            Chúng tôi mong muốn du khách tận hưởng các dịch vụ du lịch chất lương bằng sự trải nghiệm thực tế của chính đội ngũ của Mixi Vivu. Các video về du thuyền, khách sạn hay những chuyến bay mà chúng tôi đã ghi lại cũng sẽ được chúng tôi giới thiệu tới du khách. Chính từ những hình ảnh này, quý khách có thể chọn lựa cho mình hay gia đình, bạn bè, đồng nghiệp những chuyến đi ý nghĩa nhất. Chúng tôi chắc chắn sẽ mang lại cho du khách những kỳ nghĩ đáng nhớ với:
            </p>
            <div className={cx("grid grid-cols-2 gap-24", "AboutUsPage-WhyUs")}>
              <div className={cx("Card-card", "AboutUsPage-question-card")}>
                <div className={cx("flex flex-col gap-20")}>
                  <div className={cx("AboutUsPage-WhyIcon")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3.11357 9.00017H20.8885M7.04969 3.05065L12.001 9.00023L16.9607 3.05482M20.6871 8.52922L17.2385 3.35641C17.1517 3.22616 17.1083 3.16104 17.0509 3.11389C17.0001 3.07216 16.9416 3.04084 16.8787 3.02174C16.8077 3.00017 16.7294 3.00017 16.5729 3.00017H7.42917C7.27264 3.00017 7.19437 3.00017 7.12333 3.02174C7.06043 3.04084 7.00192 3.07216 6.95114 3.11389C6.89378 3.16104 6.85036 3.22616 6.76353 3.35641L3.31499 8.52922C3.20195 8.69878 3.14543 8.78356 3.12517 8.87476C3.10728 8.95532 3.10961 9.03905 3.13194 9.11849C3.15722 9.20843 3.21836 9.28995 3.34063 9.45298L11.361 20.1468C11.5781 20.4363 11.6867 20.5811 11.8198 20.6328C11.9364 20.6782 12.0657 20.6782 12.1823 20.6328C12.3153 20.5811 12.4239 20.4363 12.641 20.1468L20.6614 9.45298C20.7837 9.28995 20.8448 9.20843 20.8701 9.11849C20.8924 9.03905 20.8948 8.95532 20.8769 8.87476C20.8566 8.78356 20.8001 8.69878 20.6871 8.52922Z" stroke="#0E4F4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={cx("subheading", "md")} style={{fontWeight: 700, color: "var(--gray-800, #1D2939)"}}>
                    Đội ngũ chuyên nghiệp, tâm huyết
                  </p>
                  <p className={cx("md")}>
                    Chúng tôi có đội ngũ nhân viên kinh nghiệm, tâm huyết, luôn lắng nghe những thắc mắc, ý kiến của khách hàng thông qua hotline, fanpage được kết nối liên tục. Với vốn kiến thức quý giá tích lũy qua nhiều năm, chúng tôi sẽ tư vấn cho du khách những sản phẩm du lịch phù hợp nhất cũng như những vấn đề phát sinh trong chuyến nghỉ dưỡng. Ngoài ra, chúng tôi còn có những nhân viên mới trẻ trung, năng động hứa hẹn sẽ giới thiệu nhiều điểm đến mới hấp dẫn cho du khách.
                  </p>
                </div>
              </div>
              
              <div className={cx("Card-card", "AboutUsPage-question-card")}>
                <div className={cx("flex flex-col gap-20")}>
                  <div className={cx("AboutUsPage-WhyIcon")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M3.11357 9.00017H20.8885M7.04969 3.05065L12.001 9.00023L16.9607 3.05482M20.6871 8.52922L17.2385 3.35641C17.1517 3.22616 17.1083 3.16104 17.0509 3.11389C17.0001 3.07216 16.9416 3.04084 16.8787 3.02174C16.8077 3.00017 16.7294 3.00017 16.5729 3.00017H7.42917C7.27264 3.00017 7.19437 3.00017 7.12333 3.02174C7.06043 3.04084 7.00192 3.07216 6.95114 3.11389C6.89378 3.16104 6.85036 3.22616 6.76353 3.35641L3.31499 8.52922C3.20195 8.69878 3.14543 8.78356 3.12517 8.87476C3.10728 8.95532 3.10961 9.03905 3.13194 9.11849C3.15722 9.20843 3.21836 9.28995 3.34063 9.45298L11.361 20.1468C11.5781 20.4363 11.6867 20.5811 11.8198 20.6328C11.9364 20.6782 12.0657 20.6782 12.1823 20.6328C12.3153 20.5811 12.4239 20.4363 12.641 20.1468L20.6614 9.45298C20.7837 9.28995 20.8448 9.20843 20.8701 9.11849C20.8924 9.03905 20.8948 8.95532 20.8769 8.87476C20.8566 8.78356 20.8001 8.69878 20.6871 8.52922Z" stroke="#0E4F4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={cx("subheading", "md")} style={{fontWeight: 700, color: "var(--gray-800, #1D2939)"}}>
                    Sản phẩm phong phú
                  </p>
                  <p className={cx("md")}>
                  Tại địa chỉ website: https://mixivivu.com của chúng tôi, du khách có thể dễ dàng tìm thấy một du thuyền sang trọng, một chuyến bay khứ hồi hay một khu nghỉ dưỡng tuyệt đẹp trên mảnh đất hình chữ S. Chúng tôi cũng đưa ra những thông tin đầy đủ, hình ảnh thực tế của các dịch vụ chất lượng. Qua đó, du khách sẽ chon lựa được một dịch vụ phù hợp cho chuyến đi cùng gia đình, bạn bè hay đồng nghiệp.
                  </p>
                </div>
              </div>

              <div className={cx("Card-card", "AboutUsPage-question-card")}>
                <div className={cx("flex flex-col gap-20")}>
                  <div className={cx("AboutUsPage-WhyIcon")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.11357 9.00017H20.8885M7.04969 3.05065L12.001 9.00023L16.9607 3.05482M20.6871 8.52922L17.2385 3.35641C17.1517 3.22616 17.1083 3.16104 17.0509 3.11389C17.0001 3.07216 16.9416 3.04084 16.8787 3.02174C16.8077 3.00017 16.7294 3.00017 16.5729 3.00017H7.42917C7.27264 3.00017 7.19437 3.00017 7.12333 3.02174C7.06043 3.04084 7.00192 3.07216 6.95114 3.11389C6.89378 3.16104 6.85036 3.22616 6.76353 3.35641L3.31499 8.52922C3.20195 8.69878 3.14543 8.78356 3.12517 8.87476C3.10728 8.95532 3.10961 9.03905 3.13194 9.11849C3.15722 9.20843 3.21836 9.28995 3.34063 9.45298L11.361 20.1468C11.5781 20.4363 11.6867 20.5811 11.8198 20.6328C11.9364 20.6782 12.0657 20.6782 12.1823 20.6328C12.3153 20.5811 12.4239 20.4363 12.641 20.1468L20.6614 9.45298C20.7837 9.28995 20.8448 9.20843 20.8701 9.11849C20.8924 9.03905 20.8948 8.95532 20.8769 8.87476C20.8566 8.78356 20.8001 8.69878 20.6871 8.52922Z" stroke="#0E4F4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={cx("subheading", "md")} style={{fontWeight: 700, color: "var(--gray-800, #1D2939)"}}>
                    Mức giá hấp dẫn
                  </p>
                  <p className={cx("md")}>
                  Mixi Vivu luôn cam kết sẽ đem đến các dịch vụ chất lượng với các mức giá tốt nhất. Chúng tôi tin chắc rằng chi phí mà quý khách thanh toán là hoàn toàn xứng đáng. Bên cạnh đó, quý khách cũng có thể tìm thấy nhiều món quà hấp dẫn trong những đợt khuyến mại trên website của chúng tôi.                  </p>
                </div>
              </div>

              <div className={cx("Card-card", "AboutUsPage-question-card")}>
                <div className={cx("flex flex-col gap-20")}>
                  <div className={cx("AboutUsPage-WhyIcon")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.11357 9.00017H20.8885M7.04969 3.05065L12.001 9.00023L16.9607 3.05482M20.6871 8.52922L17.2385 3.35641C17.1517 3.22616 17.1083 3.16104 17.0509 3.11389C17.0001 3.07216 16.9416 3.04084 16.8787 3.02174C16.8077 3.00017 16.7294 3.00017 16.5729 3.00017H7.42917C7.27264 3.00017 7.19437 3.00017 7.12333 3.02174C7.06043 3.04084 7.00192 3.07216 6.95114 3.11389C6.89378 3.16104 6.85036 3.22616 6.76353 3.35641L3.31499 8.52922C3.20195 8.69878 3.14543 8.78356 3.12517 8.87476C3.10728 8.95532 3.10961 9.03905 3.13194 9.11849C3.15722 9.20843 3.21836 9.28995 3.34063 9.45298L11.361 20.1468C11.5781 20.4363 11.6867 20.5811 11.8198 20.6328C11.9364 20.6782 12.0657 20.6782 12.1823 20.6328C12.3153 20.5811 12.4239 20.4363 12.641 20.1468L20.6614 9.45298C20.7837 9.28995 20.8448 9.20843 20.8701 9.11849C20.8924 9.03905 20.8948 8.95532 20.8769 8.87476C20.8566 8.78356 20.8001 8.69878 20.6871 8.52922Z" stroke="#0E4F4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className={cx("subheading", "md")} style={{fontWeight: 700, color: "var(--gray-800, #1D2939)"}}>
                    Bảo mật thông tin
                  </p>
                  <p className={cx("md")}>
                  Chúng tôi cam kết toàn bộ mọi thông tin cá nhân của khách hàng sẽ được giữ bí mật tuyệt đối. Quý khách có thể yên tâm trải nghiệm dịch vụ thực sự thoải mái và riêng tư. Hi vọng, mixivivu.com sẽ là một địa chỉ tin cậy trong mỗi chuyến đi , mỗi kỳ nghỉ của quý khách.                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("flex flex-col gap-16")}>
          <h6 style={{color: "var(--gray-900, #101828)"}}>3. Sản phẩm dịch vụ</h6>
          <div className={cx("p-md")} style={{color: "var(--gray-600, #475467)", display: "block"}}>
            Mixivivu.com là sản phẩm chính thức của Công ty TNHH Du lịch và dịch vụ Mixi Vivu. Với niềm đam mê du lịch, ưa khám phá, chúng tôi đã cùng nhau xây dựng một website – nơi mà khách hàng sẽ dễ dàng lựa chọn cho mình cũng như những người thân yêu chuyến nghỉ dưỡng đáng nhớ. Mixi Vivu chọn lọc các du thuyền, khách sạn và liên kết với các hãng hàng không nhằm cung cấp những dịch vụ đa dạng và tốt nhất cho du khách.
            <ul>
              <li>Vé máy bay của các hãng hàng không trong và ngoài nước</li>
              <li>Du thuyền Hạ Long với đa dạng du thuyền, phù hợp với từng nhu cầu của du khách</li>
              <li>Đặt phòng khách sạn và resort</li>
            </ul>
          </div>
          <p className={cx("md")} style={{color: "var(--gray-600, #475467)"}}>
            Ngoài ra, chúng tôi cũng cung cấp nhiều dịch vụ khác như: thuê xe du lịch chất lượng cao, thuê hướng dẫn viên du lịch, visa, vé tàu…giúp du khách thoải mái và dễ dàng cho những chuyến du lịch.
          </p>
          
        </div>
        <div className={cx("flex", "flex-col", "gap-16")}>
          <h6 style={{ color: "var(--gray-900, #101828)" }}>4. Đối tác của chúng tôi</h6>
          <p className={cx("md")} style={{ color: "var(--gray-600, #475467)" }}>
            Để xây dựng được hệ thống website nhanh và mạnh nhằm mang lại những dịch vụ tốt nhất cho quý khách, Mixi Vivu xin được gửi lời cảm ơn tới các đối tác đã hỗ trợ và đồng hành cùng chúng tôi:
          </p>
        </div>
        <div className={cx("flex flex-col gap-24")}>
          <div className={cx("Card-card", "AboutUsPage-question-card")}>
            <div className={cx("flex flex-col gap-20")}>
              <div className={cx("flex justify-between align-center")}>
                <img src="https://mixivivu.com/logo-about-us/fares.png" alt="zestif" style={{height:"32px"}}/>
                <a href="https://fares.vn/" target="_blank" rel="noreferrer">
                  <Button type="button" className="btn btn-normal btn-link-color">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M11.666 10C11.666 12.3012 9.80054 14.1667 7.49935 14.1667H5.83268C3.5315 14.1667 1.66602 12.3012 1.66602 10C1.66602 7.69885 3.5315 5.83337 5.83268 5.83337H6.24935M8.33268 10C8.33268 7.69885 10.1982 5.83337 12.4993 5.83337H14.166C16.4672 5.83337 18.3327 7.69885 18.3327 10C18.3327 12.3012 16.4672 14.1667 14.166 14.1667H13.7493" stroke="#0E4F4F" strokeWidth={1.66667} strokeLinecap="round"/>
                    </svg>
                    <div className="label md">website</div>
                  </Button>
                </a>
              </div>
              <p className="subheading" style={{ color: "var(--gray-800, #1D2939)", fontWeight: 700 }}>
                Công nghệ thông tin
              </p>
              <p className="md" style={{ color: "#var(--gray-600, #475467)" }}>
                FARES., JSC cung cấp các giải pháp toàn diện về chuyển đổi số cho doanh
                nghiệp: Phát triển phần mềm theo yêu cầu, xây dựng hệ thống thông tin,
                xử lý và phân tích dữ liệu lớn phục vụ chiến lược Marketing, kinh doanh
                & quản lý. Với đội ngũ chuyên gia tài năng và kinh nghiệm, FARES., JSC
                cam kết mang đến những giải pháp đột phá và sáng tạo, giúp khách hàng
                tận dụng tối đa tiềm năng của công nghệ để nâng cao hiệu suất kinh doanh
                và đạt được sự cạnh tranh trong môi trường kinh doanh ngày càng phức tạp.
                FARES., JSC đã hỗ trợ và đồng hành cùng MixiVivu trong việc xây dựng hệ
                thống website, nhằm mang lại cho khách hàng những thông tin nhanh và tin
                cậy nhất.
              </p>
            </div>
          </div>
          <div className={cx("Card-card", "AboutUsPage-question-card")}>
            <div className={cx("flex flex-col gap-20")}>
              <div className={cx("flex justify-between align-center")}>
                <img src="https://mixivivu.com/logo-about-us/zestif.png" alt="zestif" style={{height:"32px"}}/>
                <a href="https://zestif.com/" target="_blank" rel="noreferrer">
                  <Button type="button" className="btn btn-normal btn-link-color">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M11.666 10C11.666 12.3012 9.80054 14.1667 7.49935 14.1667H5.83268C3.5315 14.1667 1.66602 12.3012 1.66602 10C1.66602 7.69885 3.5315 5.83337 5.83268 5.83337H6.24935M8.33268 10C8.33268 7.69885 10.1982 5.83337 12.4993 5.83337H14.166C16.4672 5.83337 18.3327 7.69885 18.3327 10C18.3327 12.3012 16.4672 14.1667 14.166 14.1667H13.7493" stroke="#0E4F4F" strokeWidth={1.66667} strokeLinecap="round"/>
                    </svg>
                    <div className="label md">website</div>
                  </Button>
                </a>
              </div>
              <p className="subheading" style={{ color: "var(--gray-800, #1D2939)", fontWeight: 700 }}>
                Tư vấn thiết kế
              </p>
              <p className="md" style={{ color: "#var(--gray-600, #475467)" }}>
              Zestif là một công ty công nghệ blockchain có trụ sở tại Hà Lan và Hà Nội, Việt Nam. Công ty được thành lập vào năm 2017 với sứ mệnh mang công nghệ blockchain đến với các doanh nghiệp và tổ chức ở Việt Nam và Hà Lan. Zestif cung cấp các dịch vụ tư vấn, đào tạo và phát triển giải pháp blockchain. Công ty đã triển khai thành công nhiều giải pháp blockchain cho các doanh nghiệp và tổ chức ở Hà Lan, Vương quốc Anh và các quốc gia EU khác.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("flex flex-col gap-16")}>
      <h6 style={{ color: "var(--gray-900, #101828)" }}>5. Liên hệ với chúng tôi:</h6>
      <div className={cx("Card-card", "AboutUsPage-question-card")}>
        <div className={cx("flex flex-col gap-20")}>
          <div>
            <div className={cx("subheading md")} style={{ color: "var(--gray-800, #1D2939)" }}>
              CÔNG TY DU LỊCH VÀ DỊCH VỤ MIXI VIVU
            </div>
            <label className={cx("sm")} style={{ color: "var(--gray-600, #475467)" }}>
              MIXI VIVU TRAVEL AND SERVICE COMPANY LIMITED
            </label>
          </div>
          <p className={cx("sm")} style={{ color: "var(--gray-600, #475467)" }}>
            Mã số thuế: 0110376372
            <br />
            Giấy phép kinh doanh số: 0110376372
            <br />
            Nơi cấp: Sở KH &amp; ĐT TP Hà Nội.
            <br />
            <br />
            Hà Nội: Số 25 - Ngõ 38 Phố Yên Lãng - Quận Đống Đa - Hà Nội
            <br />
            Điện thoại: 0922222016
            <br />
            Địa chỉ email: info@mixivivu.com
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AboutUs;
