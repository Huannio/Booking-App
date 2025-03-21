import { useState, useEffect } from "react";
import classNames from "classnames/bind"; 
import styles from "../Home.module.scss"; 

const cx = classNames.bind(styles); 

const ReviewSection = () => {
    const [activeReview, setActiveReview] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
          setActiveReview((prevIndex) => (prevIndex + 1) % 5);
        }, 3000); 
    
        return () => clearInterval(interval); 
      }, []);

  return (
    <section className={cx("reviewSections", "section-bg")}>
      <div className={cx("container", "reviewSections-section")}>
        <div className={cx("SectionHeader-sectionHeader")}>
          <div className={cx("SectionHeader-title")}>
            <h4>
              Đánh giá từ những <br /> người đã trải nghiệm
            </h4>
          </div>
          <label className={cx("lg", "SectionHeader-description")}>
            Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi.
          </label>
        </div>

        <div className={cx("ReviewQuote-reviewQuote")}>
          <div className={cx("ReviewQuote-quoteBody", activeReview === 0 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}>Khách sạn Golden Holiday Hội An</p>
              <p className={cx("lg")}>
              Chúng tôi đã có một kỳ nghỉ tuyệt vời tại khách sạn Golden Holiday Hội An. Phòng ốc rộng rãi, thoáng mát và được trang trí đẹp mắt. Nhân viên rất thân thiện và luôn sẵn lòng hỗ trợ. Sẽ quay lại đây lần sau.
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Chị Minh Anh</p>
          </div>

          <div className={cx("ReviewQuote-quoteBody", activeReview === 1 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}>Khách sạn Grand Tourane Đà Nẵng</p>
              <p className={cx("lg")}>
              Khách sạn Grand Tourane Đà Nẵng có vị trí tuyệt vời, gần biển và các nhà hàng nổi tiếng. Phòng nghỉ sạch sẽ, giường thoải mái và view rất đẹp. Dịch vụ ăn uống tại nhà hàng khách sạn cũng rất chất lượng.
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Gia đình chị Trúc Quỳnh</p>
          </div>

          <div className={cx("ReviewQuote-quoteBody", activeReview === 2 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}></p>
              <p className={cx("lg")}>
              Dịch vụ khách hàng ở đây thật sự ấn tượng. Mọi yêu cầu của chúng tôi đều được đáp ứng nhanh chóng. Cảm ơn đội ngũ nhân viên đã làm cho kỳ nghỉ của chúng tôi trở nên đáng nhớ.
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Anh Tiến Lâm</p>
          </div>

          <div className={cx("ReviewQuote-quoteBody", activeReview === 3 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}> </p>
              <p className={cx("lg")}>
              Tiện nghi trong phòng rất hiện đại và đầy đủ. Bể bơi sạch sẽ và không gian xung quanh rất thư giãn. Chúng tôi thực sự hài lòng với trải nghiệm này.
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Chị Thu Lệ</p>
          </div>

          <div className={cx("ReviewQuote-quoteBody", activeReview === 4 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}> Du thuyền Heritage Bình Chuẩn</p>
              <p className={cx("lg")}>
              Khách sạn có khu vực spa và gym rất tốt. Chúng tôi đã có những giờ phút thư giãn tuyệt vời tại đây. Chắc chắn sẽ giới thiệu khách sạn này cho bạn bè và gia đình.
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Chị Minh Khuê</p>
          </div>

        </div>

        <div className={cx("ReviewSection-reviewList")}>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 0 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(0)}>
            <label className={cx("label", "md")}>Chị Thu Hà</label>
          </button>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 1 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(1)}>
            <label className={cx("label", "md")}>Gia đình chị Trúc Quỳnh</label>
          </button>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 1 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(2)}>
            <label className={cx("label", "md")}>Anh Tiến Lâm</label>
          </button>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 1 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(3)}>
            <label className={cx("label", "md")}>Chị Thu Lệ</label>
          </button>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 1 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(4)}>
            <label className={cx("label", "md")}>Chị Minh Khuê</label>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
