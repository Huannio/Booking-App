import { useEffect, useState } from "react";
import Button from "~/components/Button";
import classNames from "classnames/bind";
import styles from "./ReviewSections.module.scss";
import SectionHeader from "~/components/SectionHeader/SectionHeader";
import ImageWrapper from "~/components/ImageWrapper";
import images from "~/assets/images";

const cx = classNames.bind(styles);

const mockData = [
  {
    customer_name: "Chị Thu Hà",
    review:
      "Chị rất cảm ơn team đã tư vấn cho chị chọn du thuyền Heritage Bình Chuẩn. Bố mẹ chị rất ưng í em ạ! Tàu đẹp, mang đậm phong cách Á Đông. Đồ ăn hợp khẩu vị. Các bạn nhân viên trên tàu nhiệt tình và chu đáo.",
    product: "Du thuyền Heritage Bình Chuẩn",
  },
  {
    customer_name: "Anh Khánh",
    review:
      "Du thuyền 5 sao và sự trải nghiệm tuyệt vời. Tour của chúng tôi đi rất đầy đủ như theo chương trình đã thông báo trước. Đồ ăn khá đa dạng, nấu vừa với khẩu vị của tất cả mọi độ tuổi từ bé đến các bác U80. Rất đáng nhớ !!! Nhân viên tư vấn nhiệt tình, phục vụ chu đáo. Đồ ăn ngon, phòng ốc đẹp. Đây thực sự là trải nghiệm đáng nhớ, mình sẽ tiếp tục ủng hộ và giới thiệu cho bạn bè. Cảm ơn du thuyền!",
    product: "Du thuyền Stellar of the Seas",
  },
  {
    customer_name: "Chị Linh - Anh Dũng",
    review:
      "Tour du thuyền 2 ngày 1 đêm rất tuyệt vời, tôi được ngắm vẻ đẹp của vịnh Hạ Long, khám phá các hang động. Nhân viên tư vấn nhiệt tình, phục vụ chu đáo. Đồ ăn ngon, phòng ốc đẹp. Đây thực sự là trải nghiệm đáng nhớ, mình sẽ tiếp tục ủng hộ và giới thiệu cho bạn bè. Cảm ơn du thuyền!",
    product: "",
  },
  {
    customer_name: "Bạn Minh Hoàng",
    review:
      "Cảm ơn team đã cho mình trải nghiệm quá ưng ý. Đi đúng hôm thời tiết đẹp, ngắm cảnh vịnh Hạ Long tuyệt vời. Nhân viên tư vấn nhiệt tình còn note lại khách dị ứng món gì, phục vụ chu đáo. Buffet hải sản tươi ngon, phòng ốc đẹp. Tuyệt vời lắm!!!",
    product: "",
  },
  {
    customer_name: "Cô Thanh Hằng và bạn",
    review:
      "Du thuyền 5 sao và sự trải nghiệm tuyệt vời. Tour của chúng tôi đi rất đầy đủ như theo chương trình đã thông báo trước. Đồ ăn khá đa dạng, nấu vừa với khẩu vị của tất cả mọi độ tuổi từ bé đến các bác U80. Chúng tôi được trải nghiệm gần như đầy đủ các hoạt động chèo kayak, thăm hang, thăm vịnh... và thưởng thức hải sản tươi ngon. Rất đáng nhớ!!!",
    product: "",
  },
];

const ReviewSections = () => {
  const [activeReview, setActiveReview] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prevIndex) => (prevIndex + 1) % 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={cx("ReviewSections", "section-bg")}>
      <div className={cx("container", "ReviewSections-section")}>
        <SectionHeader
          title={
            <h4>
              Đánh giá từ những <br /> người đã trải nghiệm
            </h4>
          }
          mainContent={
            "Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với chúng tôi."
          }
        />

        <div className={cx("ReviewQuote-reviewQuote")}>
          <div>
            <ImageWrapper
              src={images.quote}
              alt="quote"
              widthSvgWrapperImage={30}
              heightSvgWrapperImage={22}
            />
          </div>

          <div
            className={cx(
              "ReviewQuote-quoteBody",
              "ReviewQuote-quoteBody-active"
            )}
          >
            <div className={cx("ReviewQuote-quoteContent")}>
              <p className={cx("subheading", "lg")}>
                {mockData[activeReview].product}
              </p>
              <p className={cx("lg")}>{mockData[activeReview].review}</p>
            </div>
            <p className={cx("detail-md", "upper-case")}>
              {mockData[activeReview].customer_name}
            </p>
          </div>
        </div>
        <div className={cx("ReviewSections-reviewList")}>
          {mockData.map((data, index) => (
            <Button
              key={index}
              type="button"
              normal
              outline
              className={cx(
                "ReviewSections-reviewBtn",
                activeReview === index ? "" : "ReviewSections-defaultBtn"
              )}
              onClick={() => setActiveReview(index)}
            >
              <label className={cx("label", "md")}>{data.customer_name}</label>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSections;
