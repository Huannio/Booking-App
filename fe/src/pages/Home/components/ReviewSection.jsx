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
              <p className={cx("subheading", "lg")}>Du thuyền Heritage Bình Chuẩn</p>
              <p className={cx("lg")}>
              Khách sạn Golden Holiday Hội An
                <br />
                Đi đúng hôm thời tiết đẹp, ngắm cảnh vịnh Hạ Long đẹp tuyệt vời.
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Chị Thu Hà</p>
          </div>

          <div className={cx("ReviewQuote-quoteBody", activeReview === 1 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}>Du thuyền Stellar of the Seas</p>
              <p className={cx("lg")}>
                Du thuyền 5 sao và sự trải nghiệm tuyệt vời. Tour của chúng tôi đi rất đầy đủ như theo chương trình đã thông báo trước. Đồ ăn khá đa dạng, nấu vừa với khẩu vị của tất cả mọi độ tuổi từ bé đến các bác U80.
                Rất đáng nhớ !!!
                <br />
                Nhân viên tư vấn nhiệt tình,phục vụ chu đáo. Đồ ăn ngon,phòng ốc đẹp.
                <br />
                Đây thực sự là trải nghiệm đáng nhớ,mình sẽ tiếp tục ủng hộ và giới thiệu cho bạn
                bè. Cảm ơn du thuyền!
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Anh Khánh</p>
          </div>

          <div className={cx("ReviewQuote-quoteBody", activeReview === 2 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}> Du thuyền Heritage Bình Chuẩn</p>
              <p className={cx("lg")}>
              Tour du thuyền 2 ngày 1 đêm rất tuyệt vời,tôi đc ngắm vẻ đẹp cả vịnh Hạ Long,khám phá các hang động.
              Nhân viên tư vấn nhiệt tình,phục vụ chu đáo. Đồ ăn ngon,phòng ốc đẹp.
                <br />
                Đây thực sự là trải nghiệm đáng nhớ,mình sẽ tiếp tục ủng hộ và giới thiệu cho bạn bè. Cảm ơn du thuyền!
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Chị Linh - Anh Dũng</p>
          </div>

          <div className={cx("ReviewQuote-quoteBody", activeReview === 3 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}> Du thuyền Heritage Bình Chuẩn</p>
              <p className={cx("lg")}>
              Cảm ơn team đã cho mình trải nghiệm quá ưng ý.
                <br />
                Đi đúng hôm thời tiết đẹp,ngắm cảnh vịnh Hạ Long đẹp tuyệt vời.
                <br />
                Nhân viên tư vấn nhiệt tình còn note lại khách dị ứng món gì,phục vụ chu đáo, buffet hải sản tươi ngon,phòng ốc đẹp 
                <br />
                Tuyệt vời lắm !!!
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Bạn Minh Hoàng</p>
          </div>

          <div className={cx("ReviewQuote-quoteBody", activeReview === 4 ? "ReviewQuote-quoteBody-active" : "")}>
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}> Du thuyền Heritage Bình Chuẩn</p>
              <p className={cx("lg")}>
              Du thuyền 5 sao và sự trải nghiệm tuyệt vời. Tour của chúng tôi đi rất đầy đủ như theo chương trình đã thông báo trước. Đồ ăn khá đa dạng, nấu vừa với khẩu vị của tất cả mọi độ tuổi từ bé đến các bác U80.
                <br />
                Chúng tôi được trải nghiệm gần như đầy đủ các hoạt động chèo kayak,thăm hang,thăm vịnh.... và loại hải sản tươi ngon
                <br />
                Rất đáng nhớ !!!
              </p>
            </div>
            <p className={cx("detail-md", "upper-case")}>Cô Thanh Hằng và bạn</p>
          </div>

        </div>

        <div className={cx("ReviewSection-reviewList")}>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 0 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(0)}>
            <label className={cx("label", "md")}>Chị Thu Hà</label>
          </button>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 1 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(1)}>
            <label className={cx("label", "md")}>Anh Khánh</label>
          </button>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 1 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(2)}>
            <label className={cx("label", "md")}>Chị Linh - Anh Dũng</label>
          </button>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 1 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(3)}>
            <label className={cx("label", "md")}>Bạn Minh Hoàng</label>
          </button>
          <button type="button" className={cx("btn", "btn-btn", "btn-normal", "btn-outline", "ReviewSection-reviewBtn", activeReview === 1 ? "ReviewSection-defaultBtn" : "")} onClick={() => setActiveReview(4)}>
            <label className={cx("label", "md")}>Cô Thanh Hằng và bạn</label>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
