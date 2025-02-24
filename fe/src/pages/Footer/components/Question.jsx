import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";

const cx = classNames.bind(styles);

function Question() {
  const [openStates, setOpenStates] = useState(Array(faqData.length).fill(true));
  const contentRefs = useRef([]);

  const toggleAnswer = (index) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  useEffect(() => {
    contentRefs.current.forEach((el, index) => {
      if (el) {
        // Đặt chiều cao dựa trên trạng thái mở/đóng
        el.style.height = openStates[index] ? `${el.scrollHeight}px` : "0px";
      }
    });
  }, [openStates]);

  return (
    <div className={cx("container", "flex", "flex-col", "gap-80", "Faqs-wrapper")}>
      <div className={cx("SectionHeader-sectionHeader")}>
        <div className={cx("SectionHeader-title")}>
          <h4>Câu hỏi thường gặp</h4>
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

      <div className={cx("flex", "flex-col", "gap-16")}>
        {faqData.map((faq, index) => (
          <div key={index} className={cx("Card-card")}>
            <div className={cx("Faqs-custom-header")} onClick={() => toggleAnswer(index)}>
              <div className={cx("Faqs-header")}>
                <div className={cx("subheading", "sm")} style={{ color: "#1D2939" }}>
                  {faq.question}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d={openStates[index] ? "M6 12H18" : "M6 12H18M12 6V18"}
                    stroke="#77dada"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </div>
            </div>

            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className={cx("Collapse-collapse")}
            >
              <div className={cx("Collapse-collapse-content")}>
                <div className={cx("Faqs-content")}>
                  <p className={cx("sm")}>{faq.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const faqData = [
  {
    question: "Dịch vụ xe đưa đón có bao gồm trong giá tour không?",
    answer: "Xe đưa đón 2 chiều không bao gồm trong giá tour. Quý khách có thể đặt thêm dịch vụ này.",
  },
  {
    question: "Nhà hàng của du thuyền phục vụ bữa ăn theo phong cách gì?",
    answer: "Thực đơn của nhà hàng sẽ được phục vụ các món ăn theo phong cách Việt và Âu. Nếu quý khách có yêu cầu riêng, vui lòng thông báo trước ít nhất 03 ngày với du thuyền.",
  },
  {
    question: "Tôi có được phép mang thú cưng lên tàu không?",
    answer: "Thú cưng không được phép mang lên du thuyền.",
  },
  {
    question: "Du thuyền có dịch vụ massage không?",
    answer: "Có. Du thuyền cung cấp dịch vụ massage chuyên nghiệp và có tính phí.",
  },
  {
    question: "Nếu ngày đi tour của tôi đúng vào sinh nhật thì có ưu đãi gì không?",
    answer: "Nếu ngày sinh nhật của quý khách đúng vào ngày đi tour, du thuyền sẽ tặng quý khách 01 bánh sinh nhật nhỏ. Ngoài ra, du thuyền còn nhận đặt dịch vụ (tính phí) với các yêu cầu đặc biệt như: trang trí giường, phòng hay chuẩn bị bàn ăn riêng. Quý khách vui lòng liên hệ nhân viên của chúng tôi để có thêm những thông tin chi tiết hơn.",
  },
  {
    question: "Trên tàu có WIFI không?",
    answer: "Tín hiệu Wifi trên tàu sẽ không được ổn định khi tàu đi qua một số khu vực trên Vịnh.",
  },
  {
    question: "Tàu có phụ thu vào cuối tuần không?",
    answer: "Du thuyền có phụ thu vào dịp cuối tuần. Quý khách sẽ được nhân viên tư vấn của chúng tôi thông tin khi có ngày đặt phòng cụ thể.",
  },
  {
    question: "Du thuyền có tour mấy ngày?",
    answer: "Du thuyền cung cấp chương trình tour 02 ngày 01 đêm hoặc 03 ngày 02 đêm.",
  },
  {
    question: "Thời gian di chuyển từ bến ra tàu có lâu không?",
    answer: "Đối với một số tàu, du khách có thể lên tàu trực tiếp mà không cần phải di chuyển bằng cano cao tốc. Hoặc nếu có di chuyển bằng cano thì thời gian di chuyển chỉ khoảng 10-15 phút.",
  },
  {
    question: "Du thuyền có cung cấp dịch vụ chèo kayak không?",
    answer: "Các tàu đều cung cấp dịch vụ chèo kayak có tính phí hoặc không tính phí trong giá tour. Quý khách có thể liên hệ với nhân viên tư vấn của chúng tôi để biết thêm mức phí này",
  },
  {
    question: "Phụ nữ mang thai có thể lên tàu không?",
    answer: "Phụ nữ mang thai có thể lên tàu nhưng không được khuyến khích tham gia các hoạt động tham quan.",
  },
  {
    question: "Đồ uống có bao gồm trong giá tour không?",
    answer: "Du thuyền phục vụ: trà, cà phê và 02 chai nước lọc miễn phí tại mỗi phòng/01 đêm nghỉ. Những đồ uống khác sẽ được phục vụ tại quầy bar trên tàu có tính phí và không bao gồm trong giá tour.",
  },
];

export default Question;