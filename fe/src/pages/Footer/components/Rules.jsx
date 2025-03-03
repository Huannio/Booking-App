import { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../Footer.module.scss";
const cx = classNames.bind(styles);

function Rules() {
  const [openStates, setOpenStates] = useState(Array(sections.length).fill(true));
  const contentRefs = useRef([]);

  const toggleContent = (index) => {
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
    <div className={cx("container", "flex", "flex-col", "gap-80", "TermAndConditions-wrapper")}>
      <div className={cx("SectionHeader-sectionHeader")}>
        <div className={cx("SectionHeader-title")}>
          <h4>Quy định chung và lưu ý</h4>
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
        {sections.map((section, index) => (
          <div key={index} className={cx("Card-card")}>
            <div className={cx("TermAndConditions-custom-header")} onClick={() => toggleContent(index)}>
              <div className={cx("TermAndConditions-header")}>
                <div className={cx("subheading", "sm")} style={{ color: "var(--gray-800, #1D2939)" }}>
                  {section.title}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d={openStates[index] ? "M6 12H18" : "M6 12H18M12 6V18"} stroke="#77dada" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className={cx("Collapse-collapse")} ref={(el) => (contentRefs.current[index] = el)}>
  
                <div className={cx("TermAndConditions-content")}>
                  {Array.isArray(section.content) ? (
                    <ul>
                      {section.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className={cx("sm")} style={{ whiteSpace: "pre-line" }}>{section.content}</p>
                  )}
                </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const sections = [
  { 
    title: "Thời gian nhận phòng", 
    content: "Giờ nhận phòng từ 12h15-12h30. Nếu quý khách không sủ dụng dịch vụ xe đưa đón của tàu và tự di chuyển, vui lòng có mặt tại bến tàu muộn nhất là 11h45 để làm thủ tục trước khi lên tàu." 
  },
  { 
    title: "Thời gian trả phòng", 
    content: "Giờ trả phòng từ 9h30-10h30 tùy thuộc vào lịch trình của tàu. Sau khi trả phòng, quý khách sẽ được phục vụ bữa trưa trên tàu trước khi tàu cập bến." 
  },
  { 
    title: "Quy định nhận phòng", 
    content: "Đối với người lớn: quý khách vui lòng gửi ảnh chụp CCCD hoặc CMT hoặc Hộ chiếu. \n Đối với trẻ em dưới 14 tuổi: quý khách vui lòng gửi ảnh chụp Giấy khai sinh hoặc Hộ chiếu \n Những giấy tờ trên, quý khách vui lòng gửi trước ít nhất 03 ngày trước khi đi tàu và sẽ được yêu cầu xuất trình khi làm thủ tục lên tàu."
  },
  { 
    title: "Giá phòng đã bao gồm", 
    content: ["Hướng dẫn viên trên tàu", "Các bữa ăn theo tiêu chuẩn (01 bữa trưa, 01 bữa tối, 01 bữa sáng, 1 bữa trưa nhẹ)",
      "Lớp học nấu ăn, Bơi lội (nếu thời tiết cho phép), xem phim, câu mực, xem tivi vệ tinh", "Phòng tập gym trên tàu",
      "Vé tham quan tại các điểm có trong chương trình", "Phòng theo tiêu chuẩn 5 sao trên du thuyền",
      "Đồ uống chào mừng, khăn lạnh", "Nước lọc trong mỗi phòng"
    ] 
  },
  { 
    title: "Giá phòng không bao gồm", 
    content: ["Xe khứ hồi Hà Nội - Hạ Long. Xe Limousine D-car 7 chỗ đưa đón hai chiều (giá 350,000 VND/1 khách/1 chiều và 650,000 VND/1 khách/2 chiều)", "Khách sạn lưu trú trên đất liền",
      "Dịch vụ spa Đồ uống trên tàu và thuốc lá", "Tiền tip và các chi phí khác không có trong phần đã bao gồm"
    ] },
  { 
    title: "Trẻ em, giường phụ và phụ thu cuối tuần", 
    content: "Mỗi du thuyền sẽ có những quy định riêng về mức phụ thu trẻ em, giường phụ hay phụ thu cuối tuần. Quý khách có thể kiểm tra lại với nhân viên của chúng tôi để được tư vấn chi tiết và cụ thể." },
  { 
    title: "Huỷ đặt phòng", 
    content: "Những mức giá tốt trên đây đều có điều kiện chung là không được hoàn/hủy và được phép đổi ngày. Quý khách vui lòng liên hệ với chúng tôi để nhận được sự hỗ trợ tốt nhất." },
  { 
    title: "Hoãn hủy do điều kiện thời tiết", 
    content: "Trong trường hợp điều kiện thời tiết không cho phép thực hiện chuyến đi, Ban Quản lý Vịnh sẽ có chỉ đạo trực tiếp. Chúng tôi sẽ gửi tới quý khách chính sách cụ thể của từng du thuyền." },
];

export default Rules;
