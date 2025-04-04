import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import classNames from "classnames/bind";
import styles from "../Cruise.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cx = classNames.bind(styles);

const ShipCarousel = ({ imagesString, thumbnail }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    if (imagesString) {
      // Chuyển chuỗi ảnh thành mảng
      const imagesArray = imagesString.split(',')
        .map(url => url.trim())
        .filter(url => url.length > 0);
      
      // Thêm thumbnail vào đầu nếu có
      const allImages = thumbnail ? [thumbnail, ...imagesArray] : imagesArray;
      
      setImages(allImages.map(url => ({
        url,
      })));
      setLoading(false);
    }
  }, [imagesString, thumbnail]);

  // Tự động scroll thumbnail khi active index thay đổi
  useEffect(() => {
    if (thumbnailRef.current && activeIndex !== null) {
      const thumbnailElement = thumbnailRef.current.children[activeIndex];
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeIndex]);

  const NextArrow = (props) => {
    const { className, onClick } = props;
    const nextImageIndex = (activeIndex + 1) % images.length;
    
    return (
      <div className={cx("side-preview-container", "side-preview-next")}>
        <img 
          src={images[nextImageIndex]?.url} 
          alt="Next slide preview"
          className={cx("preview-image")}
        />
        <button
          className={className}
          onClick={onClick}
          aria-label="Next slide"
        >
          <span className={cx("nav-icon")}>›</span>
        </button>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    const prevImageIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    
    return (
      <div className={cx("side-preview-container", "side-preview-prev")}>
        <img 
          src={images[prevImageIndex]?.url} 
          alt="Previous slide preview"
          className={cx("preview-image")}
        />
        <button
          className={className}
          onClick={onClick}
          aria-label="Previous slide"
        >
          <span className={cx("nav-icon")}>‹</span>
        </button>
      </div>
    );
  };

  const settings = {
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Set to false during development, enable later
    autoplaySpeed: 5000,
    arrows: true,
    fade: true, // Enable fade transition to prevent multiple images showing
    cssEase: 'linear',
    adaptiveHeight: false,
    prevArrow: images.length > 1 ? <PrevArrow /> : null,
    nextArrow: images.length > 1 ? <NextArrow /> : null,
    beforeChange: (oldIndex, newIndex) => setActiveIndex(newIndex),
  };

  if (loading) {
    return <div className={cx("carousel-loading")}>Đang tải ảnh...</div>;
  }

  if (!images || images.length === 0) {
    return <div className={cx("carousel-empty")}>Không có ảnh hiển thị</div>;
  }

  return (
    <div className={cx("ShipDetail-carousel")}>
      <div className={cx("carousel-container")}>
        <Slider ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <div key={index} className={cx("carousel-slide")}>
              <img
                src={image.url}
                alt={`Slide ${index + 1}`}
                className={cx("carousel-image")}
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/default-ship-image.jpg';
                  e.target.onerror = null;
                }}
              />
              {image.caption && (
                <div className={cx("carousel-caption")}>{image.caption}</div>
              )}
            </div>
          ))}
        </Slider>
      </div>
      
      {images.length > 1 && (
        <div className={cx("thumbnail-gallery")} ref={thumbnailRef}>
          {images.map((image, index) => (
            <div 
              key={index} 
              className={cx("thumbnail-item", { active: index === activeIndex })}
              onClick={() => sliderRef.current.slickGoTo(index)}
            >
              <img 
                src={image.url} 
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/default-ship-image.jpg';
                  e.target.onerror = null;
                }}
              />
              {index === activeIndex && (
                <div className={cx("thumbnail-active-indicator")}></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShipCarousel;