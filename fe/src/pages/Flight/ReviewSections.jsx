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
    customer_name: "Chị Lê Thủy",
    review:
      "Chuyến bay của chị và gia đình đi chơi rất thuận lợi em ạ. May là chị đặt vé bên em. Bên em tư vấn chọn chuyến cho chị xong lại check in online cho chị nữa nên cả nhà được ngồi gần nhau. Bạn lớn nhà chị được ngồi cạnh cửa sổ nhìn ngắm lúc cất cánh thích lắm! Nhà chị cũng thường xuyên đi chơi nên chị sẽ đặt vé bên em nhiều nhiều!",
    product: "Du thuyền Heritage Bình Chuẩn",
  },
  {
    customer_name: "Cô Minh Hòa",
    review:
      "Cô vừa về đến nhà. Chuyến bay tốt lắm cháu ạ! Chuẩn giờ, bay máy bay to. Con cô bảo đặt được vé giá tốt mà giờ bay cũng rất đẹp. Lần sau lại đặt vé cho cô nhé!",
    product: "Du thuyền Stellar of the Seas",
  },
  {
    customer_name: "Anh Quang Anh",
    review:
      "Mọi khi anh hay đi Vietnamairlines. Vừa rồi bên em tư vấn, anh bay thử Bamboo thấy khá ổn em ạ. Chất lượng dịch vụ tốt, làm thủ tục nhanh. Với lại, đợt rồi cũng máy bay Bamboo vì nhà anh nhiều vali. Bamboo tính cân nên cũng tiện. Anh hài lòng về chuyến bay!",
    product: "",
  },
  {
    customer_name: "Chị Giang",
    review:
      "Lần đầu chị đặt vé bay đi nước ngoài bên em và cảm thấy vô cùng hài lòng! Chị rất cảm ơn bên em tư vấn cho chị chuyến bay, giờ bay đẹp, thời gian nối chuyến hợp lý, không bị mệt. Chắc chắn chị sẽ đặt vé bên em nhiều nhiều.",
    product: "",
  },
  {
    customer_name: "Bạn Chu Huyền",
    review:
      "Alo, mình và gia đình vừa về. Cảm ơn bên bạn đặt vé cho mình nhé! Cả nhà đi vui lắm bạn ạ. May là bạn tư vấn cho mình giờ vì nhà mình có trẻ nhỏ. Chuyến bay chuẩn giờ, chỗ ngồi đẹp. Lần sau, mình lại nhờ bạn đặt vé nhé!",
    product: "",
  },
  {
    customer_name: "Cô Giang",
    review:
    "Cô bị đau chân nên hay phải chọn chỗ ngồi thoải mái. Bên cháu tư vấn tốt lắm! Bạn đặt vé chọn cho cô máy bay to, thân rộng. Cô rất ưng í! Mấy hôm nữa cô lại bay tiếp nên nhờ bên cháu kiểm tra vé và đặt chỗ cho cô nhé!",
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
